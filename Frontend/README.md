# Uber Clone App - Frontend

[![React](https://img.shields.io/badge/React-19.2.7-61DAFB?logo=react&logoColor=white&style=flat-square)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.1.0-646CFF?logo=vite&logoColor=white&style=flat-square)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?logo=tailwind-css&logoColor=white&style=flat-square)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-7.18.0-CA4245?logo=react-router&logoColor=white&style=flat-square)](https://reactrouter.com/)
[![Oxlint](https://img.shields.io/badge/Linter-Oxlint-F43F5E?style=flat-square)](https://oxc.rs/)

Welcome to the frontend of the **Uber Clone App**, a modern, high-performance web application designed to replicate the core user and captain flows of Uber. This client-side application is built using a cutting-edge frontend stack featuring **React 19**, **Vite 8**, **Tailwind CSS v4**, and **React Router v7**.

---

## 🚀 Tech Stack & Tools

- **Core Library:** [React 19](https://react.dev/) (Hooks, Functional Components)
- **Build Tool:** [Vite 8](https://vite.dev/) (Lightning-fast HMR and bundling)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (Utility-first CSS framework with native CSS variables)
- **Routing:** [React Router v7](https://reactrouter.com/) (Declarative client-side routing)
- **Code Quality:** [Oxlint](https://oxc.rs/) (Extremely fast JavaScript/TypeScript linter)

---

## 📂 Directory Structure

```text
Frontend/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, logos, and global styles
│   ├── components/      # Reusable UI components (buttons, inputs, cards)
│   ├── pages/           # Page-level components
│   │   ├── Home.jsx           # Landing/Home page
│   │   ├── UserLogin.jsx      # Rider login page
│   │   ├── UserSignup.jsx     # Rider registration page
│   │   ├── CaptainSignin.jsx  # Driver login page
│   │   └── CaptainSignup.jsx  # Driver registration page
│   ├── App.css          # App-specific styles
│   ├── App.jsx          # Main application component & routes
│   ├── index.css        # Tailwind directives and global styles
│   └── main.jsx         # Application entry point
├── .gitignore
├── .oxlintrc.json       # Linter configuration
├── package.json         # Project dependencies and scripts
└── vite.config.js       # Vite bundler configuration
```

---

## 🛣️ Application Routing

The application uses **React Router v7** for declarative client-side routing. Below are the registered paths and their corresponding page views:

| Route Path | Page Component | Description |
| :--- | :--- | :--- |
| `/` | `Home` | Landing page of the Uber Clone application. |
| `/login` | `UserLogin` | Login portal for Riders (Users). |
| `/signup` | `UserSignup` | Registration portal for new Riders. |
| `/captainlogin` | `CaptainSignin` | Login portal for Drivers (Captains). |
| `/captainsignup` | `CaptainSignup` | Registration portal for new Drivers. |

---

## 🔧 Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd Frontend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Application

* **Development Mode (with HMR):**
  ```bash
  npm run dev
  ```
  The app will run locally at `http://localhost:5173` (or the next available port).

* **Production Build:**
  Generate a highly optimized production bundle in the `dist/` directory:
  ```bash
  npm run build
  ```

* **Preview Production Build:**
  Locally preview the production build to verify behavior before deploying:
  ```bash
  npm run preview
  ```

* **Linting:**
  Run the ultra-fast Oxlint linter to check for code issues:
  ```bash
  npm run lint
  ```

---

## 🔌 Connecting to the Backend API

To connect this frontend to the companion Express backend:
1. Create a `.env` file in the `Frontend/` root directory (if not already present).
2. Add the backend API base URL:
   ```env
   VITE_API_URL=http://localhost:3000
   ```
3. Utilize `import.meta.env.VITE_API_URL` when making `fetch` or `axios` requests.

---

## 🎨 Styling with Tailwind CSS v4

This project utilizes the brand new **Tailwind CSS v4.0** engine, which integrates directly with Vite via `@tailwindcss/vite`. Key highlights:
- Faster build times and smaller bundle sizes.
- Styles are configured in CSS using `@theme` instead of a separate `tailwind.config.js` file.
- Global styles and custom utilities reside in [src/index.css](file:///d:/Uber%20Clone%20App/Frontend/src/index.css).
