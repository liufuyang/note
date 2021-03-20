# Sort

* **Merge sort**
  * \\( n \log(n) \\) in worst case
  * a `stable` sort (sort by column A, then sort by column B, then for the same B, order of A preserves)
  * simple to understand, divide and conquer (or bottom up to avoid recursion); `log(n)` levels, and each level's merge takes `n` operation, thus \\( n \log(n) \\)  will do
* **Quick sort**
  * \\( n \log(n) \\) in worst case
  * not a `stable` sort
  * more tricky but not difficult to understand, divide and conquer: <br>
    make sure an element's left are all smaller (or equal to) it, and the
    right part are all bigger than it (let's called it `partitioned`); then continue to sort both on left and right part;
  * to make an array `partitioned` by, for eg. the first element: <br>
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
      * When `j` reaches the end, `swap(i-i, 0)`, return `i-1`
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