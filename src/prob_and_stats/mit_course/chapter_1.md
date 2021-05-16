# Chapter 1+2 - Basics and Bayes' Rule

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

