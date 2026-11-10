'use client';

import dynamic from 'next/dynamic';
import { Suspense, useState, useEffect } from 'react';

const LaserScene = dynamic(() => import('../components/LaserScene'), { ssr: false });

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [exploded, setExploded] = useState(false);
  const [blueprint, setBlueprint] = useState(false);
  const [envRotation, setEnvRotation] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen bg-[#050505] text-white selection:bg-white/20">
      {/* Three.js Background */}
      <div className="fixed inset-0 z-0">
        <Suspense fallback={null}>
          <LaserScene 
            exploded={exploded} 
            blueprint={blueprint} 
            envRotation={envRotation} 
          />
        </Suspense>
      </div>

      {/* UI Controls */}
      <div className="fixed top-8 right-8 z-50 flex flex-col gap-4 font-mono text-[10px] tracking-widest uppercase">
        <button 
          onClick={() => setExploded(!exploded)}
          className={`px-4 py-2 border transition-colors ${exploded ? 'bg-white text-black' : 'border-white/20 hover:border-white'}`}
        >
          {exploded ? 'Collapse View' : 'Exploded View'}
        </button>
        <button 
          onClick={() => setBlueprint(!blueprint)}
          className={`px-4 py-2 border transition-colors ${blueprint ? 'bg-blue-500 border-blue-500' : 'border-white/20 hover:border-white'}`}
        >
          {blueprint ? 'Physical' : 'Blueprint'}
        </button>
        <div className="flex flex-col gap-2 p-4 border border-white/10 bg-black/40 backdrop-blur-md">
          <label>Lighting Rotation</label>
          <input 
            type="range" 
            min="0" 
            max={Math.PI * 2} 
            step="0.01" 
            value={envRotation} 
            onChange={(e) => setEnvRotation(parseFloat(e.target.value))}
            className="w-32 accent-white"
          />
        </div>
      </div>

      {/* Content Sections */}
      <div className="relative z-10">
        {/* Section 1: Hero */}
        <section className="h-screen flex flex-col justify-center px-12 md:px-24">
          <h1 className="text-8xl md:text-[12rem] font-light tracking-tighter leading-none mb-4">
            LUMEN
          </h1>
          <p className="font-mono text-sm tracking-[0.3em] text-white/40 uppercase">
            Precision Lab — 0.05mm Tolerance
          </p>
        </section>

        {/* Section 2: Optics */}
        <section className="min-h-screen flex items-center px-12 md:px-24 py-32 bg-gradient-to-b from-transparent to-black/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl">
            <div className="space-y-6">
              <h2 className="text-4xl font-light tracking-tight">Optical Integrity</h2>
              <div className="w-12 h-[1px] bg-white/40" />
            </div>
            <div className="text-lg text-white/60 leading-relaxed font-light">
              Our handpiece features a dual-lens collimator system, ensuring every pulse of the 808nm diode laser maintains perfect parallelism. Minimal divergence, maximum efficacy.
            </div>
          </div>
        </section>

        {/* Section 3: Cooling */}
        <section className="min-h-screen flex items-center justify-end px-12 md:px-24 py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl text-right">
            <div className="md:order-2 space-y-6">
              <h2 className="text-4xl font-light tracking-tight">Thermal Velocity</h2>
              <div className="w-12 h-[1px] bg-white/40 ml-auto" />
            </div>
            <div className="md:order-1 text-lg text-white/60 leading-relaxed font-light">
              Integrated micro-channel sapphire cooling. The contact tip stays at a constant 4°C, protecting the epidermis while the dermis reaches therapeutic temperatures.
            </div>
          </div>
        </section>

        {/* Section 4: Ergonomics */}
        <section className="min-h-screen flex items-center px-12 md:px-24 py-32">
          <div className="max-w-4xl border-l border-white/10 pl-12">
            <h2 className="text-6xl font-extralight tracking-tighter mb-12">Sculpted for the Hand.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <p className="text-white/40 font-mono text-xs uppercase tracking-widest">
                [Analysis: Weight distribution 48/52 balance point centered at the trigger.]
              </p>
              <p className="text-xl font-light text-white/80">
                Reduced operator fatigue through iterative 3D printing and anatomical testing. The satin finish provides grip without texture.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Audio Interface */}
        <section className="min-h-screen flex flex-col items-center justify-center px-12 md:px-24 py-32 text-center">
          <div className="group cursor-pointer">
            <p className="font-mono text-[10px] tracking-[0.5em] uppercase text-white/20 mb-8 transition-colors group-hover:text-blue-400">
              Hold to engage resonance
            </p>
            <div className="w-64 h-64 rounded-full border border-white/5 flex items-center justify-center transition-all duration-700 group-hover:border-blue-500/50 group-hover:scale-105 active:scale-95">
              <div className="w-px h-12 bg-white/20 transition-all duration-500 group-hover:bg-blue-500 group-hover:h-24" />
            </div>
          </div>
        </section>

        {/* Section 6: Footer */}
        <section className="h-screen flex flex-col items-center justify-center px-12 md:px-24 border-t border-white/5">
          <h3 className="text-2xl font-light tracking-widest uppercase mb-12">Experience Precision.</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-24 font-mono text-[10px] text-white/30 uppercase tracking-widest">
            <div>
              <p className="text-white mb-2">Location</p>
              <p>Strasbourg / Lab 04</p>
            </div>
            <div>
              <p className="text-white mb-2">Spec</p>
              <p>0.05mm Bevel</p>
            </div>
            <div>
              <p className="text-white mb-2">Build</p>
              <p>v0.1.0-Static</p>
            </div>
            <div>
              <p className="text-white mb-2">Contact</p>
              <p>lumen@lab.xyz</p>
            </div>
          </div>
        </section>
      </div>

      {/* Post Processing Overlay (Grain) */}
      <div className="pointer-events-none fixed inset-0 z-[100] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
    </main>
  );
}
