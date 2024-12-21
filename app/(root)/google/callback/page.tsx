"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const GoogleCallback = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      // 로그인 후 프론트엔드에서 받아오는 요청
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google/callback`,
        {
          method: "GET",
          credentials: "include", // 쿠키를 포함해서 요청
        },
      );

      if (res.ok) {
        const data = await res.json();
        console.log(data);
      } else {
        // 로그인 실패시 처리
        alert("실패 ㅠㅠ");
      }
    };

    fetchUserData();
  }, [router]);

  if (!user) return <div>Loading...</div>;

  return <div>로그인</div>;
};

export default GoogleCallback;
