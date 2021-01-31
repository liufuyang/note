# C++ memory mode

* [[Video Link]](https://www.youtube.com/watch?v=OyNG4qiWnmU)
* [[Some docs about it]](https://doc.rust-lang.org/nomicon/atomics.html)

# Memory order
* Acquire / Release
* Sequentially Consistent (SeqCst)
* Relaxed

## Acquire-Release

Sort of like mutex primitives, aquire=lock, release=unlock. Acquire and Release are largely intended to be paired.

* `release` update the memory, "publish" to other threads, used only with `store` type operation(save/publish data out, cannot use with load)

* `acquire` memory "published" by other threads, making it available to us, used only with `load` type of operation (cannot use with store)

* For "load and store" type of operation:
  * `release` will make load `relaxed` and store `release`
  * `acquire` will make load `acquire` and store `relaxed`
  
* `AcqRel` or acquire and release also exist, so can be used for "load and store" type of operation, 
making load `acquire` and store `release` (no relaxed). 
This operation order could be handy for situation such as for an Arc type of thing in the end to drop
the internal object, it may use some operation like `load_and_minors_1_then_store` so you would 
use this `AcqRel` to make sure the thread got the updated value and all other threads has updated value when they read.
This is illustrated in the video.

Intuitively, an acquire access ensures that every access after it stays after it. However operations that occur before an acquire are free to be reordered to occur after it. Similarly, a release access ensures that every access before it stays before it. However operations that occur after a release are free to be reordered to occur before it.

When thread A releases a location in memory and then thread B subsequently acquires the same location in memory, causality is established. **Every write (including non-atomic and relaxed atomic writes) that happened before A's release will be observed by B after its acquisition.** However no causality is established with any other threads. Similarly, no causality is established if A and B access different locations in memory.

Or using the words from the video:
* acquire/release: no total order of events
* each thread has it view of consistent ordering

Basic use of release-acquire is therefore simple: you acquire a location of memory to begin the critical section, and then release that location to end it. For instance, a simple spinlock might look like:

```rust
use std::sync::Arc;
use std::sync::atomic::{AtomicBool, Ordering};
use std::thread;

fn main() {
    let lock = Arc::new(AtomicBool::new(false)); // value answers "am I locked?"

    // ... distribute lock to threads somehow ...

    // Try to acquire the lock by setting it to true
    while lock.compare_and_swap(false, true, Ordering::Acquire) {
        // c++ code here could be: std::this_threadd::yield() to let other thread run
     }
    // broke out of the loop, so we successfully acquired the lock!

    // ... scary data accesses, but safe to do stuff here ...

    // ok we're done, release the lock
    lock.store(false, Ordering::Release);
}
```

## Sequentially Consistent

Be cause there is no total order of events for acquire/release, Sequentially Consistent is 
introduced.

Sequentially Consistent is the most powerful of all, implying the restrictions of all other orderings. Intuitively, a sequentially consistent operation cannot be reordered: all accesses on one thread that happen before and after a SeqCst access stay before and after it. A data-race-free program that uses only sequentially consistent atomics and data accesses has the very nice property that there is a single global execution of the program's instructions that all threads agree on. This execution is also particularly nice to reason about: it's just an interleaving of each thread's individual executions. This does not hold if you start using the weaker atomic orderings.

The relative developer-friendliness of sequential consistency doesn't come for free. Even on strongly-ordered platforms sequential consistency involves emitting memory fences.

In practice, sequential consistency is rarely necessary for program correctness. However sequential consistency is definitely the right choice if you're not confident about the other memory orders. Having your program run a bit slower than it needs to is certainly better than it running incorrectly! It's also mechanically trivial to downgrade atomic operations to have a weaker consistency later on. Just change `SeqCst` to `Relaxed` and you're done! Of course, proving that this transformation is correct is a whole other matter.

## Relaxed

Relaxed accesses are the absolute weakest. They can be freely re-ordered and provide no happens-before relationship. Still, relaxed operations are still atomic. That is, they don't count as data accesses and any read-modify-write operations done to them occur atomically. Relaxed operations are appropriate for things that you definitely want to happen, but don't particularly otherwise care about. For instance, incrementing a counter can be safely done by multiple threads using a relaxed `fetch_add` if you're not using the counter to synchronize any other accesses.

There's rarely a benefit in making an operation relaxed on strongly-ordered platforms, since they usually provide release-acquire semantics anyway. However relaxed operations can be cheaper on weakly-ordered platforms.