# HTTP vs HTTPS

## HTTP (HyperText Transfer Protocol)

**HTTP** is a stateless, application-layer protocol for transmitting hypermedia documents (HTML, JSON, etc.) between clients and servers.

### HTTP Request Structure
```
GET /api/users HTTP/1.1
Host: example.com
Authorization: Bearer <token>
Content-Type: application/json
```

### HTTP Methods

| Method | Purpose | Idempotent? | Safe? |
|---|---|---|---|
| **GET** | Retrieve resource | ✅ Yes | ✅ Yes |
| **POST** | Create resource | ❌ No | ❌ No |
| **PUT** | Replace resource | ✅ Yes | ❌ No |
| **PATCH** | Partial update | ❌ No | ❌ No |
| **DELETE** | Remove resource | ✅ Yes | ❌ No |

### HTTP Status Codes

| Range | Category | Examples |
|---|---|---|
| 2xx | Success | 200 OK, 201 Created, 204 No Content |
| 3xx | Redirection | 301 Moved Permanently, 304 Not Modified |
| 4xx | Client Error | 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found |
| 5xx | Server Error | 500 Internal Server Error, 503 Service Unavailable |

## HTTPS (HTTP Secure)

**HTTPS** = HTTP + **TLS/SSL** encryption layer

All data transmitted is encrypted, preventing man-in-the-middle attacks.

### TLS Handshake (Simplified)

```
Client                          Server
  |-- ClientHello ------------->|  (supported ciphers, TLS version)
  |<-- ServerHello ------------|  (chosen cipher, certificate)
  |<-- Certificate ------------|  (public key)
  |-- PreMasterSecret -------->|  (encrypted with server's public key)
  |--- Both derive session key --|
  |<====== Encrypted Channel ===>|
```

## HTTP/1.1 vs HTTP/2 vs HTTP/3

| Feature | HTTP/1.1 | HTTP/2 | HTTP/3 |
|---|---|---|---|
| **Protocol** | TCP | TCP | QUIC (UDP) |
| **Multiplexing** | ❌ (head-of-line blocking) | ✅ | ✅ |
| **Header compression** | ❌ | ✅ (HPACK) | ✅ (QPACK) |
| **Server push** | ❌ | ✅ | ✅ |

## Cookies vs Sessions vs JWT

| Method | Storage | Use Case |
|---|---|---|
| **Cookie** | Browser | Persist small data (session ID) |
| **Session** | Server | Store state server-side |
| **JWT** | Client (localStorage) | Stateless auth tokens |

## Interview Tip

> "HTTPS protects **in-transit** data. Even with HTTPS, you must still sanitize inputs (SQL injection, XSS) because HTTPS only encrypts the channel, not the application logic."
