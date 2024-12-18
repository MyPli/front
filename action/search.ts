import { api } from '@/utils/api'

export const fetchSearch = async (keyword: string) => {
	const response = await api.get(`/search?keyword=${keyword}&maxResults=10`);
	return response.json()
};