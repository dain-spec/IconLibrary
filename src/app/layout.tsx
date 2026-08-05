import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Icon Library",
  description: "아이콘 라이브러리",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
