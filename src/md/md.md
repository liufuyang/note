# Markdown Notes

## `<details>` tag for hide content

```html

<details>
  <summary>Summary Goes Here</summary>
  ...this is hidden, collapsable content...
</details>
```

<details>
 <summary>Summary Goes Here</summary>
 ...this is hidden, collapsable content...
</details>

### Nested version

```html
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