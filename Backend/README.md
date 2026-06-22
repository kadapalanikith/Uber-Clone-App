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
