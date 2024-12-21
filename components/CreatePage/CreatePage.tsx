"use client";

import AddTrackModal from "@/components/CreatePage/AddTrackModal";
import Track from "@/components/CreatePage/Track";
import { usePlaylistState } from '@/hooks/usePlaylistState';
import { PlaylistInfo, TrackInfo, useMakePlaylist } from "@/store/useMakePlaylist";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { KeyboardEvent, useRef, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { IoArrowDown, IoArrowUp, IoClose } from "react-icons/io5";
import Button from '../commons/Button';
import { useAddVideoModalStore } from '@/store/addVideModalStore';

interface IProps {
  isEditMode?: boolean;
}

const Create = ({isEditMode}: IProps) => {
  const navigate = useRouter();
  const params = useParams();
  const playlistId = Number(params.id);

  const fileRef = useRef<HTMLInputElement>(null);

  const { isAddModalOpen, openAddModal } = useAddVideoModalStore();
  const { playlistInfo, setPlaylistInfo, tracks, removeTrack, clearPlaylist } =
    useMakePlaylist();
  const { updatePlaylist } = usePlaylistState(playlistId);

  const [inputs, setInputs] = useState<
    Pick<PlaylistInfo, "title" | "coverImage" | "tags">
  >({
    title: playlistInfo.title,
    coverImage: playlistInfo.coverImage,
    tags: playlistInfo.tags,
  });
  const [sorted, setSorted] = useState("최신순");
  const [showDropdown, setShowDropdown] = useState(false);
  const [newTag, setNewTag] = useState("");

  const handleClickSort = (item: string) => {
    setSorted(item);
    setShowDropdown(false);
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      // setInputs({ ...inputs, tags: [...inputs.tags, newTag] });
      setNewTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    // setInputs({ ...inputs, tags: inputs.tags.filter((t) => t !== tag) });
    console.log(tag)
  };

  const handleCancel = () => {
    clearPlaylist();
    navigate.push(isEditMode ? `/playlist/${playlistId}` : "/");
  };

  const handleMakePlaylist = () => {
    if (inputs.title && tracks) {
      setPlaylistInfo({
        ...inputs,
        totalTime: calculateTotalTime(),
        count: tracks.length,
      });
      navigate.push("/");
      clearPlaylist();
    }
  };

  const handleUpdatePlaylist = () => {
    updatePlaylist?.({
      playlistId: Number(playlistId),
      // ...inputs
    })
    navigate.back()
  }

  const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInputs({ ...inputs, coverImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };
  const calculateTotalTime = () => {
    let totalSeconds = tracks.reduce((acc: number, track: { time: string }) => {
      const [minutes, seconds] = track.time.split(":").map(Number);
      return acc + minutes * 60 + seconds;
    }, 0);

    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0",
    )}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <>
      {isAddModalOpen && <AddTrackModal playlistId={playlistId} />}
      <div className="w-full flex justify-center">
        <div className="min-w-[1190px] relative">
          <div className="absolute right-0 flex gap-[16px] z-10">
            <Button onClick={handleCancel} color="white">
              취소
            </Button>
            <Button
              color="white"
              onClick={() =>
                isEditMode ? handleUpdatePlaylist() : handleMakePlaylist()
              }
            >
              {isEditMode ? "수정 완료" : "만들기"}
            </Button>
          </div>
          <div className="h-[400px] w-full relative mb-10">
            <div className="absolute w-full top-0 flex justify-center items-center mt-10 gap-[46px]">
              <Image
                src={inputs.coverImage || "/AddImage.png"}
                alt=""
                width={300}
                height={300}
                className="w-[300px] h-[300px] cursor-pointer rounded-full object-cover"
                onClick={() => fileRef.current?.click()}
              />
              <input
                type="file"
                ref={fileRef}
                hidden
                onChange={handleAddImage}
              />
              <div>
                <input
                  className="w-[504px] h-[43px] bg-transparent border-b border-white text-white outline-none pl-1 text-[26px]"
                  placeholder="제목을 입력해 주세요."
                  value={inputs.title}
                  onChange={(e) =>
                    setInputs({ ...inputs, title: e.target.value })
                  }
                />
                <div className="w-[504px] h-[43px] border-b border-white mt-[60px] flex items-center">
                  <div className="flex mr-[8px] gap-[8px]">
                    {/* TODO: 백엔드에게 태그 수정해서 반영해달라고 하기 */}
                    {inputs.tags.map((tag) => (
                      <button
                        className="px-2 py-[1px] border border-white rounded-lg flex items-center gap-[4px]"
                        key={tag}
                        onClick={() => handleRemoveTag(tag)}
                      >
                        {tag}
                        <IoClose />
                      </button>
                    ))}
                  </div>
                  <input
                    className="h-full bg-transparent text-white outline-none pl-1"
                    placeholder="태그를 입력해 주세요."
                    onKeyDown={handleEnter}
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                  />
                </div>
                <div className="flex mt-7 gap-[20px] text-white text-[16px]">
                  <span>총 시간 {calculateTotalTime()}</span>
                  <span>곡 수: {tracks.length}곡</span>
                </div>
              </div>
            </div>
            <Image
              src="/blur.png"
              alt=""
              width={1190}
              height={400}
              className="h-[400px] w-[1190px] object-cover"
            />
          </div>
          <div className="flex justify-between items-center mb-[31px] ">
            <button className="w-[375px] relative" onClick={openAddModal}>
              <input
                className="w-[375px] h-[43px] bg-black outline-none border-b border-b-gray text-base text-white pr-9 cursor-pointer"
                placeholder="음악 또는 아티스트 검색하기"
                readOnly
              />
              <HiMagnifyingGlass className="fill-white w-5 h-5 absolute right-2 top-[50%] transform -translate-y-1/2" />
            </button>
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
          <div className="w-full flex flex-col items-center mt-[55px]">
            {tracks.length ? (
              tracks.map((track: TrackInfo, i: number) => (
                <Track
                  key={i}
                  {...track}
                  thumbnailUrl={track.imageUrl}
                  onClick={() => null}
                  id={0}
                  url={track.imageUrl}
                  onDelete={() =>
                    removeTrack({ title: track.title, artist: track.artist })
                  }
                />
              ))
            ) : (
              <div className="mt-[150px] flex justify-center items-center text-base">
                음악을 추가해주세요!
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
