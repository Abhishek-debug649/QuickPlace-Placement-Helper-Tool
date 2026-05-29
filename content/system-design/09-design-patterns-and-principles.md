# Module 9: Design Patterns and Principles

## 9.1 Availability Patterns
- **FAILOVER:**
  - Active-Passive: One active server, one standby. Passive takes over on failure.
  - Active-Active: Multiple active servers. Load shared; on failure, others absorb load.
- **REPLICATION:** Keep multiple copies of data (DB replication, CDN replication).
- **HEALTH CHECKS:** Load balancers and orchestrators continuously ping services. Unhealthy instances removed.

---

## 9.2 Important Numbers to Know (Latency)
- **L1 cache access:** ~0.5 nanoseconds
- **RAM access:** ~100 nanoseconds
- **SSD random read:** ~150 microseconds
- **HDD seek:** ~10 milliseconds
- **Datacenter RTT:** ~500 microseconds
- **Cross-continent RTT:** ~150 milliseconds

*Rule of thumb:*
- In-memory: nanoseconds to microseconds
- Disk I/O: milliseconds
- Network calls: microseconds (same DC) to milliseconds (cross-region)

---

## 9.3 Back-of-the-Envelope Estimation
Common in interviews to estimate scale.

**USEFUL NUMBERS:**
- 1 million seconds ≈ 11.5 days
- 400 requests/sec per server (rule of thumb for simple apps)
- 1 TB = 10^12 bytes = 1000 GB

**EXAMPLE: Twitter**
- 300M active users, avg 5 tweets/day
- Writes: `300M × 5 / 86400` ≈ 17,000 tweets/second
- Storage: Each tweet ~300 bytes. `300M × 5 × 300 bytes` = 450 GB/day = ~165 TB/year

---

## 9.4 Consistent Hashing
**PROBLEM:** Regular hashing (`server = hash(key) % n_servers`) breaks when you add/remove servers — all keys remap (cache invalidated entirely).

**CONSISTENT HASHING SOLUTION:**
- Map servers and keys onto a VIRTUAL RING (0 to 2^32)
- A key is assigned to the FIRST server clockwise on the ring
- Adding/removing a server only remaps a small fraction of keys

> **ANALOGY:** Hour marks on a clock face (servers at 12, 3, 6, 9 o'clock). A task goes to the next hour mark clockwise. Add server at 4:30 — only tasks between 3 and 4:30 remap. Everything else unchanged.

- **Virtual nodes:** Each physical server has multiple "virtual" positions on the ring for better load distribution.
- *Used by: Cassandra, DynamoDB, Chord DHT*
