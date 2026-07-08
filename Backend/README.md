# Backend API Documentation

## `/users/register` Endpoint

### Description
Registers a new user by creating a user account with the provided information.

### HTTP Method
`POST`

### Request Body
The request body should be in JSON format and include the following fields:

- **fullname** (object):
  - **firstname** (string, required): User's first name (minimum 3 characters).
  - **lastname** (string, optional): User's last name (minimum 3 characters).
- **email** (string, required): User's email address (must be a valid email).
- **password** (string, required): User's password (minimum 6 characters).

### Example Response
- **user** (object):
  - **fullname** (object):
    - **firstname** (string): User's first name (minimum 3 characters).
    - **lastname** (string): User's last name (minimum 3 characters).
  - **email** (string): User's email address (must be a valid email).
  - **password** (string): User's password (minimum 6 characters).
- **token** (String): JWT Token

---

## `/users/login` Endpoint

### Description
Authenticates a user using their email and password, returning a JWT token upon successful login.

### HTTP Method
`POST`

### Request Body
The request body should be in JSON format and include the following fields:

- **email** (string, required): User's email address (must be a valid email).
- **password** (string, required): User's password (minimum 6 characters).

### Example Response
- **user** (object):
  - **fullname** (object):
    - **firstname** (string): User's first name (minimum 3 characters).
    - **lastname** (string): User's last name (minimum 3 characters).
  - **email** (string): User's email address (must be a valid email).
- **token** (String): JWT Token

---

## `/users/profile` Endpoint

### Description
Retrieves the profile of the currently authenticated user.

### HTTP Method
`GET`

### Headers
- **Authorization** (string, required): `Bearer <token>`

### Example Response
- **user** (object):
  - **fullname** (object):
    - **firstname** (string): User's first name.
    - **lastname** (string): User's last name.
  - **email** (string): User's email address.

---

## `/users/logout` Endpoint

### Description
Logs out the user by blacklisting their active JWT token.

### HTTP Method
`POST`

### Headers
- **Authorization** (string, required): `Bearer <token>`

### Example Response
- **message** (string): "Logged out successfully"

---

## `/captains/register` Endpoint

### Description
Registers a new captain (driver) account with their vehicle specifications.

### HTTP Method
`POST`

### Request Body
The request body should be in JSON format and include the following fields:

- **fullname** (object):
  - **firstname** (string, required): Captain's first name (minimum 3 characters).
  - **lastname** (string, optional): Captain's last name (minimum 3 characters).
- **email** (string, required): Captain's email address (must be a valid email).
- **password** (string, required): Captain's password (minimum 6 characters).
- **vehicle** (object):
  - **color** (string, required): Vehicle color (minimum 3 characters).
  - **plate** (string, required): License plate number (minimum 3 characters).
  - **capacity** (number, required): Passenger capacity (minimum 1).
  - **vehicleType** (string, required): Type of vehicle (must be `car`, `motorcycle`, or `auto`).

### Example Response
- **captain** (object):
  - **fullname** (object):
    - **firstname** (string): Captain's first name.
    - **lastname** (string): Captain's last name.
  - **email** (string): Captain's email address.
  - **vehicle** (object):
    - **color** (string): Vehicle color.
    - **plate** (string): License plate number.
    - **capacity** (number): Passenger capacity.
    - **vehicleType** (string): Type of vehicle.
- **token** (String): JWT Token

---

## `/captains/login` Endpoint

### Description
Authenticates a captain using their email and password, returning a JWT token upon successful login.

### HTTP Method
`POST`

### Request Body
The request body should be in JSON format and include the following fields:

- **email** (string, required): Captain's email address (must be a valid email).
- **password** (string, required): Captain's password (minimum 6 characters).

### Example Response
- **captain** (object):
  - **fullname** (object):
    - **firstname** (string): Captain's first name.
    - **lastname** (string): Captain's last name.
  - **email** (string): Captain's email address.
  - **vehicle** (object):
    - **color** (string): Vehicle color.
    - **plate** (string): License plate number.
    - **capacity** (number): Passenger capacity.
    - **vehicleType** (string): Type of vehicle.
- **token** (String): JWT Token

---

## `/captains/profile` Endpoint

### Description
Retrieves the profile of the currently authenticated captain.

### HTTP Method
`GET`

### Headers
- **Authorization** (string, required): `Bearer <token>`

### Example Response
- **captain** (object):
  - **fullname** (object):
    - **firstname** (string): Captain's first name.
    - **lastname** (string): Captain's last name.
  - **email** (string): Captain's email address.
  - **vehicle** (object):
    - **color** (string): Vehicle color.
    - **plate** (string): License plate.
    - **capacity** (number): Passenger capacity.
    - **vehicleType** (string): Vehicle type.

---

## `/captains/logout` Endpoint

### Description
Logs out the captain by blacklisting their active JWT token.

### HTTP Method
`GET`

### Headers
- **Authorization** (string, required): `Bearer <token>`

### Example Response
- **message** (string): "Logged out successfully"