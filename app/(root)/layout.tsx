'use client'

import GnbList from "@/components/layout/gnb/GnbList";
import SideList from "@/components/layout/sidebar/SideList";
import SoundPlayer from '@/components/player/SoundPlayer';
import { useControlPlayingStore } from '@/store/playStore';
import { usePathname } from 'next/navigation';
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const avoidPages = ['/create', '/edit']
  const { currentPlaylist } = useControlPlayingStore();

  return (
    <div className="bg-black text-white w-full min-h-screen">
      <GnbList />
      <SideList />
      <main className="ml-sideOpen flex-1 pt-mainTop pl-mainLeft pr-8">
        {children}
      </main>
      {currentPlaylist.length > 0 && !avoidPages.includes(pathname) && <SoundPlayer />}
    </div>
  );
};

export default Layout;
