# Virtual Memory

**Virtual memory** is a memory management technique that gives each process the illusion that it has access to a large, contiguous block of memory, even when physical RAM is limited.

## Why Virtual Memory?

- Programs can be **larger than physical RAM**
- Each process gets its **own private address space** (isolation)
- Memory can be **shared** between processes efficiently
- Enables **multiprogramming** without conflicts

## Paging

**Paging** divides both virtual memory and physical memory into fixed-size blocks:
- **Pages** → virtual memory blocks
- **Frames** → physical memory blocks (same size as pages)

```
Virtual Address = Page Number | Offset
Physical Address = Frame Number | Offset

Page Table maps: Page # → Frame #
```

### Page Table Entry (PTE)
```
[ Frame Number | Valid Bit | Dirty Bit | Reference Bit | Protection Bits ]
```

- **Valid Bit** = 1 → page is in RAM; 0 → page is on disk (page fault!)
- **Dirty Bit** = 1 → page has been modified, must write back to disk
- **Reference Bit** = 1 → page was recently accessed

## Page Fault

When a process accesses a page **not in RAM**, a **page fault** occurs:

```
1. CPU raises page fault exception
2. OS locates page on disk (swap space)
3. OS selects a victim frame (page replacement)
4. OS loads page from disk into frame
5. Update page table
6. Restart the faulting instruction
```

## Page Replacement Algorithms

### FIFO (First In, First Out)
Replace the page that has been in memory the longest.

### Optimal (OPT)
Replace the page that **won't be used for the longest time** in the future. (Theoretical — requires future knowledge)

### LRU (Least Recently Used)
Replace the page that **was least recently accessed**. Best practical approximation of Optimal.

### Clock Algorithm (Second Chance)
FIFO with a reference bit — give each page a second chance before replacing.

## Thrashing

**Thrashing** occurs when a process spends more time **swapping pages** than executing.

```
Too many processes → each gets very little RAM → constant page faults → CPU utilization drops
```

**Solution:** Working Set Model — keep only the "active working set" of pages in RAM.

## Segmentation vs Paging

| | Paging | Segmentation |
|---|---|---|
| **Divisions** | Fixed-size pages | Variable-size segments |
| **Fragmentation** | Internal fragmentation | External fragmentation |
| **User view** | Transparent | Meaningful (code, stack, heap) |
| **Protection** | Per page | Per segment (read/write/execute) |
