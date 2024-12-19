import { useDeletePlaylistStore } from '@/store/useDeletePlaylistStore';
import React from 'react';
import Modal from '../commons/Modal';
import Button from '../commons/Button';
import { usePlaylistState } from '@/hooks/usePlaylistState';

const DeletePlaylistModal = ({ playlistId }: { playlistId: number }) => {
  const { isDeleteModalOpen, closeDeleteModal } = useDeletePlaylistStore();
  const { deletePlaylist } = usePlaylistState(playlistId);

  return (
    <Modal
      isOpen={isDeleteModalOpen}
      onClose={closeDeleteModal}
      className="min-h-44"
      title="정말 삭제하시겠습니까?"
    >
      <h1 className="text-black text-[16px] mt-2">
        해당 플레이리스트를 다시 복구할 수 없습니다.
      </h1>
      <div className="flex gap-[10px] mt-8">
        <Button
          color="border"
          className="w-full h-[47px]"
          onClick={closeDeleteModal}
        >
          취소
        </Button>
        <Button
          color="primary"
          className="w-full h-[47px]"
          onClick={deletePlaylist}
        >
          삭제하기
        </Button>
      </div>
    </Modal>
  );
};

export default DeletePlaylistModal;