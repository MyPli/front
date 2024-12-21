"use server";

import { getLikeList } from "@/action/like";
import { getAccessToken } from "@/action/login";
import Card from "@/components/commons/Card";
import NoData from "@/components/commons/NoData";
import Title from "@/components/commons/Title";
import React from "react";

const Likelist = async () => {
  const session = await getAccessToken();
  const res = await getLikeList();

  return (
    <div>
      <Title text="내 좋아요 리스트" />
      {session && res.length > 0 ? (
        <div className="mt-[25px]  grid grid-cols-6 gap-[21px] w-[calc(100%-25px)]">
          {res.map((item) => (
            <Card key={item.id} size="small" {...item} />
          ))}
        </div>
      ) : (
        <NoData sentence="내 좋아요 리스트가 존재하지 않습니다" />
      )}
    </div>
  );
};

export default Likelist;
