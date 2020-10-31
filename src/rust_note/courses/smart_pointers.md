# Smart pointers

Smart pointers allow you to store data on the heap rather than the stack. What remains on the stack is the pointer to the heap data.

* `Box<T>` for allocating values on the heap
* `Rc<T>`, a reference counting type that enables multiple ownership
* `Ref<T>` and `RefMut<T>`, accessed through `RefCell<T>`, a type that enforces the borrowing rules at runtime instead of compile time

```rust
let s_on_stack: Box<&str> = Box::new("hello"); // string is still on stack
let s_on_heap: Box<str> = Box::from("hello"); // string is copied onto heap
println!("s_on_stack = {}", s_on_stack);
println!("s_on_heap = {}", s_on_heap);
```

## Using `Deref` trait to auto dereference
```rust
use std::ops::Deref;

struct MySmartPointer<T>{hold: T}

impl<T> MySmartPointer<T> {
    fn new(hold: T) -> MySmartPointer<T> {
        MySmartPointer{hold}
    }
}

impl<T> Deref for MySmartPointer<T> {
    type Target = T;

    fn deref(&self) -> &T {
        &self.hold
    }
}

// using it
struct User {
    name: &'static str
}

impl User {
    fn print_name(&self) {
        println!("My name is {}", self.name);
    }
}

fn main() {
    let user_pointer = MySmartPointer::new(User {name: "Alex"});
    user_pointer.print_name(); // auto deref
}
```

## Using `Box` for unknown size type
```rust
#[derive(Debug)]
enum List {
    Cons(i32, List),
    Nil,
}

use crate::List::{Cons, Nil};

fn main() {
    let list = Cons(1, Cons(2, Cons(3, Nil)));
    println!("{:?}", list);
    // recursive type has infinite size, won't compile
}
```

Above code won't compile as Rust cannot know the size of a `List` as it is recursive. Now we can use `Box<>` to make it's size known at compile time.

```rust
#[derive(Debug)]
enum List {
    Cons(i32, Box<List>),
    Nil,
}

use crate::List::{Cons, Nil};

fn main() {
    let list = Cons(1,
        Box::new(Cons(2,
            Box::new(Cons(3,
                Box::new(Nil))))));
    println!("{:?}", list);
}
```