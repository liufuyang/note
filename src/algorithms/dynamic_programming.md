# Dynamic programming

## Fibonacci

### Recursion - Exponential waste
A novice programmer might implement a recersion like this below. But it has a problem called `expoential waste`.

```java
public class FibonacciR
{
  public static long F(int n)
  {
    if (n == 0) return 0;
    if (n == 1) return 1;
    return F(n-1) + F(n-2);
  }
  public static void main(String[] args)
  {
    int n = Integer.parseInt(args[0]);
    StdOut.println(F(n));
  }
}
```

The issue of the recursion above is that there are many duplicated calculations performed.
So the core of the algorithms of opertimization is to reduced the number of operations.
And since we have many calculation already done so there should be a way to save the 
results, then later calculations can use the previous calculatined values.

This could be the core idea of `Dynamic programming`.

### Avoiding exponential waste
Memoization
- Maintain an array `memo[]` to
remember all computed values.
- If value known, just return it.
- Otherwise, compute it, remember
it, and then return it.

```java
public class FibonacciM
{
 static long[] memo = new long[100];
 public static long F(int n)
 {
  if (n == 0) return 0;
  if (n == 1) return 1;
  if (memo[n] == 0)
    memo[n] = F(n-1) + F(n-2);
  return memo[n];
 }
 public static void main(String[] args)
 {
  int n = Integer.parseInt(args[0]);
  StdOut.println(F(n));
 }
}
```

## Dynamic programming

Dynamic programming.
- Build computation from the **"bottom up"**.
- Solve small subproblems and save solutions.
- Use those solutions to build bigger solutions.

```java
public class Fibonacci
{
  public static void main(String[] args)
  {
    int n = Integer.parseInt(args[0]);
    long[] F = new long[n+1];
    F[0] = 0; F[1] = 1;
    for (int i = 2; i <= n; i++)
      F[i] = F[i-1] + F[i-2];
    StdOut.println(F[n]);
  }
}
```

### DP example: Longest common subsequence (LCS)

![image](https://user-images.githubusercontent.com/161689/112751290-78a3cb00-8fcd-11eb-9225-5c8f086e3cd0.png)

![image](https://user-images.githubusercontent.com/161689/112751326-a5f07900-8fcd-11eb-8cc9-f93de888ab5f.png)

![image](https://user-images.githubusercontent.com/161689/112751344-bdc7fd00-8fcd-11eb-95b8-e5cf29b7f606.png)


### LCS length implementation
```java
public class LCS
{
  public static void main(String[] args)
  {
    String s = args[0];
    String t = args[1];
    int M = s.length();
    int N = t.length();
    int[][] opt = new int[M+1][N+1];
    for (int i = M-1; i >= 0; i--)
      for (int j = N-1; j >= 0; j--)
        if (s.charAt(i) == t.charAt(j))
          opt[i][j] = opt[i+1][j+1] + 1;
        else
          opt[i][j] = Math.max(opt[i+1][j], opt[i][j+1]);
    System.out.println(opt[0][0]);
 }
}
```

![image](https://user-images.githubusercontent.com/161689/112755860-e0184580-8fe2-11eb-9291-37f63af490d9.png)

More notes will come when the alg course touches on dynamic programming later. The above content are from the Princeton's 
course *Computer Science: Programming with a Purpose*.
