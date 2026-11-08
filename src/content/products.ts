/* 運営サービス(TOP・コラム・フッターで共用) */

export type Product = {
  key: string;
  logo: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  /** このサービスで解決する悩み(使う人の言葉で) */
  problem: string;
  url: string;
  domain: string;
  anchor: string;
  badge?: string;
};

export const PRODUCTS: Product[] = [
  {
    key: "facutto",
    problem: "「どのファクタリング会社に頼めばいいのか分からない」",
    logo: "/logos/facutto.svg",
    title: "ファクット",
    category: "Comparison Media",
    subtitle: "日本最大級のファクタリング比較・口コミサイト",
    description: "最適なファクタリング会社を簡単に比較・検討できるプラットフォームです。",
    url: "https://facutto.jp",
    domain: "facutto.jp",
    anchor: "ファクタリング会社の比較サイト「ファクット」",
  },
  {
    // 2026-10-24 ユーザー指示: 運営サービスに CASH NOW を追加 (2026-11-05 稼働中につきメンテナンス表記を削除)
    key: "cashnow",
    problem: "「入金は先なのに、今月の支払いが間に合わない」",
    logo: "/logos/cashnow.png",
    title: "CASH NOW",
    category: "Fintech Service",
    subtitle: "法人・個人事業主向けのファクタリングサービス",
    description:
      "請求書（売掛金）を買い取り、入金前の資金化を支援するサービスです。お申し込みはWebで受け付け、担当者が審査します。最短即日で資金化できます。",
    url: "https://cash.co.jp/",
    domain: "cash.co.jp",
    anchor: "ファクタリングサービス「CASH NOW」",
  },
  {
    key: "waketto",
    problem: "「訳ありの家や土地が、どこにも買い取ってもらえない」",
    logo: "/logos/waketto.svg",
    title: "ワケット",
    category: "Comparison Media",
    subtitle: "訳あり不動産の買取業者 比較サイト",
    description:
      "空き家・事故物件・再建築不可・共有持分・借地権・底地など、一般の不動産会社が扱えない物件を実際に買い取っている専門業者を、物件の事情から絞り込めます。",
    url: "https://waketto.jp",
    domain: "waketto.jp",
    anchor: "訳あり不動産の買取業者比較サイト「ワケット」",
  },
  {
    // 2026-11-08 ユーザー指示: ビズピタ(bizpita.com、運営 Common Future & Co.)を運営サービスに追加
    key: "bizpita",
    problem: "「電話番や事務作業に手が回らない。でも、どのツールを選べばいいか分からない」",
    logo: "/logos/bizpita.png",
    title: "ビズピタ",
    category: "Comparison Media",
    subtitle: "中小企業向けAI・SaaS 比較サイト",
    description:
      "電話代行・AI電話、クラウドPBX、バーチャルオフィス、会計ソフト、勤怠管理など、中小企業・個人事業主向けのAI・SaaSを、公式情報にもとづく同じ基準で比較できます。",
    url: "https://bizpita.com/",
    domain: "bizpita.com",
    anchor: "中小企業向けAI・SaaS比較サイト「ビズピタ」",
  },
  {
    key: "sds",
    problem: "「太陽光発電所の相場や売買の実態が見えない」",
    logo: "/logos/sds.png",
    title: "ソーラーディールサーチ",
    category: "Data Platform",
    subtitle: "太陽光発電所の取引事例データベース",
    description:
      "全国の事業用太陽光発電所を無料で検索できます。あわせて、公表データを2019年から突き合わせた売買の履歴を、月次レポートと元データで提供しています。",
    url: "https://sds.tokyo/",
    domain: "sds.tokyo",
    anchor: "太陽光発電所の検索と取引データベース「ソーラーディールサーチ」",
  },
  {
    key: "secutto",
    problem: "「何から対策すればいいのか、誰に相談すればいいのか分からない」",
    logo: "/logos/secutto.png",
    title: "セキュット",
    category: "Comparison Media",
    subtitle: "セキュリティ会社の比較・相談サイト",
    description: "中小企業向けのセキュリティ対策サービスや専門会社を、目的や予算から比較・相談できます。",
    url: "https://secutto.com/",
    domain: "secutto.com",
    anchor: "セキュリティ会社の比較・相談「セキュット」",
  },
  {
    key: "first90",
    problem: "「眠っても疲れが取れない。何を信じればいいか分からない」",
    logo: "/logos/first90.svg",
    title: "THE FIRST 90",
    category: "Editorial Media",
    subtitle: "睡眠の質を上げる情報サイト",
    description:
      "睡眠の質を上げる方法を、海外の研究データをもとに解説。深い睡眠、理想の睡眠時間、睡眠リズム、睡眠グッズの選び方までまとめています。",
    url: "https://first90.jp/",
    domain: "first90.jp",
    anchor: "睡眠の質を上げる情報サイト「THE FIRST 90」",
  },
  {
    // 2026-11-05 ユーザー指示: じーざすAI(jesusai.jp)を運営サービスに追加
    key: "jesusai",
    problem: "「誰にも言えない悩みを、気軽に聞いてほしい」",
    logo: "/logos/jesusai.png",
    title: "じーざすAI",
    category: "AI Service",
    subtitle: "LINEで相談できるキリストAI",
    description:
      "コテコテ大阪弁のじーざすが、LINEで心の悩みに聖書の言葉で答えるお悩み相談サービスです。無料相談は1日2回までです。",
    url: "https://jesusai.jp/",
    domain: "jesusai.jp",
    anchor: "LINEで相談できるキリストAI「じーざすAI」",
  },
  {
    // 2026-11-05 ユーザー指示: タロットノア(tarot-noa.jp、運営 Common Future & Co.)を追加
    key: "tarot-noa",
    problem: "「気持ちが絡まって、自分でも整理できない」",
    logo: "/logos/tarot-noa.svg",
    title: "タロットノア",
    category: "AI Service",
    subtitle: "気持ちを整理するAIタロット",
    description:
      "78枚のカードから自分で選び、いまの気持ちを静かな言葉で読み解きます。未来を言い当てるのではなく、絡まった心をほどくための時間をつくるサービスです。",
    url: "https://tarot-noa.jp/",
    domain: "tarot-noa.jp",
    anchor: "気持ちを整理するAIタロット「タロットノア」",
  },
];

export const COLORS = ["#1f3dff", "#ff4b12", "#00c35a", "#e2ff1c", "#ff8ad2", "#6fd1ff", "#ffc21a", "#9b6bff"];
export const COLOR_BY_KEY: Record<string, string> = Object.fromEntries(PRODUCTS.map((p, i) => [p.key, COLORS[i % COLORS.length]]));
