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
    { label: "当社について", href: "#about" },
    { label: "業務内容", href: "#services" },
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
        {/* Desktop nav */}
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
        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニュー"
        >
          <span
            className={`w-6 h-0.5 transition-transform ${scrolled ? "bg-[#1a1a1a]" : "bg-white"} ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span className={`w-6 h-0.5 transition-opacity ${scrolled ? "bg-[#1a1a1a]" : "bg-white"} ${menuOpen ? "opacity-0" : ""}`} />
          <span
            className={`w-6 h-0.5 transition-transform ${scrolled ? "bg-[#1a1a1a]" : "bg-white"} ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>
      {/* Mobile menu */}
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
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8 opacity-0 animate-fade-in-up animate-delay-200">
          「選べる」を増やし、
          <br />
          事業の未来を前に進める
        </h1>
        <p className="text-base md:text-lg text-gray-400 max-w-xl mx-auto mb-12 opacity-0 animate-fade-in-up animate-delay-400">
          テクノロジーと運用設計の両面から、
          <br className="hidden md:block" />
          意思決定のスピードと透明性を高めます
        </p>
        <div className="opacity-0 animate-fade-in-up animate-delay-600">
          <a
            href="#about"
            className="inline-block border border-white/30 text-white px-8 py-3 rounded text-sm hover:bg-white hover:text-[#0f172a] transition-all"
          >
            詳しく見る
          </a>
        </div>
      </div>
    </section>
  );
}

function About() {
  const { ref, isVisible } = useInView();

  return (
    <section id="about" className="py-24 md:py-32 bg-white" ref={ref}>
      <div className={`max-w-2xl mx-auto px-6 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} transition-all duration-700`}>
        <p className="text-sm text-[#9ca3af] tracking-[0.2em] uppercase mb-3 text-center">About Us</p>
        <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-8 text-center">当社について</h2>
        <p className="text-[#374151] leading-loose mb-5 text-[15px]">
          複雑で分かりにくい領域に対して、テクノロジーと運用設計の両面からアプローチし、意思決定のスピードと透明性を高めます。
        </p>
        <p className="text-[#374151] leading-loose text-[15px]">
          AIを基盤としたネットサービスの開発・運営を通じて、ビジネスの選択肢を広げ、事業の未来を前に進めるお手伝いをしています。
        </p>
      </div>
    </section>
  );
}

function Services() {
  const { ref, isVisible } = useInView();

  const services = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
      title: "CASH NOW",
      subtitle: "AIファクタリングで最短10分の資金調達",
      description: "AIが審査するオンライン完結のファクタリングサービス。請求書を送るだけで最短10分で資金化。",
      bgColor: "bg-amber-50",
      textColor: "text-amber-600",
      url: "https://cash.co.jp",
      badge: "2026年4月ローンチ予定",
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: "MUSU",
      subtitle: "AIマルチエージェントチャット",
      description: "AIが、あなたの仕事仲間になる。フリーランス・個人事業主のためのAIエージェントチーム。ひとりだけど、ひとりじゃない。",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      url: "https://musu.world",
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      ),
      title: "フォクナビ",
      subtitle: "日本最大級のファクタリング比較・口コミサイト",
      description: "最適なファクタリング会社を簡単に比較・検討できるプラットフォームです。",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      url: "https://facnavi.com",
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
          <line x1="14" y1="4" x2="10" y2="20" />
        </svg>
      ),
      title: "ClaudeCode.Tokyo",
      subtitle: "Claude Code & エージェントのニュースメディア",
      description: "Claude Code（Anthropic公式CLI）の使い方・Tips・最新ニュース・AIエージェント開発の情報を日本語で発信。",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      url: "https://claudecode.tokyo",
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
      title: "Global Trend Watch",
      subtitle: "海外で話題、日本未上陸のビジネストレンド",
      description: "世界中のメディア・SNSをAIが24時間監視。海外でバズっているのに日本ではまだ知られていないビジネス・サービス・トレンドを配信。",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600",
      url: "https://gtw.today",
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
      title: "ファクタリング比較ラボ",
      subtitle: "資金調達の総合情報サイト",
      description: "ファクタリングをはじめとした多様な資金調達手段を比較・解説します。",
      bgColor: "bg-cyan-50",
      textColor: "text-cyan-600",
    },
  ];

  return (
    <section id="services" className="py-24 md:py-32 bg-[#f8f9fa]" ref={ref}>
      <div className={`max-w-5xl mx-auto px-6 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} transition-all duration-700`}>
        <div className="text-center mb-14">
          <p className="text-sm text-[#9ca3af] tracking-[0.2em] uppercase mb-3">Services</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-3">運営するサービス</h2>
          <p className="text-sm text-[#6b7280]">AIを基盤としたネットサービスの開発・運営を行っています</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => {
            const Card = (
              <div
                key={i}
                className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 group relative ${service.url ? "cursor-pointer" : ""}`}
              >
                {"badge" in service && service.badge && (
                  <span className="absolute top-4 right-4 bg-amber-100 text-amber-700 text-[10px] font-bold px-3 py-1 rounded-full">
                    {service.badge}
                  </span>
                )}
                <div className={`w-12 h-12 ${service.bgColor} ${service.textColor} rounded-lg flex items-center justify-center mb-5`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-1">{service.title}</h3>
                <p className="text-xs text-[#9ca3af] mb-4">{service.subtitle}</p>
                <p className="text-[#374151] text-sm leading-loose mb-4">{service.description}</p>
                {service.url && (
                  <span className="text-xs text-[#9ca3af] group-hover:text-blue-500 transition-colors flex items-center gap-1">
                    {service.url.replace("https://", "")}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </span>
                )}
              </div>
            );
            return service.url ? (
              <a key={i} href={service.url} target="_blank" rel="noopener noreferrer" className="block">
                {Card}
              </a>
            ) : (
              Card
            );
          })}
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
      <div className={`max-w-2xl mx-auto px-6 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} transition-all duration-700`}>
        <div className="text-center mb-12">
          <p className="text-sm text-[#9ca3af] tracking-[0.2em] uppercase mb-3">Contact</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-3">お問い合わせ</h2>
          <p className="text-sm text-[#6b7280]">お気軽にお問い合わせください</p>
        </div>
        <div className="bg-white rounded-xl p-8 md:p-10 shadow-sm">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">お名前</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm"
                  placeholder="山田 太郎"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">メールアドレス</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-2">件名</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm"
                placeholder="お問い合わせ件名"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-2">お問い合わせ内容</label>
              <textarea
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm resize-none"
                placeholder="お問い合わせ内容をご記入ください"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#1a1a2e] text-white py-4 rounded-lg font-medium hover:bg-[#2a2a4e] transition-colors"
            >
              送信する
            </button>
          </form>
          <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            <p className="text-sm text-[#6b7280]">
              メールでのお問い合わせ：
              <a href="mailto:info@cfac.co.jp" className="text-blue-600 hover:underline ml-1">
                info@cfac.co.jp
              </a>
            </p>
            <p className="text-sm text-[#6b7280] mt-2">営業時間：平日 10:00～18:00</p>
          </div>
        </div>
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
              AIを基盤としたネットサービスの
              <br />
              開発・運営を行っています。
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-4">ナビゲーション</h4>
            <ul className="space-y-3">
              {[
                { label: "当社について", href: "#about" },
                { label: "業務内容", href: "#services" },
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
                { label: "フォクナビ", href: "https://facnavi.com" },
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
        <About />
        <Services />
        <Company />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
