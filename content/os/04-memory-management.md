# Module 4: Memory Management

## 4.1 Why Memory Management?
Multiple processes need RAM simultaneously. OS must:
- Allocate memory when processes start
- Track which parts of RAM are used/free
- Deallocate when processes finish
- Handle processes that need more memory than physically available

> **ANALOGY:** A librarian managing bookshelves (RAM). Multiple people (processes) need shelf space. Librarian allocates sections, keeps track, and reclaims space when a book (process) is returned.

---

## 4.2 Contiguous Memory Allocation
Each process gets a CONTIGUOUS (uninterrupted) block of memory.

- **Fixed Partitioning:**
  - Memory divided into fixed-size partitions
  - **Problem:** INTERNAL FRAGMENTATION — process is smaller than partition, wasted space inside the partition *(ANALOGY: Renting a 3-bedroom house but only needing 1 bedroom)*
- **Variable Partitioning:**
  - Partitions created exactly as needed
  - **Problem:** EXTERNAL FRAGMENTATION — free memory scattered in small chunks that can't satisfy a large request, even though total free space is enough *(ANALOGY: Parking lot with many small empty spots scattered, but no contiguous space for a large truck)*
- **COMPACTION:** Move all processes together to combine scattered free memory. (Expensive — requires pausing and moving processes)

---

## 4.3 Paging
**CONCEPT:** Divide both physical memory (RAM) and logical memory (process address space) into equal-sized blocks.
- Physical memory blocks = **FRAMES**
- Logical memory blocks = **PAGES**

> **ANALOGY:** A book (process) broken into equal chapters (pages). Library shelves (RAM) have slots for chapters (frames). The Table of Contents (Page Table) maps which chapter is on which shelf.

**HOW IT WORKS:**
- OS maintains a PAGE TABLE for each process
- Page Table maps: Page Number → Frame Number
- Logical address = Page Number + Offset
- Physical address = Frame Number + Offset

**BENEFITS:**
- Eliminates external fragmentation (pages fit in any frame)
- Still has minor internal fragmentation (last page may not be full)
- Allows non-contiguous memory allocation

**TLB (Translation Lookaside Buffer):**
- Hardware cache for page table lookups
- Without TLB: 2 memory accesses (page table + actual data)
- With TLB hit: Only 1 memory access
- *ANALOGY: TLB is like keeping frequently used pages bookmarked*

---

## 4.4 Segmentation
Memory is divided into variable-sized SEGMENTS based on logical units (code segment, data segment, stack, heap).

> **ANALOGY:** A book divided into logical chapters of different lengths (Introduction=5 pages, Chapter 1=30 pages, Appendix=15 pages).

- **Advantages:** More natural (matches programmer's view of memory)
- **Disadvantages:** External fragmentation (variable-size segments)

---

## 4.5 Virtual Memory
**CONCEPT:** Allows processes to use more memory than physically available. Parts of process not currently needed are stored on disk (SWAP space). Pages are brought into RAM only when needed.

> **ANALOGY:** Your desk (RAM) can hold 5 books. You have 20 books (full process). You keep only the books you're currently reading on the desk. Others are on the bookshelf (disk). You swap books as needed.

**PAGE FAULT:**
- Process tries to access a page not currently in RAM
- OS must load that page from disk into a RAM frame
- If RAM is full, OS must first SWAP OUT another page (page replacement)
- *Page fault is EXPENSIVE (disk access is ~100,000x slower than RAM)*

### PAGE REPLACEMENT ALGORITHMS:
- **FIFO (First In, First Out):** Replace the page that has been in memory the LONGEST. Simple but not always optimal.
  - *BELADY'S ANOMALY:* More frames can sometimes cause MORE page faults!
- **LRU (Least Recently Used):** Replace the page that was LEAST RECENTLY USED (not accessed for longest). Near-optimal in practice, widely used.
  - *ANALOGY: Clean your desk by removing the book you haven't touched longest.*
- **OPTIMAL (OPT):** Replace the page that won't be used for the LONGEST time in the future. Theoretically optimal but IMPOSSIBLE to implement (requires future knowledge). Used as a benchmark.
- **LFU (Least Frequently Used):** Replace page with lowest access frequency. Problem: Old pages that were once popular but are no longer needed stay.

**THRASHING:**
- Process spends more time PAGE FAULTING than executing
- Cause: Too many processes competing for limited RAM
- Solution: Reduce multiprogramming, use working set model

---

## 4.6 Memory Allocation Strategies (Free Block Selection)
- **FIRST FIT:** Allocate the first free block that is big enough. Fast, but causes fragmentation near the start of memory.
- **BEST FIT:** Allocate the smallest block that is just big enough. Reduces wasted space but leaves many tiny unusable holes.
- **WORST FIT:** Allocate the largest available block. Leaves larger remaining holes (better for future large requests).
