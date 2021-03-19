# Notebook

This is a personal notebook. [See repo here][repo].
Let's see how often I can keep this updated...

## How to update my note:
[https://rust-lang.github.io/mdBook][mdBook]

And take a look at [Markdown Help][mdHelp] for some hints.

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

## How to add some graphs?
https://github.com/badboy/mdbook-mermaid

And see the `Dockerfile` in the repo how to make an image that can build the site.

## About github page build
This github action [peaceiris/actions-gh-pages][github action] seems really handy.
[See the config file here](https://github.com/liufuyang/note/actions/workflows/gh-pages.yml)


[repo]: https://github.com/liufuyang/note
[mdBook]: https://rust-lang.github.io/mdBook
[mdHelp]: https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet
[github action]: https://github.com/peaceiris/actions-gh-pages