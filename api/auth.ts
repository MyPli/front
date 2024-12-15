import { LoginProps } from "@/components/layout/gnb/modals/GnbLoginModal";
import { SignUpProps } from "@/components/layout/gnb/modals/GnbSignUpModal";
import { httpClient } from "@/api/http";
import { auth, signUp as ISignUp } from "@/models/auth.model";

export const login = async (data: LoginProps) => {
  const response = await httpClient.post<LoginProps, auth>("/auth/login", data);
  return response;
};

export interface GoogleAuthProps {
  idToken: string;
}

export const googleLogin = async (data: GoogleAuthProps) => {
  const response = await httpClient.post<GoogleAuthProps, auth>(
    "/auth/google",
    data,
  );
  return response;
};

export const signUp = async (data: SignUpProps) => {
  const response = await httpClient.post<SignUpProps, ISignUp>(
    "/auth/signup",
    data,
  );
  return response;
};
