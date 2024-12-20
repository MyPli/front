import { useMutation, useQuery } from "@tanstack/react-query";
import { getProfile, patchNickname, patchProfileImage } from "@/action/mypage";
import { queryClient } from "@/utils/ReactQueryProvider";

export const useMyPageState = () => {
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const { mutate: updateNickname } = useMutation({
    mutationFn: async ({ nickname }: { nickname: string }) => {
      const res = await patchNickname({ nickname });
      console.log(res);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      alert("수정했습니다");
    },
    onError: (error: any) => {
      alert(`닉네임 수정 실패: ${error.message || "오류 발생"}`);
    },
  });

  const { mutate: updateProfileImage } = useMutation({
    mutationFn: async ({ profileImage }: { profileImage: string }) => {
      return await patchProfileImage({ profileImage });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      alert("수정했습니다");
    },
    onError: (error: any) => {
      alert(`이미지 수정 실패: ${error.message || "오류 발생"}`);
    },
  });

  return { profile, updateProfileImage, updateNickname };
};
