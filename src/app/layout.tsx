import type { Metadata } from "next";
import { Noto_Sans_JP, Poppins, Oswald } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const poppins = Poppins({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const oswald = Oswald({
  variable: "--font-condensed",
  subsets: ["latin"],
  weight: ["500"],
});

export const metadata: Metadata = {
  title: "Common Future & Company 株式会社",
  description:
    "Common Future & Company 株式会社は、AIプロダクトの開発・運営を行う会社です。ファクット・ソーラーディールサーチなどを開発・運営しています。",
  openGraph: {
    title: "Common Future & Company 株式会社",
    description:
      "AIプロダクトの開発・運営を行う会社です。ファクット・ソーラーディールサーチなどを開発・運営しています。",
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
      "AIプロダクトの開発・運営を行う会社です。ファクット・ソーラーディールサーチなどを開発・運営しています。",
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
    <html lang="ja" className={`${notoSansJP.variable} ${poppins.variable} ${oswald.variable} antialiased`}>
      <body>
        {/* 2026-11-06: 運営会社の組織情報 (法人番号つき)。facutto.jp・cash.co.jp と同じ @id で、運営する2サービスを結ぶ */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"Organization","@id":"https://www.cfac.co.jp/#organization","name":"Common Future & Co.株式会社","legalName":"Common Future & Co.株式会社","alternateName":"コモンフューチャーアンドカンパニー","url":"https://www.cfac.co.jp/","foundingDate":"2015","email":"info@cfac.co.jp","identifier":{"@type":"PropertyValue","propertyID":"法人番号","value":"9011001105902"},"address":{"@type":"PostalAddress","addressCountry":"JP","addressRegion":"神奈川県","addressLocality":"逗子市","streetAddress":"小坪6-6-46"},"sameAs":["https://info.gbiz.go.jp/hojin/ichiran?hojinBango=9011001105902"],"knowsAbout":["ファクタリング","売掛債権の買取","資金調達"],"subOrganization":[{"@type":"Organization","name":"CASH NOW","url":"https://cash.co.jp/","description":"ファクタリングサービス"},{"@type":"Organization","@id":"https://facutto.jp/#organization","name":"ファクット","url":"https://facutto.jp/","description":"ファクタリング会社の比較メディア"}]}) }} />
        {children}
      </body>
    </html>
  );
}
