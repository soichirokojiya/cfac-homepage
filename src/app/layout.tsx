import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Common Future & Company 株式会社 | AIを基盤としたサービス開発・運営",
  description:
    "Common Future & Company株式会社は、AIを基盤としたネットサービスの開発・運営を行う企業です。ファクタリング比較サイト「フォクナビ」やAI監視型トレンド発掘サービス「Global Trend Watch」を運営しています。",
  icons: {
    icon: "/favicon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" style={{ fontFamily: "var(--font-noto-sans-jp), sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
