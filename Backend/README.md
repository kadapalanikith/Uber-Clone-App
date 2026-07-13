# 🛠️ Uber Clone - Backend API Documentation

Welcome to the **Express.js API Backend** documentation for the Uber Clone App. This service provides endpoints for user and captain authentication, profiles, session management, and JWT validation.

---

## 🔒 Authentication & Headers

Most protected endpoints require authorization. The JWT must be supplied either via an HTTP cookie named `token` or through the `Authorization` header.

> [!IMPORTANT]
> When using the `Authorization` header, the format must strictly follow:
> `Authorization: Bearer <JWT_TOKEN>`

---

## 👤 User Endpoints

### 1. Register User

Create a new user/rider account.

*   **Endpoint:** `/users/register`
*   **Method:** `POST`
*   **Access:** Public

#### 📥 Request Body

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `fullname` | `Object` | Yes | Parent container for names. |
| `fullname.firstname` | `String` | Yes | First name (minimum 3 characters). |
| `fullname.lastname` | `String` | No | Last name (minimum 3 characters). |
| `email` | `String` | Yes | Must be a unique, valid email address. |
| `password` | `String` | Yes | Account password (minimum 6 characters). |

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

#### 📤 Response (`201 Created`)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60c72b2f9b1d8e0015cf0001",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

---

### 2. Login User

Authenticate an existing user.

*   **Endpoint:** `/users/login`
*   **Method:** `POST`
*   **Access:** Public

#### 📥 Request Body

```json
{
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

#### 📤 Response (`200 OK`)

Sets a cookie `token` and returns:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60c72b2f9b1d8e0015cf0001",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

---

### 3. Get User Profile

Retrieve the currently authenticated user's details.

*   **Endpoint:** `/users/profile`
*   **Method:** `GET`
*   **Access:** Protected (requires user token)

#### 📤 Response (`200 OK`)

```json
{
  "user": {
    "_id": "60c72b2f9b1d8e0015cf0001",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

---

### 4. Logout User

Blacklist the user's active session token and clear the local auth cookie.

*   **Endpoint:** `/users/logout`
*   **Method:** `POST`
*   **Access:** Protected (requires user token)

#### 📤 Response (`200 OK`)

```json
{
  "message": "Logged out successfully"
}
```

---

## 🚕 Captain (Driver) Endpoints

### 1. Register Captain

Create a new driver profile with vehicle specifications.

*   **Endpoint:** `/captains/register`
*   **Method:** `POST`
*   **Access:** Public

#### 📥 Request Body

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `fullname` | `Object` | Yes | Parent container for names. |
| `fullname.firstname` | `String` | Yes | First name (minimum 3 characters). |
| `fullname.lastname` | `String` | No | Last name (minimum 3 characters). |
| `email` | `String` | Yes | Must be a unique, valid email address. |
| `password` | `String` | Yes | Account password (minimum 6 characters). |
| `vehicle` | `Object` | Yes | Parent container for vehicle specs. |
| `vehicle.color` | `String` | Yes | Vehicle exterior color (minimum 3 characters). |
| `vehicle.plate` | `String` | Yes | License plate identifier (minimum 3 characters). |
| `vehicle.capacity` | `Number` | Yes | Passenger capability (minimum 1). |
| `vehicle.vehicleType` | `String` | Yes | Must be one of: `car`, `motorcycle`, or `auto`. |

```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Smith"
  },
  "email": "jane.smith@example.com",
  "password": "securecaptain456",
  "vehicle": {
    "color": "matte black",
    "plate": "CA-99X-777",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### 📤 Response (`201 Created`)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "60c72b2f9b1d8e0015cf9999",
    "fullName": {
      "firstName": "Jane",
      "lastName": "Smith"
    },
    "email": "jane.smith@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "matte black",
      "plate": "CA-99X-777",
      "capacity": 4,
      "vehicleType": "car"
    },
    "location": {
      "lat": null,
      "lng": null
    }
  }
}
```

---

### 2. Login Captain

Authenticate an existing driver.

*   **Endpoint:** `/captains/login`
*   **Method:** `POST`
*   **Access:** Public

#### 📥 Request Body

```json
{
  "email": "jane.smith@example.com",
  "password": "securecaptain456"
}
```

#### 📤 Response (`200 OK`)

Sets a cookie `token` and returns:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "60c72b2f9b1d8e0015cf9999",
    "fullName": {
      "firstName": "Jane",
      "lastName": "Smith"
    },
    "email": "jane.smith@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "matte black",
      "plate": "CA-99X-777",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

---

### 3. Get Captain Profile

Retrieve the currently authenticated captain's details.

*   **Endpoint:** `/captains/profile`
*   **Method:** `GET`
*   **Access:** Protected (requires captain token)

#### 📤 Response (`200 OK`)

```json
{
  "captain": {
    "_id": "60c72b2f9b1d8e0015cf9999",
    "fullName": {
      "firstName": "Jane",
      "lastName": "Smith"
    },
    "email": "jane.smith@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "matte black",
      "plate": "CA-99X-777",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

---

### 4. Logout Captain

Blacklist the captain's active session token and clear the local auth cookie.

*   **Endpoint:** `/captains/logout`
*   **Method:** `GET`
*   **Access:** Protected (requires captain token)

#### 📤 Response (`200 OK`)

```json
{
  "message": "Logged out successfully"
}
```

---

## 🛡️ Errors & Status Codes

The API returns standard HTTP status codes along with a JSON response containing context when requests fail:

*   `400 Bad Request`: Validation errors or payload issues.
*   `401 Unauthorized`: Missing, expired, or blacklisted token.
*   `500 Internal Server Error`: Server-side errors.