# String


## char

Actually a `4-byte fixed size` or `u32` type of value.
```rust
let tao: char = '道';
println!("'道' as u32: {}", tao as u32); // 36947 char is basically u32 size unicode
println!("U+{:x}", tao as u32);  // U+9053 - output in 0x or hexadecimal(16) format
println!("{}", tao.escape_unicode()); // \u{9053}
println!("{}", char::from(65)); // from a u8 -> 'A'
println!("{}", std::char::from_u32(0x9053).unwrap()); // from a u32
println!("{}", std::char::from_u32(36947).unwrap()); // from a u32
println!("{}", std::char::from_u32(1234567).unwrap_or('_')); // not every u32 is a char

// noticing a char uses 4-byte in memory but not all the space is always used
assert_eq!(3, tao.len_utf8()); // effective data length in byte
assert_eq!(4, std::mem::size_of_val(&tao));
```

## String

`String` is basically a `Vec<u8>`.

Other type:
- `Cstr/Cstring`
- `OsStr/OsString`
- `Path/PathBuf`

```rust
let tao = std::str::from_utf8(&[0xe9u8, 0x81u8, 0x93u8]).unwrap();
println!("{}", tao);

let tao = String::from("\u{9053}");
println!("{}", tao);
```

### A char like String might not be a char

A single "char" looking thing - like ❤️ - doesn't means it is a valid char. Some of those single looking characters needs more than 
one `char` or `code points` to be represented:

```rust
assert_eq!(6, String::from("❤️").len()); // length in byte
assert_eq!(6, std::mem::size_of_val(String::from("❤️").as_str())); // same calculation as above
assert_eq!(2, String::from("❤️").chars().count()); // how many `code points` - is 2?
// as ❤️ takes 2 code points , we can't assign it to a char
// let heart = '❤️'; // This won't work

assert_eq!(1, String::from("道").chars().count()); // 道 can be defined as a char as it only has 1 code point
assert_eq!('道', String::from("道").chars().next().unwrap());
assert_eq!(3, String::from("道").len());
assert_eq!(3, std::mem::size_of_val(String::from("道").as_str()));
```

### 'é' is not 'é'

As always, remember that a human intuition for 'character' may not map to Unicode's definitions. For example, despite looking similar, the 'é' character is one Unicode code point while 'é' is two Unicode code points:

```rust
assert_eq!(1, String::from("é").chars().count()); // '\u{00e9}' -> latin small letter e with acute
assert_eq!(2, String::from("é").chars().count()); // '\u{0065}' + '\u{0301}' -> U+0065: 'latin small letter e', U+0301: 'combining acute accent'
// They look the same in editor but have different code points ?!
```