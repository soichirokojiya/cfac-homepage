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

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "私たちについて", href: "#about" },
    { label: "プロダクト", href: "#products" },
    { label: "保有ドメイン", href: "#domains" },
    { label: "会社概要", href: "#company" },
    { label: "お問い合わせ", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#">
          <LogoFull height={30} color={scrolled ? "#1a1a1a" : "#ffffff"} />
        </a>
        <nav className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                scrolled ? "text-[#374151] hover:text-[#1a1a1a]" : "text-gray-300 hover:text-white"
              }`}
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
          <span className={`w-6 h-0.5 transition-transform ${scrolled ? "bg-[#1a1a1a]" : "bg-white"} ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-6 h-0.5 transition-opacity ${scrolled ? "bg-[#1a1a1a]" : "bg-white"} ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`w-6 h-0.5 transition-transform ${scrolled ? "bg-[#1a1a1a]" : "bg-white"} ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 pb-4">
          {navItems.map((item) => (
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
    <section className="relative min-h-[90vh] flex items-center justify-center bg-[#0f172a]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-gray-400 text-sm tracking-[0.3em] uppercase mb-8 opacity-0 animate-fade-in-up">
          Common Future & Company
        </p>
        <h1 className="text-3xl md:text-[2.75rem] lg:text-5xl font-bold text-white leading-tight mb-8 opacity-0 animate-fade-in-up animate-delay-200">
          人が、もっと人間らしいことに
          <br />
          向かえる社会へ。
        </h1>
        <p className="text-base md:text-lg text-gray-400 max-w-xl mx-auto mb-4 opacity-0 animate-fade-in-up animate-delay-400">
          面倒な仕事を減らし、伝わらないすれ違いをやわらげる。
          <br className="hidden md:block" />
          AIの力で、人の時間と余白を取り戻すプロダクトをつくっています。
        </p>
        <p className="text-sm text-gray-500 max-w-lg mx-auto mb-12 opacity-0 animate-fade-in-up animate-delay-400">
          不要な業務負荷の削減とコミュニケーションの円滑化——
          <br className="hidden md:block" />
          この2つの領域で、AIプロダクトを開発・運営する会社です。
        </p>
        <div className="opacity-0 animate-fade-in-up animate-delay-600">
          <a
            href="#about"
            className="inline-block border border-white/30 text-white px-8 py-3 rounded text-sm hover:bg-white hover:text-[#0f172a] transition-all"
          >
            私たちについて
          </a>
        </div>
      </div>
    </section>
  );
}

function PainPoints() {
  const { ref, isVisible } = useInView();

  return (
    <section id="about" className="py-24 md:py-32 bg-white" ref={ref}>
      <div className={`max-w-4xl mx-auto px-6 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} transition-all duration-700`}>
        <div className="text-center mb-14">
          <p className="text-sm text-[#9ca3af] tracking-[0.2em] uppercase mb-3">What We Reduce</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a]">なくしたい、ふたつの消耗。</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-[#f8f9fa] rounded-xl p-8">
            <div className="w-12 h-12 bg-[#0f172a] rounded-lg flex items-center justify-center mb-5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#1a1a1a] mb-3">不要な業務負荷</h3>
            <p className="text-[#374151] text-sm leading-loose">
              本来やらなくていい作業、繰り返しの事務処理、判断を要しない確認作業——こうした業務が、人の時間とエネルギーを静かに奪っています。
            </p>
          </div>
          <div className="bg-[#f8f9fa] rounded-xl p-8">
            <div className="w-12 h-12 bg-[#0f172a] rounded-lg flex items-center justify-center mb-5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#1a1a1a] mb-3">コミュニケーションの摩擦</h3>
            <p className="text-[#374151] text-sm leading-loose">
              言いたいことが伝わらない、意図がずれる、気まずさから言い出せない——こうしたすれ違いが、人間関係を消耗させています。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function OpenUp() {
  const { ref, isVisible } = useInView();

  return (
    <section className="py-24 md:py-32 bg-[#0f172a]" ref={ref}>
      <div className={`max-w-2xl mx-auto px-6 text-center ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} transition-all duration-700`}>
        <p className="text-sm text-gray-400 tracking-[0.2em] uppercase mb-3">What We Open Up</p>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">その先にある、人間らしい時間。</h2>
        <p className="text-gray-400 leading-loose text-[15px]">
          面倒が減った先にあるのは、単なる空き時間ではありません。
          <br />
          創造、対話、学び、遊び、文化的な営み——
          <br />
          人がもっと本質的なことに向かえる余白を、私たちはひらきたいと考えています。
        </p>
      </div>
    </section>
  );
}

function Approach() {
  const { ref, isVisible } = useInView();

  return (
    <section className="py-24 md:py-32 bg-white" ref={ref}>
      <div className={`max-w-4xl mx-auto px-6 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} transition-all duration-700`}>
        <div className="text-center mb-14">
          <p className="text-sm text-[#9ca3af] tracking-[0.2em] uppercase mb-3">Our Approach</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a]">AIで、2つのアプローチから。</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="border border-gray-200 rounded-xl p-8">
            <span className="text-xs font-bold tracking-[0.15em] text-[#9ca3af] uppercase">Approach 01</span>
            <h3 className="text-xl font-bold text-[#1a1a1a] mt-3 mb-4">業務の負荷を減らす</h3>
            <p className="text-[#374151] text-sm leading-loose">
              AIによる業務自動化、資金調達の効率化、情報収集の省力化。人が判断と創造に集中できる環境をつくります。
            </p>
          </div>
          <div className="border border-gray-200 rounded-xl p-8">
            <span className="text-xs font-bold tracking-[0.15em] text-[#9ca3af] uppercase">Approach 02</span>
            <h3 className="text-xl font-bold text-[#1a1a1a] mt-3 mb-4">対話をなめらかにする</h3>
            <p className="text-[#374151] text-sm leading-loose">
              コミュニケーションの言い換え、要約、整理、仲介。人と人の間にある摩擦をやわらげます。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Products() {
  const { ref, isVisible } = useInView();

  const productGroups = [
    {
      label: "業務の負荷を減らす",
      products: [
        {
          logo: "/logos/cashnow.png",
          title: "CASH NOW",
          subtitle: "AIファクタリングで最短10分の資金調達",
          description: "AIが審査するオンライン完結のファクタリングサービス。請求書を送るだけで最短10分で資金化。",
          url: "https://cash.co.jp",
          badge: "2026年4月ローンチ予定",
        },
        {
          logo: "/logos/facutto.svg",
          title: "ファクット",
          subtitle: "日本最大級のファクタリング比較・口コミサイト",
          description: "最適なファクタリング会社を簡単に比較・検討できるプラットフォームです。",
          url: "https://facutto.jp",
        },
      ],
    },
  ];

  return (
    <section id="products" className="py-24 md:py-32 bg-[#f8f9fa]" ref={ref}>
      <div className={`max-w-5xl mx-auto px-6 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} transition-all duration-700`}>
        <div className="text-center mb-14">
          <p className="text-sm text-[#9ca3af] tracking-[0.2em] uppercase mb-3">Products</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a]">私たちのプロダクト</h2>
        </div>

        {productGroups.map((group) => (
          <div key={group.label} className="mb-12 last:mb-0">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-bold tracking-[0.1em] text-[#9ca3af]">{group.label}</span>
              <span className="flex-1 h-px bg-gray-300" />
            </div>
            <div className={`grid gap-8 ${group.products.length === 1 ? "md:grid-cols-1 max-w-lg" : group.products.length === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"}`}>
              {group.products.map((product, i) => (
                <a key={i} href={product.url} target="_blank" rel="noopener noreferrer" className="block">
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 group relative cursor-pointer h-full">
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
                      {product.url.replace("https://", "")}
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
        ))}
      </div>
    </section>
  );
}

function Domains() {
  const { ref, isVisible } = useInView();

  const domains = [
    "alexandrite.love",
    "banto.biz",
    "cash.co.jp",
    "claudecode.tokyo",
    "facnavi.info",
    "facutto.jp",
    "gtw.today",
    "ma-radar.jp",
    "musu.world",
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
    "shimasozai.shop",
    "socochi.com",
    "the-therm.jp",
    "warrant-pricer.com",
  ];

  return (
    <section id="domains" className="py-24 md:py-32 bg-white" ref={ref}>
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
    { label: "事業内容", value: "AIを活用した業務効率化・コミュニケーション支援プロダクトの開発・運営" },
  ];

  return (
    <section id="company" className="py-24 md:py-32 bg-white" ref={ref}>
      <div className={`max-w-3xl mx-auto px-6 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} transition-all duration-700`}>
        <div className="text-center mb-12">
          <p className="text-sm text-[#9ca3af] tracking-[0.2em] uppercase mb-3">Company</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a]">会社概要</h2>
        </div>
        <div className="bg-[#f8f9fa] rounded-xl overflow-hidden">
          {items.map((item, i) => (
            <div key={i} className={`flex flex-col md:flex-row ${i !== items.length - 1 ? "border-b border-gray-200" : ""}`}>
              <div className="md:w-48 px-8 py-5 bg-[#f1f3f5] font-medium text-sm text-[#374151]">
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
    <section id="contact" className="py-24 md:py-32 bg-[#f8f9fa]" ref={ref}>
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
    <footer className="bg-[#0f172a] text-white pt-14 pb-8">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <div className="mb-4"><LogoFull height={28} color="#ffffff" /></div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              人が、もっと人間らしいことに向かえる社会へ。
            </p>
            <a
              href="https://cfac.co.jp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300 transition-colors"
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
            <h4 className="text-sm font-medium text-gray-300 mb-4">ナビゲーション</h4>
            <ul className="space-y-3">
              {[
                { label: "私たちについて", href: "#about" },
                { label: "プロダクト", href: "#products" },
                { label: "保有ドメイン", href: "#domains" },
                { label: "会社概要", href: "#company" },
                { label: "お問い合わせ", href: "#contact" },
              ].map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-4">運営サービス</h4>
            <ul className="space-y-3">
              {[
                { label: "CASH NOW", href: "https://cash.co.jp" },
                { label: "ファクット", href: "https://facutto.jp" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-4">サイトポリシー</h4>
            <ul className="space-y-3">
              {[
                { label: "プライバシーポリシー", href: "/privacy" },
                { label: "利用規約", href: "/terms" },
                { label: "特定商取引法に基づく表記", href: "/tokushoho" },
              ].map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">&copy; 2026 <a href="https://cfac.co.jp" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">Common Future & Co. 株式会社</a> All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/privacy" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">プライバシーポリシー</a>
            <a href="/terms" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">利用規約</a>
            <a href="/tokushoho" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">特商法表記</a>
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
        <PainPoints />
        <OpenUp />
        <Approach />
        <Products />
        <Domains />
        <Company />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
