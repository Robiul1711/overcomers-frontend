# Overcomers ABA Services Frontend

A modern, responsive front-end application built for Overcomers ABA Services, a provider of high-quality Applied Behavior Analysis (ABA) therapy for children with autism and developmental disabilities. This project features a beautiful landing page, authentication flows, and a comprehensive admin/employee dashboard.

## 🚀 Tech Stack

- **Framework:** React 19 (via Vite)
- **Styling:** Tailwind CSS (v4) with Custom Variables
- **UI Components:** Shadcn UI (built on Radix), Custom Components
- **Routing:** React Router DOM (v7)
- **State Management:** Redux Toolkit & React Query
- **Form Handling:** React Hook Form
- **Icons:** Lucide React
- **Animations / Sliders:** Swiper JS, Framer Motion
- **HTTP Client:** Axios

## ✨ Key Features

- **Public Landing Pages:** Beautiful, responsive, and animated home page including sections like About Us, What We Offer, Client Reviews (using Swiper JS), and Downloadable Resources.
- **Sticky Navbar:** Smooth transparent-to-solid animated navigation bar that reacts to user scroll position.
- **Authentication Flows:** Secure Sign In, Sign Up, Forgot Password, and OTP Verification UI/UX.
- **Admin Dashboard:**
  - Case management with Detailed Case Views.
  - Document management with Upload Modules and Modals.
  - Profile Settings dashboard.
  - Reusable Sidebar and Top Navbar interfaces.
- **Clean Architecture:** Modular component structure with separate layouts for Public, Auth, and Admin routes.

## 📁 Directory Structure

```plaintext
src/
├── apiFunctions/      # API communication methods
├── assets/            # Static files, images, icons
├── components/        # Reusable UI components
│   ├── admin/         # Dashboard-specific components (Cases, Documents, etc.)
│   ├── common/        # General reusable components (Buttons, Modals)
│   ├── HomeComponents/# Landing page blocks (Banner, AboutUs, WhatWeOffer, etc.)
│   └── ui/            # Shadcn UI base components
├── hooks/             # Custom React Hooks
├── layout/            # Layout wrappers (Layout, AuthLayout, AdminLayout)
├── lib/               # Utility functions (e.g., tailwind merge)
├── pages/             # Route-level pages
│   ├── admin/         # Admin page logic
│   ├── authPage/      # Authentication pages (SignIn, SignUp, ForgotPassword)
│   └── Pages/         # Public pages (Home, Services, Contact, etc.)
├── redux/             # Redux Store, Slices (authSlice, uiSlice)
├── router/            # React Router configurations
├── shared/            # Shared components (Navbar, Footer)
└── utils/             # Constants, Data arrays, Image Providers
```

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Robiul1711/overcomers-frontend.git
   cd overcomers-frontend
   ```

2. **Install dependencies:**
   Make sure you have Node.js installed, then run:
   ```bash
   npm install
   ```
   *(Or use `yarn install` or `pnpm install`)*

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will typically start on `http://localhost:5173/`.

4. **Building for Production:**
   To create a production-optimized build, run:
   ```bash
   npm run build
   ```
   You can preview the build using:
   ```bash
   npm run preview
   ```

## 🎨 Styling Guidelines

- The application utilizes global CSS variables mapped directly into Tailwind tokens (in `src/index.css`).
- **Primary Color:** `#FFBB03` (Golden Yellow)
- **Secondary Color:** `#76121F` (Dark Maroon)
- **Third Color:** `#2E2E2E` (Dark Slate/Text)

Ensure to use these classes (e.g., `text-Primary`, `bg-Secondary`) to maintain brand consistency rather than hard-coding raw hex codes.

## 📄 License & Copyright

Copyright © 2026 Overcomers ABA Services - All Rights Reserved.
