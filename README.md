# LUMEN — Precision Lab

A next-generation immersive experience for laser epilation handpiece engineering.

## Overview

LUMEN — Precision Lab is a static Next.js site built for Cloudflare Pages. It features:

- **Six immersive sections** with scroll-cued navigation
- **Three.js canvas** behind content with procedural laser handpiece
- **Exploded view toggle** and blueprint visualization
- **Rotatable environment slider** for studio lighting
- **WebAudio** press-and-hold sound effects
- **ACES tone mapping** and bloom post-processing
- **Film grain overlay** for cinematic feel
- **Responsive dark editorial layout** with two-column callouts

## Tech Stack

- Next.js (static export)
- React Three Fiber + Drei
- Three.js with MeshPhysicalMaterial
- Post-processing (ACES, bloom, grain)
- WebAudio API for procedural sounds

## Build & Deploy

```bash
npm install
npm run build       # outputs to ./out
```

Deploy the `out` folder to Cloudflare Pages.

## License

MIT
