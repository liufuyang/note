# Balanced Search Trees

- `Binary Heap` or priority queue is good for `max()` or `min()` as it is only O(1),
however it only support `delMax/Min()` and not good for search.
- `Binary search tree` is good for search, rank, insert and delete, also quite good for
finding max and min, all these operation is O(log N), if the tree can be **balanced**.
- `Hash Table` is super good for search/look-up (O(1)), insert and delete, but not good for operations
such as rank, min, or max.
