# Module 10: System Design Interview Framework

## How to Approach a System Design Interview

### STEP 1 — CLARIFY REQUIREMENTS (5 min)
**Functional requirements (what the system DOES):**
- Who are the users? What do they do?
- Which features are in scope?

**Non-Functional requirements (how it performs):**
- Scale: users, requests/second, data volume
- Latency requirements (real-time vs eventual)
- Availability (99.9%? 99.99%?)

### STEP 2 — BACK-OF-ENVELOPE ESTIMATION (5 min)
- Calculate QPS (queries/sec), storage, bandwidth
- Determines if you need caching, sharding, etc.

### STEP 3 — HIGH-LEVEL DESIGN (10-15 min)
- Draw main components: client, CDN, LB, app servers, DB, cache, queues
- Data flow through the system

### STEP 4 — DETAILED DESIGN (15-20 min)
- Database schema design
- API design (endpoints, request/response)
- Algorithm/data structure choices
- Deep dive into 2-3 critical components

### STEP 5 — IDENTIFY BOTTLENECKS + TRADE-OFFS (5-10 min)
- Where are the single points of failure?
- How does it scale to 10x traffic?
- What are you sacrificing (e.g., consistency for availability)?
- How do you monitor it?

---

## Key Trade-Offs to Discuss:
- SQL vs NoSQL
- Push vs Pull (feed generation)
- Consistency vs Availability (CAP)
- Cache-aside vs Write-through
- Microservices vs Monolith
- Synchronous vs Asynchronous processing
