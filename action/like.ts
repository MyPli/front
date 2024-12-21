import { api } from "@/utils/api";

export const getLikeList = async () => {
  try {
    const response = await api.get("/users/me/likes");
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
