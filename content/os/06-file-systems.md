# Module 6: File Systems

## 6.1 File System Basics
A file system provides an organized way to store, name, and retrieve data on secondary storage (HDD, SSD).

> **ANALOGY:** A filing cabinet (file system):
> - Drawers = disk partitions
> - Folders = directories
> - Documents = files
> - Labels = file names
> - Index cards = directory entries with metadata

- **FILE ATTRIBUTES:** Name, Type, Size, Location, Timestamps, Permissions, Owner
- **FILE OPERATIONS:** Create, Read, Write, Seek (reposition pointer), Delete, Truncate

---

## 6.2 Directory Structure
- **Single-Level Directory:** All files in one global directory (simple, no folders)
- **Two-Level:** Separate directory per user
- **Tree-Structured:** Hierarchical (modern standard — like your `/home/user/Documents`)
- **Acyclic-Graph:** Allow sharing — files can appear in multiple directories (symlinks)
- **General Graph:** Allows cycles (dangerous — can cause infinite loops; rare)

---

## 6.3 File Allocation Methods

### CONTIGUOUS ALLOCATION:
- Files occupy contiguous blocks on disk
- Fast sequential access, supports random access
- **Problem:** External fragmentation; files can't grow easily
- *ANALOGY: Parking all the cars in a continuous row in a lot*

### LINKED ALLOCATION:
- Each block contains a pointer to the next block
- No external fragmentation; files can grow
- **Problem:** No random access (must traverse from start); pointer overhead
- *FAT (File Allocation Table) is a variation*
- *ANALOGY: A scavenger hunt — each clue (block) tells you where the next is*

### INDEXED ALLOCATION:
- One special "index block" contains all pointers to the file's blocks
- Supports random access; no fragmentation
- **Problem:** Index block wastes space for small files; small files can't use all pointers
- *Unix/Linux inode uses a variation of this*

---

## 6.4 Disk Scheduling
Goal: Minimize disk arm movement (seek time is the biggest delay).

- **FCFS:** Serve requests in order received (fair but high seek time).
- **SSTF (Shortest Seek Time First):** Serve closest request first. *Problem: Starvation of far-away requests.*
- **SCAN (Elevator Algorithm):** Arm moves in one direction serving all requests, reaches end, reverses direction.
  - *ANALOGY: Elevator — goes up serving all floors, then comes back down.*
- **C-SCAN (Circular SCAN):** Only serves in ONE direction, then jumps back to start without serving on the return.
