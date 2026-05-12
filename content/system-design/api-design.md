# API Design Best Practices

A well-designed API is predictable, consistent, and developer-friendly. This note covers REST API design principles with a focus on industry standards.

## REST Principles (Richardson Maturity Model)

| Level | Description | Example |
|---|---|---|
| **0** | Single endpoint, all operations | `POST /api` |
| **1** | Resources identified by URI | `GET /users/1` |
| **2** | HTTP verbs used correctly | `DELETE /users/1` |
| **3** | Hypermedia controls (HATEOAS) | Response includes links |

## URI Design Rules

✅ Use **nouns**, not verbs:
```
GET /users          ✅ (not GET /getUsers)
POST /orders        ✅ (not POST /createOrder)
DELETE /products/5  ✅ (not DELETE /deleteProduct?id=5)
```

✅ Use **plural nouns** for collections:
```
/users     not /user
/products  not /product
```

✅ Use **nested routes** for relationships:
```
GET /users/42/orders         → All orders for user 42
GET /users/42/orders/7       → Order 7 for user 42
```

✅ Use **query parameters** for filtering, sorting, pagination:
```
GET /products?category=shoes&sort=price&order=asc&page=1&limit=20
```

## HTTP Status Codes

```
201 Created     → After successful POST
200 OK          → Successful GET, PUT, PATCH
204 No Content  → Successful DELETE
400 Bad Request → Invalid input data
401 Unauthorized → Missing/invalid token
403 Forbidden   → Authenticated but not authorized
404 Not Found   → Resource doesn't exist
409 Conflict    → Duplicate resource (e.g., email exists)
422 Unprocessable Entity → Validation errors
500 Internal Server Error → Unexpected server failure
```

## Request & Response Design

### Request Body (POST/PUT/PATCH)
```json
POST /users
{
  "name": "Abhishek",
  "email": "abhishek@example.com",
  "role": "student"
}
```

### Response Envelope Pattern
```json
{
  "success": true,
  "data": { "id": 1, "name": "Abhishek" },
  "message": "User created successfully"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is required",
    "details": [
      { "field": "email", "issue": "required" }
    ]
  }
}
```

## Versioning

```
/api/v1/users   ← URI versioning (most common)
Accept: application/vnd.api+json;version=1  ← Header versioning
```

## Pagination

```json
GET /products?page=2&limit=20

Response:
{
  "data": [...],
  "pagination": {
    "page": 2,
    "limit": 20,
    "total": 150,
    "pages": 8,
    "next": "/products?page=3&limit=20",
    "prev": "/products?page=1&limit=20"
  }
}
```

## Authentication

- **API Key** → Simple, stateless, for server-to-server
- **JWT** → Self-contained, stateless user auth (`Authorization: Bearer <token>`)
- **OAuth 2.0** → Delegated authorization (Google, GitHub login)

## Rate Limiting Headers

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 987
X-RateLimit-Reset: 1620000000
Retry-After: 3600
```

## Interview Tip

> "Idempotency is key: GET, PUT, DELETE should always produce the same result when called multiple times. POST is **not** idempotent — calling it twice creates two resources."
