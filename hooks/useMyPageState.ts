import { useState } from 'react';
import { useGetProfile, useUpdateProfile } from './queries/useMyPage';

export const useMyPageState = () => {
	const [edit, setEdit] = useState(false);

  const { data: profile } = useGetProfile();
  const { mutate: updateProfile } = useUpdateProfile({
    successHandler: () => setEdit(false)
  });
	
	const editHandler = () => setEdit(true);
	
	return { edit, profile, updateProfile, onEdit: editHandler };
}