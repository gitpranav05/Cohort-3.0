

"use client";

import { useState } from "react";

const ArrowUpRight = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M5.5 14.5 14.5 5.5M7 5.5h7.5V13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Sparkle = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="m10 2 1.1 5.9L17 10l-5.9 1.1L10 17l-1.1-5.9L3 10l5.9-2.1L10 2Z" fill="currentColor" />
  </svg>
);

const Check = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0">
    <path d="m3.25 8.25 3 3 6.5-6.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function CanvasPreview() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;

    setPointer({ x, y });
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setPointer({ x: 0, y: 0 })}
      className="relative mx-auto w-full max-w-[620px] rounded-[22px] border border-[#24211f]/15 bg-[#fffdf8] p-2 shadow-[0_30px_70px_rgba(67,48,30,0.2)] transition-transform duration-200 ease-out will-change-transform sm:p-3"
      style={{
        transform: `perspective(1000px) rotateX(${pointer.y * -3}deg) rotateY(${pointer.x * 4}deg) translate3d(${pointer.x * 5}px, ${pointer.y * 5}px, 0) rotate(1.5deg)`,
      }}
    >
      <div className="overflow-hidden rounded-[15px] border border-[#24211f]/10 bg-[#fffdf8]">
        <div className="flex h-11 items-center justify-between border-b border-[#24211f]/10 px-3 sm:px-4">
          <div className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[#ff6b4a]" /><span className="h-2.5 w-2.5 rounded-full bg-[#f7c948]" /><span className="h-2.5 w-2.5 rounded-full bg-[#5fcf92]" /></div>
          <div className="rounded-md bg-[#f4efe7] px-3 py-1 text-[9px] font-semibold tracking-[0.18em] text-[#81796f]">UNTITLED CANVAS</div>
          <div className="h-5 w-5 rounded-full bg-[#d8d0c3]" />
        </div>
        <div className="relative aspect-[1.35/1] overflow-hidden bg-[radial-gradient(#ded7ce_0.8px,transparent_0.8px)] [background-size:16px_16px] sm:aspect-[1.5/1]">
          <svg viewBox="0 0 600 390" className="absolute inset-0 h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M78 270C125 239 154 178 187 148c31-28 56-33 87-3 25 24 43 64 82 65 40 1 66-35 99-70" stroke="#3e3833" strokeWidth="3" strokeLinecap="round" />
            <path d="M80 270c21 10 43 13 67 9" stroke="#3e3833" strokeWidth="3" strokeLinecap="round" />
            <path d="m450 142 10-2-1 10" stroke="#3e3833" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M181 137c9-34 46-47 73-28 12 8 19 21 20 35-29-9-63-12-93-7Z" fill="#ffd879" stroke="#3e3833" strokeWidth="3" strokeLinejoin="round" />
            <path d="M195 143c4-12 11-20 20-25M217 138c5-17 15-28 29-34M240 140c5-13 12-21 21-27" stroke="#3e3833" strokeWidth="2.5" strokeLinecap="round" />
            <rect x="352" y="213" width="101" height="68" rx="8" fill="#d9f3e3" stroke="#3e3833" strokeWidth="3" />
            <path d="m369 264 20-17 13 9 19-24 18 20" stroke="#3e3833" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="382" cy="232" r="5" fill="#ff7d62" stroke="#3e3833" strokeWidth="2.5" />
            <path d="M204 320h229M265 320v-25M356 320v-25" stroke="#3e3833" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M234 344c31-11 53-11 81 0 28-12 58-12 91 0" stroke="#ff7259" strokeWidth="4" strokeLinecap="round" />
            <path d="M112 82h79M125 93h41" stroke="#766b61" strokeWidth="2" strokeLinecap="round" strokeDasharray="7 8" />
          </svg>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-xl border border-[#24211f]/10 bg-white/90 p-1.5 shadow-[0_7px_20px_rgba(67,48,30,0.12)] backdrop-blur sm:bottom-5">
            {['↖', '⌁', '□', 'T', '⌕'].map((tool, index) => <span key={tool} className={`grid h-7 w-7 place-items-center rounded-lg text-sm ${index === 1 ? 'bg-[#ff7259] text-white' : 'text-[#62594f]'}`}>{tool}</span>)}
          </div>
        </div>
      </div>
      <div className="absolute -bottom-8 -left-6 hidden -rotate-6 rounded-xl border border-[#24211f]/10 bg-[#fffdf8] px-3 py-2 text-[11px] font-semibold text-[#62594f] shadow-lg sm:block">made with a little magic <span className="ml-1 text-[#ff7259]">✦</span></div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f2ea] text-[#24211f] selection:bg-[#ffd879] selection:text-[#24211f]">
      <div className="relative isolate">
        <div className="pointer-events-none absolute left-[-12rem] top-[-10rem] -z-10 h-[28rem] w-[28rem] rounded-full bg-[#ffd879]/25 blur-3xl" />
        <div className="pointer-events-none absolute right-[-10rem] top-[28rem] -z-10 h-[30rem] w-[30rem] rounded-full bg-[#d9f3e3]/60 blur-3xl" />

        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-6 sm:px-8 lg:px-10">
          <a href="#top" className="flex items-center gap-2.5" aria-label="Sketchly home"><span className="grid h-9 w-9 -rotate-6 place-items-center rounded-[11px] bg-[#ff7259] text-lg font-bold text-white shadow-[3px_3px_0_#24211f]">✦</span><span className="text-xl font-black tracking-[-0.06em]">sketchly</span></a>
          <div className="hidden items-center gap-8 text-sm font-medium text-[#6d645c] md:flex"><a href="#how-it-works" className="transition-colors hover:text-[#24211f]">How it works</a><a href="#features" className="transition-colors hover:text-[#24211f]">Features</a><a href="#stories" className="transition-colors hover:text-[#24211f]">Stories</a></div>
          <div className="flex items-center gap-3 text-sm font-semibold"><a href="/signin" className="hidden px-2 py-2 text-[#6d645c] transition-colors hover:text-[#24211f] sm:block">Log in</a><a href="/signup" className="rounded-full bg-[#24211f] px-4 py-2.5 text-white transition-transform hover:-translate-y-0.5 sm:px-5">Start creating <span className="ml-1">↗</span></a></div>
        </nav>

        <section id="top" className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-12 sm:px-8 sm:pt-16 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16 lg:px-10 lg:pb-32 lg:pt-24">
          <div className="max-w-xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#24211f]/10 bg-white/55 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#6d645c]"><Sparkle className="h-3.5 w-3.5 text-[#ff7259]" />Ideas, made visible</div>
            <h1 className="max-w-2xl text-[clamp(3.5rem,8vw,6.7rem)] font-black leading-[0.88] tracking-[-0.09em] text-[#24211f]">Think it.<br /><span className="relative inline-block text-[#ff7259]">Sketch it.<span className="absolute -bottom-3 left-1 h-2 w-[92%] -rotate-2 rounded-[50%] border-t-[3px] border-[#ff7259] sm:-bottom-4" /></span><br />Share it.</h1>
            <p className="mt-8 max-w-md text-base leading-7 text-[#6d645c] sm:text-lg sm:leading-8">A beautifully simple canvas for your not-so-simple ideas. Map the big picture, chase the tiny details, and make space for your best thinking.</p>
            <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center"><a href="/signup" className="group inline-flex items-center gap-3 rounded-full bg-[#ff7259] px-6 py-3.5 text-sm font-bold text-white shadow-[4px_4px_0_#24211f] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0_#24211f]">Open a free canvas <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a><a href="#how-it-works" className="inline-flex items-center gap-2 px-2 py-2 text-sm font-bold text-[#6d645c] transition-colors hover:text-[#24211f]">See how it works <span className="text-base">↓</span></a></div>
            <div className="mt-9 flex items-center gap-3 text-xs font-medium text-[#81796f]"><div className="flex -space-x-2">{['bg-[#f3b5a1]', 'bg-[#b7d7c3]', 'bg-[#e5c6f1]', 'bg-[#f6d785]'].map((color, index) => <span key={color} className={`grid h-7 w-7 place-items-center rounded-full border-2 border-[#f7f2ea] ${color} text-[9px] font-black text-[#4e463f]`}>{['AM', 'JS', 'RK', '✦'][index]}</span>)}</div><span>Loved by 40,000+ curious minds</span></div>
          </div>
          <div className="relative px-1 py-5 sm:px-5 lg:py-0"><div className="absolute -right-1 top-0 hidden rotate-12 text-[#ff7259] sm:block"><svg width="62" height="45" viewBox="0 0 62 45" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 38C23 37 31 27 39 9M39 9l-8 5M39 9l2 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg><span className="ml-4 text-xs font-bold">your brain, but organized</span></div><CanvasPreview /></div>
        </section>
      </div>

      <section id="how-it-works" className="border-y border-[#24211f]/10 bg-[#fffdf8]"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3 md:gap-8 lg:px-10 lg:py-20">{[['01', 'Start anywhere', 'A blank canvas is an invitation, not an assignment. Drop in a thought, a shape, or a question.'], ['02', 'Find the thread', 'Move things around until the connections click. Your ideas can be messy here.'], ['03', 'Bring people in', 'Share a link and turn solo sparks into a shared space for better ideas.']].map(([number, title, copy]) => <div key={number} className="relative border-l-2 border-[#ff7259] pl-5 sm:pl-6"><span className="text-xs font-black tracking-[0.18em] text-[#ff7259]">{number}</span><h2 className="mt-3 text-xl font-black tracking-[-0.04em]">{title}</h2><p className="mt-2 max-w-xs text-sm leading-6 text-[#81796f]">{copy}</p></div>)}</div></section>

      <section id="features" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28"><div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"><div><p className="text-xs font-black uppercase tracking-[0.2em] text-[#ff7259]">Built for the in-between</p><h2 className="mt-5 max-w-lg text-4xl font-black leading-[0.95] tracking-[-0.07em] sm:text-5xl">The space between a spark and a breakthrough.</h2></div><p className="max-w-md justify-self-end text-base leading-7 text-[#6d645c]">Sketchly gives your thoughts room to breathe. No rigid templates, no steep learning curve—just a flexible place to get the idea out of your head and into the world.</p></div><div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{[{ icon: '✎', title: 'Feels like paper', copy: 'Natural tools and a tactile feel that keep you in the flow.', color: 'bg-[#ffd879]' }, { icon: '◎', title: 'Grows with you', copy: 'Zoom from one tiny note to the whole universe of your project.', color: 'bg-[#d9f3e3]' }, { icon: '↗', title: 'Easy to share', copy: 'Invite your people in with one link. No onboarding tour required.', color: 'bg-[#f4d8ef]' }].map((feature) => <article key={feature.title} className="rounded-2xl border border-[#24211f]/10 bg-white/60 p-6 transition-transform hover:-translate-y-1"><div className={`grid h-11 w-11 place-items-center rounded-xl ${feature.color} text-xl font-bold text-[#3e3833]`}>{feature.icon}</div><h3 className="mt-7 text-lg font-black tracking-[-0.04em]">{feature.title}</h3><p className="mt-2 text-sm leading-6 text-[#81796f]">{feature.copy}</p></article>)}</div></section>

      <section id="stories" className="mx-5 mb-16 overflow-hidden rounded-[2rem] bg-[#24211f] px-6 py-14 text-[#fffdf8] sm:mx-8 sm:px-12 lg:mx-auto lg:mb-24 lg:max-w-7xl lg:px-20 lg:py-20"><div className="grid gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-center"><div><Sparkle className="h-7 w-7 text-[#ffd879]" /><blockquote className="mt-7 max-w-2xl text-3xl font-black leading-tight tracking-[-0.06em] sm:text-5xl">“The best ideas used to disappear in my notes app. Now they have somewhere to become real.”</blockquote><p className="mt-7 text-sm font-bold text-[#aaa196]">Maya Chen <span className="mx-2 text-[#ff7259]">/</span> Product designer</p></div><div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"><p className="text-sm font-bold text-[#ffd879]">Everything you need to begin</p><ul className="mt-6 space-y-4 text-sm text-[#d4cec6]">{['Unlimited personal canvases', 'Simple sharing and collaboration', 'Export when you are ready'].map((item) => <li key={item} className="flex items-start gap-3"><Check />{item}</li>)}</ul><a href="/signup" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#fffdf8] px-5 py-3 text-sm font-bold text-[#24211f] transition-colors hover:bg-[#ffd879]">Make room for ideas <ArrowUpRight className="h-4 w-4" /></a></div></div></section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-4 px-5 pb-10 text-xs font-medium text-[#81796f] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10"><div className="flex items-center gap-2 font-black text-[#24211f]"><span className="grid h-6 w-6 place-items-center rounded-md bg-[#ff7259] text-[11px] text-white">✦</span> sketchly</div><p>Make space for your next good idea.</p><p>© 2025 Sketchly</p></footer>
    </main>
  );
}
