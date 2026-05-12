# ACID Properties

**ACID** is a set of properties that guarantee database transactions are processed reliably. ACID stands for **Atomicity, Consistency, Isolation, and Durability**.

## A — Atomicity

**"All or nothing"**

A transaction is treated as a single unit — either all operations succeed, or the transaction is completely rolled back.

```sql
BEGIN;
  UPDATE accounts SET balance = balance - 1000 WHERE id = 1;  -- Debit
  UPDATE accounts SET balance = balance + 1000 WHERE id = 2;  -- Credit
COMMIT;  -- Both succeed
-- OR ROLLBACK on any failure
```

> If the credit fails after the debit, the entire transaction rolls back. No partial state.

## C — Consistency

**"Valid state to valid state"**

A transaction must bring the database from one **valid state** to another. All integrity constraints must be maintained.

```
Before: Account A = 5000, Account B = 3000, Total = 8000
Transfer 1000: A = 4000, B = 4000, Total = 8000 ✅
              A = 4000, B = 3000, Total = 7000 ❌ (inconsistent)
```

## I — Isolation

**"Concurrent transactions behave as if serial"**

Transactions run concurrently, but the result must be as if they ran sequentially.

### Isolation Levels (weakest → strongest):

```
READ UNCOMMITTED  → Dirty reads possible
READ COMMITTED    → No dirty reads, but non-repeatable reads possible
REPEATABLE READ   → No dirty/non-repeatable reads, but phantom reads possible
SERIALIZABLE      → Complete isolation, no concurrency anomalies
```

## D — Durability

**"Committed data persists forever"**

Once a transaction is committed, the data is saved permanently — even in the event of a system crash.

Achieved through:
- **Write-Ahead Logging (WAL)** — log changes before applying them
- **Checkpointing** — periodic snapshots of DB state
- **Replication** — copies on multiple servers

## ACID vs BASE

Modern distributed systems often trade ACID for **BASE**:

| | ACID | BASE |
|---|---|---|
| **Stands for** | Atomicity, Consistency, Isolation, Durability | Basically Available, Soft State, Eventual Consistency |
| **Systems** | Traditional RDBMS (MySQL, PostgreSQL) | NoSQL (Cassandra, DynamoDB, MongoDB) |
| **Consistency** | Strong | Eventual |
| **Availability** | May sacrifice for consistency | Prioritizes availability |

## CAP Theorem

In a distributed system, you can only guarantee **2 of 3**:

- **C**onsistency — every read gets the latest write
- **A**vailability — every request gets a (possibly stale) response
- **P**artition Tolerance — system continues despite network failures

> Real networks always have partitions (P), so the real choice is **C vs A**.

## Interview Tip

> "ACID is about correctness. BASE is about availability. Use ACID for financial systems, booking systems. Use BASE for social feeds, analytics, caches."
