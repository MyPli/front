import { addBookmark, removeBookmark } from '@/action/bookmark'
import { queryClient } from '@/utils/ReactQueryProvider';
import { useMutation } from '@tanstack/react-query'

const useAddBookmark = () => {
	return useMutation({
    mutationFn: ({ playlistId }: { playlistId: number }) =>
      addBookmark(playlistId),
    onSuccess: (_, { playlistId }) => {
      queryClient.invalidateQueries({ queryKey: ["get-playlist", playlistId] });
    },
    onError: (error) => console.log(error),
  });
}

const useDeleteBookmark = () => {
  return useMutation({
    mutationFn: ({ playlistId }: { playlistId: number }) =>
      removeBookmark(playlistId),
    onSuccess: (_, { playlistId }) => {
      queryClient.invalidateQueries({ queryKey: ["get-playlist", playlistId] });
    },
    onError: (error) => console.log(error),
  });
};

export { useAddBookmark, useDeleteBookmark };