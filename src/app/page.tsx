"use client";

import { useState, useEffect, useRef } from "react";

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
        <a href="#" className={`text-xl font-bold tracking-tight ${scrolled ? "text-[#1a1a1a]" : "text-white"}`}>
          Common Future & Co.
        </a>
        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                scrolled ? "text-[#4b5563] hover:text-[#1a1a1a]" : "text-gray-300 hover:text-white"
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
              className="block px-6 py-3 text-sm text-[#4b5563] hover:text-[#1a1a1a] hover:bg-gray-50"
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <p className="text-blue-400 text-sm font-medium tracking-[0.3em] uppercase mb-6 opacity-0 animate-fade-in-up">
          Common Future & Company
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8 opacity-0 animate-fade-in-up animate-delay-200">
          「選べる」を増やし、
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            事業の未来を前に進める
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 opacity-0 animate-fade-in-up animate-delay-400">
          テクノロジーと運用設計の両面から、
          <br className="hidden md:block" />
          意思決定のスピードと透明性を高めます
        </p>
        <div className="opacity-0 animate-fade-in-up animate-delay-600">
          <a
            href="#about"
            className="inline-flex items-center gap-2 bg-white text-[#0f172a] px-8 py-4 rounded-full font-medium hover:bg-blue-50 transition-colors"
          >
            詳しく見る
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5">
              <path d="M8 3v10M8 13l4-4M8 13L4 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/40 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
}

function About() {
  const { ref, isVisible } = useInView();

  return (
    <section id="about" className="py-28 md:py-36 bg-white" ref={ref}>
      <div className={`max-w-5xl mx-auto px-6 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} transition-all duration-700`}>
        <div className="text-center mb-16">
          <p className="text-blue-600 text-sm font-medium tracking-[0.2em] uppercase mb-3">About Us</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a]">当社について</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-full aspect-[4/3] bg-gradient-to-br from-[#1e293b] to-[#334155] rounded-2xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `radial-gradient(circle at 30% 50%, rgba(59,130,246,0.3) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(6,182,212,0.3) 0%, transparent 50%)`,
              }} />
              <div className="text-center z-10">
                <div className="text-5xl font-bold text-white mb-2">CF&C</div>
                <div className="text-blue-300 text-sm tracking-[0.2em]">SINCE 2015</div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-[#1a1a1a]">
              複雑な領域を、テクノロジーで明快にする
            </h3>
            <p className="text-[#4b5563] leading-relaxed">
              複雑で分かりにくい領域に対して、テクノロジーと運用設計の両面からアプローチし、意思決定のスピードと透明性を高めます。
            </p>
            <p className="text-[#4b5563] leading-relaxed">
              AIを基盤としたネットサービスの開発・運営を通じて、ビジネスの選択肢を広げ、事業の未来を前に進めるお手伝いをしています。
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="border-l-2 border-blue-500 pl-4">
                <div className="text-2xl font-bold text-[#1a1a1a]">2015</div>
                <div className="text-sm text-[#6b7280]">設立</div>
              </div>
              <div className="border-l-2 border-cyan-500 pl-4">
                <div className="text-2xl font-bold text-[#1a1a1a]">3,520万円</div>
                <div className="text-sm text-[#6b7280]">資本金</div>
              </div>
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
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      ),
      title: "フォクナビ",
      subtitle: "Facnavi",
      description: "日本最大級のファクタリング比較・口コミサイト。最適なファクタリング会社を簡単に比較・検討できるプラットフォームです。",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
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
      subtitle: "グローバルトレンドウォッチ",
      description: "AI監視型メディア・SNSトレンド発掘サービス。Reddit、ProductHunt、HackerNewsから日本未進出のビジネストレンドをいち早く配信します。",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600",
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
      subtitle: "Factoring Lab",
      description: "資金調達に関する総合情報サイト。ファクタリングをはじめとした多様な資金調達手段を比較・解説します。",
      bgColor: "bg-cyan-50",
      textColor: "text-cyan-600",
    },
  ];

  return (
    <section id="services" className="py-28 md:py-36 bg-[#f8f9fa]" ref={ref}>
      <div className={`max-w-6xl mx-auto px-6 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} transition-all duration-700`}>
        <div className="text-center mb-16">
          <p className="text-blue-600 text-sm font-medium tracking-[0.2em] uppercase mb-3">Services</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">業務内容</h2>
          <p className="text-[#6b7280] max-w-xl mx-auto">
            AIを基盤としたネットサービスの開発・運営を行っています
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className={`w-14 h-14 ${service.bgColor} ${service.textColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-1">{service.title}</h3>
              <p className="text-xs text-[#9ca3af] mb-4 tracking-wider">{service.subtitle}</p>
              <p className="text-[#4b5563] text-sm leading-relaxed">{service.description}</p>
            </div>
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
    { label: "所在地", value: "神奈川県横浜市中区小伝6-6-46" },
    { label: "メール", value: "info@cfac.co.jp" },
    { label: "営業時間", value: "平日 10:00～18:00" },
    { label: "事業内容", value: "AI基盤ネットサービスの開発・運営" },
  ];

  return (
    <section id="company" className="py-28 md:py-36 bg-white" ref={ref}>
      <div className={`max-w-4xl mx-auto px-6 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} transition-all duration-700`}>
        <div className="text-center mb-16">
          <p className="text-blue-600 text-sm font-medium tracking-[0.2em] uppercase mb-3">Company</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a]">会社概要</h2>
        </div>
        <div className="bg-[#f8f9fa] rounded-2xl overflow-hidden">
          {items.map((item, i) => (
            <div key={i} className={`flex flex-col md:flex-row ${i !== items.length - 1 ? "border-b border-gray-200" : ""}`}>
              <div className="md:w-48 px-8 py-5 bg-[#f1f3f5] font-medium text-sm text-[#374151]">
                {item.label}
              </div>
              <div className="flex-1 px-8 py-5 text-sm text-[#4b5563]">{item.value}</div>
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
    <section id="contact" className="py-28 md:py-36 bg-[#f8f9fa]" ref={ref}>
      <div className={`max-w-3xl mx-auto px-6 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} transition-all duration-700`}>
        <div className="text-center mb-16">
          <p className="text-blue-600 text-sm font-medium tracking-[0.2em] uppercase mb-3">Contact</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">お問い合わせ</h2>
          <p className="text-[#6b7280]">お気軽にお問い合わせください</p>
        </div>
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
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
    <footer className="bg-[#1a1a2e] text-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-lg font-bold mb-4">Common Future & Co.</h3>
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
              <li>
                <span className="text-gray-400 text-sm">フォクナビ</span>
              </li>
              <li>
                <span className="text-gray-400 text-sm">Global Trend Watch</span>
              </li>
              <li>
                <span className="text-gray-400 text-sm">ファクタリング比較ラボ</span>
              </li>
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
