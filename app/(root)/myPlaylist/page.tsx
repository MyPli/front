import Card from "@/components/commons/Card";
import Title from "@/components/commons/Title";
import Link from "next/link";
import React from "react";

// const dummy = {
//   link: "",
//   imageUrl: "",
//   title: "",
// };

const dummy = {
  link: "",
  imageUrl:
    "https://i.ytimg.com/vi/jVNyKwF5wL8/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDnsEqKhhEYiP2E0stj3lq9Zj1Qgg",
  title: "[KPOP Playlist] 짧은 케이팝 노동요",
};

const MyPlayList = async () => {
  return (
    <div className="">
      <Title text="내 플레이리스트" />
      {dummy.title === "" ? (
        <div className="flex flex-col justify-start items-center p-4">
          <p className="text-start text-gray-800 text-2xl p-6">
            플레이리스트가 존재하지 않습니다
          </p>
          <p className="text-start text-gray-800 text-5xl underline">
            <Link href="/create">플레이리스트 생성하러 가기</Link>
          </p>
        </div>
      ) : (
        <div className="mt-[25px] grid grid-cols-3 gap-[13px] w-[calc(100%-25px)]">
          {[dummy, dummy, dummy].map((item, i) => (
            <Card key={item.title + i} size="large" {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPlayList;
