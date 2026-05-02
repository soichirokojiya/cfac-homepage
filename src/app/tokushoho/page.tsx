import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記 | Common Future & Co. 株式会社",
  description:
    "Common Future & Co. 株式会社の特定商取引法に基づく表記です。",
};

export default function TokushohoPage() {
  const items = [
    { label: "販売事業者", value: "Common Future & Company 株式会社" },
    { label: "運営責任者", value: "代表取締役 糀屋 総一朗" },
    { label: "所在地", value: "神奈川県逗子市小坪6-6-46" },
    { label: "電話番号", value: "お問い合わせはメールにてお願いいたします" },
    {
      label: "メールアドレス",
      value: "info@cfac.co.jp",
      href: "mailto:info@cfac.co.jp",
    },
    {
      label: "企業サイト",
      value: "cfac.co.jp",
      href: "https://cfac.co.jp",
      external: true,
    },
    {
      label: "販売価格",
      value:
        "各サービスの利用料金は、当該サービスのウェブサイト上に表示した価格に準じます。",
    },
    {
      label: "販売価格以外の必要料金",
      value:
        "インターネット接続にかかる通信料、振込手数料等はお客様のご負担となります。",
    },
    {
      label: "支払方法",
      value: "クレジットカード決済、銀行振込、その他各サービスで定める方法",
    },
    {
      label: "支払時期",
      value: "各サービスの定めに従います。",
    },
    {
      label: "サービスの提供時期",
      value:
        "お申し込み手続き完了後、各サービスの定めに従い速やかに提供いたします。",
    },
    {
      label: "返品・キャンセル",
      value:
        "デジタルサービスの性質上、サービス提供開始後の返品・返金は原則としてお受けしておりません。ただし、各サービスの個別規定に定めがある場合はそれに従います。",
    },
    {
      label: "動作環境",
      value:
        "最新版のGoogle Chrome、Safari、Firefox、Microsoft Edgeを推奨しています。一部のブラウザや旧バージョンでは正常に動作しない場合があります。",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-[#0f172a] py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors mb-6"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            トップに戻る
          </Link>
          <p className="text-sm text-gray-400 tracking-[0.2em] uppercase mb-3">
            Specified Commercial Transactions Act
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            特定商取引法に基づく表記
          </h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16 md:py-20">
        <div className="bg-[#f8f9fa] rounded-xl overflow-hidden">
          {items.map((item, i) => (
            <div
              key={i}
              className={`flex flex-col md:flex-row ${
                i !== items.length - 1 ? "border-b border-gray-200" : ""
              }`}
            >
              <div className="md:w-56 px-8 py-5 bg-[#f1f3f5] font-medium text-sm text-[#374151] shrink-0">
                {item.label}
              </div>
              <div className="flex-1 px-8 py-5 text-sm text-[#374151] leading-relaxed">
                {"href" in item && item.href ? (
                  <a
                    href={item.href}
                    target={
                      "external" in item && item.external
                        ? "_blank"
                        : undefined
                    }
                    rel={
                      "external" in item && item.external
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="text-blue-600 hover:underline"
                  >
                    {item.value}
                  </a>
                ) : (
                  item.value
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-[#9ca3af] mt-12 text-right">
          制定日：2026年4月13日
        </p>
      </main>
    </div>
  );
}
