// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import GlobalApiStatus from "./components/GlobalApiStatus";

export const metadata: Metadata = {
  title: "Payment Dashboard",
  description: "Allphaze payment dashboard assignment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" data-theme="corporate">
      <body>
        {/* 전역 로딩/에러 UI */}
        <GlobalApiStatus />

        {/* 실제 페이지들 */}
        {children}
      </body>
    </html>
  );
}
