# 🪔 Telugu Samiti — IIT Delhi

Official website of the **Telugu Samiti, IIT Delhi** — a cultural organization bringing together Telugu students, staff, and faculty at IIT Delhi.

🌐 **Live Site:** [iitdtelugusamiti.com](https://iitdtelugusamiti.com) 

---

## 📸 Preview

> A modern, responsive, animation-rich website celebrating Telugu culture through events, community, and connection.

---

## ✨ Features

- 🎠 **Hero Slideshow** — Full-screen carousel with cinematic long-press mode, autoplay, and smooth transitions
- 📢 **Announcements Board** — Notice board with NEW badge indicators and scroll animations
- 🌐 **Bilingual About Section** — Toggle between English and Telugu with animated switch
- 🎉 **Events Section** — Ugadi, Freshers, and Farewell event cards with viewport animations
- 👥 **Contributors Section** — Faculty advisors and tech leads with profile links
- 📱 **Fully Responsive** — Optimized down to sub-400px screen widths
- 🎨 **Smooth Animations** — Framer Motion powered scroll-triggered and entrance animations
- 🔢 **Visit Counter** — Animated rolling counter with easeOutCubic easing
- 📬 **Contact & Social Links** — Instagram, LinkedIn, YouTube, and email

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| React + TypeScript | Frontend framework |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| Embla Carousel | Hero slideshow |
| Lucide React | Icons |
| Font Awesome | Brand icons |
| Vite | Build tool |
| Playfair Display, Poppins | Google Fonts |

---

## 📁 Project Structure

```
client/
└── src/
    ├── assets/              # Images, logos, hero photos
    ├── components/
    │   ├── Navbar.tsx           # Fixed nav with bilingual title toggle
    │   ├── HeroSlideshow.tsx    # Full-screen carousel with cinematic mode
    │   ├── NoticeBoard.tsx      # Announcements board
    │   └── FeedbackSection.tsx  # Emoji rating + feedback form
    ├── pages/
    │   └── home.tsx             # Main home page orchestrating all sections
    └── main.tsx
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm

### Installation

```bash
git clone https://github.com/Rujut/iitdtelugusamiti.git
cd iitdtelugusamiti
npm install
```

### Run Frontend

```bash
npm run dev:client
```

Frontend runs on `http://localhost:5000`

### Build for Production

```bash
npm run build
```

---

## 🎭 Key Components

### `HeroSlideshow`
Full-screen image carousel with Embla Carousel + custom autoplay. Features a **cinematic mode** — long-press to hide all UI overlays for an immersive view. Broadcasts a custom `cinematic-mode` window event consumed by the Navbar.

### `Navbar`
Fixed top navigation with scroll-aware background, bilingual title toggle (English ↔ Telugu every 5s), animated hamburger menu, and cinematic mode hide support.

### `NoticeBoard`
Announcement board with staggered scroll animations, pulsing NEW badge, and optional inline links per notice.

### `FeedbackSection`
Emoji-based rating (Poor / Average / Great) with a textarea and submit confirmation.

---

## 🎨 Animations

All animations use **Framer Motion** with:
- `whileInView` + `variants` for scroll-triggered grouped section entrances
- `AnimatePresence` for language toggle transitions
- `requestAnimationFrame` + `easeOutCubic` for the rolling visit counter
- Cinematic hide/show transitions on the Navbar and slideshow controls

---

## 📄 License

© 2026 Telugu Samiti, IIT Delhi. All Rights Reserved.
