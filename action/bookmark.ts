import { api } from '@/utils/api'

export const addBookmark = async (playlistId: number) => {
  const response = await api.post(`/playlists/${playlistId}/like`);
  return response.json();
};

export const removeBookmark = async (playlistId: number) => {
  const response = await api.delete(`/playlist/${playlistId}/like`);
  return response.json();
};