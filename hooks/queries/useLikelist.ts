"use client";

import { getLikeList } from "@/action/like";
import { Like } from "@/models/like.model";
import { useQuery } from "@tanstack/react-query";

const useGetLikelist = () => {
  return useQuery<Like[]>({
    queryKey: ["like"],
    queryFn: getLikeList,
  });
};

export { useGetLikelist };
