# Indexing in Databases

An **index** is a data structure that improves the **speed of data retrieval** operations on a database table at the cost of additional writes and storage space.

## Why Indexing?

Without an index, a query `SELECT * FROM users WHERE email = 'x@y.com'` scans every row — **O(n)** time.  
With an index on `email`, the database uses a B-Tree or Hash lookup — **O(log n)** or **O(1)** time.

## Types of Indexes

### Primary Index
- Created on the **primary key** (ordered file)
- One entry per data block — **dense** or **sparse**

### Secondary Index
- Created on **non-key** fields
- Always **dense** (one entry per record)

### Clustered Index
- Data rows are **physically stored** in the order of the index
- Only **one** clustered index per table
- Efficient for **range queries**

### Non-Clustered Index
- Index is **separate** from the data
- Contains pointers back to the actual rows
- Multiple non-clustered indexes allowed

## B-Tree Index (Most Common)

```
         [30]
        /    \
     [15]    [45]
    /   \   /   \
 [10] [20] [35] [60]
```

- Balanced tree — all leaf nodes at same depth
- Supports: `=`, `<`, `>`, `BETWEEN`, `ORDER BY`
- Self-balancing — O(log n) operations

## Hash Index

- Uses a hash function to map keys to bucket addresses
- Only supports **equality** checks (`WHERE id = 5`)
- Does **NOT** support range queries

## Composite Index

```sql
CREATE INDEX idx_name ON orders (customer_id, product_id);
```

- Effective when queries filter by `customer_id` **first**
- **Leftmost prefix rule** — index on (A, B, C) helps queries on A, (A,B), (A,B,C) but NOT on B alone

## When to Use Indexes

✅ Columns used in `WHERE`, `JOIN`, `ORDER BY`, `GROUP BY`  
✅ Columns with high **cardinality** (many unique values)  
❌ Small tables  
❌ Columns that are updated very frequently  
❌ Columns with very low cardinality (e.g., boolean)

## Index Trade-offs

| Benefit | Cost |
|---|---|
| Faster SELECT queries | Slower INSERT/UPDATE/DELETE |
| Supports sorting | Extra storage space |
| Enables efficient joins | Index maintenance overhead |
