
[//]: # (https://webapps.stackexchange.com/questions/154358/how-to-export-from-the-mindmeister-web-app-to-freemind-format)

# Cache
[🧠 &nbsp; MindMap link](https://www.mindmeister.com/map/2232274706?t=KlHKXnFCYG)


 - Single Node
    - **LRU** - least recently updated cache
        - a map for keep values for search
and delete
        - a double-linked list as queue to
remove least recently updated
value
 - Distributed
    - shard
        - so to save more data in total
        - each shard is on its own server
        - one shard could be hot, and data
can loss if one shard dies - solved
by replication
    - replication
        - how to
            - leader, follwer
                - put/get to leader
                - get to follwers
                - leader sends data to follwer
            - leader election methods
                - using configuration service
                - leader election in a shard group
            - ruft, strong consistency
            - gossip, enventual consistency
        - adding availability
        - okay to miss some set in corner
cases, cache speed/latency is more
important
        - scaling out can also help solving
hot shard issue
    - consistent hashing
        - multiple positions positions on
circle for each nodes
 - CAP
    - Consistency (not favourd)
        - Get on a replica after a set could
be missed when data is replicating
from leader to replicas async
        - Cache servers might go down and up
    - Availabilty (favoured)
 - Data expiration
    - during client fetch or via client
expire call
    - active with a vacuum/gc thread
        - when # of keys are too large, use
some probabilistic way to random
check each key instand loop the
key range
 - Cache client
    - all clients know about all cache servers and
should have the same list of servers
        - Maintaining a list of cache server,
how?
            - Use configuration management
tools (e.g. Puppet) to deploy
modified file to every service host
            - Use a S3 file to share a config file
            - Configuration service (e.g.
ZooKeeper, Redis Sentinel) -
discover cache host, monitoring
their health
                - Each cache server connect and
send heart beats
                - Costly on build and maintain, but
fully automize the list info update
                - Another benefit
    - client store list of servers in sorted
order by hash value (e.g. TreeMap)
    - Binary search is used to identify
server (log n)
    - Use TCP or UDP protocol to talk to servers
    - If server unavailable, client proceeds as though it was a cache miss
 - Detailed topics
    - Monitoring and logging
        - Network IO
        - QPS
        - Miss rate
    - security - should only exposed internally
 - Questions
    - I wonder how do you sync data
into a newly started replica in a
shard group. Simply copy all data
in the leader's memory to the new
replica node? Wouldn't that
consumes quite a lot of the
leader's CPU?