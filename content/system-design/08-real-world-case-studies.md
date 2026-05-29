# Module 8: Real-World Case Studies

## 8.1 Design URL Shortener (like bit.ly)
**REQUIREMENTS:**
- Create short URL from long URL
- Redirect short URL to original URL
- Handle 100M new URLs/day (writes), 10B redirects/day (reads)

**COMPONENTS:**
1. **API Server** (REST API: POST `/shorten`, GET `/:shortCode`)
2. **Hash/ID Generator** (convert longURL → shortCode)
   - Approach: Base62 encoding of auto-increment ID (a-zA-Z0-9 = 62 chars)
3. **Database:** Store (shortCode → longURL, createdAt, expiresAt, userId)
   - Use NoSQL (Cassandra/DynamoDB) for scale
4. **Cache (Redis):** shortCode → longURL (most accessed URLs)
5. **Load Balancer** in front of API servers
6. **CDN** for redirect endpoints

**REDIRECT TYPES:**
- **301 (Permanent):** Browser caches redirect → reduces server load
- **302 (Temporary):** Browser always hits server → useful for analytics

---

## 8.2 Design Instagram (Photo Sharing)
**REQUIREMENTS:**
- Upload photos, follow users, view home feed (posts from followed users)
- 500M users, 100M photo uploads/day, 1B feed views/day

**COMPONENTS:**
1. **User Service, Post Service, Follow Service, Feed Service**
2. **Object Storage:** S3/GCS for actual photo/video files
3. **CDN:** Serve media files

**FEED GENERATION STRATEGIES:**
- **PUSH (Fan-out on write):** When you post → immediately push to all followers' feeds. (Expensive writes for celebrities).
- **PULL (Fan-out on read):** When you open feed → fetch recent posts from everyone you follow. (Slow feed loads).
- **HYBRID:** Regular users → push model. Celebrity accounts (>1M followers) → pull model.

---

## 8.3 Design a Chat Application (WhatsApp)
**REQUIREMENTS:**
- 1-on-1 chat, group chat, online/last seen status
- 2B users, 100B messages/day

**KEY COMPONENTS:**
1. **WebSocket Servers:** Long-lived connections for real-time messaging
2. **Message Service & Database:** Cassandra (write-heavy, time-series) for messages
3. **Presence Service:** Track online status (Redis with TTL keys)
4. **Notification Service:** Push notifications when user is offline

**MESSAGE DELIVERY FLOW:**
Sender → WebSocket Server → Route to recipient's WebSocket Server
- If online: push to recipient's socket
- If offline: store in DB + send push notification

---

## 8.4 Design a Rate Limiter
Limit requests from a client (prevent abuse, DDoS protection).

**ALGORITHMS:**
- **TOKEN BUCKET:** Bucket holds N tokens. Each request consumes 1 token. Tokens refill at a fixed rate. Allows bursting.
- **LEAKY BUCKET:** Requests enter a queue. Processed at a fixed outflow rate. Smooth output rate, no bursting.
- **FIXED WINDOW COUNTER:** Count requests per fixed time window. Problem: Burst at window boundary.
- **SLIDING WINDOW LOG/COUNTER:** More accurate but higher memory usage.

**IMPLEMENTATION:** Redis with `INCR` + `EXPIRE` (atomic operations).
