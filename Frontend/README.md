# 🎨 Uber Clone App - Frontend Documentation

[![React](https://img.shields.io/badge/React-19.2.7-61DAFB?logo=react&logoColor=white&style=flat-square)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.1.0-646CFF?logo=vite&logoColor=white&style=flat-square)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?logo=tailwind-css&logoColor=white&style=flat-square)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-7.18.0-CA4245?logo=react-router&logoColor=white&style=flat-square)](https://reactrouter.com/)
[![Oxlint](https://img.shields.io/badge/Linter-Oxlint-F43F5E?style=flat-square)](https://oxc.rs/)

Welcome to the frontend documentation of the **Uber Clone App**. This is a modern, high-performance web application designed to replicate core rider and captain (driver) flows. It is powered by **React 19**, **Vite 8**, **Tailwind CSS v4**, and **React Router v7**.

---

## 🚀 Technology Stack

*   **Core Library:** [React 19](https://react.dev/) (Hooks, context-based architecture)
*   **Build & HMR:** [Vite 8](https://vite.dev/) (Ultra-fast developer experience)
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (New high-speed CSS compiler with `@theme` configurations)
*   **Routing:** [React Router v7](https://reactrouter.com/) (Declarative, nested router)
*   **Code Verification:** [Oxlint](https://oxc.rs/) (Lightning-fast JavaScript/JSX syntax checks)

---

## 📂 Project Directory Structure

```text
Frontend/
├── src/
│   ├── context/                   # React Context global state providers
│   │   ├── CaptainContext.jsx     # State manager for authenticated captain/driver data
│   │   └── UserContext.jsx        # State manager for authenticated user/rider data
│   ├── pages/                     # Routed views and wrap-guards
│   │   ├── Start.jsx              # Welcome & Landing view (select user mode)
│   │   ├── Home.jsx               # User/Rider dashboard & session view
│   │   ├── UserLogin.jsx          # Rider sign-in portal
│   │   ├── UserSignup.jsx         # Rider registration portal
│   │   ├── UserLogout.jsx         # Rider session termination logic
│   │   ├── CaptainHome.jsx        # Driver/Captain dashboard view
│   │   ├── CaptainSignin.jsx      # Driver/Captain sign-in portal
│   │   ├── CaptainSignup.jsx      # Driver/Captain registration portal
│   │   ├── CaptainLogout.jsx      # Driver/Captain session termination logic
│   │   ├── CaptainLogin.jsx       # [DEPRECATED] Forwards to CaptainSignin.jsx
│   │   ├── Riding.jsx             # [PLACEHOLDER] Ride navigation view
│   │   ├── UserProtectWrapper.jsx # Middleware check protecting user routes
│   │   └── CaptainProtectWrapper.jsx # Middleware check protecting captain routes
│   ├── App.css                    # Shared CSS layout helpers
│   ├── App.jsx                    # Routing configuration definitions
│   ├── index.css                  # Tailwind directive imports & theme variables
│   └── main.jsx                   # React Virtual DOM mounting point
├── .env                           # Local environment configuration file
├── .gitignore                     # Git untracked registry rules
├── .oxlintrc.json                 # Oxlint configuration schema
├── index.html                     # Root DOM container template
├── package.json                   # App scripts and project dependencies
└── vite.config.js                 # Vite compilation configs
```

---

## 🛣️ Application Routes & Layout Registry

The following paths are defined in [App.jsx](file:///d:/Uber%20Clone%20App/Frontend/src/App.jsx):

| Path | Component | Guard / Access Level | Description |
| :--- | :--- | :--- | :--- |
| `/` | `Start` | Public | Home landing selector screen. |
| `/login` | `UserLogin` | Public | Rider sign-in credentials check. |
| `/signup` | `UserSignup` | Public | Rider account registration. |
| `/captainlogin` | `CaptainSignin` | Public | Driver sign-in credentials check. |
| `/captainsignup` | `CaptainSignup` | Public | Driver/Captain account registration. |
| `/home` | `Home` | `UserProtectWrapper` | Rider interactive dashboard portal. |
| `/captain-home` | `CaptainHome` | `CaptainProtectWrapper` | Driver interactive workspace portal. |
| `/user/logout` | `UserLogout` | `UserProtectWrapper` | Logs out rider and redirect to login. |
| `/captain/logout` | `CaptainLogout` | `CaptainProtectWrapper` | Logs out driver and redirect to sign-in. |

---

## 🧠 State Management with Context API

State is split cleanly across two main domains to prevent re-render cascading:

### 1. User Context
*   **Provider:** `UserDataContext` in [UserContext.jsx](file:///d:/Uber%20Clone%20App/Frontend/src/context/UserContext.jsx)
*   **State:** `userData` storing:
    ```json
    {
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john@example.com"
    }
    ```

### 2. Captain Context
*   **Provider:** `CaptainDataContext` in [CaptainContext.jsx](file:///d:/Uber%20Clone%20App/Frontend/src/context/CaptainContext.jsx)
*   **State:** `captainData` storing driver bio, rating, and vehicle specifications:
    ```json
    {
      "fullName": {
        "firstName": "Jane",
        "lastName": "Smith"
      },
      "email": "jane@example.com",
      "vehicle": {
        "color": "matte black",
        "plate": "CA-99X-777",
        "capacity": 4,
        "vehicleType": "car"
      }
    }
    ```

---

## ⚙️ Build and Execution Commands

Inside the `/Frontend` directory, run:

### Development Run (HMR)
```bash
npm run dev
```

### Fast Lint Check
```bash
npm run lint
```

### Production Build
```bash
npm run build
```

### Local Preview of Production Bundle
```bash
npm run preview
```
