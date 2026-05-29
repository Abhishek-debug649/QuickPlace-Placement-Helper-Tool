# Module 4: Databases in System Design

## 4.1 SQL vs NoSQL

**SQL (Relational Databases):** MySQL, PostgreSQL, Oracle, SQL Server
- Structured data, fixed schema, ACID transactions
- Strong consistency, complex queries with JOINs
- Vertical scaling primarily (horizontal is harder)
- *Best for:* Financial systems, ERP, any system needing complex queries & ACID

**NoSQL Databases:** MongoDB, Cassandra, Redis, DynamoDB, HBase
- Flexible schema (or schema-less), horizontal scaling
- Eventually consistent (mostly), optimized for specific data models
- *Best for:* Big data, real-time apps, unstructured data, massive scale

---

## 4.2 Types of NoSQL Databases

- **DOCUMENT DB (MongoDB, CouchDB):** Stores JSON-like documents. Flexible schema. *Best for: User profiles, product catalogs, content management.*
- **KEY-VALUE DB (Redis, DynamoDB, Riak):** Simplest model — just key → value pairs. *Best for: Session storage, caching, leaderboards, shopping carts.*
- **COLUMN-FAMILY DB (Cassandra, HBase):** Data organized by column families rather than rows. Optimized for massive writes. *Best for: IoT sensor data, analytics, write-heavy apps.*
- **GRAPH DB (Neo4j, Amazon Neptune):** Stores entities as nodes and relationships as edges. *Best for: Social networks, recommendation engines, fraud detection.*

---

## 4.3 Database Sharding
Splitting a large database into smaller pieces called **SHARDS**, each stored on separate servers.

> **ANALOGY:** A library so large it's split across 10 buildings: Building 1 handles Authors A-C, Building 2 handles D-F, etc. Each building (shard) independently handles queries for its section.

- **HORIZONTAL SHARDING:** Split by rows (users 1-1M on shard 1, 1M-2M on shard 2)
- **VERTICAL SHARDING:** Split by columns/tables (user table on server 1, order table on server 2)

**SHARDING STRATEGIES:**
- **Range-based:** Shard by value range (Problem: Hotspots)
- **Hash-based:** shard = `hash(user_id) % num_shards` (Evenly distributes but range queries are hard)
- **Directory-based:** Lookup table maps records to shards (Most flexible but lookup table is a bottleneck)

---

## 4.4 Database Replication
Copying data from one database (primary) to one or more replicas (secondaries) for redundancy and read scaling.

- **MASTER-SLAVE (PRIMARY-REPLICA):** All WRITES go to master. READS can go to replicas (read scaling). Replicas are async copies of master.
- **MASTER-MASTER (MULTI-PRIMARY):** Multiple nodes accept both reads AND writes. Need conflict resolution. Complex but higher availability.

---

## 4.5 Connection Pooling
Instead of creating a new DB connection for every request (expensive), maintain a POOL of pre-established connections that are reused.

> **ANALOGY:** A taxi stand — instead of hiring a new driver for every trip, there's a fleet of waiting taxis. You grab one, use it, return it to the stand.
