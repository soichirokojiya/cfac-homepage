import type { Metadata } from "next";
import Image from "next/image";
import { Header, SiteFooter, Label } from "../chrome";
import { COLUMNS, COLUMN_CATEGORIES, SITE_URL, eyecatch } from "../../content/columns";

export const metadata: Metadata = {
  title: "コラム | Common Future & Co. 株式会社",
  description:
    "お金の悩み、人間関係の悩み、会社組織運営の悩み。Common Future & Co. が、暮らしと仕事の悩みを解決するためのヒントを、悩みごとにまとめたコラムです。",
  alternates: { canonical: `${SITE_URL}/column` },
};

export default function ColumnIndex() {
  return (
    <>
      <Header />
      <main id="top">
        <section className="cf-col-hero">
          <Label>Column</Label>
          <h1>悩みから考えるコラム</h1>
          <p>
            お金の悩み、人間関係の悩み、会社組織運営の悩み。
            <br />
            ひとりで抱えがちな悩みを、解決の手がかりと、役に立つサービスへつなぎます。
          </p>
        </section>

        {COLUMN_CATEGORIES.map((c) => {
          const items = COLUMNS.filter((a) => a.category === c.key);
          return (
            <section key={c.key} id={c.key} className="cf-split cf-col-cat">
              <div className="cf-side">
                <Label>{c.en}</Label>
                <p className="cf-side-note">
                  <b>{c.ja}</b>
                  <br />
                  {c.note}
                </p>
              </div>
              {items.length ? (
                <ul className="cf-col-cards">
                  {items.map((a) => (
                    <li key={a.slug}>
                      <a href={`/column/${a.slug}`}>
                        <span className="cf-col-thumb">
                          <Image src={eyecatch(a.slug).webp} alt="" width={2400} height={1260} unoptimized />
                        </span>
                        <span className="cf-col-card-meta">
                          <span className="d">{a.date.replaceAll(".", "/")}</span>
                          <span className="cf-pill dark">{c.ja}</span>
                        </span>
                        <span className="t">{a.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="cf-col-empty">記事を準備しています。</p>
              )}
            </section>
          );
        })}
        <div className="cf-col-spacer" />
      </main>
      <SiteFooter />
    </>
  );
}
