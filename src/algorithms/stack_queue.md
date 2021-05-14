# Stack and Queue

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
* When `tail` less than 1/4 of capacity, can reduce capacity by 1/2 of current capacity, to save space;
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
be at [here][java-homework].
Update: As the homework requires `constant worst time` so 
I used a double linked list to implement it. So I can
just guess now the above idea will work :)

## RandomizedQueue
A `RandomizedQueue` can be implemented with a normal
array implementation queue, plus using **`Knuth Shuffle`**
during `enqueue` operation:

```java
public void enqueue(Item item) {
    if (item == null) {
      throw new IllegalArgumentException();
    }
    if (items.length == tail) {
      resize(Math.max(items.length, size() * 2));
    }
    items[tail] = item;
    tail++;

    swap(tail - 1, StdRandom.uniform(head, tail));
  }
```
Key is on that `swap` call. Basically the shuffle
idea is very simple, when adding a new item into
the array, then randomly select an item from the 
array (including the newly added one) then swap
the newly added one with the selected item.

See [code here][java-homework].

By the way, this **`Knuth Shuffle`** idea seems
pretty powerful as it uses linear time for shuffling
a N-th array. Better than make N random floats and 
sort them to have a new index list.

## Linked list impl vs Array impl

I guess simply put, 
* `linked list` is good for constant time
operations **in the worst case**, though slower each time, 
an uses more space;
* `resizing array` is 
in most cases very fast, occasionally slow when resizing,
with the claim of adding an element has constant **amortized time** cost. And less wasted space

---

## Use stack/queue for Search Algorithm

One quite useful thing about `stack` and `queue` is that
* `stack` can be used for `Depth-First Search` (DFS)
* `queue` can be used for `Breadth-First Search` (BFS)

<iframe width="640" height="360" src="https://www.youtube.com/embed/WbzNRTTrX0g?t=1557" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Quite interesting.

It seems that a general "Graph Search" type of problem 
can be solved by this abstract framework:

> * `agent` - entity that perceives its environment and acts upon that environment
> * `state` - a configuration of the agent and
> its environment;
> `initial state` - the state in which the agent begins 
> *  `actions` - choices that can be made in a state, like edges in graphs; `ACTIONS(s)` returns the set of actions that
> can be executed in state s
> * `transition model` or `RESULT(s, a)`
> returns the state resulting from performing action a in state s
> * `goal test` - way to determine whether a given state
> is a goal state
> * `path cost` - numerical cost associated with a given path
> * `frontier` - a stack or queue to keep track of the nodes to be explored

Then with a `node` defined as 
**a data structure that keeps track of**
- a `state`
- a `parent` (node that generated this node)
- an `action` (action applied to parent to get node)
- a `path cost` (from initial state to node)

Then a search algorithm can be defined as:

### **Search algorithm**

* Start with a `frontier` that contains the initial state.
* Start with an empty explored set.
* Repeat:
  * If the `frontier` is empty, then no solution.
  * Remove a `node` from the `frontier`. (Also using a set to keep track of visited `nodes`)
  * If `node` contains goal state (`goal test`), return the solution.
  * Add the `node` to the explored set.
  * Expand `node` (`ACTIONS + RESULTS`), add resulting `nodes` to the `frontier` if they
  aren't already in the `frontier` or the explored set.

For example, in a simple maze search problem, the `state` of 
the node is just the current position, the `actions` of the 
node is just the next possible directions that the agent can go to, leading to the following states.

In a social network problem, for example in the homework's
movie actors `degree` problem, the `state` of 
the node is just the actor id, the `actions` of the 
node is just the movies this actor performed, which can lead to other `state` (or actors).

Some example code on the `degree` problem might look like this.

```python
def shortest_path(source, target):
    """
    Returns the shortest list of (movie_id, person_id) pairs that connect the source to the target.
    
    If no possible path, returns None.

    Action: movie id
    State: person id
    """

    start = Node(state=source, parent=None, action=None)
    frontier = QueueFrontier()
    frontier.add(start)
    explored = set()

    while True:
        if frontier.empty():
            return None
        
        node = frontier.remove()
        explored.add(node.state)

        for action in people[node.state]["movies"]:
            for state in movies[action]["stars"]: 
                if not frontier.contains_state(state) and state not in explored:
                    child = Node(state=state, parent=node, action=action)
                    frontier.add(child)

                    checkNode = child
                    if checkNode.state == target:
                        actions_and_states = []
                        while checkNode.parent is not None:
                            actions_and_states.append((checkNode.action, checkNode.state))
                            checkNode = checkNode.parent
                        actions_and_states.reverse()
                        return actions_and_states
```

And normally a `queue` is used as the `frontier` in order 
to perform `Breadth-First Search` - which seem to be the 
best option for general problems as you want to find the shortest path to the goal.

One variant of the algorithms is a **greedy best-first search**
- `A* search`: search algorithm that expands node with
  lowest value of `g(n) + h(n)`
  - `g(n)` = cost to reach node
  - `h(n)` = estimated cost to goal
  - optimal if
    - `h(n)` is admissible (never overestimates the
    true cost), and
    - `h(n)` is consistent (for every node n and
    successor n' with step cost c, `h(n) ≤ h(n') + c)`

To facilitate a fast way to pick "a lowest value (or highest) from a queue",
a data structure called [`Priority Queue`](https://liufuyang.github.io/note/algorithms/sort.html#priority-queue---binary-heap-and-heap-sort)
can be used as it as uses `binary heap` to achieve `log N` order-of-growth for 
both queue insert and queue delete operation. 

Another variant of this type of algorithm is `Adversarial Search` - which is used for problems like Tic-Tac-Toe games

So for games:
* S0 : initial state
* PLAYER(s) : returns which player to move in state s
* ACTIONS(s) : returns legal moves in state s
* RESULT(s, a) : returns state after action a taken in state s
* TERMINAL(s) : checks if state s is a terminal state
* UTILITY(s) : final numerical value for terminal state s

One method is called **`MinMax`**

* Given a state s:
* MAX picks action a in ACTIONS(s) that produces
highest value of MIN-VALUE(RESULT(s, a))
* MIN picks action a in ACTIONS(s) that produces
smallest value of MAX-VALUE(RESULT(s, a))

Or in code as:
```
function MAX-VALUE(state):
 if TERMINAL(state):
 return UTILITY(state)
 v = -∞
 for action in ACTIONS(state):
 v = MAX(v, MIN-VALUE(RESULT(state, action)))
 return v

function MIN-VALUE(state):
 if TERMINAL(state):
 return UTILITY(state)
 v = ∞
 for action in ACTIONS(state):
 v = MIN(v, MAX-VALUE(RESULT(state, action)))
 return v
```

And some special pruning method such as Alpha-Beta Pruning is
needed for game problems with very large search space.

[rust stack impl]: https://github.com/liufuyang/algs4/tree/main/algs_stanford/src
[java-homework]: https://github.com/liufuyang/algs4/tree/main/algs_princeton/2_queues
