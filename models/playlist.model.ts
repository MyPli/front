export interface Tag {
	playlistId: number;
	tagId: number;
}

export interface Video {
	id: number;
	title: string;
	url: string;
}

export interface PlaylistDetail {
  id: number;
  userId: number;
  title: string;
  description: string;
  coverImage: string | null;
  likesCount: number;
  createdAt: string;
  updatedAt: string;
	tags: Tag[];
	videos: Video[];
}