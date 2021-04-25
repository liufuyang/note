# Scheduler stuff

```java
  @Test
  public void a() throws Exception {
    ExecutorService executor = Executors.newSingleThreadExecutor();
    Runnable runnable =
        () -> {
          try {
            while (true) {
              System.out.println("Running");
              Thread.sleep(1000);
            }
          } catch (InterruptedException e) {
            System.out.println("Runnable interrupted");
          } finally {
            System.out.println("FINALLY");
          }
        };

    Future<?> future = executor.submit(callable);
    try {
      future.get(3, TimeUnit.SECONDS); // blocking for 3 seconds
    } catch (TimeoutException e) {
      System.out.println("Timeout " + e);
      // future will continue running even if we got a TimeoutException
    } catch (InterruptedException | ExecutionException e) {
      System.out.println("Interrupted");
    }
    Thread.sleep(3 * 1000);
    System.out.println("END");
  }
```
Output:
```
Running
Running
Running
Running
Timeout java.util.concurrent.TimeoutException
Running
Running
Running
END
```

Now if we do call `cancel` on the `future`, then 
it works as expected.

```java
  @Test
  public void b() throws Exception {
    ExecutorService executor = Executors.newSingleThreadExecutor();
    Runnable r =
        () -> {
          try {
            while (true) {
              System.out.println("Running");
              Thread.sleep(1000);
            }
          } catch (InterruptedException e) {
            System.out.println("Runnable interrupted");
          } finally {
            System.out.println("FINALLY");
          }
        };

    Future<?> future = executor.submit(r);
    try {
      future.get(3, TimeUnit.SECONDS);
    } catch (TimeoutException e) {
      // To stop future running, we need to call cancel on it.
      boolean c = future.cancel(true);
      System.out.println("Timeout " + e);
    } catch (InterruptedException | ExecutionException e) {
      System.out.println("interrupted");
    }
    Thread.sleep(3 * 1000);
    System.out.println("END");
  }
```
Output
```
  Running
Running
Running
Runnable interrupted
FINALLY
Timeout java.util.concurrent.TimeoutException
END
```
