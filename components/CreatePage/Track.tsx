import { Video } from '@/models/playlist.model';
import Image from "next/image";

interface IProps extends Video {
  onDelete?: () => void;
  onClick: () => void;
}

const Track = ({ onDelete, onClick, ...props }: IProps) => {
  return (
    <div
      className="w-full flex items-center w-[1190px] h-[92px] relative group hover:bg-[#ffffff10] cursor-pointer rounded-lg my-4"
      onClick={onClick}
    >
      <div className="flex-[0.5]">
        <Image
          src={props.thumbnailUrl}
          alt="album cover"
          width={96}
          height={92}
          className="rounded-lg object-cover w-[96px] h-[92px]"
        />
      </div>
      <span className="text-base text-white flex-[0.6]">{props.title}</span>
      <span className="text-sm text-white flex-1">{"아티스트명"}</span>
      <div className="flex items-center justify-between flex-[0.4]">
        <span className="text-base text-white">{"시간"}</span>
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
      </div>
    </div>
  );
};

export default Track;
