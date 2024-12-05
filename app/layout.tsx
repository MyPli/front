import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const roboto = localFont({
  src: [
    {
      path: "./fonts/Roboto-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/Roboto-Bold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Roboto-Medium.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Roboto-Regular.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Roboto-Thin.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/Roboto-Light.ttf",
      weight: "100",
      style: "normal",
    },
  ],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "MyPli",
  description: "플레이리스트를 공유하다",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>{children}</body>
    </html>
  );
}
