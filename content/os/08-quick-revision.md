# Module 8: Quick Revision — Key Concepts

### SYSTEM CALL vs FUNCTION CALL:
- **Function call:** User space → User space (no privilege change, fast)
- **System call:** User space → Kernel space (privilege switch, slow, secure)
- *Examples of system calls:* `fork()`, `exec()`, `open()`, `read()`, `write()`, `exit()`

### KERNEL vs USER SPACE:
- **Kernel space:** OS code runs here (trusted, full hardware access)
- **User space:** Application code runs here (restricted, no direct hardware)
- **Mode bit:** 0 = Kernel mode, 1 = User mode

### FORK() vs EXEC():
- `fork()` : Creates a new child process (copy of parent)
- `exec()` : Replaces current process image with a new program
- *Together:* `fork()` creates child, child calls `exec()` to run a new program

### ZOMBIE PROCESS:
A process that has TERMINATED but its entry still remains in the process table because parent hasn't called `wait()` to collect exit status.
- **Solution:** Parent calls `wait()` to reap the zombie.

### ORPHAN PROCESS:
A process whose parent has terminated before it. OS (init process) adopts it.

### INODE:
A data structure (Unix/Linux) storing file metadata:
- File size, permissions, owner, timestamps
- Pointers to actual data blocks on disk
- **NOT** the file name (directory stores name → inode mapping)

### MEMORY TERMS:
- **THRASHING:** Process spends more time page faulting than executing.
- **BELADY'S ANOMALY:** With FIFO, more page frames can cause MORE page faults.
- **WORKING SET MODEL:** Keep in memory only pages a process actively uses.

### SCHEDULING COMPARISON:

| Algorithm | Preemptive? | Fair? | Starvation? | Best for |
| --- | --- | --- | --- | --- |
| **FCFS** | No | Yes | No | Batch |
| **SJF** | No | No | Yes | Batch |
| **SRTF** | Yes | No | Yes | Minimizes waiting |
| **Priority** | Both | No | Yes | Prioritized tasks |
| **Round Robin** | Yes | Yes | No | Time-sharing |
