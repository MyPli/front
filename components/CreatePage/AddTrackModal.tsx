import React, { useEffect } from "react";
import Modal from "../commons/Modal";
import { HiMagnifyingGlass } from "react-icons/hi2";
import CreatePlaylist from "./TrackForAdd";
import { useForm } from "react-hook-form";
import { useSearch, YoutubePlaylist } from '@/hooks/queries/useSearch';
import { useAddVideoModalStore } from '@/store/addVideModalStore';
import { useMakePlaylist } from '@/store/useMakePlaylist';

interface FormData {
  searchText: string;
}

const AddTrackModal = () => {
  const { register, watch, getValues } = useForm<FormData>({
    mode: "onChange",
  });
  const { data: searchResult, refetch, isLoading } = useSearch(getValues('searchText'));
  const { isAddModalOpen, closeAddModal } = useAddVideoModalStore();
  const { addTrack } = useMakePlaylist();

  useEffect(() => {
    refetch();
  }, [watch("searchText")]);

  const handleAddVideo = (item: YoutubePlaylist) => {
    addTrack?.({
      ...item,
      id: Number(item.youtubeId),
      url: item.source,
      time: item.duration,
      artist: item.channelName
    });
    closeAddModal();
  }

  return (
    <Modal
      isOpen={isAddModalOpen}
      onClose={closeAddModal}
      title="플레이리스트에 음악 추가하기"
      className="w-[647px] h-[812px]"
    >
      <div className="w-[375px] mb-[31px] relative">
        <input
          className="w-[375px] h-[43px] outline-none border-b border-b-gray text-base text-black pr-9"
          placeholder="음악 또는 아티스트 검색하기"
          {...register("searchText")}
        />
        <HiMagnifyingGlass className="fill-black w-5 h-5 absolute right-2 top-[50%] transform -translate-y-1/2" />
      </div>
      <div className="h-[620px] overflow-auto">
        {searchResult?.youtubePlaylists?.map((item, i) => (
          <CreatePlaylist
            key={i}
            {...item}
            onAdd={() => handleAddVideo(item)}
          />
        ))}
        {!searchResult?.youtubePlaylists?.length && (
          <span>검색 결과가 없습니다.</span>
        )}
        {isLoading && <span>검색 중...</span>}
      </div>
    </Modal>
  );
};

export default AddTrackModal;
