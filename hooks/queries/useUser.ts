import { getProfile, patchNickname, patchProfileImage } from "@/action/mypage";
import { deleteUser } from "@/action/deleteUser";
import { useMypageEditModalStore } from "@/store/myPageEditModalStore";
import { useMypageModalStore } from "@/store/myPageModalStore";
import { queryClient } from "@/utils/ReactQueryProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useGetProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
};

const useUpdateNickname = () => {
  return useMutation({
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
};

const useUpdateProfileImage = () => {
  return useMutation({
    mutationFn: patchProfileImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      alert("수정했습니다");
    },
    onError: (error: any) => {
      alert(`이미지 수정 실패: ${error.message || "오류 발생"}`);
    },
  });
};

const useDeleteUser = () => {
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      const router = useRouter();
      const { closeMypageEditModal } = useMypageEditModalStore();
      const { closeMypageModal } = useMypageModalStore();

      queryClient.invalidateQueries({ queryKey: ["profile"] });
      alert("회원 탈퇴했습니다");
      closeMypageModal();
      closeMypageEditModal();

      router.push("/");
    },
    onError: (error: any) => {
      alert(` 실패했습니다`);
    },
  });
};

export {
  useGetProfile,
  useUpdateNickname,
  useUpdateProfileImage,
  useDeleteUser,
};
