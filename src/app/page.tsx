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
    { label: "ビジョン", href: "#vision" },
    { label: "サービス", href: "#services" },
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
          Unlock the power of one
        </p>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8 opacity-0 animate-fade-in-up animate-delay-200">
          ひとりの可能性を、<br />解放する。
        </h1>
        <p className="text-base md:text-lg text-gray-400 max-w-xl mx-auto mb-12 opacity-0 animate-fade-in-up animate-delay-400">
          資金も、仲間も、情報も——AIが、あなたのそばに。
          <br className="hidden md:block" />
          ソロプレナーの時代を切り拓くサービスを届けます。
        </p>
        <div className="opacity-0 animate-fade-in-up animate-delay-600">
          <a
            href="#vision"
            className="inline-block border border-white/30 text-white px-8 py-3 rounded text-sm hover:bg-white hover:text-[#0f172a] transition-all"
          >
            私たちについて
          </a>
        </div>
      </div>
    </section>
  );
}

function Vision() {
  const { ref, isVisible } = useInView();

  return (
    <section id="vision" className="py-24 md:py-32 bg-white" ref={ref}>
      <div className={`max-w-2xl mx-auto px-6 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} transition-all duration-700`}>
        <p className="text-sm text-[#9ca3af] tracking-[0.2em] uppercase mb-3 text-center">Vision & Mission</p>
        <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-10 text-center">ビジョン・ミッション</h2>

        {/* Vision */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold tracking-[0.15em] text-[#9ca3af] uppercase">Vision</span>
            <span className="flex-1 h-px bg-gray-200" />
          </div>
          <p className="text-xl md:text-2xl font-bold text-[#1a1a1a] leading-relaxed mb-4">
            ひとりで始めた挑戦が、<br />世界を変える力になる未来を。
          </p>
          <p className="text-[#6b7280] text-sm leading-relaxed">
            かつて事業を興すには、資金・人材・情報という3つの壁があった。AIの時代、その壁は溶けはじめている。私たちは、ひとりの意志と行動力があれば誰もが事業を創り、育てられる世界を実現します。
          </p>
        </div>

        {/* Mission */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold tracking-[0.15em] text-[#9ca3af] uppercase">Mission</span>
            <span className="flex-1 h-px bg-gray-200" />
          </div>
          <p className="text-[#374151] leading-loose text-[15px]">
            ソロプレナー・フリーランス・個人事業主の「ひとりの限界」を、AIとテクノロジーで解放する。資金調達、チームワーク、情報収集、意思決定——事業に必要なすべてを、ひとりの手の中に届けます。
          </p>
        </div>

        {/* Values */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-bold tracking-[0.15em] text-[#9ca3af] uppercase">Values</span>
            <span className="flex-1 h-px bg-gray-200" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-bold text-[#1a1a1a] mb-2 text-sm">Solo-First</h4>
              <p className="text-[#6b7280] text-sm leading-relaxed">「ひとりで完結できるか」をすべての設計基準にする。</p>
            </div>
            <div>
              <h4 className="font-bold text-[#1a1a1a] mb-2 text-sm">AI-Native</h4>
              <p className="text-[#6b7280] text-sm leading-relaxed">AIを補助でなく、プロダクトの核として組み込む。</p>
            </div>
            <div>
              <h4 className="font-bold text-[#1a1a1a] mb-2 text-sm">三方よし</h4>
              <p className="text-[#6b7280] text-sm leading-relaxed">使う人・社会・私たち、三方に価値が巡る事業だけをやる。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const { ref, isVisible } = useInView();

  const services = [
    {
      logo: "/logos/cashnow.png",
      title: "CASH NOW",
      subtitle: "AIファクタリングで最短10分の資金調達",
      description: "AIが審査するオンライン完結のファクタリングサービス。請求書を送るだけで最短10分で資金化。",
      url: "https://cash.co.jp",
      badge: "2026年4月ローンチ予定",
    },
    {
      logo: "/logos/musu.svg",
      title: "MUSU",
      subtitle: "AIマルチエージェントチャット",
      description: "AIが、あなたの仕事仲間になる。フリーランス・個人事業主のためのAIエージェントチーム。ひとりだけど、ひとりじゃない。",
      url: "https://musu.world",
    },
    {
      logo: "/logos/facnavi.svg",
      title: "ファクナビ",
      subtitle: "日本最大級のファクタリング比較・口コミサイト",
      description: "最適なファクタリング会社を簡単に比較・検討できるプラットフォームです。",
      url: "https://facnavi.com",
    },
    {
      logo: "/logos/claudecode-logo.svg",
      title: "ClaudeCode.Tokyo",
      subtitle: "Claude Code & エージェントのニュースメディア",
      description: "Claude Code（Anthropic公式CLI）の使い方・Tips・最新ニュース・AIエージェント開発の情報を日本語で発信。",
      url: "https://claudecode.tokyo",
    },
    {
      logo: "/logos/gtw-logo.svg",
      title: "Global Trend Watch",
      subtitle: "海外で話題、日本未上陸のビジネストレンド",
      description: "世界中のメディア・SNSをAIが24時間監視。海外でバズっているのに日本ではまだ知られていないビジネス・サービス・トレンドを配信。",
      url: "https://gtw.today",
    },
  ];

  return (
    <section id="services" className="py-24 md:py-32 bg-[#f8f9fa]" ref={ref}>
      <div className={`max-w-5xl mx-auto px-6 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} transition-all duration-700`}>
        <div className="text-center mb-14">
          <p className="text-sm text-[#9ca3af] tracking-[0.2em] uppercase mb-3">Services</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-3">運営するサービス</h2>
          <p className="text-sm text-[#6b7280]">ソロプレナーの挑戦を支えるプロダクト群</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <a key={i} href={service.url} target="_blank" rel="noopener noreferrer" className="block">
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 group relative cursor-pointer h-full">
                {"badge" in service && service.badge && (
                  <span className="absolute top-4 right-4 bg-amber-100 text-amber-700 text-[10px] font-bold px-3 py-1 rounded-full">
                    {service.badge}
                  </span>
                )}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={service.logo}
                  alt={`${service.title} logo`}
                  className="h-8 max-w-[160px] mb-5 object-contain object-left"
                />
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-1">{service.title}</h3>
                <p className="text-xs text-[#9ca3af] mb-4">{service.subtitle}</p>
                <p className="text-[#374151] text-sm leading-loose mb-4">{service.description}</p>
                <span className="text-xs text-[#9ca3af] group-hover:text-blue-500 transition-colors flex items-center gap-1">
                  {service.url.replace("https://", "")}
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

function Company() {
  const { ref, isVisible } = useInView();

  const items = [
    { label: "会社名", value: "Common Future & Company 株式会社" },
    { label: "法人番号", value: "9011001105902" },
    { label: "代表取締役", value: "鼈屋 総一朗" },
    { label: "設立", value: "2015年10月5日" },
    { label: "資本金", value: "3,520万円" },
    { label: "所在地", value: "神奈川県逗子市小坪6-6-46" },
    { label: "メール", value: "info@cfac.co.jp" },
    { label: "営業時間", value: "平日 10:00～18:00" },
    { label: "事業内容", value: "AI基盤ネットサービスの開発・運営" },
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
        <p className="text-sm text-[#6b7280] mb-8">お気軽にお問い合わせください</p>
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
    <footer className="bg-[#0f172a] text-white py-14">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="mb-4"><LogoFull height={28} color="#ffffff" /></div>
            <p className="text-gray-400 text-sm leading-relaxed">
              ひとりの可能性を、解放する。
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-4">ナビゲーション</h4>
            <ul className="space-y-3">
              {[
                { label: "ビジョン", href: "#vision" },
                { label: "サービス", href: "#services" },
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
                { label: "MUSU", href: "https://musu.world" },
                { label: "ファクナビ", href: "https://facnavi.com" },
                { label: "ClaudeCode.Tokyo", href: "https://claudecode.tokyo" },
                { label: "Global Trend Watch", href: "https://gtw.today" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-gray-500 text-sm">&copy; 2026 Common Future & Co. 株式会社 All rights reserved.</p>
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
        <Vision />
        <Services />
        <Company />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
