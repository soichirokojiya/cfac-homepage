"use client";

import { useState, useEffect, useRef } from "react";
import { Logo } from "./logo";
import { PRODUCTS, COLORS } from "../content/products";

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

export function Wordmark({ dots = true, className = "" }: { dots?: boolean; className?: string }) {
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
  { en: "Column", ja: "コラム", href: "/column" },
  { en: "News", ja: "ニュース", href: "#news" },
  { en: "About", ja: "会社概要", href: "#about" },
  { en: "Domains", ja: "保有ドメイン", href: "#domains" },
  { en: "Contact", ja: "お問い合わせ", href: "#contact" },
];

/** home=false のとき(下層ページ)はアンカーを TOP へ向ける */
const menuHref = (href: string, home: boolean) => (home || !href.startsWith("#") ? href : `/${href}`);

export function Header({ home = false }: { home?: boolean }) {
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
        <a href={home ? "#top" : "/"} className="cf-brand" aria-label="Common Future & Co. トップへ">
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
            <a key={m.href} href={menuHref(m.href, home)} style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}>
              <span className="en">{m.en}<b style={{ color: COLORS[i % COLORS.length] }}>.</b></span><span className="ja">{m.ja}</span>
            </a>
          ))}
        </nav>
        <p className="cf-menu-foot">Common Future &amp; Co. 株式会社<br />info@cfac.co.jp</p>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* parts                                                               */
/* ------------------------------------------------------------------ */

export function Label({ children }: { children: React.ReactNode }) {
  return <p className="cf-label">( {children} )</p>;
}

export function More({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  return (
    <a className="cf-more" href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      <span className="cf-more-dot" aria-hidden="true">
        <svg viewBox="0 0 16 16" width="12" height="12"><path d="M6 3.5 10.5 8 6 12.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
      {children}
    </a>
  );
}

export function Reveal({ children, className = "", as: Tag = "div" }: { children: React.ReactNode; className?: string; as?: "div" | "li" | "section" }) {
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
/* footer                                                              */
/* ------------------------------------------------------------------ */

export function SiteFooter({ home = false }: { home?: boolean }) {
  return (
    <footer className="cf-footer">
      <div className="cf-strip" aria-hidden="true">
        <div className="cf-strip-track">
          {Array.from({ length: 12 }).map((_, i) => <span key={i}>Make choices simple.</span>)}
        </div>
      </div>
      <div className="cf-footer-mark"><Wordmark dots={false} /></div>
      <div className="cf-footer-in">
        <a href={home ? "#top" : "/"} className="cf-brand big" aria-label="トップへ戻る">
          <Logo size={44} color="currentColor" weight={9} />
          <span>COMMON FUTURE</span>
        </a>
        <nav className="cf-footer-nav" aria-label="フッター">
          {MENU.filter((m) => m.href !== "#domains").map((m) => <a key={m.href} href={menuHref(m.href, home)}><b>{m.en}</b><span>{m.ja}</span></a>)}
        </nav>
      </div>
      <ul className="cf-footer-products">
        {PRODUCTS.map((p) => <li key={p.key}><a href={p.url} target="_blank" rel="noopener noreferrer">{p.anchor}</a></li>)}
      </ul>
      <div className="cf-footer-bottom">
        <p>&copy; 2026 Common Future &amp; Co. 株式会社 / 神奈川県逗子市小坪6-6-46</p>
        <nav aria-label="規約"><a href="/privacy">Privacy Policy</a><a href="/terms">利用規約</a><a href="/tokushoho">特商法表記</a><a href="/consumer-oriented">消費者志向自主宣言</a></nav>
      </div>
    </footer>
  );
}
