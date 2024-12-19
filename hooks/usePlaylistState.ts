import { useAddVideo, useDeletePlaylsit, useGetLatestPlaylists, useGetPlaylistDetail, useGetPopularPlaylists, useUpdatePlaylist } from './queries/usePlaylist'

export const usePlaylistState = (playlistId?: number) => {
	const { data: playlistData, isLoading: loadingPlaylist } = useGetPlaylistDetail(playlistId!);
	const { data: latests } = useGetLatestPlaylists();
	const { data: populars } = useGetPopularPlaylists();

	const { mutate: updatePlaylist } = useUpdatePlaylist();
	const { mutate: deletePlaylist } = useDeletePlaylsit();
	const { mutate: addVideo } = useAddVideo();

	if (playlistId) {
		const handleDelete = () => deletePlaylist({ playlistId });

    const handleAddVideo = (data: any) => addVideo({ playlistId, ...data });

    return {
			playlistData,
			loadingPlaylist,
      updatePlaylist,
      deletePlaylist: handleDelete,
      addVideo: handleAddVideo,
    };
	} else {
		return {
      latests,
      populars,
    };
	}
}