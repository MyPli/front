import { useAddVideo, useDeletePlaylsit, useGetPlaylistDetail, useUpdatePlaylist } from './queries/usePlaylist'

export const usePlaylist = (playlistId: number) => {
	const { data: playlistData } = useGetPlaylistDetail(playlistId);
	const { mutate: updatePlaylist } = useUpdatePlaylist();
	const { mutate: deletePlaylist } = useDeletePlaylsit();
	const { mutate: addVideo } = useAddVideo();

	const handleDelete = () => deletePlaylist({ playlistId });

	const handleAddVideo = (data: any) => addVideo({playlistId, ...data})
	
	return {
    playlistData,
    updatePlaylist,
    deletePlaylist: handleDelete,
    addVideo: handleAddVideo,
  };
}