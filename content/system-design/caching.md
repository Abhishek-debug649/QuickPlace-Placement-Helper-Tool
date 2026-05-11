# Caching

**Caching** is a technique that stores a copy of a given resource and serves it back when requested.

### Eviction Policies
- **LRU (Least Recently Used)**: Discards the least recently used items first.
- **LFU (Least Frequently Used)**: Counts how often an item is needed. Those that are used least often are discarded first.
- **FIFO (First In First Out)**: Evicts the oldest items first.
