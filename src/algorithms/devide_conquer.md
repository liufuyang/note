# Divide and Conquer

1. Divide into smaller problems
2. Conquer via recursive calls
3. Combine solutions of sub-problems into one for the 
   original problem.

## Typical problems:
* Merge sort (recursive or bottom up)
* Karatsuba Multiplication
* Counting Inversions
  
  Example: (1, 3, 5, 2, 4, 6), having inversions: (3,2), (5,2), (5, 4)

  Can be used for: calculate the similarity between 2 persons' 10 movies sort order.

## Counting Inversions
Naive implementation is \\( O(n^2) \\) as we need 2 for loops.
Via divide and conquer, what we need is this
```
Count(array a, length n) {
    if n == 1 return 0
    else 
      x = Count(left half of a, n/2)
      y = Count(right half of a, n/2)
      z = CountSplitInv(a, n)

      return x + y + z
}
```
`CountSplitInv` counting the split inversions, where first
index is in the first half array, and second index is in the 
second half array.
Then the question is, can we do `CountSplitInv` with 
\\( O(n) \\)? If so, the divide part has \\( O(\log n) \\), which gives us the final algorithms speed of \\( O(n \log n) \\). Intuitively feels not possible.

### Piggybacking on Merge Sort
```
SortAndCount(array a, length n) {
    if n == 1 return 0
    else 
      b, x = SortAndCount(left half of a, n/2)
      c, y = SortAndCount(right half of a, n/2)
      d, z = MergeAndCountSplitInv(b, c, n)

      return d, x + y + z
}
```
After sorting, we can do the trick, or "piggybacking" 
while merge:
```
i=0
j=0
z=0
for k = 0 .. n-1 {
    if b[i] <= c[j] {
        d[k] = b[i]
        i++
    } else {
        d[k] = c[j]
        j++
        z += b.len - i // piggybacking part of merge
    }
}
```
So if `b`'s element all less than `c`'s element, 
before `j` starts to add, `i` will be as `b.len`, making `z=0` in the end.

Or the general claim:
> Claim: the numberr of split inversions involving an element 
> `c_j` from 2nd array `c` is precisely the number of elements
> left in the 1st array `b` when `c_j` is copied to the output `d`.

So basically we ended with a very similar thing to Merge Sort,
only one more operation on the merge operations. So we
achieved \\( O(n \log n) \\). Pretty impressive.

## The Master Method

\\[ 
  \begin{align}
  \text{If }  \quad  T(n) & <= a T (\frac{n}{b}) + O(n^d) \\\\ 
  \text{Then } \quad  T(n) & =
    \begin{cases}
      O(n^d \log n)       & \quad \text{if } a = b^d \text{ (Case 1)} \\\\
      O(n^d)              & \quad \text{if } a < b^d \text{ (Case 2)} \\\\
      O(n^{\log_{b}{a} }) & \quad \text{if } a > b^d \text{ (Case 3)}
    \end{cases}
  \end{align}
\\]

For example
* merge sort having `a=2, b=2, d=1` so it is \\( O(n \log n)  \\), which is case 1
* binary search having `a=1, b=2, d=0` so it is \\( O(\log n)  \\), which is case 1
* Karatsuba Multiplication `a=3, b=2, d=1` so it is \\( O(n^{\log_2 3}) = O(n^{1.59}) \\), which is case 3