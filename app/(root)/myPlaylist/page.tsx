import { getAccessToken } from "@/action/login";
import { getMyPlaylists } from "@/action/playlist";
import Card from "@/components/commons/Card";
import NoData from "@/components/commons/NoData";
import Title from "@/components/commons/Title";
import { MyPlaylist } from '@/models/playlist.model';
import React from "react";

const MyPlayList = async () => {
  const session = await getAccessToken();
  const res = await getMyPlaylists();

  return (
    <div>
      <Title text="내 플레이리스트" />
      {session && res.length > 0 ? (
        <div className="mt-[25px]  grid grid-cols-6 gap-[21px] w-[calc(100%-25px)]">
          {res.map((item: MyPlaylist) => (
            <Card key={item.id} size="small" {...item} />
          ))}
        </div>
      ) : (
        <NoData sentence="내 플레이리스트가 존재하지 않습니다" />
      )}
    </div>
  );
};

export default MyPlayList;
