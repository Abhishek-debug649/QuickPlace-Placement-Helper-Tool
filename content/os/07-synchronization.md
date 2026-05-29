# Module 7: Synchronization

## 7.1 The Critical Section Problem
**CRITICAL SECTION:** A portion of code that accesses shared data/resources and must NOT be executed by more than one process simultaneously.

**RACE CONDITION:** When two processes access shared data concurrently and the result depends on the execution order.

> **ANALOGY:** Two bank tellers both reading a balance of ₹1000 and simultaneously processing a ₹500 withdrawal. Both read 1000, both subtract 500, both write 500 back. But the correct balance should be 0! (Race condition.)

**Requirements for a solution:**
1. **MUTUAL EXCLUSION:** Only one process in CS at a time
2. **PROGRESS:** If no one is in CS, a process wanting to enter should not wait indefinitely
3. **BOUNDED WAITING:** A limit on how many times others can enter CS before you do

---

## 7.2 Synchronization Mechanisms

### MUTEX (Mutual Exclusion Lock):
A lock variable. Only one process/thread can hold the mutex at a time. Others must wait (block) until it's released.

> **ANALOGY:** A bathroom door lock. One person inside, door locked for others. When they exit, they unlock — next person can enter.

```c
mutex.lock()
// -- CRITICAL SECTION --
mutex.unlock()
```

### SEMAPHORE:
A generalized synchronization primitive (invented by Dijkstra). Contains an integer counter.

Two operations:
- `wait(S)` / `P(S)`: Decrement S. If S < 0, block/wait.
- `signal(S)` / `V(S)`: Increment S. If processes are waiting, wake one up.

- **BINARY SEMAPHORE** (value 0 or 1) = Mutex
- **COUNTING SEMAPHORE** (value 0 to N) = Controls access to N instances of a resource

*EXAMPLE:* Counting semaphore with value=3 (3 printers available):
- Each `wait()` decrements count (takes a printer)
- Each `signal()` increments count (returns a printer)
- If count = 0 and someone waits → they block until a printer is returned

### MONITOR:
High-level synchronization construct. A class with:
- Private shared variables
- Public synchronized methods (only one thread can be in a method at a time)
- Condition variables (to make a thread wait inside the monitor)
*(Java's synchronized methods are essentially monitors.)*

---

## 7.3 Classic Synchronization Problems

### PRODUCER-CONSUMER (Bounded Buffer):
- Producer produces items, puts in a buffer
- Consumer takes items from buffer
- **Problem:** Producer must wait when buffer is FULL. Consumer must wait when buffer is EMPTY.
- **Solution:** 3 semaphores: `mutex` (mutual exclusion), `full` (count of filled slots), `empty` (count of empty slots)

### READERS-WRITERS:
- Multiple readers can read simultaneously
- Writers need exclusive access
- **Problem:** Starvation (either readers starve writers or vice versa)
- **Solution:** Read-write locks

### DINING PHILOSOPHERS:
- 5 philosophers sit at a circular table
- 5 chopsticks, one between each pair
- A philosopher needs 2 chopsticks to eat
- **Problem:** All pick up left chopstick simultaneously → deadlock!
- **Solutions:** Allow only 4 to sit at once, or use asymmetric locking (odd philosophers pick left then right; even pick right then left)
