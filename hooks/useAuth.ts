export const handleLogin = async (formData: FormData) => {
  "use server";
  console.log(formData.get("email"), formData.get("password"));
};
