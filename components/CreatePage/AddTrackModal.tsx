import React from "react";
import Modal from "../commons/Modal";
import { HiMagnifyingGlass } from "react-icons/hi2";
import CreatePlaylist from "./TrackForAdd";
import { TrackInfo, useMakePlaylist } from "@/store/useMakePlaylist";

const dummy = {
  imageUrl:
    "https://i.ytimg.com/vi/doBSwtsiHB4/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDH5Yamyr8PfggjyaTqGC5ucNR-Mw",
  title: "Whiplash",
  artist: "에스파",
  time: "3:11",
  isAdded: false,
};

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTrackModal = (props: IProps) => {
  const { addTrack } = useMakePlaylist();

  const handleAdd = (track: TrackInfo) => {
    addTrack(track);
    props.onClose();
  };

  return (
    <Modal
      {...props}
      title="플레이리스트에 음악 추가하기"
      className="w-[647px] h-[812px]"
    >
      <div className="w-[375px] mb-[31px] relative">
        <input
          className="w-[375px] h-[43px] outline-none border-b border-b-gray text-base text-black pr-9"
          placeholder="음악 또는 아티스트 검색하기"
        />
        <HiMagnifyingGlass className="fill-black w-5 h-5 absolute right-2 top-[50%] transform -translate-y-1/2" />
      </div>
      {[dummy, dummy, dummy, dummy, dummy].map((item, i) => (
        <CreatePlaylist key={i} {...item} onAdd={() => handleAdd(item)} />
      ))}
    </Modal>
  );
};

export default AddTrackModal;
