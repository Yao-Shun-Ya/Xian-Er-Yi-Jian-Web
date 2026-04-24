import type { Metadata } from "next";
import localFont from "next/font/local"; // 💡 切换为本地字体模块
import "./globals.css";

// 1. 定义本地字体，路径必须指向你刚才下载好的文件
const geistSans = localFont({
  src: "./fonts/Geist-Regular.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMono-Regular.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "腺而易见 (XianErYiJian)",
  description: "基于亚像素级 U-Net 的睑板腺 (MGD) 影像全自动定量分析平台",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#020617] text-slate-300`}
      >
        {children}
      </body>
    </html>
  );
}