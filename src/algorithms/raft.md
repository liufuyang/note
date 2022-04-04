# Raft - learning from MIT 6.824


* Course info at https://pdos.csail.mit.edu/6.824/labs/lab-raft.html
* Paper at https://raft.github.io/raft.pdf

![image](https://user-images.githubusercontent.com/161689/161535615-b7a02f9c-495c-4cc6-b7ef-9f7c8ab2c919.png)
![image](https://user-images.githubusercontent.com/161689/161535678-86a9157c-c756-4832-99b5-75a1c2dca49d.png)

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
  - if `notYetVoted` or `votedTheSameBefore`, then do the vote, set `votedFor` and reset my `election timeout`

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