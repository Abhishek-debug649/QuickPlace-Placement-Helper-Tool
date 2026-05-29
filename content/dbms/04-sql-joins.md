# Module 4: SQL Joins

## What is a Join?
A JOIN combines rows from two or more tables based on a related column (usually a foreign key relationship).

> **ANALOGY:** You have two Excel sheets:
> - Sheet 1: Employee list (EmpID, Name, DeptID)
> - Sheet 2: Department list (DeptID, DeptName)
> - JOIN lets you combine them to get: (EmpID, Name, DeptName) — one unified view.

**SAMPLE TABLES FOR ALL EXAMPLES:**

*Employees:*
| EmpID | Name | DeptID |
| --- | --- | --- |
| 1 | Alice | 10 |
| 2 | Bob | 20 |
| 3 | Charlie | 30 |
| 4 | Diana | NULL |

*Departments:*
| DeptID | DeptName |
| --- | --- |
| 10 | Engineering |
| 20 | Marketing |
| 40 | HR |

---

## 4.1 Inner Join
Returns only the rows where there is a MATCH in BOTH tables.

> **ANALOGY:** Venn diagram intersection — only the overlapping part.

```mermaid
venn
    A("Table A")
    B("Table B")
    A intersect B
```

**SQL:**
```sql
SELECT e.Name, d.DeptName
FROM Employees e
INNER JOIN Departments d ON e.DeptID = d.DeptID;
```

**RESULT:**
| Name | DeptName |
| --- | --- |
| Alice | Engineering |
| Bob | Marketing |

*(Charlie with DeptID=30 has no matching Dept; Diana has NULL DeptID → excluded. HR Dept with DeptID=40 has no employees → excluded)*

---

## 4.2 Left (Outer) Join
Returns ALL rows from the LEFT table + matching rows from RIGHT. Non-matching right side rows get NULL.

> **ANALOGY:** All employees, whether they have a department or not. Left = Employees (everyone included), Right = Departments (matched or NULL).

**SQL:**
```sql
SELECT e.Name, d.DeptName
FROM Employees e
LEFT JOIN Departments d ON e.DeptID = d.DeptID;
```

**RESULT:**
| Name | DeptName |
| --- | --- |
| Alice | Engineering |
| Bob | Marketing |
| Charlie | NULL |
| Diana | NULL |

---

## 4.3 Right (Outer) Join
Returns ALL rows from the RIGHT table + matching rows from LEFT. Non-matching left side rows get NULL.

**SQL:**
```sql
SELECT e.Name, d.DeptName
FROM Employees e
RIGHT JOIN Departments d ON e.DeptID = d.DeptID;
```

**RESULT:**
| Name | DeptName |
| --- | --- |
| Alice | Engineering |
| Bob | Marketing |
| NULL | HR |

*(HR dept has no employees → NULL for Name; Charlie & Diana excluded)*

---

## 4.4 Full (Outer) Join
Returns ALL rows from BOTH tables. Non-matching sides get NULL.

> **ANALOGY:** Everything from both Venn circles — union of both tables.

**SQL:** *(MySQL doesn't support FULL OUTER JOIN directly — use UNION)*
```sql
SELECT e.Name, d.DeptName
FROM Employees e
LEFT JOIN Departments d ON e.DeptID = d.DeptID
UNION
SELECT e.Name, d.DeptName
FROM Employees e
RIGHT JOIN Departments d ON e.DeptID = d.DeptID;
```

**RESULT:**
| Name | DeptName |
| --- | --- |
| Alice | Engineering |
| Bob | Marketing |
| Charlie | NULL |
| Diana | NULL |
| NULL | HR |

---

## 4.5 Cross Join (Cartesian Product)
Returns every combination of rows from both tables. If Table A has `m` rows and Table B has `n` rows → `m × n` rows

> **ANALOGY:** Menu combinations — if you have 3 starters and 4 mains, cross join gives all 12 possible meal combinations.

**SQL:**
```sql
SELECT e.Name, d.DeptName
FROM Employees e
CROSS JOIN Departments d;
```
*(Returns 4 × 3 = 12 rows. Use case: Generate test data, create schedule combinations.)*

---

## 4.6 Self Join
A table joins with itself (uses aliases to distinguish).

> **ANALOGY:** An employee table where each employee also has a ManagerID pointing to another employee in the SAME table.

*Employees (with manager info):*
| EmpID | Name | ManagerID |
| --- | --- | --- |
| 1 | Alice | NULL (CEO) |
| 2 | Bob | 1 |
| 3 | Charlie | 1 |
| 4 | Diana | 2 |

**SQL:** Find each employee with their manager's name:
```sql
SELECT e.Name AS Employee, m.Name AS Manager
FROM Employees e
LEFT JOIN Employees m ON e.ManagerID = m.EmpID;
```

**RESULT:**
| Employee | Manager |
| --- | --- |
| Alice | NULL |
| Bob | Alice |
| Charlie | Alice |
| Diana | Bob |

---

## 4.7 Important SQL Clauses with Joins

### WHERE vs HAVING:
- **WHERE:** Filters BEFORE aggregation (filters individual rows)
- **HAVING:** Filters AFTER aggregation (filters grouped results)

**Example:**
```sql
-- Departments with more than 5 employees:
SELECT DeptID, COUNT(*) AS emp_count
FROM Employees
GROUP BY DeptID
HAVING COUNT(*) > 5;  -- can't use WHERE here (aggregate)
```

### SUBQUERIES in JOINs:
```sql
-- Employees earning more than average salary:
SELECT Name FROM Employees
WHERE Salary > (SELECT AVG(Salary) FROM Employees);
```
