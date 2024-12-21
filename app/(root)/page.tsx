'use client'

import Card from '@/components/commons/Card';
import Title from '@/components/commons/Title';
import { usePlaylistState } from '@/hooks/usePlaylistState';
import React from 'react';

const Home = () => {
  const { latests, populars } = usePlaylistState();
  
	return (
    <div className="w-[calc(100vw-110px)]">
      <Title text="인기 플레이리스트" />
      {populars && populars.length > 0 ? (
        <div className="mt-[25px] grid grid-cols-3 gap-[13px] w-[calc(100%-25px)]">
          {populars?.map((item, i) => (
            <Card key={item.title + i} size="large" {...item} />
          ))}
        </div>
      ) : (
        <div className="mt-[25px] grid grid-cols-3 gap-[13px] w-[calc(100%-25px)]">
          Loading...
        </div>
      )}
      <div className="mt-20 pb-10">
        <Title text="오늘의 최신 플레이리스트" className="font-normal" />
        {latests && latests.length > 0 ? (
          <div className="mt-[25px] grid grid-cols-6 gap-[21px] w-[calc(100%-25px)]">
            {latests?.map((item, i) => (
              <Card key={item.title + i} size="small" {...item} />
            ))}
          </div>
        ) : (
          <div className="mt-[25px] grid grid-cols-3 gap-[13px] w-[calc(100%-25px)]">
            Loading...
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
