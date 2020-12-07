# Note for tokio dev

Frequently used command:
```
# Run a single integration test
cargo test --test tcp_into_std

# Run a single doc test
cargo test --doc net::tcp::stream::TcpStream::into_std

# Format code
rustfmt --edition 2018 $(find . -name '*.rs' -print)
```