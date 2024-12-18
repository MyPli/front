'use client'

import Button from '@/components/commons/Button';
import Track from '@/components/CreatePage/Track';
import DeletePlaylistModal from '@/components/modals/DeletePlaylistModal';
import { usePlaylist } from '@/hooks/usePlaylistState';
import { useDeletePlaylistStore } from '@/store/useDeletePlaylistStore';
import { TrackInfo, useMakePlaylist } from '@/store/useMakePlaylist';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from "react";
import { IoArrowDown, IoArrowUp, IoPlaySharp } from 'react-icons/io5';

const DetailPlaylist = () => {
	const params = useParams();
	const playlistId = Number(params.id);
	const navigate = useRouter()
	
	const { setPlaylistInfo } = useMakePlaylist();
	const { isDeleteModalOpen, openDeleteModal } = useDeletePlaylistStore();
	const { playlistData } = usePlaylist(playlistId);

  const [sorted, setSorted] = useState("최신순");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleClickSort = (item: string) => {
    setSorted(item);
    setShowDropdown(false);
  };
	
	const handleNavigateToEdit = () => {
		setPlaylistInfo({
      title: playlistData?.title ?? '',
      coverImage: playlistData?.coverImage ?? '',
      tags: playlistData?.tags ?? [],
      totalTime: '00', 
      count: playlistData?.likesCount ?? 0,
    });
		navigate.push(`/playlist/${playlistId}/edit`);
	}

  return (
    <>
      {isDeleteModalOpen && <DeletePlaylistModal playlistId={playlistId} />}
      <div className="w-full flex justify-center">
        <div className="min-w-[1190px] relative">
          <div className="absolute right-0 flex gap-[16px] z-10">
            <Button color="white" onClick={openDeleteModal}>
              삭제
            </Button>
            <Button color="white" onClick={handleNavigateToEdit}>
              수정
            </Button>
          </div>
          <div className="h-[400px] w-full relative mb-10 flex jusitfy-center">
            <div className="absolute w-full top-0 flex justify-center items-center mt-10 gap-[46px]">
              <Image
                src={playlistData?.coverImage as string}
                alt=""
                width={300}
                height={300}
                className="w-[300px] h-[300px] cursor-pointer rounded-full object-cover"
              />
              <div className="min-w-[504px] relative flex flex-col justify-center">
                <span className="text-[16px] cursor-pointer">홍길동</span>
                <h3 className="text-[30px] max-h-[120px] mb-6 mt-2">
                  {playlistData?.title as string}
                </h3>

                <div className="flex flex-col gap-[20px]">
                  <div className="mt-[60px] flex items-center gap-[8px]">
                    {playlistData?.tags.map((tag) => (
                      <span key={tag.tagId}>#{tag.tagId}</span>
                    ))}
                  </div>
                  <div className="flex gap-[20px] text-white text-[16px]">
                    {/* TODO: 총 시간 없으니까 백엔드에 요청하기 */}
                    {/* <span>총 시간 {playlistData?.totalTime}</span> */}
                    <span>곡 수: {playlistData?.videos.length}곡</span>
                  </div>
                </div>
              </div>
              <button className="absolute w-[60px] h-[60px] bg-primary rounded-full flex justify-center items-center pl-2 shadow-lg hover:shadow-xl transition-shadow right-20 bottom-12">
                <IoPlaySharp color="white" className="w-[40px] h-[40px]" />
              </button>
            </div>
            <Image
              src="/blur.png"
              alt=""
              width={400}
              height={400}
              className="h-[400px] w-[1190px] object-cover"
            />
          </div>
          <div className="flex justify-end items-center mb-[31px] ">
            <div>
              <button
                className="w-[120px] flex items-center justify-between gap-2 rounded-lg border px-3 py-[6px] cursor-pointer"
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                {sorted} {showDropdown ? <IoArrowUp /> : <IoArrowDown />}
              </button>
              {showDropdown && (
                <div className="w-[120px] rounded-md border mt-2 absolute">
                  {["최신순", "음악순", "아티스트순"].map((item, i) => (
                    <button
                      key={item}
                      className={`py-[6px] pl-[13px] w-[120px] ${
                        i < 2 && "border-b"
                      } text-left`}
                      onClick={() => handleClickSort(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="w-full flex flex-col items-center mt-[55px] flex gap-[10px]">
            {/* TODO: 백엔드에 track 데이터에 추가 안된거 추가해달라고 하기 */}
            {[].length ? (
              [].map((track: TrackInfo, i: number) => (
                <Track key={i} {...track} />
              ))
            ) : (
              <div className="mt-[150px] flex justify-center items-center text-base">
                음악이 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPlaylist;
