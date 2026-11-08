"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Logo } from "./logo";

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
  /** このサービスで解決する悩み(使う人の言葉で) */
  problem: string;
  url: string;
  domain: string;
  anchor: string;
  badge?: string;
};

const PRODUCTS: Product[] = [
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

const NEWS = [
  {
    date: "2026.11.08",
    title: "電話代行・AI電話、会計ソフト、勤怠管理など、中小企業向けのAI・SaaSを公式情報で比較できるサイト「ビズピタ」を公開",
    url: "https://bizpita.com/",
  },
  {
    date: "2026.11.05",
    title: "78枚のカードから自分で選び、いまの気持ちを静かに読み解く、気持ちを整理するAIタロット「タロットノア」を公開",
    url: "https://tarot-noa.jp/",
  },
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

/* ------------------------------------------------------------------ */
/* palette: one color per service                                      */
/* ------------------------------------------------------------------ */

const COLORS = ["#1f3dff", "#ff4b12", "#00c35a", "#e2ff1c", "#ff8ad2", "#6fd1ff", "#ffc21a", "#9b6bff"];
const COLOR_BY_KEY: Record<string, string> = Object.fromEntries(PRODUCTS.map((p, i) => [p.key, COLORS[i % COLORS.length]]));

/* ------------------------------------------------------------------ */
/* block wordmark: C O M M O N built from rounded blocks               */
/* ------------------------------------------------------------------ */

const U = 100; // one cell
const LETTERS: { x: number; w: number; body: React.ReactNode }[] = (() => {
  const xs = [0, 215, 430, 745, 1060, 1275];
  const C = (x: number) => (
    <g key="c">
      <rect x={x} y={0} width={2 * U} height={3 * U} rx={U} />
      <rect x={x + U} y={U} width={U + 2} height={U} fill="var(--paper)" />
    </g>
  );
  const O = (x: number, k: string) => <rect key={k} x={x} y={0} width={2 * U} height={3 * U} rx={U * 0.72} />;
  const M = (x: number, k: string) => (
    <g key={k}>
      <rect x={x} y={0} width={U} height={3 * U} rx={U / 2} />
      <rect x={x + U} y={0} width={U} height={2 * U} rx={U / 2} />
      <rect x={x + 2 * U} y={0} width={U} height={3 * U} rx={U / 2} />
      <rect x={x + U / 2} y={U / 2} width={2 * U} height={U} />
      <rect x={x} y={1.5 * U} width={U / 2} height={1.5 * U} />
      <rect x={x + 2.5 * U} y={1.5 * U} width={U / 2} height={1.5 * U} />
    </g>
  );
  const N = (x: number) => (
    <g key="n">
      <rect x={x} y={0} width={U} height={3 * U} rx={U / 2} />
      <rect x={x + U} y={U / 2} width={U} height={2 * U} rx={U / 2} />
      <rect x={x + 2 * U} y={0} width={U} height={3 * U} rx={U / 2} />
      <rect x={x + U / 2} y={0} width={U} height={1.5 * U} rx={0} />
      <rect x={x + 1.5 * U} y={1.5 * U} width={U} height={1.5 * U} />
      <rect x={x} y={1.5 * U} width={U / 2} height={1.5 * U} />
      <rect x={x + 2.5 * U} y={0} width={U / 2} height={1.5 * U} />
    </g>
  );
  return [
    { x: xs[0], w: 200, body: C(xs[0]) },
    { x: xs[1], w: 200, body: O(xs[1], "o1") },
    { x: xs[2], w: 300, body: M(xs[2], "m1") },
    { x: xs[3], w: 300, body: M(xs[3], "m2") },
    { x: xs[4], w: 200, body: O(xs[4], "o2") },
    { x: xs[5], w: 300, body: N(xs[5]) },
  ];
})();

// [cx, cy, colorIndex]
const DOTS: [number, number, number][] = [
  [50, 50, 0], [150, 150, 0],
  [265, 250, 1], [365, 50, 1],
  [480, 50, 2], [580, 250, 2], [680, 50, 2],
  [795, 50, 3], [895, 250, 3], [995, 250, 3],
  [1110, 50, 4], [1210, 250, 4],
  [1325, 250, 5], [1425, 50, 5], [1525, 250, 5],
];

function Wordmark({ dots = true, className = "" }: { dots?: boolean; className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const [landed, setLanded] = useState(false);
  const [start] = useState(() =>
    DOTS.map((_, i) => {
      // deterministic scatter (no hydration mismatch): above and around the mark
      const a = (i * 137.5 * Math.PI) / 180;
      return [Math.cos(a) * (260 + (i % 4) * 90), -260 - ((i * 53) % 260) + Math.sin(a) * 80];
    }),
  );
  useEffect(() => {
    if (!dots) return;
    const el = ref.current; if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { const t = setTimeout(() => setLanded(true), 0); return () => clearTimeout(t); }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setLanded(true), 350); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [dots]);
  return (
    <svg ref={ref} className={`cf-wm ${className}${landed ? " landed" : ""}`} viewBox="-2 -2 1579 304" role="img" aria-label="COMMON">
      <g fill="var(--ink)">{LETTERS.map((l) => l.body)}</g>
      {dots &&
        DOTS.map(([cx, cy, c], i) => (
          <circle
            key={i}
            className="cf-dot"
            cx={cx}
            cy={cy}
            r={U / 2}
            fill={COLORS[c]}
            style={{
              ["--sx" as string]: `${start[i][0]}px`,
              ["--sy" as string]: `${start[i][1]}px`,
              transitionDelay: `${(i % 7) * 70 + Math.floor(i / 7) * 40}ms`,
            }}
          />
        ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* header + menu                                                       */
/* ------------------------------------------------------------------ */

const MENU = [
  { en: "Company", ja: "私たちについて", href: "#company" },
  { en: "Products", ja: "運営サービス", href: "#products" },
  { en: "News", ja: "ニュース", href: "#news" },
  { en: "About", ja: "会社概要", href: "#about" },
  { en: "Domains", ja: "保有ドメイン", href: "#domains" },
  { en: "Contact", ja: "お問い合わせ", href: "#contact" },
];

function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);
  return (
    <>
      <header className="cf-header">
        <a href="#top" className="cf-brand" aria-label="Common Future & Company トップへ">
          <Logo size={30} color="currentColor" weight={9} />
          <span>COMMON FUTURE</span>
        </a>
        <button type="button" className={`cf-burger${open ? " open" : ""}`} aria-expanded={open} aria-controls="cf-menu" aria-label={open ? "メニューを閉じる" : "メニューを開く"} onClick={() => setOpen((o) => !o)}>
          <i /><i /><i />
        </button>
      </header>
      <div id="cf-menu" className={`cf-menu${open ? " show" : ""}`} onClick={(e) => { if ((e.target as HTMLElement).closest("a")) setOpen(false); }}>
        <nav aria-label="メニュー">
          {MENU.map((m, i) => (
            <a key={m.href} href={m.href} style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}>
              <span className="en">{m.en}<b style={{ color: COLORS[i % COLORS.length] }}>.</b></span><span className="ja">{m.ja}</span>
            </a>
          ))}
        </nav>
        <p className="cf-menu-foot">Common Future &amp; Company 株式会社<br />info@cfac.co.jp</p>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* parts                                                               */
/* ------------------------------------------------------------------ */

function Label({ children }: { children: React.ReactNode }) {
  return <p className="cf-label">( {children} )</p>;
}

function More({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  return (
    <a className="cf-more" href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      <span className="cf-more-dot" aria-hidden="true">
        <svg viewBox="0 0 16 16" width="12" height="12"><path d="M6 3.5 10.5 8 6 12.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
      {children}
    </a>
  );
}

function Reveal({ children, className = "", as: Tag = "div" }: { children: React.ReactNode; className?: string; as?: "div" | "li" | "section" }) {
  const ref = useRef<HTMLElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref as never} className={`cf-rv${on ? " on" : ""} ${className}`}>{children}</Tag>;
}

/* ------------------------------------------------------------------ */
/* curved ring of service cards                                        */
/* ------------------------------------------------------------------ */

const RING = [...PRODUCTS, ...PRODUCTS];

function Ring() {
  const ringRef = useRef<HTMLDivElement>(null);
  const [front, setFront] = useState(0);
  useEffect(() => {
    const ring = ringRef.current; if (!ring) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const step = 360 / RING.length;
    const vel = reduce ? 0 : -0.06;
    let angle = 0, raf = 0, last = performance.now(), visible = true;
    let drag: { x: number; a: number } | null = null, lastFront = -1;
    const radius = () => Math.round(ring.offsetWidth / (2 * Math.tan(Math.PI / RING.length)) * 1.02);
    let R = radius();
    const place = () => {
      R = radius();
      Array.from(ring.children).forEach((c, i) => { (c as HTMLElement).style.transform = `rotateY(${i * step}deg) translateZ(${R}px)`; });
    };
    place();
    const apply = () => {
      ring.style.transform = `translateZ(${-R}px) rotateY(${angle}deg)`;
      const f = ((Math.round(-angle / step) % RING.length) + RING.length) % RING.length;
      if (f !== lastFront) { lastFront = f; setFront(f % PRODUCTS.length); }
    };
    const tick = (t: number) => {
      const dt = Math.min(64, t - last); last = t;
      if (!drag) angle += vel * dt * 0.1;
      apply();
      if (visible) raf = requestAnimationFrame(tick);
    };
    apply();
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) { last = performance.now(); cancelAnimationFrame(raf); raf = requestAnimationFrame(tick); } });
    io.observe(ring);
    const ro = new ResizeObserver(() => { place(); apply(); });
    ro.observe(ring);
    const stage = ring.parentElement!;
    let moved = false;
    const down = (e: PointerEvent) => { drag = { x: e.clientX, a: angle }; moved = false; };
    const move = (e: PointerEvent) => { if (!drag) return; const dx = e.clientX - drag.x; if (Math.abs(dx) > 4) moved = true; angle = drag.a + dx * 0.12; apply(); };
    const up = () => { drag = null; };
    const click = (e: MouseEvent) => { if (moved) { e.preventDefault(); e.stopPropagation(); } };
    stage.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    stage.addEventListener("click", click, true);
    return () => {
      cancelAnimationFrame(raf); io.disconnect(); ro.disconnect();
      stage.removeEventListener("pointerdown", down); window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); stage.removeEventListener("click", click, true);
    };
  }, []);
  const p = PRODUCTS[front];
  return (
    <div className="cf-ring-wrap">
      <div className="cf-stage">
        <div className="cf-ring" ref={ringRef}>
          {RING.map((r, i) => (
            <a key={i} className="cf-card" href={r.url} target="_blank" rel="noopener noreferrer" tabIndex={i < PRODUCTS.length ? 0 : -1} aria-hidden={i >= PRODUCTS.length} aria-label={`${r.anchor}(新しいタブで開く)`} draggable={false}>
              <span className="cf-card-img"><Image src={`/works/${r.key}.webp`} alt="" fill unoptimized sizes="360px" draggable={false} /></span>
              <span className="cf-card-name"><i style={{ background: COLOR_BY_KEY[r.key] }} />{r.title}</span>
            </a>
          ))}
        </div>
      </div>
      <p className="cf-ring-label" aria-live="polite"><span>(</span><b key={p.key}>{p.title}</b><span>)</span></p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* page                                                                */
/* ------------------------------------------------------------------ */

const newsTag = (url: string) => (url.includes("prtimes.jp") ? "Press" : "Product");

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        {/* hero */}
        <section className="cf-hero">
          <h1 className="cf-tagline">Make choices simple.<span className="sr-only"> Common Future &amp; Company 株式会社</span></h1>
          <p className="cf-sub">人々の悩みを、<br />ネットサービスで解決する</p>
          <Wordmark />
          <a href="#company" className="cf-scroll">Scroll Down</a>
        </section>

        {/* company statement */}
        <section id="company" className="cf-statement">
          <Reveal>
            <Label>Company</Label>
            <h2>人々の悩みを、<br />ネットサービスで解決する</h2>
            <div className="cf-statement-body">
              <p>人間関係の悩み。お金の悩み。会社や組織を運営する悩み。<br />誰もが抱える悩みなのに、ひとりで調べて、比べて、決めるには重すぎることがあります。</p>
              <p>Common Future &amp; Company は、こうした悩みを解決することを主眼に、<br />比較サイト・データベース・AIサービスを企画から運営まで手がけています。<br />いつでも、どこからでも、すぐに答えにたどり着けることが、ネットサービスの強みです。</p>
              <p>少人数で、AIを道具として使いながら、<br />長く役に立つサービスを運営しています。</p>
            </div>
            <More href="#about">Learn More</More>
          </Reveal>
        </section>

        {/* products */}
        <section id="products" className="cf-products">
          <Reveal className="cf-count">
            <p><b>{PRODUCTS.length}</b> Products</p>
            <span>人間関係・お金・会社組織運営などの悩みを解決するサービスを運営中</span>
          </Reveal>
          <Ring />
          <div className="cf-split">
            <div className="cf-side">
              <Label>Products</Label>
              <p className="cf-side-note">カードを押すと、各サービスのサイトが開きます。</p>
            </div>
            <ul className="cf-plist">
              {PRODUCTS.map((p) => (
                <Reveal as="li" key={p.key}>
                  <a href={p.url} target="_blank" rel="noopener noreferrer">
                    <span className="cf-plist-name"><i style={{ background: COLOR_BY_KEY[p.key] }} />{p.title}</span>
                    <span className="cf-pill">{p.category}</span>
                    <span className="cf-plist-body">
                      <small className="cf-plist-problem">{p.problem}に</small>
                      <b>{p.subtitle}{p.badge && <em>{p.badge}</em>}</b>
                      <span>{p.description}</span>
                    </span>
                    <span className="cf-plist-domain">{p.domain} ↗</span>
                  </a>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* news */}
        <section id="news" className="cf-split cf-sec">
          <div className="cf-side">
            <Label>News</Label>
            <More href="https://prtimes.jp/main/html/searchrlp/company_id/47698" external>Learn More</More>
          </div>
          <ul className="cf-news">
            {NEWS.map((n) => (
              <li key={n.date + n.title}>
                <a href={n.url} target="_blank" rel="noopener noreferrer">
                  <span className="d">{n.date.replaceAll(".", "/")}</span>
                  <span className="cf-pill dark">{newsTag(n.url)}</span>
                  <span className="t">{n.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* about */}
        <section id="about" className="cf-split cf-sec">
          <div className="cf-side">
            <Label>About</Label>
            <p className="cf-side-note">会社概要</p>
          </div>
          <div>
            <p className="cf-about-lead">人間関係の悩み、お金の悩み、会社・組織運営の悩みなど、人々の悩みをネットサービスで解決することを主眼に、AIを活用したプロダクトの開発・運営を行う会社です。困っている人が正しい情報や相談先にたどり着きにくい領域で、比較サイト・データベース・AIサービスを企画から運営まで一貫して手がけています。</p>
            <dl className="cf-facts">
              {COMPANY.map((c) => (
                <div key={c.label}><dt>{c.label}</dt><dd>{c.value}{c.href && <a href={c.href} target="_blank" rel="noopener noreferrer">{c.linkText}</a>}</dd></div>
              ))}
            </dl>
          </div>
        </section>

        {/* domains */}
        <section id="domains" className="cf-split cf-sec">
          <div className="cf-side">
            <Label>Domains</Label>
            <p className="cf-side-note">保有ドメイン</p>
            <More href="mailto:info@cfac.co.jp?subject=ドメイン取得に関するお問い合わせ">Contact</More>
          </div>
          <div>
            <p className="cf-about-lead">当社が保有しているドメインの一覧です。取得をご検討の方は、お問い合わせください。</p>
            <ul className="cf-domains">{DOMAINS.map((d) => <li key={d}>{d}</li>)}</ul>
          </div>
        </section>

        {/* contact */}
        <section id="contact" className="cf-contact">
          <Reveal>
            <Label>Contact</Label>
            <h2>Let&rsquo;s talk.</h2>
            <p>サービスへの掲載、事業提携、ドメイン、取材などのご相談は、メールでお受けしています。<br />内容が固まっていない段階でも、お気軽にご連絡ください。</p>
            <a className="cf-mail" href="mailto:info@cfac.co.jp">
              <span className="cf-more-dot" aria-hidden="true"><svg viewBox="0 0 16 16" width="14" height="14"><path d="M6 3.5 10.5 8 6 12.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
              info@cfac.co.jp
            </a>
            <p className="cf-hours">営業時間: 平日 10:00〜18:00</p>
          </Reveal>
        </section>
      </main>

      <footer className="cf-footer">
        <div className="cf-strip" aria-hidden="true">
          <div className="cf-strip-track">
            {Array.from({ length: 12 }).map((_, i) => <span key={i}>Make choices simple.</span>)}
          </div>
        </div>
        <div className="cf-footer-mark"><Wordmark dots={false} /></div>
        <div className="cf-footer-in">
          <a href="#top" className="cf-brand big" aria-label="トップへ戻る">
            <Logo size={44} color="currentColor" weight={9} />
            <span>COMMON FUTURE</span>
          </a>
          <nav className="cf-footer-nav" aria-label="フッター">
            {MENU.filter((m) => m.href !== "#domains").map((m) => <a key={m.href} href={m.href}><b>{m.en}</b><span>{m.ja}</span></a>)}
          </nav>
        </div>
        <ul className="cf-footer-products">
          {PRODUCTS.map((p) => <li key={p.key}><a href={p.url} target="_blank" rel="noopener noreferrer">{p.anchor}</a></li>)}
        </ul>
        <div className="cf-footer-bottom">
          <p>&copy; 2026 Common Future &amp; Co. 株式会社 / 神奈川県逗子市小坪6-6-46</p>
          <nav aria-label="規約"><a href="/privacy">Privacy Policy</a><a href="/terms">利用規約</a><a href="/tokushoho">特商法表記</a></nav>
        </div>
      </footer>
    </>
  );
}
