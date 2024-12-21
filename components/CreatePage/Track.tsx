import { usePlaylistState } from '@/hooks/usePlaylistState';
import { Video } from '@/models/playlist.model';
import { useControlPlayingStore } from '@/store/playStore';
import Image from "next/image";
import { useEffect, useState } from 'react';

interface IProps extends Video {
  onDelete?: () => void;
  onClick: () => void;
}

const Track = ({ onDelete, onClick, ...props }: IProps) => {
  const [isPlaying, setIsPlaying] = useState(false)

  const {
    currentPlaylist,
    currentVideoIndex,
  } = useControlPlayingStore();
  const { playlistData } = usePlaylistState();

  useEffect(() => {
    setIsPlaying(currentPlaylist[currentVideoIndex]?.title === props.title);
  }, [currentPlaylist, currentVideoIndex])

  return (
    <div
      className="w-full flex items-center h-[92px] relative group hover:bg-[#ffffff10] cursor-pointer rounded-lg my-4"
      onClick={onClick}
    >
      <div className="w-[130px] flex justify-center items-center">
        {isPlaying && (
          <Image
            src="/play.svg"
            alt="playing icon"
            width={36}
            height={36}
            className="w-[36px] h-[36px]"
          />
        )}
      </div>

      <div className="flex-[0.3]">
        <Image
          src={props.thumbnailUrl}
          alt="album cover"
          width={96}
          height={92}
          className="rounded-lg object-cover w-[96px] h-[92px]"
        />
      </div>
      <span className="text-base text-white flex-[0.8] truncate mr-6">
        {props.title}
      </span>
      <span className="text-sm text-white flex-[0.6] pl-10">
        {props.artist}
      </span>
      <div className="flex items-center justify-between flex-[0.4]">
        <span className="text-base text-white">{props.time}</span>
        {playlistData?.createdByMe && (
          <button
            className="px-[44px] opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={onDelete}
          >
            <Image
              src="/delete.svg"
              alt="delete icon"
              width={20}
              height={20}
              className="w-5 h-5"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default Track;
