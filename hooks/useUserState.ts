import {
  useDeleteUser,
  useGetProfile,
  useUpdateNickname,
  useUpdateProfileImage,
} from "./queries/useUser";

export const useUserState = () => {
  const { data: profile, isLoading } = useGetProfile();
  const { mutate: updateNickname } = useUpdateNickname();
  const { mutate: updateProfileImage } = useUpdateProfileImage();
  const { mutate: deleteUser } = useDeleteUser();

  return { profile, updateNickname, updateProfileImage, deleteUser, isLoading };
};
