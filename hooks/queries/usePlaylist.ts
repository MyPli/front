import { addVideoToPlaylist, deletePlaylist, getPlaylistDetail, updatePlaylistDetail } from '@/action/playlist'
import { queryClient } from '@/utils/ReactQueryProvider'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

const useGetPlaylistDetail = (playlistId: number) => {
	return useQuery({
		queryKey: ['get-playlist', playlistId],
		queryFn: () => getPlaylistDetail(playlistId)
	})
}

const useUpdatePlaylist = () => {
  return useMutation({
    mutationFn: ({ playlistId }: { playlistId: number }) =>
      updatePlaylistDetail(playlistId),
    onSuccess: (_, variables) =>
      queryClient.refetchQueries({
        queryKey: ["get-playlist", variables.playlistId],
      }),
  });
};

const useDeletePlaylsit = () => {
	const navigate = useRouter();

	return useMutation({
		mutationFn: ({ playlistId }: { playlistId: number }) => deletePlaylist(playlistId),
		onSuccess: () => {
			navigate.push('/')
		}
	})
}

const useAddVideo = () => {
	return useMutation({
    mutationFn: ({ playlistId }: { playlistId: number }) =>
      addVideoToPlaylist(playlistId),
    onSuccess: (_, variables) => {
			queryClient.refetchQueries({ queryKey: ["get-playlist", variables.playlistId] });
    },
  });
}

export {
  useGetPlaylistDetail,
  useUpdatePlaylist,
  useDeletePlaylsit,
  useAddVideo,
};