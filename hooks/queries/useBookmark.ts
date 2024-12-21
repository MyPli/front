import { addBookmark, removeBookmark } from '@/action/bookmark'
import { useMutation } from '@tanstack/react-query'

const useAddBookmark = () => {
	return useMutation({
		mutationFn: ({playlistId}: {playlistId: number}) => addBookmark(playlistId),
	})
}

const useDeleteBookmark = () => {
  return useMutation({
    mutationFn: ({ playlistId }: { playlistId: number }) =>
      removeBookmark(playlistId),
  });
};

export { useAddBookmark, useDeleteBookmark };