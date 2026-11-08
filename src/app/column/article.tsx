import Image from "next/image";
import { Header, SiteFooter, Label, More } from "../chrome";
import { categoryOf, eyecatch, SITE_URL, type Column } from "../../content/columns";
import { PRODUCTS, COLOR_BY_KEY } from "../../content/products";

/* コラム記事の共通レイアウト(TOP と同じ白地・( Label )・罫線・ピル) */

export type Toc = { id: string; label: string }[];

export function ArticleShell({
  column,
  toc,
  related,
  children,
}: {
  column: Column;
  toc: Toc;
  related: string[]; // PRODUCTS の key
  children: React.ReactNode;
}) {
  const cat = categoryOf(column.category);
  const url = `${SITE_URL}/column/${column.slug}`;
  const isoDate = column.date.replaceAll(".", "-");
  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: column.title,
      description: column.description,
      datePublished: isoDate,
      dateModified: isoDate,
      mainEntityOfPage: url,
      image: `${SITE_URL}${eyecatch(column.slug).png}`,
      author: { "@type": "Organization", name: "Common Future & Company 編集部", url: SITE_URL },
      publisher: { "@id": "https://www.cfac.co.jp/#organization" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "トップ", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "コラム", item: `${SITE_URL}/column` },
        { "@type": "ListItem", position: 3, name: column.title, item: url },
      ],
    },
  ];
  const relatedProducts = related.map((k) => PRODUCTS.find((p) => p.key === k)!).filter(Boolean);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Header />
      <main id="top">
        <section className="cf-col-hero cf-col-hero-article">
          <nav className="cf-crumb" aria-label="パンくず">
            <a href="/">Top</a>
            <span>/</span>
            <a href="/column">Column</a>
            <span>/</span>
            <a href={`/column#${cat.key}`}>{cat.ja}</a>
          </nav>
          <span className="cf-pill dark">{cat.ja}</span>
          <h1>{column.title}</h1>
          <p className="cf-col-meta">
            <time dateTime={isoDate}>{column.date.replaceAll(".", "/")}</time>
            <span>文：Common Future &amp; Company 編集部</span>
          </p>
        </section>

        <figure className="cf-col-eye">
          <Image src={eyecatch(column.slug).webp} alt={column.title} width={2400} height={1260} unoptimized priority />
        </figure>

        <div className="cf-split cf-col-body">
          <aside className="cf-side cf-col-toc">
            <Label>Contents</Label>
            <ol>
              {toc.map((t, i) => (
                <li key={t.id}>
                  <a href={`#${t.id}`}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    {t.label}
                  </a>
                </li>
              ))}
            </ol>
          </aside>
          <article className="cf-article">{children}</article>
        </div>

        {relatedProducts.length > 0 && (
          <section className="cf-split cf-sec">
            <div className="cf-side">
              <Label>Related</Label>
              <p className="cf-side-note">この悩みに役立つ当社のサービス</p>
            </div>
            <ul className="cf-plist">
              {relatedProducts.map((p) => (
                <li key={p.key}>
                  <a href={p.url} target="_blank" rel="noopener noreferrer">
                    <span className="cf-plist-name"><i style={{ background: COLOR_BY_KEY[p.key] }} />{p.title}</span>
                    <span className="cf-pill">{p.category}</span>
                    <span className="cf-plist-body">
                      <small className="cf-plist-problem">{p.problem}に</small>
                      <b>{p.subtitle}</b>
                      <span>{p.description}</span>
                    </span>
                    <span className="cf-plist-domain">{p.domain} ↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="cf-col-back">
          <More href="/column">ほかのコラムを読む</More>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

/* 本文用の小さな部品 */

export function H2({ id, num, children }: { id: string; num: number; children: React.ReactNode }) {
  return (
    <h2 id={id}>
      <span>{String(num).padStart(2, "0")}</span>
      {children}
    </h2>
  );
}

export function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="cf-table">
      <table>
        <thead>
          <tr>{head.map((h) => <th key={h} scope="col">{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]}>
              {r.map((c, i) => (i === 0 ? <th key={i} scope="row">{c}</th> : <td key={i}>{c}</td>))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener">
      {children}
    </a>
  );
}
