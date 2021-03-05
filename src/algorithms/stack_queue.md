# Stack and queue

## Two major implementations
* Linked list impl
* Array impl
  
which can both implement stack and queue.
  
## Linked list impl
For stack or queue, a single direction link list will do,
so only need a `head` point to the head node, and a `tail` point to the tail node.
```
(head) -> (a,) -> (b,) -> (c,)
(tail) - - - - - - - - - - ^
```

A simple unsafe Rust implementation could use structures like:
```rust
pub struct Node<T> {
    element: T,
    next: Option<Box<Node<T>>>,
}

pub struct LinkedList<T> {
    head: Option<Box<Node<T>>>,
    tail: *mut Node<T>,
}
```
More code can be see here on [my own bad Rust stack/queue implementation][rust stack impl]

* `push` add node via `head`;
* `enqueue` add node via `tail`;
* `pop` or `dequeue`, just take out nodes from `head`.

Or in short `adding on both ends, removing from head only`.

## Array impl
```
  0   1   2   3   4   5   6   7
[__, __,  a,  b,  c, __, __, __,]
(head) ---^
(tail) - - - - - - - ^
```

* `push` or `enqueue`, just add via `tail`;
* `pop` removes nodes from `tail`;
* `dequeue` removes from `head`;

Or in short `adding from tail only, removing from both ends`.
  
Other trivial details:
* When reaching the end while adding, increase capacity by factor of 2;
* When `tail` less than 1/2 of capacity, can reduce capacity by 1/4 of current capacity, to save space;
* In Java, when removing element from the list, besides change
  head and tail values, also set `null` to the array so to let
  those removed nodes can be garbage collected later. 

## Dequeue - a double-ended queue

Dequeue -a double-ended queue or `deque` (pronounced “deck”)
is a generalization of a stack and a queue that supports adding and removing items from either the front or the back of the data structure.

One type of implementation could be using a `double linked list`, so both ends can remove nodes.

Another approach (I suppose) could be using `two stacks`, with either stack implementations mentioned above.
Then one stack is kept as `positive` while another kept as 
`negative`.

So the `deque` can probably be implemented as something like:

```java
    // add the item to the front
    public void addFirst(Item item) {
        negative.push();
    }

    // add the item to the back
    public void addLast(Item item) {
        positive.push();
    }

    // remove and return the item from the front
    public Optional<Item> removeFirst() {
        if (!negative.isEmpty) {
            return negative.pop();
        } else {
            return positive.dequeue();
        }
    }

    // remove and return the item from the back
    public Optional<Item> removeLast() {
        if (!positive.isEmpty) {
            return positive.pop();
        } else {
            return negative.dequeue();
        }
    }
```

Haven't tried to do my homework with the Princeton course,
but hopefully this works. Otherwise the code might later 
be at [here][java-homework]

## Linked list impl vs Array impl

I guess simply put, linked list is good for constant time
operations, though slower each time; while array impl is 
in most cases very fast, occasionally slow when resizing,
with the claim of adding an element has constant amortized time cost.

---

## Use stack/queue for Search Algorithm

One quite useful thing about `stack` and `queue` is that
* `stack` can be used for `Depth-First Search` (DFS)
* `queue` can be used for `Breadth-First Search` (BFS)

<iframe width="640" height="360" src="https://www.youtube.com/embed/WbzNRTTrX0g?t=1557" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Quite interesting.

[rust stack impl]: https://github.com/liufuyang/algs4/tree/main/algs_stanford/src
[java-homework]: https://github.com/liufuyang/algs4