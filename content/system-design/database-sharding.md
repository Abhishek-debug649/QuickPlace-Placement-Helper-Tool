# Database Sharding

**Sharding** (horizontal partitioning) is the technique of splitting a large database into smaller, independent pieces called **shards**, each hosted on a separate server.

## Why Sharding?

A single database server has limits:
- Storage capacity
- Query throughput
- RAM for caching

Sharding distributes the load across multiple machines.

## Sharding Strategies

### Range-Based Sharding
Partition data based on a range of values.

```
Shard 1: user_id 1–1,000,000
Shard 2: user_id 1,000,001–2,000,000
Shard 3: user_id 2,000,001–3,000,000
```

✅ Simple, supports range queries  
❌ Can cause **hot spots** (e.g., new users always go to shard 3)

### Hash-Based Sharding
Apply a hash function to the shard key.

```
shard = hash(user_id) % num_shards
```

✅ Even distribution  
❌ Range queries require querying all shards  
❌ Re-sharding is difficult (consistent hashing solves this)

### Directory-Based Sharding
A **lookup table** maps keys to shards.

```
user_id 1 → Shard A
user_id 2 → Shard C
user_id 3 → Shard B
```

✅ Flexible  
❌ Lookup service becomes a bottleneck and single point of failure

## Consistent Hashing

Used to minimize data movement when shards are added/removed.

```
Hash ring: 0 ─────────────── 360°
Servers placed at positions on ring
Each key goes to the next server clockwise
```

Adding a server only re-distributes ~K/N keys (K = keys, N = servers).

## Sharding vs Partitioning vs Replication

| Concept | Description |
|---|---|
| **Sharding** | Split data across multiple independent DB servers |
| **Partitioning** | Split data within a single database server |
| **Replication** | Copy the same data to multiple servers for fault tolerance |

## Challenges

- **Cross-shard queries** — expensive joins across shards
- **Distributed transactions** — no easy ACID guarantees
- **Resharding** — migrating data when adding new shards
- **Hotspots** — uneven access patterns making one shard a bottleneck

## Interview Tip

> "Sharding is a last resort. Try vertical scaling, caching, read replicas, and query optimization first. When you do shard, choose your shard key very carefully — it cannot easily be changed later."
