# Chapter 1 - Basics and Bayes' Rule

### De Morgans' Law

- \\( (S \cap T)^c = S^c \cup T^c \\) and \\( (S \cup T)^c = S^c \cap T^c \\)

- \\( (S^c \cap T^c)^c = S \cup T \\)

### Problem 4. Parking lot problem

Mary and Tom park their cars in an empty parking lot with 𝑛≥2 consecutive parking spaces (i.e, 𝑛 spaces in a row, where only one car fits in each space). Mary and Tom pick parking spaces at random; of course, they must each choose a different space. (All pairs of distinct parking spaces are equally likely.) What is the probability that there is at most one empty parking space between them?

<details>
<summary>View answer</summary>

- when first car is at head or tail, second car has 2 configurations for each case (gives 4 configurations)
- when first car is at head+1 or tail-1, second har has 3 configurations for each case (gives 6 configurations)
- when first car is at the rest of the place, second car has 4 configurations for each case, giving 4*(n-4) configurations
- the total number of all possible configurations is n*(n-1)
- so the answer should be (4*(n-4)+ 4 +6)/(n*(n-1))

</details>

### 3 Important tools
- Multiplication rule
- Total probability theorem
- Bayes' rule (-> inference)

### Conditional probability

\\[
P(A | B) = \frac{ P(A \cap B)}{ P(B)}
\\]

\\[
P(A | B) P(B)= P(B | A) P(A)
\\]

\\[
P(A | B) = \frac{ P(B | A) P(A) } { P(B | A) P(A) + P(B | A^C) P( A^C)}
\\]

<p align="center">
<img src="https://user-images.githubusercontent.com/161689/118391403-61c83f00-b634-11eb-930a-5a3485b787e7.png" width="200" alt="image"/>
</p>

### Multiplication rule 

![image](https://user-images.githubusercontent.com/161689/118391741-35152700-b636-11eb-8693-2175e57036bc.png)


### Total probability theorem


<p align="center">
<img src="https://user-images.githubusercontent.com/161689/118392492-51b35e00-b63a-11eb-91a8-d213871c1a12.png" width="160" alt="image"/>
</p>


\\(
P(B) = P(B | A) P(A) + P(B | A^C) P( A^C)
\\) can be generalized to:

\\[
P(B) = \sum_{i} P(B | A_i) P(A_i) \quad \text{ given } \sum_i P(A_i) = 1
\\]

### Definition of independence:
\\[
P(A \cap B) = P(A) \cdot P(B)
\\]

Which also implies \\( P(B | A) = P(B); P(A | B) = P(A)\\), and also implies
\\( P(A \cap B^C) = P(A) \cdot P(B^C) \\).

Note that `ìndependence` has no relation related to `disjoint`.
Independence is a relation about information. It is important 
to always keep in mind the intuitive meaning of independence.
Two events are independent if the occurrence of one event 
does not change our beliefs about the other.

### Conditional independence

![image](https://user-images.githubusercontent.com/161689/118397477-80d6c900-b654-11eb-8200-a9ad148dc8a6.png)

![image](https://user-images.githubusercontent.com/161689/118397652-651ff280-b655-11eb-9b29-42c8a4bfa275.png)

---

### Permutation & Combination

Permutation - pick `r` items out of `n` items, order matters:
\\[
P = \frac{n!}{(n-r)!}
\\]

Combination - pick `r` items out of `n` items, order does not matter:
\\[
C = \frac{P}{r!} = \frac{n!}{(n-r)! \cdot r!}
\\]

Number of subsets of `n` element:
\\[
2^n
\\]

\\[
\sum_{k=0}^{n} \left(
    \begin{array}{c}
      n \\\\
      k
    \end{array}
  \right) = 2^n
\\]

Number of possible outcomes of continuously toss a fair 6-faces dice for `n` times:
\\[
6^n
\\]

**Binomial coefficient** \\( \left( \begin{array}{c} n \\\\ k  \end{array} \right) \\)
- n>=1 independent coin tosses `P(H)=p` :
\\[
P(k \quad heads) = \left(
    \begin{array}{c}
      n \\\\
      k
    \end{array}
  \right) p^k (1-p)^{n-k} 
\\]

\\[
\sum_{k=0}^{n} \left(
    \begin{array}{c}
      n \\\\
      k
    \end{array}
  \right) p^k (1-p)^{n-k} = 1
\\]

**Multinomial coefficient**

![image](https://user-images.githubusercontent.com/161689/118716976-bf6fad80-b825-11eb-9182-4b8f74994077.png)

---

# Chapter 2 - Discrete Random Variables

Random variable examples:
- Bernoulli
- Uniform
- Binomial 
- Geometric

## Random Variables
Random variables can be understand as a `function` that
transfers `a random selection` of a sample, into a 
numeric value.

随机变量可以看作是一个函数！！！

**Notation:** random variable `X`, numerical value `x`

## Probability Mass Function (PMF)
`PMF` also called as `probablility distribution`.

### Bernoulli
- X = 1, with probability p,
- X = 0, with probability 1 - p.

E[X] = p;

var(X) = E[X^2] - (E[X])^2 = p(1-p)

### Uniform
- each outcome have the same probability
- h(X) = 1 / (b-a+1)
- E[X] = (a + b) / 2
- var(X) = 1/12 * (b-a) * (b-a+2)

For the continuous case:
- E[X] = (a + b) / 2
- var(X) = 1/12 * (b-a)^2

### Binomial
- `n` independent tosses of a coin with P(Heads)=p,
with `X` = number of heads observed.

E(X) = E(X1) + E(X2) ... + E(Xn) = p + p + p + ... p = n * p

var(X) = var(X1 + X2 + ...) = var(X1) + var(X2)... 
= n * var(X1) = n * BernoulliVar = np(1-p)

Note above: because of independence.

### Geometric 
- infinitely many independent tosses of a coin,
P(Heads)=p,`X` = number of tosses until the first Heads.
\\( P(X=k) = (1-p)^{k-1} p \\). If p=0.5, then it is like 
1/2, 1/4, 1/8 ... 
- model the time we have to wait until something happens, especially 
for the continuous case.

*Memorylessness*

- E[X] = 1 / p
- var(X) = (1-p)/p^2

For the continuous case:
- E[x] = 1/lambda
- var(X) = 1/lambda^2

![image](https://user-images.githubusercontent.com/161689/120707865-1da1bf00-c4bb-11eb-97db-41c577f516c5.png)

![image](https://user-images.githubusercontent.com/161689/123541710-25fdba80-d746-11eb-8f2d-6e455fa48a63.png)


## Variance

![image](https://user-images.githubusercontent.com/161689/120107513-94f4ed00-c161-11eb-8339-80539c5681be.png)

![independence](https://user-images.githubusercontent.com/161689/122638344-dee34a00-d0f3-11eb-9110-e9865fc4f380.png)

