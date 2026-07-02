import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Common Future & Company 株式会社",
  description:
    "Common Future & Company 株式会社は、AIプロダクトの開発・運営を行う会社です。CASH NOW・ファクットなどを開発・運営しています。",
  openGraph: {
    title: "Common Future & Company 株式会社",
    description:
      "AIプロダクトの開発・運営を行う会社です。CASH NOW・ファクットなどを開発・運営しています。",
    url: "https://cfac.co.jp",
    siteName: "Common Future & Company 株式会社",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "https://cfac.co.jp/og-image.png",
        width: 1200,
        height: 630,
        alt: "Common Future & Company 株式会社",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Common Future & Company 株式会社",
    description:
      "AIプロダクトの開発・運営を行う会社です。CASH NOW・ファクットなどを開発・運営しています。",
    images: ["https://cfac.co.jp/og-image.png"],
  },
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
