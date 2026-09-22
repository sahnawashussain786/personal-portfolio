# Hussain — Full-Stack Developer Portfolio

A cinematic, WebGL-powered developer portfolio built with **Next.js 15**, **React 19**, **Three.js (React Three Fiber)**, **Tailwind CSS v4** and **Framer Motion**.

- Scroll-driven 3D camera that descends through a glowing particle universe
- Morphing hero core, orbital neon rings, crystal fields and portals
- Preloader, custom cursor, magnetic buttons, marquees, counters, film grain
- Working contact form that delivers messages to **sahnawashussain98@gmail.com**

## Getting started

```bash
npm install
npm run dev      # development
npm run build    # production build
npm run start    # production server
```

## Contact form — how messages reach your Gmail

`POST /api/contact` validates input, rate-limits (5 msgs / 10 min / IP), and filters bots via a honeypot field, then delivers in one of two modes:

### Mode 1 — Direct Gmail SMTP (recommended)

1. Enable 2-Step Verification: <https://myaccount.google.com/signinoptions/twosv>
2. Create an App Password: <https://myaccount.google.com/apppasswords>
3. Copy `.env.example` to `.env.local` and set:

```
CONTACT_TO=sahnawashussain98@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=sahnawashussain98@gmail.com
SMTP_PASS=<16-char app password>
```

Restart the server — messages now arrive in your inbox with `Reply-To` set to the sender, so you can answer with one click.

### Mode 2 — Zero-config relay (default, no env vars needed)

Without SMTP env vars the endpoint forwards to FormSubmit. **The very first submission emails you an activation link — click it once** (check spam too). After that, every message lands directly in your Gmail.

> For production deployments (Vercel etc.), Mode 1 is strongly recommended.

## Customization

All content (name, tagline, stats, skills, projects, experience, socials) lives in **`src/lib/data.ts`**.
