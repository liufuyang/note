# Markdown Notes

## Tag `<details>` for hide or expandable content

```md

<details>
  <summary>Summary Goes Here</summary>
  ...this is hidden, collapsable content...
</details>
```
which looks like:

<details>
 <summary>Summary Goes Here</summary>
 ...this is hidden, collapsable content...
</details>

### If content inside cannot render as markdown

Try put `<details>` just after a `# title`. 
(Perhaps just an issue for Spotify techdoc...)
```md
### Just a title can make content inside `<details>` render
<details>
 <summary>Click to open</summary>

>>> stuff markdown can render
</details>
```

#### Example
<details>
 <summary>Click to open</summary>

>> stuff markdown can render
</details>

### Nested version

```md
<details><summary> root </summary>
<blockquote>
  <details><summary> bin </summary>
<blockquote>
      <details><summary> nest1 </summary>
<blockquote>

~~~
a
b
c
~~~
</blockquote>
      </details>
      <details><summary> nest2 </summary>
        <blockquote>
          a b c
        </blockquote>
      </details>

~~~
file1
file2
file3
~~~
  </blockquote>
  </details>

  <details><summary> boot </summary><blockquote>
  x y z
  </blockquote></details>

</blockquote>
</details>
```

<details><summary> root </summary>
<blockquote>
  <details><summary> bin </summary>
<blockquote>
      <details><summary> nest1 </summary>
<blockquote>

~~~
a
b
c
~~~
</blockquote>
      </details>
      <details><summary> nest2 </summary>
        <blockquote>
          a b c
        </blockquote>
      </details>

~~~
file1
file2
file3
~~~
  </blockquote>
  </details>

  <details><summary> boot </summary><blockquote>
  x y z
  </blockquote></details>

</blockquote>
</details>