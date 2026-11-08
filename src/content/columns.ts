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
