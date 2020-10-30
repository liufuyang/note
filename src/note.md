# Notebook

This is a personal notebook. 
Let's see how often I can keep this updated...

## How to update my note:
[https://rust-lang.github.io/mdBook][mdBook]

* `mdbook serve --dest-dir docs --open`
* Edit content
* Then perhaps build again `mdbook build --dest-dir docs`
* Then push 

<details>
<summary>Some hidden code here</summary>

```rust
use warp::Filter;

#[tokio::main]
async fn main() {
    let routes = warp::any().map(|| "Hello, World!");
    warp::serve(routes).run(([127, 0, 0, 1], 3030)).await;
}
```
</details>


[mdBook]: https://rust-lang.github.io/mdBook