# Deadlocks in Operating Systems

A **deadlock** is a situation where a set of processes are blocked because each process is holding a resource and **waiting for another resource** held by another process.

## The Four Necessary Conditions (Coffman Conditions)

All four must hold simultaneously for a deadlock to occur:

| Condition | Description |
|---|---|
| **Mutual Exclusion** | At least one resource must be non-shareable |
| **Hold and Wait** | A process holds resources while waiting for more |
| **No Preemption** | Resources cannot be forcibly taken away |
| **Circular Wait** | P1 waits for P2, P2 waits for P3, …, Pn waits for P1 |

## Deadlock Prevention

Break **at least one** Coffman condition:

- **Mutual Exclusion** → Make resources sharable where possible (e.g., read-only files)
- **Hold and Wait** → Require a process to request ALL resources at once before starting
- **No Preemption** → Preempt resources from waiting processes
- **Circular Wait** → Impose a strict **ordering** of resource acquisition (always acquire R1 before R2)

## Deadlock Avoidance — Banker's Algorithm

The OS dynamically checks if granting a resource request will leave the system in a **safe state**.

**Safe State** — a state from which the OS can guarantee all processes will eventually finish.

```
Process | Max Need | Allocated | Remaining Need
--------|----------|-----------|---------------
P0      | 7 5 3    | 0 1 0     | 7 4 3
P1      | 3 2 2    | 2 0 0     | 1 2 2
P2      | 9 0 2    | 3 0 2     | 6 0 0

Available: 3 3 2
Safe sequence: P1 → P3 → P0 → P2 → P4 ✅
```

## Deadlock Detection and Recovery

**Detection:** Use a Resource Allocation Graph (RAG)
- If RAG has a **cycle** → deadlock exists

**Recovery strategies:**
1. **Process Termination** — Abort one or more deadlocked processes
2. **Resource Preemption** — Forcibly take resources and roll back the process

## Livelock vs Deadlock vs Starvation

| Problem | Description |
|---|---|
| **Deadlock** | Processes permanently blocked waiting for each other |
| **Livelock** | Processes keep changing state but make no progress |
| **Starvation** | A process waits indefinitely because others keep getting priority |

## Interview Tip

> "Deadlock vs Starvation: In deadlock, **no one makes progress**. In starvation, **others make progress** but the starved process doesn't."
