# Module 3: Caching

## 3.1 What is Caching?
Storing frequently accessed data in fast, temporary storage to serve future requests faster, reducing load on the primary data source (database).

> **ANALOGY:** Your browser's cache is like keeping your most-used books on your desk instead of going to the library every time. Or: A chef's *mise en place* — ingredients prepped and within arm's reach so cooking is fast.

- **CACHE HIT:** Requested data FOUND in cache → served instantly
- **CACHE MISS:** Data NOT in cache → fetch from origin, then store in cache

**BENEFITS:**
- Dramatically reduces latency (RAM is ~100x faster than SSD, 100,000x faster than HDD)
- Reduces database load
- Improves scalability (serve millions without hitting DB each time)

---

## 3.2 Caching Strategies (Write Policies)

### CACHE ASIDE (Lazy Loading):
- Application checks cache first. If miss: app fetches from DB, writes to cache, returns to user. Cache is populated "on demand".
- **Pros:** Only requested data is cached; cache failures don't break the app.
- **Cons:** First request is slow (cold start); risk of stale data.

### READ THROUGH:
- Cache sits in front of DB. On miss: CACHE (not app) fetches from DB and populates itself.
- **Pros:** App logic is simpler.
- **Cons:** First request slow.

### WRITE THROUGH:
- Write to cache AND database synchronously (both updated together).
- **Pros:** Cache always has latest data (consistent).
- **Cons:** Every write goes to both cache + DB (slower writes).

### WRITE BEHIND (Write Back):
- Write to cache immediately, write to DB asynchronously (later in batch).
- **Pros:** Very fast writes.
- **Cons:** Risk of data loss if cache crashes before DB flush.

### WRITE AROUND:
- Write directly to DB, bypassing cache. Cache only updated on read (cache-aside on reads).
- **Pros:** Avoids cache pollution with data written once and rarely read.
- **Cons:** Cache miss on first read after a write.

---

## 3.3 Cache Eviction Policies
When cache is full and a new item arrives, which old item do you remove?

- **LRU (Least Recently Used):** Remove the item that hasn't been accessed for the longest time. Most common, based on temporal locality.
- **LFU (Least Frequently Used):** Remove item accessed the fewest times overall. Better for clear "hot" and "cold" workloads.
- **FIFO (First In, First Out):** Remove oldest item.
- **TTL (Time To Live):** Items expire after a set time period, regardless of usage.

---

## 3.4 Where to Cache?
- **CLIENT-SIDE CACHE:** Browser cache, local storage
- **CDN CACHE:** Content Delivery Network caches static assets near user
- **WEB SERVER CACHE:** Nginx/Varnish caches full page responses
- **APPLICATION CACHE:** In-process memory (faster but limited)
- **DISTRIBUTED CACHE:** Redis, Memcached (shared across all app servers)
- **DATABASE CACHE:** Query result cache, buffer pool

---

## 3.5 Redis vs Memcached
| Feature | Redis | Memcached |
| --- | --- | --- |
| **Data structures** | Strings, Lists, Sets, Hashes, Sorted Sets | Only Strings (key-value) |
| **Persistence** | Yes (RDB/AOF) | No (in-memory only) |
| **Replication** | Yes (master-replica) | No built-in |
| **Pub/Sub** | Yes | No |
| **Best for** | Complex use cases, sessions, queues | Simple high-speed caching |
