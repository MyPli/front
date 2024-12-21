import { useAddBookmark, useDeleteBookmark } from './queries/useBookmark'

export const useBookmark = () => {
	const { mutate: addBookmark } = useAddBookmark();
	const { mutate: deleteBookmark } = useDeleteBookmark();

	const handleBookmark = (type: 'add' | 'delete', playlistId: number) => {
		if (type === 'add') {
			addBookmark({ playlistId });
		} else {
			deleteBookmark({ playlistId });
		}
	}

	return { handleBookmark };
}