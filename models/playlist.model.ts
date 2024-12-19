export interface Video {
	id: number;
  thumbnailUrl: string;
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
	tags: string[];
	videos: Video[];
}

export interface Playlist {
  id: number;
  coverImage: string;
  createdAt: string;
  title: string;
}