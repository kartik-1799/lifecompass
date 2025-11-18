# Authentication API

## Register User

```
POST /api/v1/auth/register
```

Request Body:
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe"
}
```

## Login User

```
POST /api/v1/auth/login
```

Request Body:
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```
