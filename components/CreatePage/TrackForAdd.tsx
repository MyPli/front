"use client";

import { YoutubePlaylist } from '@/hooks/queries/useSearch';
import Image from "next/image";
import { IoAddCircle } from "react-icons/io5";

interface IProps extends YoutubePlaylist {
  onAdd: () => void;
}

const TrackForAdd = ({ onAdd, ...props }: IProps) => {
  const formatDuration = () => {
    const totalSeconds = parseInt(props.duration);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const remainingSeconds = totalSeconds % 60;

    return [hours, minutes, remainingSeconds]
      .map((val) => val.toString().padStart(2, "0"))
      .join(":");
  };

  return (
    <div className="w-full h-20 flex items-center px-3 border-b border-gray relative max-w-[550px] bg-white">
      <Image
        src={props.thumbnailUrl}
        alt="album cover"
        width={60}
        height={50}
        className="rounded-lg w-[60px] h-[50px] object-cover"
      />
      <div className="ml-4 flex-[1.5] pr-4">
        <span className="block text-base font-semibold text-secondary text-ellipsis overflow-hidden w-100% h-[20px]">
          {props.title}
        </span>
        <span className="block text-sm text-secondary mt-[2px]">
          {props.channelName}
        </span>
      </div>
      <span className="text-base text-secondary flex-1">
        {formatDuration()}
      </span>
      <button
        className="flex items-center gap-[7px] text-primary absolute right-3 px-2 py-2 rounded-xl"
        onClick={onAdd}
      >
        <IoAddCircle />
        <span>추가하기</span>
      </button>
    </div>
  );
};

export default TrackForAdd;
