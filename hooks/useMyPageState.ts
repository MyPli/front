import { useMutation, useQuery } from "@tanstack/react-query";
import { getProfile, patchProfile } from "@/action/mypage";
import { useMypageEditModalStore } from "@/store/myPageEditModalStore";
import { queryClient } from "@/utils/ReactQueryProvider";

export const useMyPageState = () => {
  const { closeMypageEditModal } = useMypageEditModalStore();

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const { mutate: updateProfile } = useMutation({
    mutationFn: patchProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      alert("수정했습니다");
      closeMypageEditModal();
    },
    onError: (error) => {
      alert(`프로필 수정 실패: ${error.message}`);
    },
  });

  return { profile, updateProfile };
};
