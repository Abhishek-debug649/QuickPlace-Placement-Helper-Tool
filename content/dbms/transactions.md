# Database Transactions

A **transaction** is a sequence of operations performed as a single logical unit of work that must be either **fully completed** or **fully rolled back**.

## ACID Properties

### Atomicity
**"All or nothing"** — either all operations in the transaction succeed, or none of them do.

> If a bank transfer debits Account A but fails before crediting Account B, the debit is **rolled back**.

### Consistency
The database must move from one **valid state** to another valid state. Integrity constraints are always maintained.

### Isolation
**Concurrent transactions** execute as if they were serial. Changes made by one transaction are not visible to others until committed.

### Durability
Once a transaction is **committed**, it remains so even in case of system failure. Data is written to non-volatile storage.

## Transaction States

```
Active → Partially Committed → Committed
   ↓                ↓
Failed         Aborted (Rollback)
```

## Isolation Levels (SQL Standard)

| Level | Dirty Read | Non-repeatable Read | Phantom Read |
|---|---|---|---|
| **READ UNCOMMITTED** | ✅ Yes | ✅ Yes | ✅ Yes |
| **READ COMMITTED**   | ❌ No  | ✅ Yes | ✅ Yes |
| **REPEATABLE READ**  | ❌ No  | ❌ No  | ✅ Yes |
| **SERIALIZABLE**     | ❌ No  | ❌ No  | ❌ No  |

## Common SQL Commands

```sql
BEGIN TRANSACTION;
  UPDATE accounts SET balance = balance - 500 WHERE id = 1;
  UPDATE accounts SET balance = balance + 500 WHERE id = 2;
COMMIT;

-- On failure:
ROLLBACK;
```

## Concurrency Problems

- **Dirty Read** — reading uncommitted data from another transaction
- **Non-repeatable Read** — re-reading a row gets different data
- **Phantom Read** — re-executing a query returns new rows
- **Lost Update** — two transactions overwrite each other's changes

## Deadlock

A deadlock occurs when two or more transactions are each waiting for the other to release a lock.

**Prevention strategies:**
- **Timeout** — abort transaction if waiting too long
- **Wait-Die / Wound-Wait** — priority-based schemes
- **Deadlock Detection** — using wait-for graphs
