# Sort

## Merge sort
  * \\( n \log(n) \\) in worst case
  * a `stable` sort (sort by column A, then sort by column B, then for the same B, order of A preserves)
  * simple to understand, divide and conquer (or bottom up to avoid recursion); `log(n)` levels, and each level's merge takes `n` operation, thus \\( n \log(n) \\)  will do

## **Quick sort**
  * \\( n \log(n) \\) in worst case
  * not a `stable` sort
  * more tricky but not difficult to understand, divide and conquer: <br>
    make sure an element's left are all smaller (or equal to) it, and the
    right part are all bigger than it (let's called it `partitioned`); then continue to sort both on left and right part;
  
### Quick sort partition
To make an array `partitioned` by, for eg. the first element: <br>
```
[3, 5, 2, 6, 1, 4]
i---^
j---^
```
Start with `i` and `j` both after first element.
`i` stands for `left of me is smaller than pivot`; `j` stands for `left of me is partitioned`. <br>
So basically we loop each element until `j` is `n`;<br>
For each step:<br>
  * If `a[j] >= pivot`, then just `j++`;
  * If `a[j] < pivot`, then `swap(i, j)`, `i++, j++`;
  * When `j` reaches the end, `swap(i-1, 0)`, return `i-1`
```
[3, 5, 2, 6, 1, 4]
i---^
j------^
``` 
swap
```
[3, 2, 5, 6, 1, 4]
i------^
j---------^
```
```
[3, 2, 5, 6, 1, 4]
i------^
j------------^
```
swap
```
[3, 2, 1, 6, 5, 4]
i---------^
j------------^
``` 
```
[3, 2, 1, 6, 5, 4]
i---------^
j-----------------^
```
then last swap and return `i=2`
```
[1, 2, 3, 6, 5, 4]
i---------^
j-----------------^
```

### Quick sort pivot choose

If an input array is already sorted, simply choose pivod as the first element
of the array will result the running time of quick sort to be \\( n^2 \\).
That is not quick.

So if some *"maigc"* method out there can always choose the midiean value 
as the pivot, then the quick sort running back falls back to \\( n \log(n) \\).

A common way is to choose a **random** element as pivot.
So with **Random Pivot** implemented, it can be approved 
that the total number of comparisons of quik-sort 
algorithms is equal or less than  \\( 2 n \ln(n) \\), 
appriximately.

So quick sort will have more comparisions than merge sort,
but as it needs no extra memory, so it is generally faster
than merge sort.

### Quick sort partition can be tricky
Many textbook implementations go quadratic if array
* Is sorted or reverse sorted
* Has many duplicates (even if randomized) (the standford course impl perhaps?)

### Quick sort practical improvements 
* Median of sample
  * Best choice of pivot item = median
  * Estimate true median by taking median of sample
  * Median-of-3 (random) items (which is also used in Rust's quicksort code)

### Quick select

The expected running time to find the median (or the kth largest value) of an array of nn distinct keys using randomized quickselect is *linear*.

### Duplicated keys - 3-way partition
Simply put all equal values together 
* 3-way partitioning: Goal - partition array into 3 parts
  - lo, lt, gt, hi
  - start with `lt=lo+1, gt=lo+1`
  - end with `hi` goes out length range

For each step:<br>
  * If `a[hi] > pivot`, then just `hi++`;
  * If `a[hi] == pivot`, then `swap(gt, hi)`, `gt++, hi++`
  * If `a[hi] < pivot`, then `swap(gt, hi)`,  `swap(lt, gt)`, `lt++, gt++, hi++`;
  * When `hi` reaches the end, `swap(lt-1, 0)`, return `lt-1, gt`
```
[3, 2, 1, 3, 3, 5, 6, 3, 1]
lt--------^
gt--------------^
hi-----------------^
```
```
[3, 2, 1, 3, 3, 5, 6, 3, 1]
lt--------^
gt--------------^
hi--------------------^
```
```
[3, 2, 1, 3, 3, 3, 6, 5, 1]
lt--------^
gt-----------------^
hi--------------------^
```
```
[3, 2, 1, 3, 3, 3, 6, 5, 1]
lt--------^
gt-----------------^
hi-----------------------^
```
`swap(gt, hi)`
```
[3, 2, 1, 3, 3, 3, 1, 5, 6]
lt--------^
gt-----------------^
hi-----------------------^
```
`swap(lt, gt)`
```
[3, 2, 1, 1, 3, 3, 3, 5, 6]
lt--------^
gt-----------------^
hi-----------------------^
```
`lt++, gt++, hi++`
```
[3, 2, 1, 1, 3, 3, 3, 5, 6]
lt-----------^
gt--------------------^
hi--------------------------^
```

Or a "from two end" approach could be like this:

![image](https://user-images.githubusercontent.com/161689/113506443-35a1a480-9545-11eb-8772-e2066045a12e.png)

### Bottom line
Randomized quicksort with 3-way partitioning reduced running time from linearithmic to liner in broad class of applications.

### Java Implementation
`Arrays.sort()` in Java use mergesort instead of quicksort when sorting *reference types*, as it is **stable** and guarantees \\( n \log(n) \\) performance

### Tukey's ninther
Median of the median of 3 samples.
Approximates the median of 9 evenly spaced entries. Uses at most 12 compares.

Seems used in Rust's quicksort as well.

## Summary

![summary](https://user-images.githubusercontent.com/161689/117543270-55ccf380-b01c-11eb-9b12-a96d4f0cccdf.png)

---

## Priority Queue - Binary Heap and Heap Sort

Two operations needed:
- remove the maximum
- insert

Priority queue applications
- Event-driven simulation. [customers in a line, colliding particles]
- Numerical computation. [reducing roundoff error]
- Data compression. [Huffman codes]
- Graph searching. [Dijkstra's algorithm, Prim's algorithm]
- Number theory. [sum of powers]
- Artificial intelligence. \[[A\* search](https://liufuyang.github.io/note/algorithms/stack_queue.html#search-algorithm)\]
- Statistics. [maintain largest M values in a sequence]
- Operating systems. [load balancing, interrupt handling]
- Discrete optimization. [bin packing, scheduling]
- Spam filtering. [Bayesian spam filter]

![image](https://user-images.githubusercontent.com/161689/117346317-e2a27080-aea7-11eb-90b1-c21663dd84c5.png)
![image](https://user-images.githubusercontent.com/161689/117346449-09f93d80-aea8-11eb-826f-74dd551aab7d.png)

### Binary Heap

The *binary heap* is a data structure that can efficiently support 
the basic priority-queue operations. A *binary tree* is *heap-ordered* 
if the key in each node is larger than or equal to the keys in that 
node's two children (if any).

- Height of complete tree with N nodes is `lg N`
- Array representation, with indices start at 1, largest key at the root
- Take nodes in level order
- No explicit links needed!
- Largest key is a[1], which is root of binary tree
- Can use array indices to move through tree
  - Parent of node at k is at `k/2`
  - Children of node at k are at `2k` and `2k+1`

![image](https://user-images.githubusercontent.com/161689/117347090-e97db300-aea8-11eb-806c-53f13a13278c.png)

![image](https://user-images.githubusercontent.com/161689/117540777-10ef8f80-b011-11eb-9ce7-4e84849c7592.png)

![image](https://user-images.githubusercontent.com/161689/117540789-22d13280-b011-11eb-8be3-8b49a7024590.png)

![image](https://user-images.githubusercontent.com/161689/117540819-41cfc480-b011-11eb-9759-473a68cc84ec.png)

![image](https://user-images.githubusercontent.com/161689/117540835-5318d100-b011-11eb-86a7-40f2be793c57.png)

Here is the code summary:
```java 
public class MaxPQ<Key extends Comparable<Key>>
{
 private Key[] pq;
 private int N;
 public MaxPQ(int capacity)
 { pq = (Key[]) new Comparable[capacity+1]; }
 
 public boolean isEmpty()
 { return N == 0; }
 
 private boolean less(int i, int j)
 { return pq[i].compareTo(pq[j]) < 0; }
 
 private void exch(int i, int j)
 { Key t = pq[i]; pq[i] = pq[j]; pq[j] = t; }

 // promotion
 private void swim(int k)
 {
   while (k > 1 && less(k/2, k)) {
    exch(k, k/2);
    k = k/2;
   }
 }
 
 // insert
 public void insert(Key x) {
   pq[++N] = x;
   swim(N);
 }
 
 // demotion
 private void sink(int k) {
   while (2*k <= N) {
     int j = 2*k;
     if (j < N && less(j, j+1)) j++;
     if (!less(k, j)) break;
     exch(k, j);
     k = j;
   }
 }
 
 // delete max
 public Key delMax() {
   Key max = pq[1];
   exch(1, N--);
   sink(1);
   pq[N+1] = null; // prevent loitering
   return max;
 }
}
```

![image](https://user-images.githubusercontent.com/161689/117541435-20bca300-b014-11eb-9af0-42552bd18b68.png)

![image](https://user-images.githubusercontent.com/161689/117541564-bbb57d00-b014-11eb-8510-f5344ceed736.png)

![image](https://user-images.githubusercontent.com/161689/117542117-97a76b00-b017-11eb-8da4-3962bdb764f9.png)

One more note: Use immutable keys if you can!

## Heapsort

![image](https://user-images.githubusercontent.com/161689/117542715-fa9a0180-b019-11eb-8768-843aee823200.png)

```java
 public static void sort(Comparable[] a) {
   int N = a.length;
   
   // first pass - heap construction
   for (int k = N/2; k >= 1; k--)
     sink(a, k, N);
   
   // second pass - remove max one at a time
   while (N > 1) {
     exch(a, 1, N);
     sink(a, 1, --N);
   }
 }
```

- **Heap construction is in linear time, uses ≤ 2 N compares and exchanges**
- **No extra memory needed, ≤ 2 N log N compares and exchanges !!!**

**Heapsort significane** In-place sorting algorithm
- Mergesort: need extra space, (otherwise there is a not practical way)
- Quicksort: quadratic time in worst case (N ln N via probabilistic guarantee, fast in practise) 
- Heapsort: Yes ! 2 N log N worst case

**Bottom line**. Heapsort is optimal for both time and space, but:
- Inner loop longer than quicksort’s. (each time sink needs to compare with 2 children)
- Makes poor use of cache memory. (memory ref jumps around too much)
- Not stable.


![summary](https://user-images.githubusercontent.com/161689/117543270-55ccf380-b01c-11eb-9b12-a96d4f0cccdf.png)
