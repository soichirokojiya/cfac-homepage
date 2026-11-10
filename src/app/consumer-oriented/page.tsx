import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "消費者志向自主宣言 | Common Future & Co. 株式会社",
  description:
    "Common Future & Co. 株式会社の消費者志向自主宣言です。お金・会社運営・人間関係・暮らしの悩みに役立つサービスで、利用者の声をいかし、正確な情報を届けるための方針を定めています。",
  alternates: { canonical: "/consumer-oriented" },
};

export default function ConsumerOrientedPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-[#0f172a] py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors mb-6"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            トップに戻る
          </Link>
          <p className="text-sm text-gray-400 tracking-[0.2em] uppercase mb-3">
            Consumer-Oriented Declaration
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            消費者志向自主宣言
          </h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16 md:py-20">
        <div className="text-sm text-[#374151] leading-loose">
          <Block title="理念">
            <p>
              当社は「人々の悩みを、ネットサービスで解決する」を掲げています。お金、会社の運営、人間関係、暮らしの悩みに役立つサービスを運営しています。
            </p>
            <p>
              悩みを抱えているときほど、人は急いで決めてしまいがちです。そうしたときでも、正確で偏りのない情報をもとに、自分に合う方法を落ち着いて選べるようにする。それが当社の役目だと考えています。
            </p>
            <p>
              当社はこの考えに基づき、消費者志向経営（消費者の立場に立って事業を運営すること）に取り組むと宣言します。
            </p>
          </Block>

          <Block title="1. みんなの声を聴き、かついかします">
            <ul>
              <li>
                各サービスへのお問い合わせや利用者の声を受けて、サービスの内容と使い勝手を見直します。お問い合わせはメール（info@cfac.co.jp）で受け付けています。
              </li>
              <li>
                比較サイトでは、掲載している会社の公式サイトを定期的に確認し、内容が変わっていれば修正します。修正の記録は公開します（例：
                <a href="https://facutto.jp/companies/updates" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">ファクットの掲載情報の更新履歴</a>
                ）。
              </li>
              <li>
                年配の方も使うサービスでは、文字の大きさや読みやすさに配慮した画面にします。
              </li>
            </ul>
          </Block>

          <Block title="2. 未来・次世代のために取り組みます">
            <ul>
              <li>
                悩み別の
                <Link href="/column" className="underline underline-offset-4">コラム</Link>
                で、お金、会社運営、人間関係の悩みへの対処法を無料で公開します。
              </li>
              <li>
                心の悩みを扱う記事では、公的な相談窓口と医療機関をあわせて案内します。AIの相談サービスを紹介するときは、AIが専門家の代わりにはならないことも明記します（例：
                <Link href="/column/ningen-kankei" className="underline underline-offset-4">人間関係に疲れたときの心の整理法</Link>
                ）。
              </li>
              <li>
                人手の少ない中小企業や個人事業主が、AIやクラウドの道具で負担を減らせるよう、選び方を分かりやすく伝えます（例：
                <Link href="/column/te-ga-mawaranai" className="underline underline-offset-4">少人数の会社で「手が回らない」を解決する</Link>
                ）。
              </li>
              <li>
                空き家や相続した不動産など、扱いに困る物件の相談先が見つかるよう、専門の買取業者の情報をまとめます。
              </li>
            </ul>
          </Block>

          <Block title="3. 法令を守り、コーポレートガバナンスを強化します">
            <ul>
              <li>
                景品表示法（広告の不当な表示を禁じる法律）とステルスマーケティング規制を守ります。広告を含むページには、その旨をはっきり表示します。
              </li>
              <li>
                「No.1」などの表現は、第三者の客観的なデータで裏付けられるときだけ使います。比較は公式情報にもとづき、同じ基準で行います。
              </li>
              <li>
                個人情報は
                <Link href="/privacy" className="underline underline-offset-4">プライバシーポリシー</Link>
                に沿って扱います。
              </li>
              <li>
                反社会的勢力とは一切関係を持ちません。
              </li>
            </ul>
          </Block>

          <Block title="取り組みの報告">
            <p>
              この宣言に基づく取り組みの結果と改善した内容は、1年以内ごとにこのページで報告します。
            </p>
          </Block>

          <div className="mt-14 text-right text-[#1a1a1a]">
            <p>2026年11月10日</p>
            <p>Common Future & Co. 株式会社</p>
            <p>代表取締役　糀屋 総一朗</p>
          </div>
        </div>
      </main>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-lg font-bold text-[#1a1a1a] mb-4">{title}</h2>
      <div className="[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_p]:mb-3">{children}</div>
    </section>
  );
}
