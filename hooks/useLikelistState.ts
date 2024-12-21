"use client";

import { useGetLikelist } from "./queries/useLikelist";

export const useLikelistState = () => {
  const { data: likelist } = useGetLikelist();
  return {
    likelist,
  };
};
