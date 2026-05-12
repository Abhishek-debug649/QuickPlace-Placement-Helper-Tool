# Threads vs Processes

## What is a Process?

A **process** is an independent program in execution. It has its own:
- Memory space (code, data, heap, stack)
- File descriptors
- System resources
- PCB (Process Control Block)

## What is a Thread?

A **thread** is the smallest unit of execution **within** a process. Multiple threads in the same process **share**:
- Code segment
- Data segment (global variables)
- Heap memory
- Open files

Each thread has its **own**:
- Stack (local variables, function calls)
- Registers (including Program Counter)
- Thread ID

## Key Differences

| Aspect | Process | Thread |
|---|---|---|
| **Memory** | Separate address space | Shared address space |
| **Communication** | IPC (pipes, sockets, shared memory) | Direct memory access (faster) |
| **Creation overhead** | High | Low |
| **Context switch** | Expensive | Cheap |
| **Isolation** | Crash doesn't affect others | Crash can affect all threads |
| **Synchronization** | Not needed (separate memory) | Required (race conditions) |

## Types of Threads

### User-Level Threads
- Managed by a user-level library (not the OS kernel)
- Faster creation and context switching
- Blocking one thread blocks the entire process

### Kernel-Level Threads
- Managed directly by the OS
- One thread can block while others continue
- More overhead due to kernel involvement

### Hybrid (Many-to-Many)
- Combines benefits of both

## Thread Synchronization

### Race Condition
Two threads access shared data concurrently and the outcome depends on the order of execution.

### Mutex (Mutual Exclusion Lock)
```c
pthread_mutex_lock(&lock);
// critical section
shared_counter++;
pthread_mutex_unlock(&lock);
```

### Semaphore
```c
sem_wait(&sem);  // P operation (decrement)
// critical section
sem_post(&sem);  // V operation (increment)
```

### Monitor
Higher-level synchronization construct that combines mutex + condition variables.

## Interview Tip

> "Use **processes** for isolation and security (microservices). Use **threads** for tasks that need to share data and run concurrently (web server handling multiple requests)."
