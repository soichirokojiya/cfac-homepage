import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー | Common Future & Co. 株式会社",
  description:
    "Common Future & Co. 株式会社のプライバシーポリシー（個人情報保護方針）です。",
};

export default function PrivacyPage() {
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
            Privacy Policy
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            プライバシーポリシー
          </h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16 md:py-20">
        <div className="prose-policy">
          <p className="text-sm text-[#374151] leading-loose mb-10">
            Common Future & Company
            株式会社（以下「当社」）は、当社が運営するウェブサイトおよびサービス（以下「本サービス」）における利用者の個人情報の取り扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」）を定めます。
          </p>

          <Section num={1} title="個人情報の定義">
            <p>
              本ポリシーにおいて「個人情報」とは、個人情報保護法に定める個人情報を指し、生存する個人に関する情報であって、氏名、生年月日、住所、電話番号、メールアドレスその他の記述等により特定の個人を識別できるもの、および個人識別符号が含まれるものを指します。
            </p>
          </Section>

          <Section num={2} title="個人情報の収集方法">
            <p>当社は、以下の方法により個人情報を取得することがあります。</p>
            <ul>
              <li>お問い合わせフォームからのご連絡</li>
              <li>本サービスへのアカウント登録</li>
              <li>メールマガジンの購読登録</li>
              <li>
                Cookie等の技術を用いた自動的な情報取得（アクセスログ、IPアドレス、ブラウザ情報等）
              </li>
              <li>外部サービスとの連携による情報取得</li>
            </ul>
          </Section>

          <Section num={3} title="個人情報の利用目的">
            <p>当社は、取得した個人情報を以下の目的で利用します。</p>
            <ul>
              <li>本サービスの提供・運営・改善</li>
              <li>お問い合わせへの対応</li>
              <li>利用規約に違反する行為への対応</li>
              <li>
                本サービスに関する新機能、更新情報、キャンペーン等のご案内
              </li>
              <li>
                利用状況の分析およびサービス品質の向上を目的とした統計データの作成
              </li>
              <li>その他、上記利用目的に付随する目的</li>
            </ul>
          </Section>

          <Section num={4} title="個人情報の第三者提供">
            <p>
              当社は、以下の場合を除き、利用者の同意を得ることなく第三者に個人情報を提供することはありません。
            </p>
            <ul>
              <li>法令に基づく場合</li>
              <li>
                人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき
              </li>
              <li>
                公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき
              </li>
              <li>
                国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき
              </li>
            </ul>
          </Section>

          <Section num={5} title="個人情報の安全管理">
            <p>
              当社は、個人情報の漏えい、滅失またはき損を防止するため、適切なセキュリティ対策を実施し、個人情報の安全管理に努めます。
            </p>
          </Section>

          <Section num={6} title="Cookieの使用について">
            <p>
              本サービスでは、利便性の向上およびアクセス状況の把握を目的としてCookieを使用する場合があります。Cookieは利用者のブラウザ設定により無効にすることが可能ですが、一部のサービスが正常に機能しなくなる場合があります。
            </p>
          </Section>

          <Section num={7} title="アクセス解析ツールの使用">
            <p>
              本サービスでは、Googleアナリティクス等のアクセス解析ツールを使用する場合があります。これらのツールはCookieを使用してデータを収集しますが、個人を特定する情報は含まれません。データ収集の仕組みについては各サービスのプライバシーポリシーをご確認ください。
            </p>
          </Section>

          <Section num={8} title="個人情報の開示・訂正・削除">
            <p>
              利用者は、当社に対して個人情報の開示、訂正、追加、削除、利用停止または消去を請求することができます。ご本人確認の上、合理的な期間内に対応いたします。ご請求は下記のお問い合わせ先までご連絡ください。
            </p>
          </Section>

          <Section num={9} title="本ポリシーの変更">
            <p>
              当社は、法令の改正やサービス内容の変更等に伴い、本ポリシーを変更する場合があります。変更後のプライバシーポリシーは、本ページに掲載した時点から効力を生じるものとします。
            </p>
          </Section>

          <Section num={10} title="お問い合わせ先">
            <div className="bg-[#f8f9fa] rounded-lg p-6">
              <p className="font-medium text-[#1a1a1a] mb-2">
                Common Future & Company 株式会社
              </p>
              <p>所在地：神奈川県逗子市小坪6-6-46</p>
              <p>
                メール：
                <a
                  href="mailto:info@cfac.co.jp"
                  className="text-blue-600 hover:underline"
                >
                  info@cfac.co.jp
                </a>
              </p>
              <p>
                企業サイト：
                <a
                  href="https://cfac.co.jp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  cfac.co.jp
                </a>
              </p>
            </div>
          </Section>

          <p className="text-sm text-[#9ca3af] mt-12 text-right">
            制定日：2026年4月13日
          </p>
        </div>
      </main>
    </div>
  );
}

function Section({
  num,
  title,
  children,
}: {
  num: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="text-lg font-bold text-[#1a1a1a] mb-4">
        第{num}条（{title}）
      </h2>
      <div className="text-sm text-[#374151] leading-loose [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mt-2 [&_ul]:space-y-1 [&_p]:mb-2">
        {children}
      </div>
    </section>
  );
}
