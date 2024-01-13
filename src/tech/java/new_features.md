# Some new_features learned

Video list:
* https://www.youtube.com/watch?v=q2T9NlROLqw
* https://www.youtube.com/watch?v=nlZe-y2XvQY


## `switch` expression is better than switch statement

The `switch` in newer Java can be written as expressions, which
is much better than the statement as:
* statement needs to mutate stuff in order to have effect;
* easy to write wrong stuff when missing `break`;
* statement has no exhaustive check, but expression has :)

Also, when using switch statement, do not write the `default` if not
necessary as there is already exhaustive check.

Plus, there is a `yeild` if one wants to "return a value" from
a switch block.

## List types can be immutable or mutable but difficult to tell

Generally, seems the old APIs prefer to return mutable stuff.

Mutable:
* Arrays.asList();
* stream.collect(Collectors.toList());

Immutable:
* List.of();
* stream.toList();

## `teeing` as an interesting collector:

```
     /--------\ (collect)
----teeing           (collect) -----
     \--------/ (collect)
```
For these type of operations, `teeing` could be a good candidate.
Also noticing these `groupingBy`, `partitionBy` like collectors,
can also take the last parameter in with another collector. 
So this "collector of collectors (of collectors)" can be powerful
but becareful not going too deep!

## `Record` data class is nice
* The simple/compact constructors in Records is nice, but do not use `this` 
there as it just some code that runs before the real internal constructor is called.
* Record fields are `final`, so one can use the compact constructors to play
with different initial fields values, and let the internal/canonical constructor
to do the final `this.x=x` assignments.
* Use local `Record` to represent Tuple might be a good idea especially 
the Tuple type do not need to be shared around.

## `sealed + permits` classes and interfaces
Thus, the main motivation behind sealed classes/interfaces is 
to have the possibility for a superclass/interface to be widely accessible but not widely extensible.

* All permitted subclasses must belong to the same module as the sealed class.
* Every permitted subclass must explicitly extend the sealed class.
* Every permitted subclass must define a modifier: final, sealed, or non-sealed.

## Pattern matching with switch is nice
```java
public class Main {
  public static String matchWithSwitch(Object in) {
    return switch (in) {
      case null -> "oh come on...";
      case Integer i when i < 0 -> "got a negative number: " + i;
      case Integer i -> "got a number:" + i;
      case String s -> "got a string of length: " + s.length();
      default -> "got something unknown";
    };
  }
}
```