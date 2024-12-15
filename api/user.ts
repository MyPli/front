import { httpClient } from "./http";

export const fetchProfile = async () => {
  const response = httpClient.get("/users/me");
  return response;
};

export interface updateProfileParams {
  nickname: string;
  profileImage: string;
}

export const updateProfile = async (params: updateProfileParams) => {
  const response = httpClient.patch("/users/me", {
    params: params,
  });
  return response;
};
