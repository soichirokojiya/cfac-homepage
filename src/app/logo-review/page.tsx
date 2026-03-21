export default function LogoReview() {
  const concepts = [
    {
      id: "A",
      name: "解放 — The Release",
      description: "ひとつの円が上方へ解き放たれる瞬間。閉じた円＝制約。開口部＝解放された可能性。ネガティブスペースが主役。",
      file: "/logos/concept-a.svg",
    },
    {
      id: "B",
      name: "一粒 — The Seed",
      description: "ひとつの点（ソロプレナー）から弧が生まれ広がる。書道の一筆のような始点と軌跡。日本的な「間」の美。",
      file: "/logos/concept-b.svg",
    },
    {
      id: "C",
      name: "共鳴 — Resonance",
      description: "中心の一点から同心の弧が外に広がる。ひとりの行動が波紋のように世界に広がっていく。発信する個人のメタファー。",
      file: "/logos/concept-c.svg",
    },
  ];

  return (
    <div className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">Logo Concepts</h1>
        <p className="text-center text-gray-500 mb-16 text-sm">Common Future & Company — ひとりの可能性を、解放する。</p>
        <div className="grid md:grid-cols-3 gap-12">
          {concepts.map((c) => (
            <div key={c.id} className="text-center">
              <div className="bg-gray-50 rounded-2xl p-8 mb-6 flex items-center justify-center aspect-square">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.file} alt={c.name} className="w-32 h-32" />
              </div>
              <div className="text-xs text-gray-400 mb-1">Concept {c.id}</div>
              <h2 className="font-bold text-lg mb-2">{c.name}</h2>
              <p className="text-sm text-gray-500 leading-relaxed">{c.description}</p>
              {/* Dark background version */}
              <div className="bg-[#0f172a] rounded-xl p-6 mt-4 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.file} alt={c.name} className="w-16 h-16 invert" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
