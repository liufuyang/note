# Pattern matching

Patterns come in two forms: refutable and irrefutable. 
Patterns that will match for any possible value passed are _irrefutable_. An example would be x in the statement `let x = 5;` because `x` matches anything and therefore cannot fail to match. 
(Meaning it always will have a match.)

Patterns that can fail to match for some possible value are _refutable_. An example would be `Some(x)` in the expression `if let Some(x) = a_value` because if the value in the `a_value` variable is `None` rather than `Some`, the `Some(x)` pattern will not match.

## Pattern matching type

- `let` - only irrefutable
- fn param, closure - only irrefutable
- `match` exp - accept refutable and irrefutable
- `if let` exp - accept refutable and irrefutable
- `while let` exp - accept refutable and irrefutable
- `for` exp - only irrefutable

## let

```rust
struct Point {x: isize, y: isize};
let (a, b) = (1, 2);
let Point {x, y} = Point {x:3, y:4};
assert_eq!(3, x);
assert_eq!(4, y);
```

## No need to write `ref`?
Compiler helps you adding `ref` when matching references with
non-references like expressions.
```rust
let x: Option<String> = Some("hello".into());
match &x {
    Some(s) => println!("{}", s), // nothing moves here, `s` is a &String,
                                  // the same as `Some(ref s) => ...`, with `ref` added by compiler behind the scene
    None => println!("nothing")
}
println!("{}", x.unwrap());       // x still owns the String 
```