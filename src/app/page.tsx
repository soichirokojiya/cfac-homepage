"use client";

import { useState, useEffect, useRef } from "react";
import { LogoFull } from "./logo";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

const NAV_ITEMS = [
  { label: "プロダクト", href: "#products" },
  { label: "ニュース", href: "#news" },
  { label: "保有ドメイン", href: "#domains" },
  { label: "会社概要", href: "#company" },
  { label: "お問い合わせ", href: "#contact" },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#">
          <LogoFull height={30} color="#1a1a1a" />
        </a>
        <nav className="hidden md:flex gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[#374151] hover:text-[#1a1a1a] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニュー"
        >
          <span className={`w-6 h-0.5 bg-[#1a1a1a] transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-6 h-0.5 bg-[#1a1a1a] transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`w-6 h-0.5 bg-[#1a1a1a] transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 pb-4">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block px-6 py-3 text-sm text-[#374151] hover:text-[#1a1a1a] hover:bg-gray-50"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[68vh] flex items-center justify-center bg-white pt-20">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-[#9ca3af] text-sm tracking-[0.3em] uppercase mb-8 opacity-0 animate-fade-in-up">
          Common Future &amp; Company
        </p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1a1a] leading-tight mb-8 opacity-0 animate-fade-in-up animate-delay-200">
          Common Future &amp; Company
          <br className="md:hidden" />
          <span className="md:ml-3">株式会社</span>
        </h1>
        <p className="text-base md:text-lg text-[#6b7280] max-w-xl mx-auto mb-12 opacity-0 animate-fade-in-up animate-delay-400">
          AIプロダクトの開発・運営を行う会社です。
        </p>
        <div className="opacity-0 animate-fade-in-up animate-delay-600">
          <a
            href="#products"
            className="inline-block border border-[#1a1a1a] text-[#1a1a1a] px-8 py-3 rounded text-sm hover:bg-[#1a1a1a] hover:text-white transition-all"
          >
            プロダクトを見る
          </a>
        </div>
      </div>
    </section>
  );
}

function Products() {
  const { ref, isVisible } = useInView();

  const products = [
    {
      logo: "/logos/cashnow.png",
      title: "CASH NOW",
      subtitle: "AIファクタリングで最短10分の資金調達",
      description: "AIが審査するオンライン完結のファクタリングサービス。請求書を送るだけで最短10分で資金化。",
      url: "https://cash.co.jp",
      anchor: "最短60分で入金。オンライン完結のファクタリング",
      badge: "2026年ローンチ予定",
    },
    {
      logo: "/logos/facutto.svg",
      title: "ファクット",
      subtitle: "日本最大級のファクタリング比較・口コミサイト",
      description: "最適なファクタリング会社を簡単に比較・検討できるプラットフォームです。",
      url: "https://facutto.jp",
      anchor: "ファクタリング会社の比較サイト「ファクット」",
    },
    {
      logo: "/logos/sds.png",
      title: "ソーラーディールサーチ",
      subtitle: "太陽光発電所の取引事例データベース",
      description:
        "全国の事業用太陽光発電所を無料で検索できます。あわせて、公表データを2019年から突き合わせた売買の履歴を、月次レポートと元データで提供しています。",
      url: "https://sds.tokyo/",
      anchor: "太陽光発電所の検索と取引データベース「ソーラーディールサーチ」",
    },
  ];

  return (
    <section id="products" className="py-24 md:py-28 bg-white border-t border-gray-100" ref={ref}>
      <div className={`max-w-5xl mx-auto px-6 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} transition-all duration-700`}>
        <div className="text-center mb-14">
          <p className="text-sm text-[#9ca3af] tracking-[0.2em] uppercase mb-3">Products</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a]">プロダクト</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2 max-w-3xl mx-auto">
          {products.map((product, i) => (
            <a key={i} href={product.url} target="_blank" rel="noopener noreferrer" className="block">
              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-gray-300 hover:shadow-md transition-all duration-200 group relative cursor-pointer h-full">
                {"badge" in product && product.badge && (
                  <span className="absolute top-4 right-4 bg-amber-100 text-amber-700 text-[10px] font-bold px-3 py-1 rounded-full">
                    {product.badge}
                  </span>
                )}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.logo}
                  alt={`${product.title} logo`}
                  className="h-8 max-w-[160px] mb-5 object-contain object-left"
                />
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-1">{product.title}</h3>
                <p className="text-xs text-[#9ca3af] mb-4">{product.subtitle}</p>
                <p className="text-[#374151] text-sm leading-loose mb-4">{product.description}</p>
                <span className="text-xs text-[#9ca3af] group-hover:text-blue-500 transition-colors flex items-center gap-1">
                  {product.anchor}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function News() {
  const { ref, isVisible } = useInView();

  const releases = [
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

  return (
    <section id="news" className="py-24 md:py-28 bg-white border-t border-gray-100" ref={ref}>
      <div className={`max-w-3xl mx-auto px-6 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} transition-all duration-700`}>
        <div className="text-center mb-12">
          <p className="text-sm text-[#9ca3af] tracking-[0.2em] uppercase mb-3">News</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a]">ニュース</h2>
        </div>
        <ul className="border-t border-gray-200">
          {releases.map((item) => (
            <li key={item.url} className="border-b border-gray-200">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col md:flex-row md:items-start gap-2 md:gap-6 py-5 hover:bg-gray-50 -mx-4 px-4 rounded-lg transition-colors"
              >
                <span className="text-sm text-[#9ca3af] font-mono shrink-0 md:w-24 pt-0.5">{item.date}</span>
                <span className="text-sm text-[#374151] leading-relaxed group-hover:text-[#1a1a1a] transition-colors">
                  {item.title}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="text-center mt-10">
          <a
            href="https://prtimes.jp/main/html/searchrlp/company_id/47698"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-[#1a1a1a] hover:text-blue-600 transition-colors"
          >
            プレスリリース一覧（PR TIMES）
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

function Domains() {
  const { ref, isVisible } = useInView();

  const domains = [
    "cash.co.jp",
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

  return (
    <section id="domains" className="py-24 md:py-28 bg-white border-t border-gray-100" ref={ref}>
      <div className={`max-w-4xl mx-auto px-6 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} transition-all duration-700`}>
        <div className="text-center mb-12">
          <p className="text-sm text-[#9ca3af] tracking-[0.2em] uppercase mb-3">Domains</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-3">保有ドメイン</h2>
          <p className="text-sm text-[#6b7280] leading-loose">
            当社が保有しているドメインの一覧です。
            <br className="hidden md:block" />
            取得をご検討の方は、お問い合わせください。
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px bg-gray-200 border border-gray-200 rounded-xl overflow-hidden">
          {domains.map((domain) => (
            <div
              key={domain}
              className="bg-white px-4 py-4 text-center text-sm text-[#374151] font-mono tracking-tight"
            >
              {domain}
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <a
            href="mailto:info@cfac.co.jp?subject=ドメイン取得に関するお問い合わせ"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#1a1a1a] hover:text-blue-600 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            ドメインについてお問い合わせ
          </a>
        </div>
      </div>
    </section>
  );
}

function Company() {
  const { ref, isVisible } = useInView();

  const items = [
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

  return (
    <section id="company" className="py-24 md:py-28 bg-white border-t border-gray-100" ref={ref}>
      <div className={`max-w-3xl mx-auto px-6 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} transition-all duration-700`}>
        <div className="text-center mb-12">
          <p className="text-sm text-[#9ca3af] tracking-[0.2em] uppercase mb-3">Company</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a]">会社概要</h2>
        </div>
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          {items.map((item, i) => (
            <div key={i} className={`flex flex-col md:flex-row ${i !== items.length - 1 ? "border-b border-gray-200" : ""}`}>
              <div className="md:w-48 px-8 py-5 bg-[#f8f9fa] font-medium text-sm text-[#374151]">
                {item.label}
              </div>
              <div className="flex-1 px-8 py-5 text-sm text-[#374151]">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const { ref, isVisible } = useInView();

  return (
    <section id="contact" className="py-24 md:py-28 bg-white border-t border-gray-100" ref={ref}>
      <div className={`max-w-md mx-auto px-6 text-center ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} transition-all duration-700`}>
        <p className="text-sm text-[#9ca3af] tracking-[0.2em] uppercase mb-3">Contact</p>
        <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-3">お問い合わせ</h2>
        <p className="text-sm text-[#6b7280] mb-8">お問い合わせはメールにてお願いいたします</p>
        <a
          href="mailto:info@cfac.co.jp"
          className="inline-flex items-center gap-2 text-lg font-medium text-[#1a1a1a] hover:text-blue-600 transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          info@cfac.co.jp
        </a>
        <p className="text-sm text-[#9ca3af] mt-4">営業時間：平日 10:00～18:00</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-14 pb-8">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <div className="mb-4"><LogoFull height={28} color="#1a1a1a" /></div>
            <a
              href="https://cfac.co.jp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-[#9ca3af] hover:text-[#374151] transition-colors"
            >
              cfac.co.jp
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
          <div>
            <h4 className="text-sm font-medium text-[#1a1a1a] mb-4">ナビゲーション</h4>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-[#6b7280] hover:text-[#1a1a1a] text-sm transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-[#1a1a1a] mb-4">運営サービス</h4>
            <ul className="space-y-3">
              {[
                { label: "最短60分で入金。オンライン完結のファクタリング", href: "https://cash.co.jp" },
                { label: "ファクタリング会社の比較サイト「ファクット」", href: "https://facutto.jp" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-[#6b7280] hover:text-[#1a1a1a] text-sm transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-[#1a1a1a] mb-4">サイトポリシー</h4>
            <ul className="space-y-3">
              {[
                { label: "プライバシーポリシー", href: "/privacy" },
                { label: "利用規約", href: "/terms" },
                { label: "特定商取引法に基づく表記", href: "/tokushoho" },
              ].map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-[#6b7280] hover:text-[#1a1a1a] text-sm transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#9ca3af] text-xs">&copy; 2026 <a href="https://cfac.co.jp" target="_blank" rel="noopener noreferrer" className="hover:text-[#374151] transition-colors">Common Future & Co. 株式会社</a> All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/privacy" className="text-[#9ca3af] hover:text-[#374151] text-xs transition-colors">プライバシーポリシー</a>
            <a href="/terms" className="text-[#9ca3af] hover:text-[#374151] text-xs transition-colors">利用規約</a>
            <a href="/tokushoho" className="text-[#9ca3af] hover:text-[#374151] text-xs transition-colors">特商法表記</a>
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
      <main>
        <Hero />
        <Products />
        <News />
        <Domains />
        <Company />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
