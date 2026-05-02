import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "利用規約 | Common Future & Co. 株式会社",
  description: "Common Future & Co. 株式会社が運営するサービスの利用規約です。",
};

export default function TermsPage() {
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
            Terms of Service
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            利用規約
          </h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16 md:py-20">
        <div className="prose-policy">
          <p className="text-sm text-[#374151] leading-loose mb-10">
            この利用規約（以下「本規約」）は、Common Future & Company
            株式会社（以下「当社」）が運営するウェブサイトおよびサービス（以下「本サービス」）の利用に関する条件を定めるものです。利用者の皆さまには、本規約に同意いただいたうえで本サービスをご利用いただきます。
          </p>

          <Section num={1} title="適用">
            <p>
              本規約は、利用者と当社との間の本サービスの利用に関わる一切の関係に適用されるものとします。当社が本サービス上で掲載する個別規定や追加規定は、本規約の一部を構成するものとします。
            </p>
          </Section>

          <Section num={2} title="利用登録">
            <p>
              本サービスにおいて利用登録が必要な場合、登録希望者が当社の定める方法により利用登録を申請し、当社がこれを承認することにより利用登録が完了するものとします。
            </p>
            <p>
              当社は、以下の場合には利用登録を拒否することがあり、その理由については一切の開示義務を負いません。
            </p>
            <ul>
              <li>虚偽の事項を届け出た場合</li>
              <li>本規約に違反したことがある者からの申請である場合</li>
              <li>その他、当社が利用登録を適当でないと判断した場合</li>
            </ul>
          </Section>

          <Section num={3} title="禁止事項">
            <p>
              利用者は、本サービスの利用にあたり、以下の行為をしてはなりません。
            </p>
            <ul>
              <li>法令または公序良俗に違反する行為</li>
              <li>犯罪行為に関連する行為</li>
              <li>
                当社、他の利用者またはその他の第三者の知的財産権、肖像権、プライバシー、名誉その他の権利または利益を侵害する行為
              </li>
              <li>
                当社のサーバーまたはネットワークの機能を破壊したり、妨害する行為
              </li>
              <li>本サービスの運営を妨害するおそれのある行為</li>
              <li>不正アクセスをし、またはこれを試みる行為</li>
              <li>他の利用者に関する個人情報等を収集または蓄積する行為</li>
              <li>不正な目的を持って本サービスを利用する行為</li>
              <li>
                本サービスの他の利用者またはその他の第三者に不利益、損害、不快感を与える行為
              </li>
              <li>当社のサービスに関連して反社会的勢力に利益を供与する行為</li>
              <li>その他、当社が不適切と判断する行為</li>
            </ul>
          </Section>

          <Section num={4} title="本サービスの提供の停止等">
            <p>
              当社は、以下のいずれかの事由があると判断した場合、利用者に事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
            </p>
            <ul>
              <li>
                本サービスにかかるシステムの保守点検または更新を行う場合
              </li>
              <li>
                地震、落雷、火災、停電または天災などの不可抗力により本サービスの提供が困難となった場合
              </li>
              <li>
                その他、当社が本サービスの提供が困難と判断した場合
              </li>
            </ul>
            <p>
              当社は、本サービスの提供の停止または中断により、利用者または第三者が被ったいかなる不利益または損害についても、一切の責任を負わないものとします。
            </p>
          </Section>

          <Section num={5} title="著作権">
            <p>
              本サービスに掲載されている文章、画像、デザイン、ロゴ、プログラムその他一切のコンテンツに関する著作権は、当社または正当な権利を有する第三者に帰属します。利用者は、当社の事前の書面による許可なく、これらを複製、転載、改変、配布、販売その他二次的に利用してはなりません。
            </p>
          </Section>

          <Section num={6} title="免責事項">
            <p>
              当社は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます）がないことを明示的にも黙示的にも保証しておりません。
            </p>
            <p>
              当社は、本サービスに起因して利用者に生じたあらゆる損害について、当社の故意または重過失による場合を除き、一切の責任を負いません。
            </p>
          </Section>

          <Section num={7} title="サービス内容の変更等">
            <p>
              当社は、利用者への事前の告知をもって、本サービスの内容を変更、追加または廃止することがあり、利用者はこれを承諾するものとします。
            </p>
          </Section>

          <Section num={8} title="利用規約の変更">
            <p>
              当社は、必要と判断した場合には、利用者の個別の同意を要せず、本規約を変更することができるものとします。変更後の利用規約は、本ページに掲載した時点から効力を生じるものとし、利用者が変更後に本サービスを利用した場合、変更後の規約に同意したものとみなします。
            </p>
          </Section>

          <Section num={9} title="個人情報の取り扱い">
            <p>
              当社は、本サービスの利用によって取得する個人情報については、当社「
              <Link
                href="/privacy"
                className="text-blue-600 hover:underline"
              >
                プライバシーポリシー
              </Link>
              」に従い適切に取り扱うものとします。
            </p>
          </Section>

          <Section num={10} title="準拠法・裁判管轄">
            <p>本規約の解釈にあたっては、日本法を準拠法とします。</p>
            <p>
              本サービスに関して紛争が生じた場合には、横浜地方裁判所を第一審の専属的合意管轄裁判所とします。
            </p>
          </Section>

          <Section num={11} title="お問い合わせ先">
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
