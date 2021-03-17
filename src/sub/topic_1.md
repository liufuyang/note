# Sub topic 1

Simply write sub topics here

Did you know that you can write math equations here like this?

\\[ \mu = \frac{1}{N} \sum_{i=0} x_i \\]

The Master Method
\\[ 
  \begin{align}
  \text{If }  \quad  T(n) & <= a T (\frac{n}{b}) + O(n^d) \\\\ 
  \text{Then } \quad  T(n) & =
    \begin{cases}
      O(n^d \log n)       & \quad \text{if } a = b^d \text{ (Case 1)} \\\\
      O(n^d)              & \quad \text{if } a < b^d \text{ (Case 2)} \\\\
      O(n^{\log_{b}{a} }) & \quad \text{if } a > b^d \text{ (Case 3)}
    \end{cases}
  \end{align}
\\]

Looks pretty awesome. More info see [here][mdBook math]



[mdBook math]: https://rust-lang.github.io/mdBook/format/mathjax.html