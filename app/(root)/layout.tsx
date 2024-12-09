import GnbList from "@/components/layout/gnb/GnbList";
import SideList from "@/components/layout/sidebar/SideList";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-black text-white w-full min-h-screen">
      <GnbList />
      <SideList />
      <main className="ml-sideOpen flex-1 pt-mainTop pl-mainLeft pr-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
