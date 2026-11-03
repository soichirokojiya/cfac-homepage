"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
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

const COMPANY = [
  { label: "会社名", value: "Common Future & Company 株式会社" },
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
/* helpers                                                             */
/* ------------------------------------------------------------------ */

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

function SectionLabel({ en, ja, index }: { en: string; ja: string; index: string }) {
  return (
    <div className="flex items-baseline justify-between border-t border-[var(--line)] pt-5 mb-12 md:mb-16">
      <div className="flex items-baseline gap-4">
        <span className="font-display text-xs text-[var(--sub)] tabular-nums">{index}</span>
        <h2 className="font-display text-2xl md:text-3xl tracking-tight text-[var(--ink)]">{en}</h2>
      </div>
      <span className="text-xs text-[var(--sub)] tracking-[0.15em]">{ja}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* header + menu                                                       */
/* ------------------------------------------------------------------ */

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:bg-white focus:px-3 focus:py-2 focus:text-sm">
        メインコンテンツへスキップ
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled && !open ? "bg-[var(--paper)]/90 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 md:px-10">
          <a href="#" aria-label="Common Future & Co. トップへ" className="relative z-[60]">
            <LogoFull height={28} color={open ? "#ffffff" : "#111111"} />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            className={`relative z-[60] flex items-center gap-3 font-display text-sm tracking-wide transition-colors ${
              open ? "text-white" : "text-[var(--ink)]"
            }`}
          >
            <span>{open ? "Close" : "Menu"}</span>
            <span className="relative block h-3 w-6" aria-hidden="true">
              <span className={`absolute left-0 h-px w-6 bg-current transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0.5"}`} />
              <span className={`absolute left-0 h-px w-6 bg-current transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-2.5"}`} />
            </span>
          </button>
        </div>
      </header>

      <div
        id="site-menu"
        className={`fixed inset-0 z-[55] bg-[#111111] text-white transition-[opacity,visibility] duration-500 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!open}
      >
        <nav className="mx-auto flex h-full max-w-[1440px] flex-col justify-center px-5 md:px-10">
          <ul>
            {NAV_ITEMS.map((item, i) => (
              <li key={item.href} className="border-b border-white/15 first:border-t">
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className="group flex items-baseline justify-between py-4 md:py-5"
                  style={{ transitionDelay: open ? `${120 + i * 50}ms` : "0ms" }}
                >
                  <span className="font-display text-4xl tracking-tight transition-transform duration-300 group-hover:translate-x-2 md:text-6xl">
                    {item.en}
                    {item.count ? <sup className="ml-2 align-super text-sm text-white/50 md:text-base">{item.count}</sup> : null}
                  </span>
                  <span className="text-xs tracking-[0.15em] text-white/60 md:text-sm">{item.ja}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-xs text-white/50">
            <a href="mailto:info@cfac.co.jp" tabIndex={open ? 0 : -1} className="hover:text-white">info@cfac.co.jp</a>
            <a href="/privacy" tabIndex={open ? 0 : -1} className="hover:text-white">プライバシーポリシー</a>
            <a href="/terms" tabIndex={open ? 0 : -1} className="hover:text-white">利用規約</a>
            <a href="/tokushoho" tabIndex={open ? 0 : -1} className="hover:text-white">特定商取引法に基づく表記</a>
          </div>
        </nav>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* sections                                                            */
/* ------------------------------------------------------------------ */

function Hero() {
  const featured = PRODUCTS[0];
  return (
    <section className="pt-32 md:pt-40">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <p className="mb-6 text-xs tracking-[0.2em] text-[var(--sub)] opacity-0 animate-fade-in-up">
          Common Future &amp; Company 株式会社
        </p>
        <h1 className="font-display max-w-5xl text-[2.6rem] leading-[1.05] tracking-[-0.03em] text-[var(--ink)] opacity-0 animate-fade-in-up animate-delay-200 sm:text-6xl md:text-7xl lg:text-[5.75rem]">
          Products that make
          <br />
          hard choices simple.
        </h1>
        <div className="mt-8 flex flex-col gap-6 opacity-0 animate-fade-in-up animate-delay-400 md:mt-10 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-sm leading-loose text-[var(--body)] md:text-base">
            比べる、調べる、選ぶ。手間のかかる判断を、
            <br className="hidden sm:block" />
            AIとデータで短くするプロダクトをつくっています。
          </p>
          <a href="#products" className="group inline-flex items-center gap-2 self-start font-display text-sm text-[var(--ink)] md:self-auto">
            <span className="border-b border-current pb-0.5">View Products</span>
            <span className="text-[var(--sub)]">{PRODUCTS.length}</span>
          </a>
        </div>
      </div>

      <a
        href={featured.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-14 block opacity-0 animate-fade-in-up animate-delay-600 md:mt-20"
      >
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="relative aspect-[16/10] overflow-hidden bg-[var(--tint)] md:aspect-[2/1]">
            <Image
              src={`/works/${featured.key}.webp`}
              alt={`${featured.title}のトップページ`}
              fill
              priority
              sizes="(min-width: 1440px) 1360px, 100vw"
              className="object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-[1.02]"
            />
          </div>
          <div className="mt-4 flex items-baseline justify-between gap-4 text-sm">
            <div className="flex items-baseline gap-3">
              <span className="text-xs text-[var(--sub)]">Featured</span>
              <span className="font-medium text-[var(--ink)]">{featured.title}</span>
              <span className="hidden text-[var(--sub)] sm:inline">{featured.subtitle}</span>
            </div>
            <span className="flex items-center gap-1 font-display text-xs text-[var(--sub)] group-hover:text-[var(--ink)]">
              {featured.domain} <Arrow />
            </span>
          </div>
        </div>
      </a>
    </section>
  );
}

function Statement() {
  return (
    <section className="py-28 md:py-40">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 md:grid-cols-12 md:px-10">
        <Reveal className="md:col-span-7">
          <p className="mb-6 font-display text-sm text-[var(--sub)]">Simple on the surface. Rigorous underneath.</p>
          <h2 className="text-2xl font-medium leading-[1.7] tracking-[0.02em] text-[var(--ink)] md:text-4xl md:leading-[1.6]">
            見た目はシンプルに。
            <br />
            中身は、正確さを徹底して。
          </h2>
        </Reveal>
        <Reveal className="md:col-span-5 md:pt-14" delay={150}>
          <p className="text-sm leading-[2.2] text-[var(--body)]">
            比較サイトやデータベースは、載っている情報が一つ違うだけで、使う人の判断を誤らせます。
            私たちは、公式情報や公表データを一次資料まで確かめ、数字は一か所で管理し、画面はできるだけ迷わない形に整えています。
            少人数で、AIを道具として使いながら、長く役に立つサービスを運営しています。
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function LogoMarquee() {
  const logos = PRODUCTS.map((p) => ({ src: p.logo, alt: p.title }));
  const row = [...logos, ...logos];
  return (
    <section aria-label="運営サービス" className="border-y border-[var(--line)] py-10 md:py-12">
      <div className="mx-auto mb-8 flex max-w-[1440px] items-baseline justify-between px-5 md:px-10">
        <p className="font-display text-sm text-[var(--ink)]">Our products</p>
        <p className="text-xs text-[var(--sub)]">運営サービス</p>
      </div>
      <div className="marquee overflow-hidden">
        <ul className="marquee-track flex w-max items-center gap-16 md:gap-24">
          {row.map((l, i) => (
            <li key={i} aria-hidden={i >= logos.length} className="shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={l.src}
                alt={i < logos.length ? l.alt : ""}
                className="h-7 w-auto max-w-[180px] object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 md:h-8"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Products() {
  return (
    <section id="products" className="scroll-mt-20 py-28 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <SectionLabel index="01" en="Products" ja="プロダクト" />
        <ul className="grid gap-x-10 gap-y-20 md:grid-cols-2 md:gap-y-28">
          {PRODUCTS.map((p, i) => (
            <li key={p.key} className={i % 2 === 1 ? "md:mt-24" : ""}>
              <Reveal>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden bg-[var(--tint)]">
                    <Image
                      src={`/works/${p.key}.webp`}
                      alt={`${p.title}のトップページ`}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                    />
                    {p.badge && (
                      <span className="absolute left-4 top-4 bg-[var(--ink)] px-3 py-1 text-[11px] tracking-wider text-white">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <div className="mt-5 grid grid-cols-[auto_1fr_auto] items-baseline gap-x-4 border-b border-[var(--line)] pb-5">
                    <span className="font-display text-xs tabular-nums text-[var(--sub)]">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="text-lg font-medium text-[var(--ink)] md:text-xl">{p.title}</h3>
                    <span className="flex items-center gap-1 font-display text-xs text-[var(--sub)] transition-colors group-hover:text-[var(--ink)]">
                      View <Arrow className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-display text-xs text-[var(--sub)]">
                    <span>{p.category}</span>
                    <span>{p.domain}</span>
                  </div>
                  <p className="mt-3 text-sm font-medium text-[var(--ink)]">{p.subtitle}</p>
                  <p className="mt-2 text-sm leading-loose text-[var(--body)]">{p.description}</p>
                  <span className="sr-only">{p.anchor}</span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function News() {
  return (
    <section id="news" className="scroll-mt-20 bg-[var(--tint)] py-28 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <SectionLabel index="02" en="News" ja="ニュース" />
        <Reveal>
          <ul className="border-t border-[var(--line)]">
            {NEWS.map((item) => (
              <li key={item.url} className="border-b border-[var(--line)]">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid gap-2 py-6 md:grid-cols-[10rem_1fr_auto] md:gap-8"
                >
                  <span className="font-display text-xs tabular-nums text-[var(--sub)] md:pt-1">{item.date}</span>
                  <span className="text-sm leading-relaxed text-[var(--body)] transition-colors group-hover:text-[var(--ink)] md:text-[15px]">
                    {item.title}
                  </span>
                  <Arrow className="hidden text-[var(--sub)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--ink)] md:block" />
                </a>
              </li>
            ))}
          </ul>
          <a
            href="https://prtimes.jp/main/html/searchrlp/company_id/47698"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 font-display text-sm text-[var(--ink)]"
          >
            <span className="border-b border-current pb-0.5">プレスリリース一覧（PR TIMES）</span>
            <Arrow />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="scroll-mt-20 py-28 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <SectionLabel index="03" en="About" ja="会社概要" />
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="text-xl font-medium leading-[1.8] text-[var(--ink)] md:text-2xl">
              AIを活用したプロダクトの
              <br />
              開発・運営を行う会社です。
            </p>
            <p className="mt-6 text-sm leading-[2.2] text-[var(--body)]">
              金融・不動産・エネルギー・セキュリティなど、情報が分かりにくい領域で、比較サイトやデータベースを企画から運営まで一貫して手がけています。
            </p>
          </Reveal>
          <Reveal className="md:col-span-7" delay={150}>
            <dl className="border-t border-[var(--line)]">
              {COMPANY.map((item) => (
                <div key={item.label} className="grid grid-cols-[7rem_1fr] gap-4 border-b border-[var(--line)] py-4 text-sm md:grid-cols-[10rem_1fr]">
                  <dt className="text-[var(--sub)]">{item.label}</dt>
                  <dd className="text-[var(--ink)]">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Domains() {
  return (
    <section id="domains" className="scroll-mt-20 pb-28 md:pb-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <SectionLabel index="04" en="Domains" ja="保有ドメイン" />
        <Reveal>
          <div className="grid gap-10 md:grid-cols-12">
            <p className="text-sm leading-[2.2] text-[var(--body)] md:col-span-4">
              当社が保有しているドメインの一覧です。
              <br />
              取得をご検討の方は、お問い合わせください。
              <a
                href="mailto:info@cfac.co.jp?subject=ドメイン取得に関するお問い合わせ"
                className="mt-6 flex items-center gap-2 font-display text-sm text-[var(--ink)]"
              >
                <span className="border-b border-current pb-0.5">ドメインについてお問い合わせ</span>
                <Arrow />
              </a>
            </p>
            <ul className="grid grid-cols-1 border-t border-[var(--line)] sm:grid-cols-2 md:col-span-8 lg:grid-cols-3">
              {DOMAINS.map((d) => (
                <li key={d} className="border-b border-[var(--line)] py-3 font-display text-sm text-[var(--ink)]">
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 bg-[#111111] py-28 text-white md:py-40">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <Reveal>
          <p className="mb-8 text-xs tracking-[0.2em] text-white/50">お問い合わせ</p>
          <h2 className="font-display text-5xl leading-none tracking-[-0.03em] md:text-8xl">Get in touch</h2>
          <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12">
            <p className="text-sm leading-[2.2] text-white/70 md:col-span-5">
              サービスへの掲載、事業提携、ドメイン、取材などのご相談は、メールでお受けしています。
              内容が固まっていない段階でも、お気軽にご連絡ください。
            </p>
            <div className="md:col-span-6 md:col-start-7">
              <a
                href="mailto:info@cfac.co.jp"
                className="group flex items-center justify-between border-b border-white/30 pb-4 font-display text-2xl transition-colors hover:border-white md:text-4xl"
              >
                info@cfac.co.jp
                <Arrow className="h-6 w-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </a>
              <p className="mt-4 text-xs text-white/50">営業時間：平日 10:00～18:00</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#111111] pb-10 text-white">
      <div className="mx-auto max-w-[1440px] border-t border-white/15 px-5 pt-14 md:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <LogoFull height={28} color="#ffffff" />
            <p className="mt-5 text-xs leading-loose text-white/50">
              Common Future &amp; Company 株式会社
              <br />
              神奈川県逗子市小坪6-6-46
            </p>
          </div>
          <div className="md:col-span-2">
            <p className="mb-4 font-display text-xs text-white/40">Menu</p>
            <ul className="space-y-3 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-white/70 transition-colors hover:text-white">
                    {item.ja}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-6">
            <p className="mb-4 font-display text-xs text-white/40">Products</p>
            <ul className="space-y-3 text-sm">
              {PRODUCTS.map((p) => (
                <li key={p.key}>
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-white/70 transition-colors hover:text-white">
                    {p.anchor}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-4 border-t border-white/15 pt-6 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>&copy; 2026 Common Future &amp; Co. 株式会社</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="/privacy" className="hover:text-white">プライバシーポリシー</a>
            <a href="/terms" className="hover:text-white">利用規約</a>
            <a href="/tokushoho" className="hover:text-white">特商法表記</a>
            <a href="#" className="font-display hover:text-white">Back to top ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Statement />
        <LogoMarquee />
        <Products />
        <News />
        <About />
        <Domains />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
