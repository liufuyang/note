# Raft - learning from MIT 6.824


* Course info at [https://pdos.csail.mit.edu/6.824/labs/lab-raft.html](https://pdos.csail.mit.edu/6.824/labs/lab-raft.html)
* Paper at [https://raft.github.io/raft.pdf](https://raft.github.io/raft.pdf)
* A very good [YouTube video](https://www.youtube.com/watch?v=YbZ3zDzDnrw)

![image](https://user-images.githubusercontent.com/161689/161535615-b7a02f9c-495c-4cc6-b7ef-9f7c8ab2c919.png)
![image](https://user-images.githubusercontent.com/161689/161535678-86a9157c-c756-4832-99b5-75a1c2dca49d.png)

> **Raft Core Feature**
> 
> If committed --meaning--> Present in the future leader's logs, and this is 
> achieved by:
> - Restrictions on leader election (See voting rules)
> - Restrictions on commit


## Leader Election
We firstly look at `Leader Election` mechanism - which is implemented by two parts:
1. `RequestVote` - each node start as `Follower` and when `election timeout` passes 
and no HeartBeat received before, then a node step up as `Candidate` and send votes
to rest of the nodes and if collect more than half (count itself as well), it
steps up as a `Leader`, which keeps sending `HeartBeat` to others.
2. `HeartBeat - a.k.a Empty AppendEntries RPC`

![image](https://user-images.githubusercontent.com/161689/161535482-789d1655-3297-4e21-9b19-84f0197ab842.png)

Besides, the tips on the paper and the lab2a websites, I encountered a few
other pitfalls (which might be mentioned somewhere in to docs)

### Candidates
- In order to make the tests can pass with limited running time, I have to make sure
when a candidate sends vote requests out and wait, it should stop waiting
as long as it already got enough majority votes.
- The same applies when a leader is waiting for heatbeats. Don't wait after quorum votes
have been fetched.
- Each places when a candidate/leader step down to a follower,
remember to set `votedFor` back to `nil` or `-1` so to allow it gives a valid vote
in the next round of voting process.
- Not like Follower, Candidates can probably send out the next round of vote 
with a shorter and fixed Duration than
a Follower's `election timeout duration`, in the case when this round of vote does not
get enough votes; But at the same time

### Getting vote request as Candidate
- It seems not necessary, but I also added the logic (seem to be safer):
If myself is a Candidate and the other node (candidate) want me to vote to her,
if we have the same term value, then I don't vote to her (so as she won't vote for me neither);

### Standard Voting Rules when got Voting Request:
- If request term lass than my term, ignore. Reply my term.
- So when request term >= my term,
  - From `Rules for Servers`: If RPC request or response contains term T > currentTerm:
    set currentTerm = T, convert to follower
  - The candidate situation mentioned above
  - if `notYetVoted` or `votedTheSameBefore`, then do the vote, set `votedFor` and reset my `election timeout`;
  It is important to have `votedFor` set and checked here as it helps in the case where
  there is multiple candidates alive, then no multiple leaders are selected, as we make
  sure each voter can only vote to one candidate.
- **Restrictions on leader election**
  - When voting, include `lastLogIndex` and `lastLogTerm`
  - Voting server `v` denies vote if its log is "more complete":
    ```
    if (lastTerm_v > lastTerm_c) || (lastTerm_v == lastTerm_c) && (lastIndex_v > lastIndex_c)
      return false
    ```

## HeartBeat - a.k.a Empty AppendEntries RPC
After the Leader is elected, the `electionTimeoutTime` or `election timeout` should then be
constantly refreshed with each `HeartBeat` - which is achieved by sending empty
`AppendEntries` RPC calls.

The basic rules are like:
- From `Rules for Servers`: If RPC request or response contains term T > currentTerm:
  set currentTerm = T, convert to follower

The code could be something like this
```go
func (rf *Raft) HeartBeat(args *HeartBeatRequest, reply *HeartBeatReply) {
    rf.mu.Lock()
	defer rf.mu.Unlock()
    if args.Term >= rf.term {
        rf.state = Follower  // step down
        rf.votedFor = args.From
        rf.term = args.Term
        rf.electionTimeoutTime = time.Now().Add(rf.getElectionTimeoutDuration())
        
        reply.Good = true
        reply.Term = rf.term
        return
    } else {
        reply.Good = false
        reply.Term = rf.term
        return
    }
}
```

---

## AppendEntries RPC
![image](https://user-images.githubusercontent.com/161689/161535816-1dd0938d-33e8-4acf-9d7c-1002b89990f3.png)

## Tricky part summary

**Leader ticker and Candidate ticker**
The candidate ticker can be done with just a single thread loop
and it is okay to set up a timeout as well. For the critical
conditions of `TestFigure8Unreliable2C`, it will mostly work
well as long as we make sure timeout is relatively large so
we can always have a candidate selected after a few rounds.

But for the leader ticker we cannot use single thread call
with a long timeout anymore as if we do that, the timeout
will be a time much longer than the election timeout of other
followers then it ended up constantly new candidate showing up.

However, if we let leader ticker async, for example, start a 
goroutine and send a HeartBeat call every 100ms, then the other
subtle issue is that we have to make sure, when those goroutines
finishes in different time and order, we can still handle things
correctly.

A few places to worth notice and mention:
1. For each leader ticker goroutine, after getting reply from
any followers, do a check of the leader's states and term as the
leader might have already been converted to a follower by other
leader
2. when leader to update `nextIndex` for a follower, check it can
only be larger than `matchedIndex` in case the HeartBeats to the
same follower replied out of order.

**Follower Log correction Speed-Up**
This is where the paper didn't say much, but basically there
is two cases we need to speed-up follower log.

1. During follower replying `HeartBeat`, when follower's `LastLogTerm` is greater than leader's `rf.log[nextIndex-1].Term` (or `args.PrevLogTerm`), 
so we roll `nextIndex` to the smaller side until it reaches an entry with the same term as leader's `PrevLogTerm`,
by cutting follower's log and replying to leader with a smaller `LastLogIndex`;
    ```
    Leader:   [0, 1, 1, 2, 2, 2, 4, 4,]
    Entries:               ^ [2, 4, 4,]
    Follower: [0, 1, 1, 3, 3, ] then we should cut it to:
              [0, 1, 1, ]       <-----------------------|
                        ^-------new `nextIndex` found by `LastLogIndex`
    ```
    Also, when PrevLogIndex/Term matches, remove all the following entries that starts with a miss match of any 
    entry term from leader's incoming entries
    ```
    Leader:   [0, 1, 1, 2, 2, 2, 4, 4,]
    Entries:               ^ [2, 4, 4,]
    Follower: [0, 1, 1, 2, 2, 2, 3, 3, 3, 3] then we should cut it to:
              [0, 1, 1, 2, 2, 2, 4, 4,]      <-----------------------|
    ``` 
2. During leader's handling of a follower's reply of `HeartBeat`,
   where the follower's `LastLogTerm` is less than leader's `rf.log[nextIndex-1].Term`,
   so we roll `nextIndex` to the smaller side until it reaches an entry with the same term as follower's `LastLogTerm`.
    ```
    Leader:   [0, 1, 2, 2, 2, 2, 4, 4,]
    Entries:               ^ [2, 4, 4,]
    Follower: [0, 1, 1, 1, 1, 1, 1, 1, ] then we should cut it to:
              [0, 1, 1, 1, ]       <-----------------------------|
                        ^--------------- and also send back `LastLogTerm` as 1 so to let leader set `nextIndex` to the place just after the last entry of term = LastLogTerm
                     ^----------------- new `nextIndex` found by `LastLogTerm`
    ```
**Async commit and updating `rf.commitIndex`**

The actual apply of those logs and update of `rf.commitIndex`
can be done async with a single goroutine.

Important fix for `TestFigure8Unreliable2C`'s commits not sync issue here - as we added some optimization on
1. Leader only sends part of new entries when there are more than a max number (500 in this case) of new entries that are not on the follower
2. When a Follower is handling the heartbeat, it does not touch the log if the incoming entries have been existing/duplicated, leaving some entries after the incoming entry part untouched/uncut as well. However, the entries in the latter part might not be valid.

So with those optimizations mentioned above, at the place when we update the follower's `rf.commitIndex`, we cannot go as far as the leader's `commitIndex`, but only goes to the end index of the incoming replicating entry parts - which is `args.PrevLogIndex+len(args.Entries)`

Or see some comments on [this Lab2C PR](https://github.com/liufuyang/6.824/pull/4)
