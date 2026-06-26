# Backend API Documentation

## `POST /users/register`

Registers a new user in the application.

### Description

Creates a new user account by receiving user registration data. The endpoint validates the input, hashes the password, and returns an authentication token and user information after successful registration.

### Request Body

- `email` (string, required) - a valid email address.
- `fullname.firstname` (string, required) - user's first name, minimum 3 characters.
- `fullname.lastname` (string, required) - user's last name, minimum 3 characters.
- `password` (string, required) - password with minimum 6 characters.

### Response

#### Success (201 Created)

Returns a JSON object with the generated authentication token and the created user.

Example:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60c72b2f4f1a2565f8b7d90d",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

#### Validation errors (400 Bad Request)

Returned when required fields are missing or inputs fail validation.

Example:

```json
{
  "errors": [
    {
      "msg": "Invalid email address",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

### Notes

- The endpoint requires `fullname.firstname` and `fullname.lastname` fields nested under `fullname`.
- The password is hashed before saving.
- A JWT auth token is returned on successful registration.

## `POST /user/login`

Authenticates a user and provides an authentication token.

### Description

Verifies user credentials (email and password) and, upon successful authentication, returns a JSON Web Token (JWT) and user details. This token can then be used to access protected routes.

### Request Body

- `email` (string, required) - The user's registered email address.
- `password` (string, required) - The user's password.

### Response

#### Success (200 OK)

Returns a JSON object containing the authentication token and the authenticated user's information.

Example:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60c72b2f4f1a2565f8b7d90d",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

#### Authentication Failed (401 Unauthorized)

Returned when the email or password is invalid.

Example:

```json
{
  "message": "Invalid email or password"
}
```

#### Validation Errors (400 Bad Request)

Returned when required fields are missing or inputs fail validation.

Example:

```json
{
  "errors": [
    {
      "msg": "Invalid email address",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### Notes

- A JWT auth token is returned on successful login, which should be stored securely by the client and sent with subsequent requests for authenticated endpoints.

## `GET /user/profile`

Retrieves the profile information of the authenticated user.

### Description

This endpoint allows an authenticated user to fetch their own profile details. It requires a valid JWT to be provided in the request headers.

### Request Headers

- `Authorization` (string, required) - Bearer token. Example: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### Response

#### Success (200 OK)

Returns a JSON object with the authenticated user's profile information.

Example:

```json
{
  "_id": "60c72b2f4f1a2565f8b7d90d",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "socketId": null,
  "createdAt": "2023-01-01T12:00:00.000Z",
  "updatedAt": "2023-01-01T12:00:00.000Z"
}
```

#### Authentication Failed (401 Unauthorized)

Returned if no token is provided or if the token is invalid/expired.

Example:

```json
{
  "message": "Unauthorized: Access Denied"
}
```

### Notes

- This endpoint is protected and requires user authentication.

## `POST /user/logout`

Logs out the authenticated user by invalidating their JWT.

### Description

This endpoint allows an authenticated user to invalidate their current session's JWT. The provided token will be added to a blacklist, preventing its further use.

### Request Headers

- `Authorization` (string, required) - Bearer token. Example: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### Response

#### Success (200 OK)

Returns a JSON object indicating successful logout.

Example:

```json
{
  "message": "User logged out successfully."
}
```

#### Authentication Failed (401 Unauthorized)

Returned if no token is provided or if the token is invalid/expired.

Example:

```json
{
  "message": "Unauthorized: Access Denied"
}
```

### Notes

- This endpoint is protected and requires user authentication.
- The invalidated token is added to a blacklist to prevent reuse.


## `POST /captains/register`

Registers a new captain (driver) in the application.

### Description

Creates a new captain account by receiving captain registration data, including vehicle information. The endpoint validates the input, hashes the password, and returns an authentication token and captain information after successful registration.

### Request Body

- `email` (string, required) - A valid email address.
- `fullname.firstname` (string, required) - The captain's first name.
- `fullname.lastname` (string, required) - The captain's last name.
- `password` (string, required) - A password with a minimum of 6 characters.
- `vehicle.color` (string, required) - The color of the vehicle.
- `vehicle.plate` (string, required) - The vehicle's license plate number.
- `vehicle.capacity` (number, required) - The passenger capacity of the vehicle.
- `vehicle.vehicleType` (string, required) - The type of vehicle (e.g., 'Sedan', 'SUV').

### Response

#### Success (201 Created)

Returns a JSON object with the generated authentication token and the created captain's details.

Example:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "60c72b2f4f1a2565f8b7d90e",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehicle": {
      "color": "Black",
      "plate": "XYZ-123",
      "capacity": 4,
      "vehicleType": "Sedan"
    },
    "socketId": null
  }
}
```

#### Validation errors (400 Bad Request)

Returned when required fields are missing or inputs fail validation.

Example:

```json
{
  "errors": [
    {
      "msg": "Invalid email address",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### Notes

- The endpoint requires nested objects for `fullname` and `vehicle`.
- A JWT auth token is returned on successful registration.

