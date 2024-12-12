import React from "react";
import FormButton from "../../../commons/FormButton";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";

interface SignInModalProps {
  onClick: () => void;
}

interface IFormInput {
  name: string;
  email: string;
  password: string;
}

const GnbSignInModal = ({ onClick }: SignInModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <div
      className="flex flex-col items-center 
           text-black  gap-4"
    >
      <Image src="/MyPli.png" alt="로고" width={90} height={30} />
      <h1 className="text-lg">회원가입</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-4 w-full"
      >
        <input
          placeholder="이메일"
          type="email"
          className="form-input"
          {...(register("email"), { required: true })}
        />
        {errors.email && (
          <span className="error-text">이메일을 확인해주세요</span>
        )}

        <input
          placeholder="닉네임"
          type="string"
          className="form-input"
          {...(register("name"), { required: true })}
        />
        {errors.name && <span className="error-text">이름을 확인해주세요</span>}
        <input
          className="form-input"
          placeholder="비밀번호"
          type="password"
          {...(register("password"), { required: true })}
        />
        {errors.password && (
          <span className="error-text">비밀번호를 확인해주세요</span>
        )}
        <FormButton size="large" color="primary">
          <span>회원가입</span>
        </FormButton>
      </form>
      <h2>
        계정이 있으신가요?
        <span
          onClick={onClick}
          className="underline underline-offset-4 font-semibold cursor-pointer"
        >
          {" "}
          로그인 하러가기
        </span>
      </h2>
    </div>
  );
};

export default GnbSignInModal;
