# Module 3: Normalization

## What is Normalization?
Normalization is the process of organizing a database to reduce redundancy (duplicate data) and improve data integrity by dividing large tables into smaller, related tables.

> **ANALOGY:** Organizing your wardrobe. Instead of dumping everything in one giant pile (unnormalized), you create separate sections: shirts, pants, accessories — each item in its proper place (normalized). Updates are easier — if you rename a category, you change it in one place, not everywhere.

**PROBLEMS IN UNNORMALIZED DATA:**
- **Update Anomaly:** Update one place, forget to update duplicate → inconsistency
- **Insert Anomaly:** Can't insert partial data without entering everything
- **Delete Anomaly:** Deleting a record accidentally removes other useful info

---

## 3.1 First Normal Form (1NF)
**RULES:**
1. Each cell must contain ATOMIC (indivisible) values — no lists, no sets
2. Each row must be uniquely identifiable (have a primary key)
3. No repeating groups of columns

**BEFORE 1NF (violation — non-atomic):**

| ID | Name | Subjects |
| --- | --- | --- |
| 1 | Raj | Math, Science, English |
| 2 | Priya | History, Geography |

**AFTER 1NF (each cell has one value):**

| ID | Name | Subject |
| --- | --- | --- |
| 1 | Raj | Math |
| 1 | Raj | Science |
| 1 | Raj | English |
| 2 | Priya | History |
| 2 | Priya | Geography |

---

## 3.2 Second Normal Form (2NF)
**RULES:**
1. Must already be in 1NF
2. No PARTIAL DEPENDENCY: Every non-key attribute must depend on the ENTIRE primary key (not just part of it)
*(This only applies when the primary key is COMPOSITE / multiple columns)*

**BEFORE 2NF (violation):**
Table: `Student_Subject` (Primary Key = {StudentID, SubjectID})

| StudentID | SubjectID | Grade | StudName |
| --- | --- | --- | --- |
| 1 | S01 | A | Raj |
| 1 | S02 | B | Raj |
| 2 | S01 | C | Priya |

*Problem: `StudName` depends only on `StudentID` (partial dependency), not on the full composite key.*

**AFTER 2NF (separate tables):**

`Students:`
| StudentID | StudName |
| --- | --- |
| 1 | Raj |
| 2 | Priya |

`Enrollments:`
| StudentID | SubjectID | Grade |
| --- | --- | --- |
| 1 | S01 | A |
| 1 | S02 | B |
| 2 | S01 | C |

---

## 3.3 Third Normal Form (3NF)
**RULES:**
1. Must already be in 2NF
2. No TRANSITIVE DEPENDENCY: Non-key attributes must NOT depend on other non-key attributes. Everything should depend on the key, the whole key, and NOTHING BUT the key.

> **MNEMONIC:** "Depend on the key, the whole key, and nothing but the key."

**BEFORE 3NF (violation):**

| StudentID | StudentName | ZipCode | City |
| --- | --- | --- | --- |
| 1 | Raj | 110001 | New Delhi |
| 2 | Priya | 400001 | Mumbai |

*Problem: `City` depends on `ZipCode` (not on `StudentID` directly). This is a transitive dependency: StudentID → ZipCode → City*

**AFTER 3NF:**

`Students:`
| StudentID | StudentName | ZipCode |
| --- | --- | --- |
| 1 | Raj | 110001 |
| 2 | Priya | 400001 |

`ZipCodes:`
| ZipCode | City |
| --- | --- |
| 110001 | New Delhi |
| 400001 | Mumbai |

---

## 3.4 Boyce-Codd Normal Form (BCNF)
**RULES:**
1. Must already be in 3NF
2. For every functional dependency `X → Y`, `X` must be a SUPER KEY (i.e., the left side must be a candidate key — no exceptions)

BCNF is stricter than 3NF. A relation can be in 3NF but not BCNF.

**WHEN 3NF FAILS BUT BCNF NEEDED:**
Table: (Student, Subject, Teacher)
- A student takes multiple subjects
- Each subject is taught by multiple teachers
- Each teacher teaches only ONE subject
- Functional Dependencies: `{Student, Subject} → Teacher` AND `Teacher → Subject`
- *Problem:* Teacher is not a super key, but Teacher → Subject exists.
- *Solution:* Split into (Teacher, Subject) and (Student, Teacher)

---

## 3.5 Higher Normal Forms & Denormalization

### Higher Normal Forms
- **4NF:** Remove multi-valued dependencies
- **5NF:** Remove join dependencies (decompose further without data loss)
- **DKNF:** Every constraint is a consequence of domain and key constraints

*(In practice: Most production databases aim for 3NF or BCNF. Over-normalization can hurt performance due to too many JOINs.)*

### Denormalization
**WHAT:** Intentionally introducing redundancy to improve READ performance.
**WHEN:** When JOIN performance is too slow in high-read systems.

*Example:* E-commerce order history — instead of JOINing Orders + Products every time, store product_name directly in OrderItems table.
*Trade-off:* Faster reads BUT more storage, and updates must touch multiple places (risk of inconsistency).
