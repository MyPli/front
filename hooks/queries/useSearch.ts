import { fetchSearch } from '@/action/search';
import { useQuery } from '@tanstack/react-query'

interface ServicePlaylist {
  id: number;
  title: string;
  description: string;
  coverImage: string;
  source: string;
}

export interface YoutubePlaylist {
  channelName: string;
  duration: string;
  source: string;
  thumbnailUrl: string;
  title: string;
  youtubeId: string;
}

interface Response {
  servicePlaylists: ServicePlaylist[];
  youtubePlaylists: YoutubePlaylist[];
}

const useSearch = (keyword: string) => {
  return useQuery<Response>({
    queryKey: ["search", keyword],
    queryFn: () => fetchSearch(keyword),
  });
};

export { useSearch };