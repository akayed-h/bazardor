<div align="center">

# 🛒 বাজার দর (BazarDor)

**প্রয়োজনীয় পণ্যের দাম এক নজরে।**

A price-tracking web app for Bangladesh's everyday essentials: rice, lentils, oil, vegetables, fish, meat, eggs & milk, and spices.

[Live Demo](#-live-demo) · [Features](#-key-features) · [Tech Stack](#-technologies-used) · [Getting Started](#-getting-started) · [Deployment](#-deployment)

</div>

---

## 📖 Description

**BazarDor** (বাজার দর) lets people check today's price of daily-use products and see at a glance whether prices have gone up or down. Data is fetched live from the BazarDor REST API and shown with Bengali digits and the Bangla date.

Visitors can browse the home page and categories freely. The detailed **Product Details** page, with min, max and average prices and a market-by-market breakdown across divisions, is a **protected route** that requires signing in. Authentication is built with **BetterAuth** (email/password plus Google and GitHub social login).

The app is fully responsive across mobile, tablet and desktop.

## 🔗 Live Demo

- **Live site:** `https://bazardor-beige.vercel.app/` 
- **Repository:** `https://github.com/akayed-h/bazardor` 

## ✨ Key Features

1. **Live price dashboard.** The home page shows an infinite-scrolling price ticker, a hero section with a scroll-to-products CTA, and three sections: **"আজ দাম বেড়েছে ▲"** (top 6 risers), **"আজ দাম কমেছে ▼"** (top 6 fallers) and **"সব পণ্য"** (all products in a responsive grid). Price changes use colour-coded badges (green ▲, red ▼, grey —).
2. **Category browsing with sorting.** Filter products by category from the navbar, with the active category highlighted. Sort by **ডিফল্ট**, **দাম: কম থেকে বেশি** or **দাম: বেশি থেকে কম**. Sorting uses the numeric price, never Bengali text.
3. **Dynamic, protected product details.** `/product/[slug]` shows the product summary (emoji, category tags, unit), minimum / maximum / average price, price history (yesterday, last week, last month) and **market-wise prices grouped by division**. Visitors who aren't signed in are redirected to sign in with a toast, then returned to the page.
4. **Complete authentication.** Sign up and sign in with email and password, **Google** and **GitHub** social login, sign out, toast notifications and inline form errors. Powered by BetterAuth.
5. **My Profile and Update Information.** View your profile and update your name on a dedicated page using BetterAuth's `updateUser`.
6. **Polished UX.** Skeleton loaders while data loads, friendly 404 and empty states with a "হোম পেজে ফিরে যান" button, an error boundary, toast feedback for auth and redirects, Bengali digit formatting and the Bangla date.
7. **Fully responsive.** The navbar, ticker, hero and grids adapt to mobile, tablet and desktop. Dynamic routes work on refresh with no hard 404.

## 🛠️ Technologies Used

| Category | Technology |
| --- | --- |
| Framework | [Next.js 15](https://nextjs.org/) (App Router), [React 19](https://react.dev/) |
| Language | JavaScript |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) + [DaisyUI v5](https://daisyui.com/) with a custom `bazardor` theme |
| Authentication | [BetterAuth](https://better-auth.com/) (email/password, Google, GitHub) |
| Database | PostgreSQL ([Neon](https://neon.tech/)) via [`pg`](https://node-postgres.com/) |
| Notifications | [react-hot-toast](https://react-hot-toast.com/) |
| Data source | BazarDor REST API (primary + fallback host) |
| Font | Noto Sans Bengali (`next/font`) |
| Hosting | [Vercel](https://vercel.com/) |

**Concepts used:** components & props, `useState`, `useEffect`, event handling, conditional rendering, array methods, data fetching, routing, dynamic routing, server/client components, protected routes (middleware), and authentication.

## 🗺️ Routes

| Route | Access | Description |
| --- | --- | --- |
| `/` | Public | Hero, price ticker, risers, fallers and all products |
| `/category/[slug]` | Public | Products in a category, with sorting |
| `/product/[slug]` | 🔒 Protected | Detailed price information by market |
| `/signin` | Public | Sign in (email/password, Google, GitHub) |
| `/signup` | Public | Create an account |
| `/profile` | 🔒 Protected | View your profile |
| `/profile/update` | 🔒 Protected | Update your name |
| `*` | Public | Friendly 404 page |

## 🔌 API

Base URL: `https://api.api-store.workers.dev/api/bazardor`  
Fallback: `https://api.abcz.workers.dev/api/bazardor`

| Endpoint | Description |
| --- | --- |
| `/products` | All products |
| `/products?category=chal` | Products filtered by category |
| `/products/1` | A single product |
| `/categories` | All categories |
| `/categories/chal` | A single category |

## 📂 Project Structure

```
bazardor/
├── app/
│   ├── api/auth/[...all]/   # BetterAuth route handler
│   ├── category/[slug]/     # Category page
│   ├── product/[slug]/      # Protected product details
│   ├── profile/             # Profile + update form
│   ├── signin/  signup/     # Auth pages
│   ├── layout.js  page.js   # Root layout and home page
│   ├── loading.js  error.js  not-found.js
│   └── globals.css          # Tailwind + DaisyUI theme
├── components/              # Navbar, Ticker, Hero, ProductCard, forms, skeletons…
├── lib/                     # auth, auth-client, API helpers, Bengali formatting
├── public/                  # Static assets
└── middleware.js            # Protected-route redirect
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 20 or newer
- A free [Neon](https://neon.tech/) PostgreSQL database (or any Postgres)
- *(Optional)* Google and/or GitHub OAuth apps for social login

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/bazardor.git
cd bazardor

# 2. Install dependencies
npm install

# 3. Create your environment file
cp .env.example .env.local      # Windows (cmd): copy .env.example .env.local

# 4. Fill in .env.local (see below), then create the auth tables
npm run db:migrate

# 5. Start the dev server
npm run dev
```

Open <http://localhost:3000>.

### Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `BETTER_AUTH_SECRET` | ✅ | Random secret, e.g. `openssl rand -base64 32` |
| `BETTER_AUTH_URL` | ✅ | App URL (`http://localhost:3000` locally, your live URL in production) |
| `DATABASE_URL` | ✅ | Postgres connection string, e.g. `postgresql://user:pass@host/db?sslmode=require` |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Optional | Enables Google login |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | Optional | Enables GitHub login |
| `API_BASE_URL` | Optional | Override the default price API base URL |

> Social login buttons only work once the matching keys are set.  
> OAuth callback URLs: `<BETTER_AUTH_URL>/api/auth/callback/google` and `<BETTER_AUTH_URL>/api/auth/callback/github`.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build |
| `npm run db:migrate` | Create / update the BetterAuth database tables |

## ☁️ Deployment

1. Push the project to GitHub.
2. Import the repository in [Vercel](https://vercel.com/new).
3. Add the environment variables above. Deploy once to get your URL, set it as `BETTER_AUTH_URL`, then **redeploy**.
4. Make sure `npm run db:migrate` has been run against your production database.
5. For social login, set the OAuth callback URLs to your live domain.

Dynamic `[slug]` routes are server-rendered, so refreshing any page works without a 404.

## 🔐 Authentication Notes

- Email verification and forgot-password are intentionally **not** implemented.
- After sign up, users are redirected to the sign-in page.
- Protected routes are guarded twice: an optimistic cookie check in `middleware.js` and a full session check on the server in each page.

## 👤 Author

**Akayed Hossain**

---

<div align="center">

*সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।*

</div>
