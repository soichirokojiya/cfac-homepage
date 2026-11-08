/* コラム: 「悩み」を軸に領域ごとに書き、関係サイトへつなぐ (2026-11-08 開始) */

export type ColumnCategory = {
  key: string;
  en: string;
  ja: string;
  note: string;
};

export const COLUMN_CATEGORIES: ColumnCategory[] = [
  { key: "money", en: "Money", ja: "お金の悩み", note: "資金繰り・融資・ファクタリング" },
  { key: "relationships", en: "Relationships", ja: "人間関係の悩み", note: "職場・家族・心の整理" },
  { key: "organization", en: "Organization", ja: "会社組織運営の悩み", note: "人手・道具・仕組みづくり" },
];

export type Column = {
  slug: string;
  category: string;
  title: string;
  description: string;
  date: string; // YYYY.MM.DD
};

export const COLUMNS: Column[] = [
  // 新しい記事を先頭に足す(TOPには先頭5件)
  {
    slug: "ningen-kankei",
    category: "relationships",
    title: "人間関係に疲れたときの心の整理法｜ひとりで抱え込まないための考え方と相談先",
    description:
      "職場や家族、友人との人間関係に疲れたときに、気持ちを書き出して整理する方法、変えられることと変えられないことの分け方、距離のとり方、話を聞いてもらえる場所と公的な相談先をまとめます。",
    date: "2026.11.08",
  },
  {
    slug: "te-ga-mawaranai",
    category: "organization",
    title: "少人数の会社で「手が回らない」を解決する｜電話・経理・勤怠をAIとクラウドで減らす方法",
    description:
      "電話番で作業が止まる、請求書や経費精算が月末に溜まる、勤怠の集計が大変。少人数の会社や組織でよくある悩みごとに、電話代行・AI電話、会計ソフト、勤怠管理などのAI・クラウドサービスで仕事を減らす方法を整理します。",
    date: "2026.11.08",
  },
  {
    slug: "shikin-chotatsu",
    category: "money",
    title: "会社のお金が足りないときの資金調達｜融資・ファクタリング・ビジネスローンの選び方",
    description:
      "「今月の支払いが足りない」「売上の入金が先で手元にお金がない」。会社や個人事業のお金の悩みを解決する手段として、公庫融資・保証付き融資・銀行融資・ファクタリング・ビジネスローンの違いと、場面ごとの選び方を解説します。",
    date: "2026.11.08",
  },
];

export const SITE_URL = "https://cfac.co.jp";

export const categoryOf = (key: string) => COLUMN_CATEGORIES.find((c) => c.key === key)!;
