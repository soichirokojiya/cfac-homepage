"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { LogoFull } from "./logo";

/* ------------------------------------------------------------------ */
/* data                                                                */
/* ------------------------------------------------------------------ */

type Product = {
  key: string;
  logo: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  url: string;
  domain: string;
  anchor: string;
  badge?: string;
};

const PRODUCTS: Product[] = [
  {
    key: "facutto",
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
    // 2026-10-24 ユーザー指示: 運営サービスに CASH NOW を追加 (2026-10-25 からメンテナンス中の表記に)
    key: "cashnow",
    logo: "/logos/cashnow.png",
    title: "CASH NOW",
    category: "Fintech Service",
    subtitle: "法人・個人事業主向けのファクタリングサービス",
    description:
      "請求書（売掛金）を買い取り、入金前の資金化を支援するサービスです。現在、システムメンテナンスのため新規のお申し込みを一時停止しています。",
    url: "https://cash.co.jp/",
    domain: "cash.co.jp",
    anchor: "ファクタリングサービス「CASH NOW」",
    badge: "メンテナンス中",
  },
  {
    key: "waketto",
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
    key: "sds",
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
];

const NEWS = [
  {
    date: "2026.10.10",
    title: "中小企業のセキュリティ対策サービスを比較・相談できるサイト「セキュット」を公開",
    url: "https://secutto.com/",
  },
  {
    date: "2026.09.12",
    title:
      "空き家・事故物件・再建築不可・共有持分など、訳あり不動産の買取業者を比較できるサイト「ワケット」を公開",
    url: "https://waketto.jp",
  },
  {
    date: "2026.07.02",
    title:
      "ファクタリング比較サイト「ファクット」、M&Aによる事業承継後2か月で月間リード送客数が約10倍に成長。ファクタリング会社のロールアップ型のM&Aも視野に。",
    url: "https://prtimes.jp/main/html/rd/p/000000005.000047698.html",
  },
  {
    date: "2026.06.11",
    title:
      "【ファクット調査】ファクタリング手数料、3年で最大約10%上昇の可能性─金利上昇は「倒産」を経由して手数料に波及",
    url: "https://prtimes.jp/main/html/rd/p/000000004.000047698.html",
  },
  {
    date: "2026.03.27",
    title:
      "言いづらいことを、やわらかく。伝え方に悩む場面を支える、対話サポートLINEサービス「うめこ」を公開",
    url: "https://prtimes.jp/main/html/rd/p/000000003.000047698.html",
  },
  {
    date: "2026.03.23",
    title:
      "ソロプレナー（非エンジニア）向けAIマルチエージェントワークスペース「musu（ムス）」ベータ版を限定公開",
    url: "https://prtimes.jp/main/html/rd/p/000000002.000047698.html",
  },
  {
    date: "2026.01.05",
    title:
      "過去25年分の過去問と、受験界で評価の高い模範解答を学習した、東大現代文解析AI「OSAMU」正式公開",
    url: "https://prtimes.jp/main/html/rd/p/000000001.000047698.html",
  },
];

const DOMAINS = [
  "claudecode.tokyo",
  "facnavi.info",
  "facutto.jp",
  "rentalrobo.jp",
  "rentarobo.jp",
  "roborental.jp",
  "robot-lease.shop",
  "robot-lease.tokyo",
  "robot-lease.net",
  "robot-navi.com",
  "robot-navi.jp",
  "robot-rental.tokyo",
  "robot-rental.info",
  "robot-repair.jp",
  "robot-repair.shop",
  "sds.tokyo",
  "socochi.com",
];

const COMPANY: { label: string; value: string; href?: string; linkText?: string }[] = [
  { label: "会社名", value: "Common Future & Company 株式会社" },
  { label: "代表者", value: "代表取締役 ", linkText: "糀屋総一朗", href: "https://souichirou.org/" },
  { label: "法人番号", value: "9011001105902" },
  { label: "設立", value: "2015年10月5日" },
  { label: "資本金", value: "3,520万円" },
  { label: "所在地", value: "神奈川県逗子市小坪6-6-46" },
  { label: "電話番号", value: "050-6883-5819" },
  { label: "メール", value: "info@cfac.co.jp" },
  { label: "営業時間", value: "平日 10:00～18:00" },
  { label: "事業内容", value: "AIを活用したプロダクトの開発・運営" },
];

const NAV_ITEMS = [
  { en: "Products", ja: "プロダクト", href: "#products", count: PRODUCTS.length },
  { en: "News", ja: "ニュース", href: "#news" },
  { en: "About", ja: "会社概要", href: "#about" },
  { en: "Domains", ja: "保有ドメイン", href: "#domains" },
  { en: "Contact", ja: "お問い合わせ", href: "#contact" },
];

/* ------------------------------------------------------------------ */
/* ------------------------------------------------------------------ */
/* wireframe objects (canvas, ink lines on white)                      */
/* ------------------------------------------------------------------ */

type Geo = { v: number[][]; e: [number, number][]; s: number; tilt?: number; rotZ?: number };
const TAU = Math.PI * 2;
const SHAPES: Record<string, () => Geo> = {
  stair() {
    const v: number[][] = [], e: [number, number][] = [], n = 5, w = 0.5, prof: number[][] = [];
    for (let i = 0; i < n; i++) { const x = -1 + (i * 2) / n, x2 = -1 + ((i + 1) * 2) / n, y = -1 + ((i + 1) * 2) / n; if (i === 0) prof.push([x, -1]); prof.push([x, y], [x2, y]); }
    prof.push([1, -1]);
    [-w, w].forEach((z) => prof.forEach(([x, y]) => v.push([x, -y * 0.9, z])));
    const m = prof.length;
    for (let i = 0; i < m; i++) e.push([i, (i + 1) % m], [i + m, ((i + 1) % m) + m], [i, i + m]);
    return { v, e, s: 0.8 };
  },
  torus() {
    const v: number[][] = [], e: [number, number][] = [], U = 36, V = 12;
    for (let i = 0; i < U; i++) for (let j = 0; j < V; j++) {
      const u = (i / U) * TAU, w = (j / V) * TAU;
      v.push([(1 + 0.36 * Math.cos(w)) * Math.cos(u), 0.36 * Math.sin(w), (1 + 0.36 * Math.cos(w)) * Math.sin(u)]);
      const k = i * V + j; e.push([k, i * V + ((j + 1) % V)]); if (j % 2 === 0) e.push([k, ((i + 1) % U) * V + j]);
    }
    return { v, e, s: 0.78, tilt: 0.9 };
  },
  globe() {
    const v: number[][] = [], e: [number, number][] = [], L = 9, M = 20;
    for (let i = 1; i < L; i++) for (let j = 0; j < M; j++) {
      const p = (i / L) * Math.PI, t = (j / M) * TAU;
      v.push([Math.sin(p) * Math.cos(t), Math.cos(p), Math.sin(p) * Math.sin(t)]);
      const k = (i - 1) * M + j; e.push([k, (i - 1) * M + ((j + 1) % M)]); if (i < L - 1) e.push([k, i * M + j]);
    }
    return { v, e, s: 0.9, tilt: 0.35 };
  },
  wave() {
    const v: number[][] = [], e: [number, number][] = [], X = 26, Z = 10;
    for (let i = 0; i < X; i++) for (let j = 0; j < Z; j++) {
      v.push([-1.6 + (i * 3.2) / (X - 1), 0, -0.6 + (j * 1.2) / (Z - 1)]);
      const k = i * Z + j; if (i < X - 1) e.push([k, k + Z]); if (j < Z - 1) e.push([k, k + 1]);
    }
    return { v, e, s: 0.62, tilt: 0.55 };
  },
};

function WireObject({ shape, seed = 0 }: { shape: keyof typeof SHAPES; seed?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext("2d"); if (!ctx) return;
    const geo = SHAPES[shape]();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const d = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0, visible = true;
    const resize = () => { w = cv.offsetWidth; h = cv.offsetHeight; cv.width = Math.round(w * d); cv.height = Math.round(h * d); ctx.setTransform(d, 0, 0, d, 0, 0); };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(cv);
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible && !reduce) { cancelAnimationFrame(raf); raf = requestAnimationFrame(frame); } });
    io.observe(cv);
    function frame(ms: number) {
      const t = ms / 1000;
      ctx!.clearRect(0, 0, w, h);
      if (shape === "wave") { const X = 26, Z = 10; for (let i = 0; i < X; i++) for (let j = 0; j < Z; j++) geo.v[i * Z + j][1] = Math.sin(i * 0.45 + t * 0.9) * 0.18 + Math.cos(j * 0.7 + t * 0.6) * 0.1; }
      const a = seed * 1.7 + t * 0.2, tx = geo.tilt ?? 0.45, rz = geo.rotZ ?? 0;
      const ca = Math.cos(a), sa = Math.sin(a), cx = Math.cos(tx), sx = Math.sin(tx), cz = Math.cos(rz), sz = Math.sin(rz);
      const S = Math.min(w, h) * 0.42 * geo.s, ox = w / 2, oy = h / 2;
      const P = geo.v.map(([x, y, z]) => { const x1 = x * cz - y * sz, y1 = x * sz + y * cz; const x2 = x1 * ca + z * sa, z2 = -x1 * sa + z * ca; const y3 = y1 * cx - z2 * sx, z3 = y1 * sx + z2 * cx; const f = 3.2 / (3.2 + z3); return [ox + x2 * S * f, oy + y3 * S * f, z3]; });
      ctx!.lineWidth = 1;
      for (const [i, j] of geo.e) {
        const p = P[i], q = P[j], depth = ((p[2] + q[2]) / 2 + 1.4) / 2.8, al = Math.max(0.05, Math.min(0.85, 0.72 - depth * 0.55));
        ctx!.strokeStyle = `rgba(17,17,17,${al.toFixed(3)})`; ctx!.beginPath(); ctx!.moveTo(p[0], p[1]); ctx!.lineTo(q[0], q[1]); ctx!.stroke();
      }
      if (!reduce && visible) raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, [shape, seed]);
  return <canvas ref={ref} className="cf-wire" aria-hidden="true" />;
}

/* ------------------------------------------------------------------ */
/* hero: a ruled field of cards that turn over one at a time           */
/* ------------------------------------------------------------------ */

type Cell = { type: "product"; key: string; wide?: boolean } | { type: "object"; shape: keyof typeof SHAPES; wide?: boolean };
const CELLS: Cell[] = [
  { type: "product", key: "facutto" },
  { type: "product", key: "sds" },
  { type: "object", shape: "torus", wide: true },
  { type: "product", key: "waketto", wide: true },
  { type: "product", key: "secutto" },
  { type: "object", shape: "globe" },
  { type: "object", shape: "stair" },
  { type: "product", key: "first90" },
  { type: "product", key: "cashnow", wide: true },
];
const PRODUCT_BY_KEY = Object.fromEntries(PRODUCTS.map((p) => [p.key, p]));
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

function CardBack() {
  return (
    <span className="cf-back" aria-hidden="true">
      <span className="cf-back-mark">
        <svg viewBox="0 0 100 100" fill="none"><path d="M68 22A32 32 0 1 0 68 78" stroke="currentColor" strokeWidth="6" strokeLinecap="round" /><path d="M68 22L74 16" stroke="currentColor" strokeWidth="6" strokeLinecap="round" /></svg>
      </span>
    </span>
  );
}

function Field() {
  const productIdx = CELLS.map((c, i) => (c.type === "product" ? i : -1)).filter((i) => i >= 0);
  const [open, setOpen] = useState<Record<number, boolean>>({});
  const [tease, setTease] = useState<Record<number, boolean>>({});
  const set = (fn: typeof setOpen, i: number, v: boolean) => fn((o) => ({ ...o, [i]: v }));

  const reveal = useCallback(async (i: number) => {
    set(setTease, i, true); await wait(620); set(setTease, i, false); set(setOpen, i, true); await wait(1100);
  }, []);

  useEffect(() => {
    let alive = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setOpen(Object.fromEntries(productIdx.map((i) => [i, true]))); return; }
    (async () => {
      await wait(500);
      const order = [...productIdx].sort(() => Math.random() - 0.5);
      for (const i of order) { if (!alive) return; reveal(i); await wait(520); }
      while (alive) {
        await wait(6500);
        if (!alive || document.hidden) continue;
        const i = productIdx[Math.floor(Math.random() * productIdx.length)];
        set(setOpen, i, false); await wait(1100); if (!alive) return; await reveal(i);
      }
    })();
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="cf-field" aria-label="Common Future & Company の運営サービス">
      <div className="cf-grid">
        {CELLS.map((c, i) => {
          if (c.type === "object") return <div key={i} className={`cf-cell${c.wide ? " wide" : ""}`}><WireObject shape={c.shape} seed={i} /></div>;
          const p = PRODUCT_BY_KEY[c.key];
          return (
            <div key={i} className={`cf-cell${c.wide ? " wide" : ""}${tease[i] ? " tease" : ""}`}>
              <a href={p.url} target="_blank" rel="noopener noreferrer" className={`cf-card${open[i] ? " open" : ""}`} aria-label={`${p.anchor}(新しいタブで開く)`}>
                <span className="cf-inner">
                  <CardBack />
                  <span className="cf-front">
                    <Image src={`/works/${p.key}.webp`} alt="" fill unoptimized className="cf-shot" />
                    <span className="cf-caption"><b>{p.title}</b><span>{p.domain}</span></span>
                  </span>
                </span>
              </a>
            </div>
          );
        })}
      </div>
      <div className="cf-wordmark" aria-hidden="true"><span>Common Future</span></div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* round controls                                                      */
/* ------------------------------------------------------------------ */

function Orbs() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return (
    <>
      <a href="#top" className="cf-orb cf-orb-mark" aria-label="Common Future & Company トップへ">
        <svg viewBox="0 0 100 100" fill="none" aria-hidden="true"><path d="M68 22A32 32 0 1 0 68 78" stroke="currentColor" strokeWidth="7" strokeLinecap="round" /><path d="M68 22L74 16" stroke="currentColor" strokeWidth="7" strokeLinecap="round" /></svg>
      </a>
      <button type="button" className="cf-orb cf-orb-info" aria-expanded={open} aria-controls="cf-panel" onClick={() => setOpen((o) => !o)}>{open ? "×" : "?"}</button>
      <div id="cf-panel" className={`cf-panel${open ? " show" : ""}`} onClick={(e) => { if ((e.target as HTMLElement).closest("a")) setOpen(false); }}>
        <p>Common Future &amp; Company 株式会社は、比べる・調べる・選ぶといった手間のかかる判断を、AIとデータで短くするプロダクトを企画から運営まで手がけています。</p>
        <nav aria-label="ページ内">{NAV_ITEMS.map((n) => <a key={n.href} href={n.href}>{n.en}</a>)}</nav>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* bands                                                               */
/* ------------------------------------------------------------------ */

function Band({ id, en, ja, children }: { id: string; en: string; ja: string; children: React.ReactNode }) {
  return (
    <section className="cf-band" id={id}>
      <div className="cf-band-in">
        <div className="cf-label">{en}<b>{ja}</b></div>
        <div className="cf-body">{children}</div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Orbs />
      <main id="top">
        <Field />

        <Band id="statement" en="Statement" ja="私たちについて">
          <p className="cf-statement">Products that make<br /><em>hard choices simple.</em></p>
          <p className="cf-lead">比べる、調べる、選ぶ。手間のかかる判断を、AIとデータで短くするプロダクトをつくっています。</p>
          <p className="cf-lead cf-mute">比較サイトやデータベースは、載っている情報が一つ違うだけで、使う人の判断を誤らせます。私たちは、公式情報や公表データを一次資料まで確かめ、数字は一か所で管理し、画面はできるだけ迷わない形に整えています。少人数で、AIを道具として使いながら、長く役に立つサービスを運営しています。</p>
        </Band>

        <Band id="products" en="Products" ja={`運営サービス(${PRODUCTS.length})`}>
          <ul className="cf-products">
            {PRODUCTS.map((p) => (
              <li key={p.key}>
                <div className="cf-p-head">
                  <span className="cf-p-logo"><Image src={p.logo} alt={p.title} width={120} height={32} /></span>
                  {p.badge && <span className="cf-badge">{p.badge}</span>}
                </div>
                <p className="cf-p-cat">{p.category}</p>
                <h3 className="cf-p-title">{p.title}</h3>
                <p className="cf-p-sub">{p.subtitle}</p>
                <p className="cf-p-desc">{p.description}</p>
                <a className="cf-more" href={p.url} target="_blank" rel="noopener noreferrer">{p.domain} ↗</a>
              </li>
            ))}
          </ul>
        </Band>

        <Band id="news" en="News" ja="ニュース">
          <ul className="cf-news">
            {NEWS.map((n) => (
              <li key={n.date + n.title}><span>{n.date}</span><a href={n.url} target="_blank" rel="noopener noreferrer">{n.title}</a></li>
            ))}
          </ul>
          <a className="cf-more" href="https://prtimes.jp/main/html/searchrlp/company_id/47698" target="_blank" rel="noopener noreferrer">プレスリリース一覧(PR TIMES) ↗</a>
        </Band>

        <Band id="about" en="About" ja="会社概要">
          <p className="cf-lead">AIを活用したプロダクトの開発・運営を行う会社です。金融・不動産・エネルギー・セキュリティなど、情報が分かりにくい領域で、比較サイトやデータベースを企画から運営まで一貫して手がけています。</p>
          <dl className="cf-facts">
            {COMPANY.map((c) => (
              <div key={c.label} className="cf-fact"><dt>{c.label}</dt><dd>{c.value}{c.href && <a href={c.href} target="_blank" rel="noopener noreferrer">{c.linkText}</a>}</dd></div>
            ))}
          </dl>
        </Band>

        <Band id="domains" en="Domains" ja="保有ドメイン">
          <p className="cf-lead cf-mute">当社が保有しているドメインの一覧です。取得をご検討の方は、お問い合わせください。</p>
          <ul className="cf-domains">{DOMAINS.map((d) => <li key={d}>{d}</li>)}</ul>
          <a className="cf-more" href="mailto:info@cfac.co.jp?subject=ドメイン取得に関するお問い合わせ">ドメインについてお問い合わせ ↗</a>
        </Band>

        <Band id="contact" en="Contact" ja="お問い合わせ">
          <p className="cf-lead">サービスへの掲載、事業提携、ドメイン、取材などのご相談は、メールでお受けしています。内容が固まっていない段階でも、お気軽にご連絡ください。</p>
          <p className="cf-mail"><a href="mailto:info@cfac.co.jp">info@cfac.co.jp</a></p>
          <p className="cf-mute cf-small">営業時間: 平日 10:00〜18:00</p>
        </Band>
      </main>

      <footer className="cf-footer">
        <div className="cf-footer-in">
          <div>
            <LogoFull height={26} color="#111111" />
            <p className="cf-small cf-mute">Common Future &amp; Company 株式会社<br />神奈川県逗子市小坪6-6-46</p>
          </div>
          <ul className="cf-footer-products">
            {PRODUCTS.map((p) => <li key={p.key}><a href={p.url} target="_blank" rel="noopener noreferrer">{p.anchor}</a></li>)}
          </ul>
        </div>
        <div className="cf-footer-bottom">
          <p>&copy; 2026 Common Future &amp; Co. 株式会社</p>
          <nav aria-label="規約">
            <a href="/privacy">プライバシーポリシー</a><a href="/terms">利用規約</a><a href="/tokushoho">特商法表記</a><a href="#top">Back to top ↑</a>
          </nav>
        </div>
      </footer>
    </>
  );
}
