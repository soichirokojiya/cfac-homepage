"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Header, SiteFooter, Wordmark, Label, More, Reveal } from "./chrome";
import { PRODUCTS, COLOR_BY_KEY } from "../content/products";
import { COLUMNS, categoryOf } from "../content/columns";

/* ------------------------------------------------------------------ */
/* data                                                                */
/* ------------------------------------------------------------------ */


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
      <Header home />
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

        {/* column: 悩み別のコラム */}
        <section id="column" className="cf-split cf-sec">
          <div className="cf-side">
            <Label>Column</Label>
            <p className="cf-side-note">悩みから考えるコラム</p>
            <More href="/column">Learn More</More>
          </div>
          <ul className="cf-news">
            {COLUMNS.slice(0, 5).map((c) => (
              <li key={c.slug}>
                <a href={`/column/${c.slug}`}>
                  <span className="d">{c.date.replaceAll(".", "/")}</span>
                  <span className="cf-pill dark">{categoryOf(c.category).ja}</span>
                  <span className="t">{c.title}</span>
                </a>
              </li>
            ))}
          </ul>
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

      <SiteFooter home />
    </>
  );
}
