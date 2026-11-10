import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "消費者志向自主宣言 | Common Future & Co. 株式会社",
  description:
    "Common Future & Co. 株式会社の消費者志向自主宣言です。ファクットなど当社が運営するサービスで、利用者の声をいかし、正確な情報を届けるための方針を定めています。",
  alternates: { canonical: "/consumer-oriented" },
};

const FACUTTO = "https://facutto.jp";

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
              当社は「人々の悩みを、ネットサービスで解決する」を掲げ、お金や会社運営、人間関係の悩みに役立つサービスを運営しています。
            </p>
            <p>
              資金繰りに困っているときほど、人は急いで決めてしまいがちです。そうしたときでも、正確で偏りのない情報をもとに選べるようにすることが、当社の役目だと考えています。
            </p>
            <p>
              当社はこの考えに基づき、消費者志向経営（消費者の立場に立って事業を運営すること）に取り組むと宣言します。
            </p>
          </Block>

          <Block title="1. みんなの声を聴き、かついかします">
            <ul>
              <li>
                ファクタリング比較サイト「
                <a href={FACUTTO} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">ファクット</a>
                」では、利用者の口コミやお問い合わせ、掲載会社からの連絡を受けて、掲載内容を見直します。
              </li>
              <li>
                掲載会社の公式サイトを定期的に確認し、手数料や入金スピードなどが変わっていれば修正します。修正や掲載終了の記録は「
                <a href={`${FACUTTO}/companies/updates`} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">掲載情報の更新履歴</a>
                」で公開します。
              </li>
              <li>
                お問い合わせはメール（info@cfac.co.jp）で受け付け、いただいた声はサービスの改善に使います。
              </li>
            </ul>
          </Block>

          <Block title="2. 未来・次世代のために取り組みます">
            <ul>
              <li>
                中小企業や個人事業主が、悪質な業者や不利な契約で損をしないよう、注意点を分かりやすく伝えます。例として「
                <a href={`${FACUTTO}/column/factoring-akushitsu-switch`} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">悪質ファクタリング業者からの乗り換え方</a>
                」の記事を公開しています。
              </li>
              <li>
                ファクタリング手数料の相場を毎月まとめた「
                <a href={`${FACUTTO}/fee-index`} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">ファクタリング手数料指数</a>
                」を公開し、適正な手数料を判断できる材料を届けます。
              </li>
              <li>
                融資やビジネスローンなど、ファクタリング以外の資金調達の方法もあわせて紹介し、利用者が自分に合う方法を選べるようにします。
              </li>
            </ul>
          </Block>

          <Block title="3. 法令を守り、コーポレートガバナンスを強化します">
            <ul>
              <li>
                景品表示法（広告の不当な表示を禁じる法律）や、ステルスマーケティング規制を守ります。広告を含むページには、その旨をはっきり表示します。
              </li>
              <li>
                「No.1」などの表現は、第三者の客観的なデータで裏付けられるときだけ使います。
              </li>
              <li>
                掲載の基準やランキングの決め方は「
                <a href={`${FACUTTO}/about/listing-policy`} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">比較基準・掲載審査ポリシー</a>
                」「
                <a href={`${FACUTTO}/about/ranking-method`} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">ランキング基準・スコアリング方式</a>
                」で公開します。
              </li>
              <li>
                個人情報は
                <Link href="/privacy" className="underline underline-offset-4">プライバシーポリシー</Link>
                に沿って扱い、反社会的勢力とは一切関係を持ちません。
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
