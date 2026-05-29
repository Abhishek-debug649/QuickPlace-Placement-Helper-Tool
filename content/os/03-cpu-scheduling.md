# Module 3: CPU Scheduling

## 3.1 Why Scheduling?
Multiple processes are ready to run; the CPU can run only ONE at a time (on a single core). The scheduler decides which process runs next and for how long.

> **ANALOGY:** A doctor's clinic with many patients — the receptionist (scheduler) decides who sees the doctor next based on appointment time, urgency, etc.

**KEY METRICS:**
- **CPU Utilization:** % of time CPU is busy (higher = better)
- **Throughput:** # processes completed per unit time
- **Turnaround Time:** Total time from submission to completion
- **Waiting Time:** Time spent in ready queue
- **Response Time:** Time from submission to first response

---

## 3.2 Scheduling Algorithms

### FCFS — First Come, First Served
Processes are served in arrival order (like a queue). **NON-PREEMPTIVE** (can't interrupt a running process).

- **PROBLEM:** CONVOY EFFECT — A long process holds up all shorter ones behind it. Like a slow truck on a single-lane highway.

### SJF — Shortest Job First
Process with shortest burst time runs next. Can be non-preemptive or preemptive (SRTF).

> **ANALOGY:** At a photocopy shop — the person who needs just 1 copy goes before the person who needs 500 copies (even if they arrived later).

- **OPTIMAL** for minimizing average waiting time.
- **PROBLEM:** Starvation — long processes may never run if short ones keep arriving.
- **SRTF (Shortest Remaining Time First) = Preemptive SJF:** If a new process arrives with shorter remaining time, it PREEMPTS current.

### PRIORITY SCHEDULING
Each process has a priority number. Lowest number = highest priority (usually). Can be preemptive or non-preemptive.

- **PROBLEM:** STARVATION — Low-priority processes may never execute.
- **SOLUTION:** AGING — Gradually increase priority of waiting processes over time.
> **ANALOGY:** Airport boarding — First Class boards first, then Business, then Economy. Economy passengers wait longer.

### ROUND ROBIN (RR)
Each process gets a fixed time quantum (time slice). After quantum expires, the process is PREEMPTED and goes to the back of the ready queue.

> **ANALOGY:** Kids taking turns on a swing — each gets a fixed time (2 minutes), then goes to the back of the line. Fair to everyone.

**QUANTUM SIZE MATTERS:**
- Too small → too many context switches (overhead)
- Too large → degrades to FCFS
- Typical: 10-100 milliseconds
- **BEST for:** Time-sharing systems, fairness

### MULTILEVEL QUEUE SCHEDULING
Ready queue is divided into multiple queues based on process type.
Example:
- Queue 1 (highest priority): System processes
- Queue 2: Interactive processes
- Queue 3: Batch processes (lowest priority)

Each queue has its own scheduling algorithm. Processes don't move between queues.
**MULTILEVEL FEEDBACK QUEUE:** Processes CAN move between queues based on behavior (I/O-bound vs CPU-bound). More flexible and widely used in practice.
