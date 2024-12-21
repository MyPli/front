'use client'

import Button from '@/components/commons/Button';
import Track from '@/components/CreatePage/Track';
import DeletePlaylistModal from '@/components/modals/DeletePlaylistModal';
import { useBookmark } from '@/hooks/useBookmark';
import { usePlaylistState } from '@/hooks/usePlaylistState';
import { Video } from '@/models/playlist.model';
import { useControlPlayingStore } from '@/store/playStore';
import { useDeletePlaylistStore } from '@/store/useDeletePlaylistStore';
import { useMakePlaylist } from '@/store/useMakePlaylist';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { IoBookmark, IoBookmarkOutline, IoPlaySharp } from 'react-icons/io5';

const DetailPlaylist = () => {
	const params = useParams();
	const playlistId = Number(params.id);
  const navigate = useRouter()
	
	const { setPlaylistInfo } = useMakePlaylist();
	const { isDeleteModalOpen, openDeleteModal } = useDeletePlaylistStore();
  const { playlistData, loadingPlaylist } = usePlaylistState(playlistId);
  const { setCurrentPlaylist, setCurrentVideoIndex } = useControlPlayingStore();
  const { handleBookmark } = useBookmark()

	const handleNavigateToEdit = () => {
		setPlaylistInfo({
      title: playlistData?.title ?? '',
      coverImage: playlistData?.coverImage ?? '',
      tags: playlistData?.tags ?? [],
      totalTime: '00', 
      count: playlistData?.videos?.length as number,
    });
		navigate.push(`/playlist/${playlistId}/edit`);
  }

  const handlePlay = (startIndex?: number) => {
    setCurrentPlaylist(playlistData?.videos ?? []);
    if (startIndex !== undefined) {
      setCurrentVideoIndex(startIndex);
    }
  };

  const handleClickTrack = handlePlay;

  return (
    <>
      {isDeleteModalOpen && <DeletePlaylistModal playlistId={playlistId} />}
      <div className="w-full flex justify-center pb-24">
        <div className="min-w-[1190px] relative">
          {loadingPlaylist || !playlistData?.title ? (
            <div className="h-[400px] w-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              {playlistData?.createdByMe && (
                <div className="absolute right-20 flex gap-[16px] z-10 top-10">
                  <Button color="white" onClick={openDeleteModal}>
                    삭제
                  </Button>
                  <Button color="white" onClick={handleNavigateToEdit}>
                    수정
                  </Button>
                </div>
              )}
              <button
                className="absolute top-12 left-16 cursor-pointer z-10"
                onClick={() =>
                  handleBookmark(
                    playlistData?.liked ? "delete" : "add",
                    playlistData?.id as number,
                  )
                }
              >
                {playlistData?.liked ? (
                  <IoBookmark
                    color="white"
                    className="w-[30px] h-[30px] hover:scale-110 transition-transform"
                  />
                ) : (
                  <IoBookmarkOutline
                    color="white"
                    className="w-[30px] h-[30px] hover:scale-110 transition-transform"
                  />
                )}
              </button>
              <div className="h-[400px] w-full relative mb-10 flex jusitfy-center items-center">
                <div className="absolute w-full top-0 flex justify-start items-center gap-[46px] mt-10 pl-40">
                  {playlistData?.coverImage ? (
                    <Image
                      src={playlistData?.coverImage as string}
                      alt=""
                      width={300}
                      height={300}
                      className="w-[300px] h-[300px] cursor-pointer rounded-full object-cover"
                    />
                  ) : (
                    <div
                      className={`rounded-full w-[300px] h-[300px] bg-[#545454] flex justify-center items-center`}
                    >
                      <Image
                        src="/logo-white.svg"
                        alt="no images"
                        width={100}
                        height={50}
                      />
                    </div>
                  )}
                  <div className="min-w-[504px] relative flex flex-col justify-center">
                    <span className="text-[16px] cursor-pointer">
                      {playlistData?.createdBy}
                    </span>
                    <h3 className="text-[30px] max-h-[120px] mb-6 mt-2">
                      {playlistData?.title as string}
                    </h3>

                    <div className="flex flex-col gap-[20px]">
                      <div className="mt-[60px] flex items-center gap-[8px]">
                        {playlistData?.tags?.map((tag) => (
                          <div
                            key={tag}
                            className="flex gap-[3px] cursor-pointer"
                          >
                            <span>#</span>
                            <span>{tag}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-[20px] text-white text-[16px]">
                        <span>총 시간 {playlistData?.totalTime}</span>
                        <span>곡 수: {playlistData?.videos?.length}곡</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute right-20 h-full py-9 flex flex-col justify-end items-center">
                    <button
                      className="w-[60px] h-[60px] bg-primary rounded-full flex justify-center items-center pl-2 shadow-lg hover:shadow-xl transition-shadow"
                      onClick={() => handlePlay(0)}
                    >
                      <IoPlaySharp
                        color="white"
                        className="w-[40px] h-[40px]"
                      />
                    </button>
                  </div>
                </div>
                <Image
                  src="/blur.png"
                  alt=""
                  width={400}
                  height={400}
                  className="h-[400px] w-full object-cover"
                />
              </div>
              <div className="w-full flex flex-col items-center mt-[55px] flex gap-[10px]">
                {playlistData?.videos?.length ? (
                  playlistData?.videos?.map((track: Video, i) => (
                    <Track
                      key={track.title + i}
                      {...track}
                      onClick={() => handleClickTrack(i)}
                    />
                  ))
                ) : (
                  <div className="mt-[150px] flex justify-center items-center text-base">
                    음악이 없습니다.
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DetailPlaylist;
