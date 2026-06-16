import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Common Future & Company 株式会社 | 人が、もっと人間らしいことに向かえる社会へ。",
  description:
    "面倒な仕事を減らし、伝わらないすれ違いをやわらげる。AIの力で、人の時間と余白を取り戻すプロダクトをつくっています。MUSU・うめこ・CASH NOW・ファクットなどを開発・運営。",
  openGraph: {
    title: "Common Future & Company 株式会社 | 人が、もっと人間らしいことに向かえる社会へ。",
    description:
      "面倒な仕事を減らし、伝わらないすれ違いをやわらげる。AIの力で、人の時間と余白を取り戻すプロダクトをつくっています。",
    url: "https://cfac.co.jp",
    siteName: "Common Future & Company 株式会社",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "https://cfac.co.jp/og-image.png",
        width: 1200,
        height: 630,
        alt: "Common Future & Company — 人が、もっと人間らしいことに向かえる社会へ。",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Common Future & Company 株式会社 | 人が、もっと人間らしいことに向かえる社会へ。",
    description:
      "面倒な仕事を減らし、伝わらないすれ違いをやわらげる。AIの力で、人の時間と余白を取り戻すプロダクトをつくっています。",
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
