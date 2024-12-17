import { fetchProfile, updateProfile } from "@/api/user";
import { getAccessToken } from "@/store/authStore";
import { queryClient } from "@/utils/ReactQueryProvider";

import { useMutation, useQuery } from "@tanstack/react-query";

export const useProfileQuery = () => {
  const accessToken = getAccessToken();
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: [accessToken, "profile"],
    queryFn: fetchProfile,
    enabled: !!accessToken,
  });
  return {
    data,
    isLoading,
    isError,
    isSuccess,
  };
};

export const useUpdataProfileQuery = () => {
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
