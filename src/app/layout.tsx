import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Common Future & Company 株式会社 | ひとりの可能性を、解放する。",
  description:
    "ソロプレナー・フリーランス・個人事業主の「ひとりの限界」をAIとテクノロジーで解放する。CASH NOW、MUSU、ファクナビ、ClaudeCode.Tokyo、Global Trend Watchを運営。",
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
