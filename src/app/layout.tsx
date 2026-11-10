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
  title: "Common Future & Co. 株式会社",
  description:
    "Common Future & Co. 株式会社は、人間関係・お金・会社組織運営などの悩みをネットサービスで解決する会社です。ファクタリング比較のファクット、訳あり不動産のワケット、中小企業向けAI・SaaS比較のビズピタなどを開発・運営しています。",
  openGraph: {
    title: "Common Future & Co. 株式会社",
    description:
      "人間関係・お金・会社組織運営などの悩みをネットサービスで解決する会社です。ファクット・ワケット・ビズピタなどを開発・運営しています。",
    url: "https://cfac.co.jp",
    siteName: "Common Future & Co. 株式会社",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "https://cfac.co.jp/og-image.png",
        width: 1200,
        height: 630,
        alt: "Common Future & Co. 株式会社",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Common Future & Co. 株式会社",
    description:
      "人間関係・お金・会社組織運営などの悩みをネットサービスで解決する会社です。ファクット・ワケット・ビズピタなどを開発・運営しています。",
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
        {/* 2026-11-06: 運営会社の組織情報 (法人番号つき)。facutto.jp・cash.co.jp・bizpita.com(11/08追加) と同じ @id で運営サービスを結ぶ */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"Organization","@id":"https://www.cfac.co.jp/#organization","name":"Common Future & Co.株式会社","legalName":"Common Future & Co.株式会社","alternateName":"コモンフューチャーアンドカンパニー","slogan":"人々の悩みを、ネットサービスで解決する","description":"人間関係・お金・会社組織運営などの悩みをネットサービスで解決することを主眼に、比較サイト・データベース・AIサービスを開発・運営する会社です。","url":"https://www.cfac.co.jp/","foundingDate":"2015","email":"info@cfac.co.jp","identifier":{"@type":"PropertyValue","propertyID":"法人番号","value":"9011001105902"},"address":{"@type":"PostalAddress","addressCountry":"JP","addressRegion":"神奈川県","addressLocality":"逗子市","streetAddress":"小坪6-6-46"},"sameAs":["https://info.gbiz.go.jp/hojin/ichiran?hojinBango=9011001105902"],"knowsAbout":["ファクタリング","売掛債権の買取","資金調達"],"subOrganization":[{"@type":"Organization","name":"CASH NOW","url":"https://cash.co.jp/","description":"ファクタリングサービス"},{"@type":"Organization","@id":"https://facutto.jp/#organization","name":"ファクット","url":"https://facutto.jp/","description":"ファクタリング会社の比較メディア"},{"@type":"Organization","@id":"https://bizpita.com/#organization","name":"ビズピタ","url":"https://bizpita.com/","description":"中小企業向けAI・SaaSの比較メディア"}]}) }} />
        {children}
      </body>
    </html>
  );
}
