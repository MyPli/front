"use server";

export const handleLogin = async (formData: FormData) => {
  console.log(formData.get("email"), formData.get("password"));
};
