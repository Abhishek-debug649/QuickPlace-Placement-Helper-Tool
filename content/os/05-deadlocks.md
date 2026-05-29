# Module 5: Deadlocks

## 5.1 What is a Deadlock?
A set of processes where each process is waiting for a resource held by another process in the set, and no process can proceed.

> **ANALOGY:** Four cars at a 4-way intersection, each waiting for the one on its right to move first. Nobody moves — permanent standstill.
> 
> **ANALOGY 2:** Two people each holding one chopstick, each waiting for the other person to give up theirs so they can eat. Neither eats.

---

## 5.2 Conditions for Deadlock
*(All 4 must hold simultaneously)*

1. **MUTUAL EXCLUSION:** At least one resource must be non-shareable (only one process at a time). Example: Printer, write-access to a file.
2. **HOLD AND WAIT:** A process holds at least one resource AND is waiting for additional resources held by other processes.
3. **NO PREEMPTION:** Resources cannot be forcibly taken from a process holding them. The process must voluntarily release them.
4. **CIRCULAR WAIT:** A circular chain of processes: P1 waits for resource held by P2, P2 waits for resource held by P3, P3 waits for resource held by P1.

---

## 5.3 Deadlock Handling Strategies

### PREVENTION (Ensure at least one condition never holds):
- **Break Mutual Exclusion:** Make resources shareable (hard — printers can't share)
- **Break Hold & Wait:** Process must request ALL resources before starting (not realistic for dynamic requests)
- **Allow Preemption:** OS can forcibly take resources from a waiting process
- **Break Circular Wait:** Number all resources; processes must request in increasing order (prevents circular chain)

### AVOIDANCE (Dynamically check before granting resource):
**BANKER'S ALGORITHM:**
- Before granting a resource, check if the system would still be in a "safe state"
- **SAFE STATE:** There exists some sequence of all processes that can complete without deadlock
- If granting the resource leads to UNSAFE STATE → deny the request (process waits)

> **ANALOGY:** A bank (OS) has limited cash (resources). Before lending money to a customer (process), the bank checks if it can still serve all other customers. If lending would risk inability to serve others, it delays the loan.

### DETECTION + RECOVERY (Let deadlock occur, then fix it):
**DETECTION:**
- Maintain Resource Allocation Graph (RAG)
- If RAG has a CYCLE → deadlock exists (for single-instance resources)

**RECOVERY options:**
- Process Termination: Kill one or all deadlocked processes
- Resource Preemption: Forcibly take resources from some processes, roll back

### IGNORANCE (Ostrich Algorithm):
- Ignore the problem and reboot when deadlock occurs
- Used in practice! (Windows, Unix sometimes)
- Deadlocks are rare enough that recovery overhead isn't worth it
