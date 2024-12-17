import { signUp } from '@/action/signUp';
import { SignUpFormState } from '@/models/signUp.model';
import { LoginFormState } from "@/models/login.model";
import { useMutation } from '@tanstack/react-query'
import { login } from '@/action/login';

interface SignupState<T> {
	state: T | undefined;
	formData: FormData;
}

const useSignup = () => {
	return useMutation({
		mutationFn: ({state, formData}: SignupState<SignUpFormState>) => signUp(state, formData),
		onSuccess: () => {
			// ...
		}
  });
}

const useLogin = () => {
	return useMutation({
		mutationFn: ({ state, formData }: SignupState<LoginFormState>) => login(state, formData),
		onSuccess: () => {
			// ...
		}
	})
}

export { useSignup, useLogin };
