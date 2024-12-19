import { PlaylistDetail } from '@/models/playlist.model';
import { api } from '@/utils/api';

export const getPlaylistDetail = async (
  playlistId: number,
): Promise<PlaylistDetail> => {
  const response = await api.get(`/playlists/${playlistId}`);
  return response.json();
};

export const updatePlaylistDetail = async (playlistId: number) => {
	const response = await api.patch(`/playlists/${playlistId}`, {
		body: ''
	});
	return response.json();
}

export const deletePlaylist = async (playlistId: number) => {
	const response = await api.delete(`/playlists/${playlistId}`);
	return response.json();
}

export const addVideoToPlaylist = async (playlistId: number) => {
	const response = await api.post(`/playlists/${playlistId}/videos`);
	return response.json()
};