import { getProfile, patchProfile } from '@/action/mypage';
import { queryClient } from '@/utils/ReactQueryProvider';
import { useMutation, useQuery } from '@tanstack/react-query';
import { SuccessOptions } from '../type';
import { getAccessToken } from '@/action/login';

const useGetProfile = () => {
	const accessToken = getAccessToken();

	return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    enabled: !!accessToken,
  });
}

const useUpdateProfile = ({ successHandler }: SuccessOptions) => {
  return useMutation({
    mutationFn: patchProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      successHandler();
    },
  });
};

export { useGetProfile, useUpdateProfile };