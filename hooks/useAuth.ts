import { GoogleAuthProps, googleLogin, login, signUp } from "@/api/auth";
import { LoginProps } from "@/components/layout/gnb/modals/GnbLoginModal";
import { SignUpProps } from "@/components/layout/gnb/modals/GnbSignUpModal";
import { useAuthStore } from "@/store/authStore";
import { useGnbModalStore } from "@/store/gnbModalStore";

export const useAuth = () => {
  const { storeLogin } = useAuthStore();
  const { closeLoginModal } = useGnbModalStore();

  const userLogin = (data: LoginProps) => {
    login(data).then(({ accessToken, refreshToken }) => {
      storeLogin({ accessToken, refreshToken });
      closeLoginModal();
      alert("로그인 되었습니다");
    });
  };

  const userGoogleLogin = (data: GoogleAuthProps) => {
    googleLogin(data).then(({ accessToken, refreshToken }) => {
      storeLogin({ accessToken, refreshToken });
      closeLoginModal();
      alert("로그인 되었습니다");
    });
  };

  const userSignUp = (data: SignUpProps) => {
    signUp(data).then(({ message }) => {
      alert(message);
    });
  };

  return {
    userLogin,
    userSignUp,
    userGoogleLogin,
  };
};
