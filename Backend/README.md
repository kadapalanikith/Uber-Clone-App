# Uber Clone App - Backend API

[![Node.js](https://img.shields.io/badge/Node.js-v16+-339933?logo=node.js&logoColor=white&style=flat-square)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.2.1-000000?logo=express&logoColor=white&style=flat-square)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white&style=flat-square)](https://www.mongodb.com/)
[![JSON Web Tokens](https://img.shields.io/badge/JWT-Authentication-000000?logo=json-web-tokens&logoColor=white&style=flat-square)](https://jwt.io/)

Welcome to the backend service of the **Uber Clone App**. This service is responsible for database persistence, business logic, user and captain authentication, and secure route protection.

---

## 🛠️ Tech Stack

- **Runtime:** [Node.js](https://nodejs.org/) (CommonJS modules)
- **Framework:** [Express.js](https://expressjs.com/) (v5.2.1)
- **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose ODM](https://mongoosejs.com/) (v9.7.1)
- **Security & Auth:** [JSON Web Tokens (JWT)](https://jwt.io/), [bcrypt](https://github.com/kelektiv/node.bcrypt.js) password hashing, and [cookie-parser](https://github.com/expressjs/cookie-parser) for cookie-based token handling
- **Validation:** [express-validator](https://express-validator.github.io/docs/) for robust request input validation

---

## 📂 Directory Structure

```text
Backend/
├── controllers/          # Request handlers (User, Captain)
├── db/                   # Database connection helper (`db.js`)
├── middlewares/          # Authentication & route protection middleware
├── models/               # Mongoose schemas (User, Captain, BlacklistToken)
├── routes/               # Express route declarations
│   ├── user.routes.js         # Routes for riders
│   └── captain.routes.js      # Routes for drivers (captains)
├── services/             # Core business logic (database creation helpers)
├── .env                  # Environment configurations (local-only)
├── app.js                # App configuration, CORS, parsers, and route registration
├── package.json          # Dependencies and scripts
└── server.js             # Application entry point (creates HTTP server)
```

---

## 🔒 API Endpoints & Documentation

### 👤 Rider (User) Routes - `/users`

| HTTP Method | Endpoint | Auth Required | Description |
| :--- | :--- | :---: | :--- |
| `POST` | `/users/register` | No | Registers a new user/rider. Requires email, firstname, lastname, and password. |
| `POST` | `/users/login` | No | Authenticates a user. Returns a JWT and sets an HTTP-only cookie. |
| `GET` | `/users/profile` | **Yes** | Returns the authenticated user's profile. |
| `POST` | `/users/logout` | **Yes** | Logs out the user and blacklists their current JWT token. |

#### Request Validations (User Registration):
- `email`: Must be a valid email address.
- `fullname.firstname`: Minimum 3 characters.
- `fullname.lastname`: Minimum 3 characters.
- `password`: Minimum 6 characters.

---

### 🚕 Driver (Captain) Routes - `/captains`

| HTTP Method | Endpoint | Auth Required | Description |
| :--- | :--- | :---: | :--- |
| `POST` | `/captains/register` | No | Registers a new captain/driver. Requires vehicle details. |
| `POST` | `/captains/login` | No | Authenticates a captain. Returns a JWT and sets an HTTP-only cookie. |
| `GET` | `/captains/profile` | **Yes** | Returns the authenticated captain's profile. |
| `GET` | `/captains/logout` | **Yes** | Logs out the captain and clears the session. |

#### Request Validations (Captain Registration):
- `email`: Must be a valid email address.
- `fullname.firstname` & `fullname.lastname`: Minimum 3 characters.
- `password`: Minimum 6 characters.
- `vehicle.color`: Minimum 3 characters.
- `vehicle.plate`: Minimum 3 characters.
- `vehicle.capacity`: Must be an integer.
- `vehicle.vehicleType`: Must be one of `['car', 'motorcycle', 'auto']`.

---

## 🛡️ Authentication Middleware

Route protection is handled via custom middleware in [auth.middleware.js](file:///d:/Uber%20Clone%20App/Backend/middlewares/auth.middleware.js):
- **User Route Protection:** `authMiddleware.authUser` checks the incoming request headers (`Authorization: Bearer <token>`) or cookies (`token`) for a valid JWT, verifies it, checks if it's blacklisted, and injects the user object into `req.user`.
- **Captain Route Protection:** `authMiddleware.authCaptain` performs similar checks specifically for driver accounts and injects the captain object into `req.captain`.

---

## 🔧 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas URI)

### Installation

1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Configuration

Create a `.env` file in the `Backend/` root directory and populate it with your configuration:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/uber-clone
JWT_SECRET=your_jwt_secret_key
```

### Running the Server

* **Development Mode (using nodemon):**
  If `nodemon` is installed globally or to run it via the local package:
  ```bash
  npx nodemon server.js
  ```
  *(Alternatively, you can add `"dev": "nodemon server.js"` to your `package.json` scripts.)*

* **Production Mode:**
  ```bash
  node server.js
  ```
  The server will start and listen on the port specified in your `.env` (default is `3000`).