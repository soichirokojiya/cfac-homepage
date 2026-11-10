import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SDGsの取り組み | Common Future & Co. 株式会社",
  description:
    "Common Future & Co. 株式会社のSDGs宣言と取り組みです。資金繰りや睡眠などの悩みに役立つ情報を届け、ゴール3「すべての人に健康と福祉を」とゴール8「働きがいも経済成長も」の達成に取り組みます。",
  alternates: { canonical: "/sdgs" },
};

export default function SdgsPage() {
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
            Sustainable Development Goals
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            SDGsの取り組み
          </h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16 md:py-20">
        <div className="text-sm text-[#374151] leading-loose">
          <Block title="私たちのSDGs宣言">
            <p className="border-l-4 border-[#0f172a] pl-5 py-1 text-base text-[#1a1a1a] font-bold leading-loose">
              資金繰りや睡眠の悩みに役立つ情報を分かりやすく届け、事業者や働く人が自分に合った方法を選べる環境づくりを促進することで、心身の健康と働きがいのある雇用を守るという課題の解決に貢献します。
            </p>
            <p>
              当社は「人々の悩みを、ネットサービスで解決する」を掲げ、お金・会社の運営・人間関係・暮らしの悩みに役立つサービスを運営しています。この事業を通じて、SDGs（国連が定めた持続可能な開発目標）のうち次の2つのゴールの達成に取り組みます。
            </p>
            <div className="grid gap-3 sm:grid-cols-2 mt-5">
              <Goal no="3" color="#4c9f38" name="すべての人に健康と福祉を" />
              <Goal no="8" color="#a21942" name="働きがいも経済成長も" />
            </div>
          </Block>

          <Block title="ゴール3　すべての人に健康と福祉を">
            <p>
              眠りの質や心の負担は、仕事にも暮らしにも響きます。体と心の健康を自分で守れるよう、正確な情報と相談先を届けます。
            </p>
            <ul>
              <li>
                睡眠の質を上げる情報サイト
                <a href="https://first90.jp/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">「THE FIRST 90」</a>
                で、眠りの悩みへの対処法を無料で公開します。
              </li>
              <li>
                心の悩みを扱う記事では、厚生労働省の相談窓口と医療機関をあわせて案内します（例：
                <Link href="/column/ningen-kankei" className="underline underline-offset-4">人間関係に疲れたときの心の整理法</Link>
                ）。
              </li>
              <li>
                AIの相談サービスを紹介するときは、AIが医師やカウンセラーの代わりにはならないことを明記します。
              </li>
            </ul>
          </Block>

          <Block title="ゴール8　働きがいも経済成長も">
            <p>
              中小企業の倒産や廃業の多くは、資金繰りの行き詰まりから起こります。事業を続け、そこで働く人の雇用を守れるよう、資金調達や業務の効率化に役立つ情報を届けます。
            </p>
            <ul>
              <li>
                ファクタリング（売掛金を期日前に現金化する方法）の比較サイト
                <a href="https://facutto.jp/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">「ファクット」</a>
                で、各社の手数料や入金までの速さを公式情報にもとづいて比べられるようにします。
              </li>
              <li>
                融資・ファクタリング・ビジネスローンの違いと選び方を、中小企業の目線で解説します（例：
                <Link href="/column/shikin-chotatsu" className="underline underline-offset-4">会社のお金が足りないときの資金調達の選び方</Link>
                ）。
              </li>
              <li>
                人手の少ない会社が、AIやクラウドの道具で働く人の負担を減らせるよう、選び方を伝えます（例：
                <Link href="/column/te-ga-mawaranai" className="underline underline-offset-4">少人数の会社で「手が回らない」を解決する</Link>
                ）。
              </li>
              <li>
                掲載する会社の情報は公式サイトで定期的に確認し、変わっていれば直します。急いでいる事業者が、誤った情報で不利な契約を結ばないようにするためです。
              </li>
            </ul>
          </Block>

          <Block title="取り組みの報告">
            <p>
              この宣言にもとづく取り組みの内容は、1年以内ごとにこのページで報告します。あわせて
              <Link href="/consumer-oriented" className="underline underline-offset-4">消費者志向自主宣言</Link>
              もご覧ください。
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

function Goal({ no, color, name }: { no: string; color: string; name: string }) {
  return (
    <div className="flex items-center gap-3 rounded-md px-4 py-3 text-white" style={{ backgroundColor: color }}>
      <span className="text-3xl font-bold leading-none">{no}</span>
      <span className="text-sm font-bold leading-snug">{name}</span>
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
