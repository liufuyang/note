# Network Programming

http://beej.us/guide/bgnet/html/

## Two Types of Internet Sockets

- `SOCK_STREAM` -> TCP
- `SOCK_DGRAM`-> UDP, may lost, may out of order, but fast

#### Layered Network Model (Data Encapsulation)

- Application Layer (telnet, ftp, etc.)
- Host-to-Host Transport Layer (TCP, UDP) - port number (16-bit number)
- Internet Layer (IP and routing)
- Network Access Layer (Ethernet, wi-fi, or whatever)

See how much work there is in building a simple packet? All you have to do for stream sockets is `send()` the data out.
All you have to do for `datagram sockets` is encapsulate the packet in the method of your choosing and `sendto()` it out. The kernel builds the Transport Layer and Internet Layer on for you and the hardware does the Network Access Layer. Ah, modern technology.

### System calls

#### `bind()` - What port am I on?

```c
struct addrinfo hints, *res;
int sockfd;

// first, load up address structs with getaddrinfo():
memset(&hints, 0, sizeof hints);
hints.ai_family = AF_UNSPEC;  // use IPv4 or IPv6, whichever
hints.ai_socktype = SOCK_STREAM;
hints.ai_flags = AI_PASSIVE;     // fill in my IP for me

getaddrinfo(NULL, "3490", &hints, &res);

// make a socket:
sockfd = socket(res->ai_family, res->ai_socktype, res->ai_protocol);

// bind it to the port we passed in to getaddrinfo():
bind(sockfd, res->ai_addr, res->ai_addrlen);
```

#### `connect()` - Hey, you!
```c
struct addrinfo hints, *res;
int sockfd;

// first, load up address structs with getaddrinfo():

memset(&hints, 0, sizeof hints);
hints.ai_family = AF_UNSPEC;
hints.ai_socktype = SOCK_STREAM;

getaddrinfo("www.example.com", "3490", &hints, &res);

// make a socket:
sockfd = socket(res->ai_family, res->ai_socktype, res->ai_protocol);

// connect!
connect(sockfd, res->ai_addr, res->ai_addrlen);
```
Also, notice that we didn’t call `bind()`. Basically, we don’t care about our local port number; we only care where we’re going (the remote port). **The kernel will choose a local port for us**, and the site we connect to will automatically get this information from us. No worries.

#### `listen()` - Keep on answering stuff
```c
int listen(int sockfd, int backlog);
```
`sockfd` is the usual socket file descriptor from the `socket()` system call. `backlog` is the number of connections allowed on the incoming queue. What does that mean? Well, incoming connections are going to wait in this queue until you `accept()` them and this is the limit on how many can queue up. Most systems silently limit this number to about 20; you can probably get away with setting it to 5 or 10.

Well, as you can probably imagine, we need to call `bind()` before we call `listen()` so that the server is running on a specific port.

#### `accept()` - "Thank you for calling port 3490."

```c
#include <sys/types.h>
#include <sys/socket.h>

int accept(int sockfd, struct sockaddr *addr, socklen_t *addrlen); 
```
You call `accept()` and you tell it to get the pending connection. It’ll return to you a brand new socket file descriptor to use for this single connection! That’s right, suddenly you have two socket file descriptors for the price of one! The original one is still listening for more new connections, and the newly created one is finally ready to `send()` and `recv()`

#### `send()` and `recv()` - Talk to me, baby!

For UDP - `sendto()` and `recvfrom()`.
```c
int send(int sockfd, const void *msg, int len, int flags); 
```

Example:
```c
char *msg = "Beej was here!";
int len, bytes_sent;
.
.
len = strlen(msg);
bytes_sent = send(sockfd, msg, len, 0);
.
.
```
Remember, if the value returned by `send()` doesn’t match the value in `len`, it’s up to you to send the rest of the string. The good news is this: if the packet is small (less than 1K or so) it will probably manage to send the whole thing all in one go.

The `recv()` call is similar in many respects:
```c
int recv(int sockfd, void *buf, int len, int flags);
```
`recv()` returns the number of bytes actually read into the buffer, or -1 on error (with `errno` set, accordingly).

Wait! `recv()` can return `0`. This can mean only one thing: the remote side has closed the connection on you! A return value of `0` is `recv()`’s way of letting you know this has occurred.

```c
int sendto(int sockfd, const void *msg, int len, unsigned int flags, const struct sockaddr *to, socklen_t tolen);
int recvfrom(int sockfd, void *buf, int len, unsigned int flags,struct sockaddr *from, int *fromlen); 
``` 

### `close()` and `shutdown()` —Get outta my face!

### Examples!!!

```c
/*
** server.c -- a stream socket server demo
*/

#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <netdb.h>
#include <arpa/inet.h>
#include <sys/wait.h>
#include <signal.h>

#define PORT "3490"  // the port users will be connecting to

#define BACKLOG 10   // how many pending connections queue will hold

void sigchld_handler(int s)
{
    // waitpid() might overwrite errno, so we save and restore it:
    int saved_errno = errno;

    while(waitpid(-1, NULL, WNOHANG) > 0);

    errno = saved_errno;
}


// get sockaddr, IPv4 or IPv6:
void *get_in_addr(struct sockaddr *sa)
{
    if (sa->sa_family == AF_INET) {
        return &(((struct sockaddr_in*)sa)->sin_addr);
    }

    return &(((struct sockaddr_in6*)sa)->sin6_addr);
}

int main(void)
{
    int sockfd, new_fd;  // listen on sock_fd, new connection on new_fd
    struct addrinfo hints, *servinfo, *p;
    struct sockaddr_storage their_addr; // connector's address information
    socklen_t sin_size;
    struct sigaction sa;
    int yes=1;
    char s[INET6_ADDRSTRLEN];
    int rv;

    memset(&hints, 0, sizeof hints);
    hints.ai_family = AF_UNSPEC;
    hints.ai_socktype = SOCK_STREAM;
    hints.ai_flags = AI_PASSIVE; // use my IP

    if ((rv = getaddrinfo(NULL, PORT, &hints, &servinfo)) != 0) {
        fprintf(stderr, "getaddrinfo: %s\n", gai_strerror(rv));
        return 1;
    }

    // loop through all the results and bind to the first we can
    for(p = servinfo; p != NULL; p = p->ai_next) {
        if ((sockfd = socket(p->ai_family, p->ai_socktype,
                p->ai_protocol)) == -1) {
            perror("server: socket");
            continue;
        }

        if (setsockopt(sockfd, SOL_SOCKET, SO_REUSEADDR, &yes,
                sizeof(int)) == -1) {
            perror("setsockopt");
            exit(1);
        }

        if (bind(sockfd, p->ai_addr, p->ai_addrlen) == -1) {
            close(sockfd);
            perror("server: bind");
            continue;
        }

        break;
    }

    freeaddrinfo(servinfo); // all done with this structure

    if (p == NULL)  {
        fprintf(stderr, "server: failed to bind\n");
        exit(1);
    }

    if (listen(sockfd, BACKLOG) == -1) {
        perror("listen");
        exit(1);
    }

    sa.sa_handler = sigchld_handler; // reap all dead processes
    sigemptyset(&sa.sa_mask);
    sa.sa_flags = SA_RESTART;
    if (sigaction(SIGCHLD, &sa, NULL) == -1) {
        perror("sigaction");
        exit(1);
    }

    printf("server: waiting for connections...\n");

    while(1) {  // main accept() loop
        sin_size = sizeof their_addr;
        new_fd = accept(sockfd, (struct sockaddr *)&their_addr, &sin_size);
        if (new_fd == -1) {
            perror("accept");
            continue;
        }

        inet_ntop(their_addr.ss_family,
            get_in_addr((struct sockaddr *)&their_addr),
            s, sizeof s);
        printf("server: got connection from %s\n", s);

        if (!fork()) { // this is the child process
            close(sockfd); // child doesn't need the listener
            if (send(new_fd, "Hello, world!", 13, 0) == -1)
                perror("send");
            close(new_fd);
            exit(0);
        }
        close(new_fd);  // parent doesn't need this
    }

    return 0;
}
```

```c
/*
** client.c -- a stream socket client demo
*/

#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>
#include <netdb.h>
#include <sys/types.h>
#include <netinet/in.h>
#include <sys/socket.h>

#include <arpa/inet.h>

#define PORT "3490" // the port client will be connecting to 

#define MAXDATASIZE 100 // max number of bytes we can get at once 

// get sockaddr, IPv4 or IPv6:
void *get_in_addr(struct sockaddr *sa)
{
    if (sa->sa_family == AF_INET) {
        return &(((struct sockaddr_in*)sa)->sin_addr);
    }

    return &(((struct sockaddr_in6*)sa)->sin6_addr);
}

int main(int argc, char *argv[])
{
    int sockfd, numbytes;  
    char buf[MAXDATASIZE];
    struct addrinfo hints, *servinfo, *p;
    int rv;
    char s[INET6_ADDRSTRLEN];

    if (argc != 2) {
        fprintf(stderr,"usage: client hostname\n");
        exit(1);
    }

    memset(&hints, 0, sizeof hints);
    hints.ai_family = AF_UNSPEC;
    hints.ai_socktype = SOCK_STREAM;

    if ((rv = getaddrinfo(argv[1], PORT, &hints, &servinfo)) != 0) {
        fprintf(stderr, "getaddrinfo: %s\n", gai_strerror(rv));
        return 1;
    }

    // loop through all the results and connect to the first we can
    for(p = servinfo; p != NULL; p = p->ai_next) {
        if ((sockfd = socket(p->ai_family, p->ai_socktype,
                p->ai_protocol)) == -1) {
            perror("client: socket");
            continue;
        }

        if (connect(sockfd, p->ai_addr, p->ai_addrlen) == -1) {
            close(sockfd);
            perror("client: connect");
            continue;
        }

        break;
    }

    if (p == NULL) {
        fprintf(stderr, "client: failed to connect\n");
        return 2;
    }

    inet_ntop(p->ai_family, get_in_addr((struct sockaddr *)p->ai_addr),
            s, sizeof s);
    printf("client: connecting to %s\n", s);

    freeaddrinfo(servinfo); // all done with this structure

    if ((numbytes = recv(sockfd, buf, MAXDATASIZE-1, 0)) == -1) {
        perror("recv");
        exit(1);
    }

    buf[numbytes] = '\0';

    printf("client: received '%s'\n",buf);

    close(sockfd);

    return 0;
}
```

### Blocking
Lots of functions block. `accept()` blocks. All the `recv()` functions block. The reason they can do this is because they’re allowed to. When you first create the socket descriptor with `socket()`, the kernel sets it to blocking. If you don’t want a socket to be blocking, you have to make a call to `fcntl()`:

```c
#include <unistd.h>
#include <fcntl.h>
.
.
sockfd = socket(PF_INET, SOCK_STREAM, 0);
fcntl(sockfd, F_SETFL, O_NONBLOCK);
.
.
```
By setting a socket to non-blocking, you can effectively `“poll”` the socket for information. If you try to read from a non-blocking socket and there’s no data there, it’s not allowed to block — it will return `-1` and errno will be set to `EAGAIN` or `EWOULDBLOCK`.

(Wait—it can return `EAGAIN` or `EWOULDBLOCK`? Which do you check for? The specification doesn’t actually specify which your system will return, so for portability, check them both.)

Generally speaking, however, this type of polling is a bad idea. If you put your program in a busy-wait looking for data on the socket, you’ll suck up CPU time like it was going out of style. A more elegant solution for checking to see if there’s data waiting to be read comes in the following section on `poll()`.

### `poll()` — Synchronous I/O Multiplexing
What you really want to be able to do is somehow monitor a bunch of sockets at once and then handle the ones that have data ready. This way you don’t have to continously poll all those sockets to see which are ready to read.

So how can you avoid polling? Not slightly ironically, you can avoid polling by using the `poll()` system call. In a nutshell, we’re going to ask the operating system to do all the dirty work for us, and just let us know when some data is ready to read on which sockets. In the meantime, our process can go to sleep, saving system resources.

The general gameplan is to keep an array of struct `pollfds` with information about which socket descriptors we want to monitor, and what kind of events we want to monitor for. The OS will block on the `poll()` call until one of those events occurs (e.g. “socket ready to read!”) or until a user-specified timeout occurs.

Usefully, a `listen()`ing socket will return “ready to read” when a new incoming connection is ready to be `accept()`ed.

That’s enough banter. How do we use this?

```c
#include <poll.h>
    
int poll(struct pollfd fds[], nfds_t nfds, int timeout);
```

`fds` is our array of information (which sockets to monitor for what), `nfds` is the count of elements in the array, and `timeout` is a timeout in milliseconds. It returns the number of elements in the array that have had an event occur.

Let’s have a look at that struct:

```c
struct pollfd {
    int fd;         // the socket descriptor
    short events;   // bitmap of events we're interested in
    short revents;  // when poll() returns, bitmap of events that occurred
};
```

So we’re going to have an array of those, and we’ll see the `fd` field for each element to a socket descriptor we’re interested in monitoring. And then we’ll set the events field to indicate the type of `events` we’re interested in.

The `events` field is the bitwise-OR of the following:

Macro |  Description
---|---
`POLLIN`  | Alert me when data is ready to `recv()` on this socket.
`POLLOUT` | Alert me when I can `send()` data to this socket without blocking.

Once you have your array of `struct pollfds` in order, then you can pass it to `poll()`, also passing the size of the array, as well as a timeout value in milliseconds. (You can specify a negative timeout to wait forever.)

After `poll()` returns, you can check the revents field to see if `POLLIN` or `POLLOUT` is set, indicating that event occurred.

(There’s actually more that you can do with the `poll()` call. See the `poll()` man page, below, for more details.)

Here’s an example28 where we’ll wait 2.5 seconds for data to be ready to read from standard input, i.e. when you hit `RETURN`:

```c
#include <stdio.h>
#include <poll.h>

int main(void)
{
    struct pollfd pfds[1]; // More if you want to monitor more

    pfds[0].fd = 0;          // Standard input
    pfds[0].events = POLLIN; // Tell me when ready to read

    // If you needed to monitor other things, as well:
    //pfds[1].fd = some_socket; // Some socket descriptor
    //pfds[1].events = POLLIN;  // Tell me when ready to read

    printf("Hit RETURN or wait 2.5 seconds for timeout\n");

    int num_events = poll(pfds, 1, 2500); // 2.5 second timeout

    if (num_events == 0) {
        printf("Poll timed out!\n");
    } else {
        int pollin_happened = pfds[0].revents & POLLIN;

        if (pollin_happened) {
            printf("File descriptor %d is ready to read\n", pfds[0].fd);
        } else {
            printf("Unexpected event occurred: %d\n", pfds[0].revents);
        }
    }

    return 0;
}
```

Notice again that `poll()` returns the number of elements in the `pfds` array for which events have occurred. It doesn’t tell you which elements in the array (you still have to scan for that), but it does tell you how many entries have a non-zero `revents` field (so you can stop scanning after you find that many).

How can we put it all together into a chat server that you can `telnet`/`nc` to?

What we’ll do is start a listener socket, and add it to the set of file descriptors to `poll()`. (It will show ready-to-read when there’s an incoming connection.)

Then we’ll add new connections to our struct `pollfd` array. And we’ll grow it dynamically if we run out of space.

When a connection is closed, we’ll remove it from the array.

And when a connection is ready-to-read, we’ll read the data from it and send that data to all the other connections so they can see what the other users typed.

So give this poll server a try. Run it in one window, then `telnet localhost 9034` from a number of other terminal windows. You should be able to see what you type in one window in the other ones (after you hit RETURN).

Not only that, but if you hit `CTRL-]` and type `quit` to exit telnet, the server should detect the disconnection and remove you from the array of file descriptors.

```c
/*
** pollserver.c -- a cheezy multiperson chat server
*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <netdb.h>
#include <poll.h>

#define PORT "9034"   // Port we're listening on

// Get sockaddr, IPv4 or IPv6:
void *get_in_addr(struct sockaddr *sa)
{
    if (sa->sa_family == AF_INET) {
        return &(((struct sockaddr_in*)sa)->sin_addr);
    }

    return &(((struct sockaddr_in6*)sa)->sin6_addr);
}

// Return a listening socket
int get_listener_socket(void)
{
    int listener;     // Listening socket descriptor
    int yes=1;        // For setsockopt() SO_REUSEADDR, below
    int rv;

    struct addrinfo hints, *ai, *p;

    // Get us a socket and bind it
    memset(&hints, 0, sizeof hints);
    hints.ai_family = AF_UNSPEC;
    hints.ai_socktype = SOCK_STREAM;
    hints.ai_flags = AI_PASSIVE;
    if ((rv = getaddrinfo(NULL, PORT, &hints, &ai)) != 0) {
        fprintf(stderr, "selectserver: %s\n", gai_strerror(rv));
        exit(1);
    }
    
    for(p = ai; p != NULL; p = p->ai_next) {
        listener = socket(p->ai_family, p->ai_socktype, p->ai_protocol);
        if (listener < 0) { 
            continue;
        }
        
        // Lose the pesky "address already in use" error message
        setsockopt(listener, SOL_SOCKET, SO_REUSEADDR, &yes, sizeof(int));

        if (bind(listener, p->ai_addr, p->ai_addrlen) < 0) {
            close(listener);
            continue;
        }

        break;
    }

    freeaddrinfo(ai); // All done with this

    // If we got here, it means we didn't get bound
    if (p == NULL) {
        return -1;
    }

    // Listen
    if (listen(listener, 10) == -1) {
        return -1;
    }

    return listener;
}

// Add a new file descriptor to the set
void add_to_pfds(struct pollfd *pfds[], int newfd, int *fd_count, int *fd_size)
{
    // If we don't have room, add more space in the pfds array
    if (*fd_count == *fd_size) {
        *fd_size *= 2; // Double it

        *pfds = realloc(*pfds, sizeof(**pfds) * (*fd_size));
    }

    (*pfds)[*fd_count].fd = newfd;
    (*pfds)[*fd_count].events = POLLIN; // Check ready-to-read

    (*fd_count)++;
}

// Remove an index from the set
void del_from_pfds(struct pollfd pfds[], int i, int *fd_count)
{
    // Copy the one from the end over this one
    pfds[i] = pfds[*fd_count-1];

    (*fd_count)--;
}

// Main
int main(void)
{
    int listener;     // Listening socket descriptor

    int newfd;        // Newly accept()ed socket descriptor
    struct sockaddr_storage remoteaddr; // Client address
    socklen_t addrlen;

    char buf[256];    // Buffer for client data

    char remoteIP[INET6_ADDRSTRLEN];

    // Start off with room for 5 connections
    // (We'll realloc as necessary)
    int fd_count = 0;
    int fd_size = 5;
    struct pollfd *pfds = malloc(sizeof *pfds * fd_size);

    // Set up and get a listening socket
    listener = get_listener_socket();

    if (listener == -1) {
        fprintf(stderr, "error getting listening socket\n");
        exit(1);
    }

    // Add the listener to set
    pfds[0].fd = listener;
    pfds[0].events = POLLIN; // Report ready to read on incoming connection

    fd_count = 1; // For the listener

    // Main loop
    for(;;) {
        int poll_count = poll(pfds, fd_count, -1);

        if (poll_count == -1) {
            perror("poll");
            exit(1);
        }

        // Run through the existing connections looking for data to read
        for(int i = 0; i < fd_count; i++) {

            // Check if someone's ready to read
            if (pfds[i].revents & POLLIN) { // We got one!!

                if (pfds[i].fd == listener) {
                    // If listener is ready to read, handle new connection

                    addrlen = sizeof remoteaddr;
                    newfd = accept(listener,
                        (struct sockaddr *)&remoteaddr,
                        &addrlen);

                    if (newfd == -1) {
                        perror("accept");
                    } else {
                        add_to_pfds(&pfds, newfd, &fd_count, &fd_size);

                        printf("pollserver: new connection from %s on "
                            "socket %d\n",
                            inet_ntop(remoteaddr.ss_family,
                                get_in_addr((struct sockaddr*)&remoteaddr),
                                remoteIP, INET6_ADDRSTRLEN),
                            newfd);
                    }
                } else {
                    // If not the listener, we're just a regular client
                    int nbytes = recv(pfds[i].fd, buf, sizeof buf, 0);

                    int sender_fd = pfds[i].fd;

                    if (nbytes <= 0) {
                        // Got error or connection closed by client
                        if (nbytes == 0) {
                            // Connection closed
                            printf("pollserver: socket %d hung up\n", sender_fd);
                        } else {
                            perror("recv");
                        }

                        close(pfds[i].fd); // Bye!

                        del_from_pfds(pfds, i, &fd_count);

                    } else {
                        // We got some good data from a client

                        for(int j = 0; j < fd_count; j++) {
                            // Send to everyone!
                            int dest_fd = pfds[j].fd;

                            // Except the listener and ourselves
                            if (dest_fd != listener && dest_fd != sender_fd) {
                                if (send(dest_fd, buf, nbytes, 0) == -1) {
                                    perror("send");
                                }
                            }
                        }
                    }
                } // END handle data from client
            } // END got ready-to-read from poll()
        } // END looping through file descriptors
    } // END for(;;)--and you thought it would never end!
    
    return 0;
}
```

An interesting task to is to swich `poll` above to `epoll` on Linux or `kqueue` on Mac.

For now, a similar server implement in Rust could be like:

```rust
use std::collections::HashMap;
use std::io::{Read, Write};
use std::net::{Shutdown, SocketAddr, TcpListener, TcpStream};
use std::sync::mpsc::{channel, Receiver, Sender};
use std::sync::{Arc, Mutex};
use std::thread;

fn handle_client(
    mut stream: TcpStream,
    sender_agent: Sender<(SocketAddr, String)>, // agent sender for broadcast message to others
    receiver: Receiver<String>, // broadcast receiver to get message from other client
    peer_addr: SocketAddr,      // client addr
    sender_map: Arc<Mutex<HashMap<SocketAddr, Sender<String>>>>, // handle for remove disconnected senders from sender_map
) {
    let mut data = [0 as u8; 50]; // using 50 byte buffer

    let mut stream_clone = stream.try_clone().expect("clone failed...");
    std::thread::spawn(move || {
        while match receiver.recv() {
            Ok(msg) => {
                stream_clone.write(msg.as_bytes()).unwrap();
                true
            }
            Err(e) => {
                println!("Client {} disconnected. Message: {}", peer_addr, e);
                false
            }
        } {}
    });

    while match stream.read(&mut data) {
        Ok(0) => {
            // Stream ended as client closed, clean up stuff here
            sender_map.lock().unwrap().remove(&peer_addr);
            false
        }
        Ok(size) => {
            // echo everything!
            // stream.write(&data[0..size]).unwrap();
            let to_send = std::str::from_utf8(&data[0..size]).unwrap_or("?").into();
            match sender_agent.send((peer_addr.clone(), to_send)) {
                Ok(_) => true,
                Err(e) => {
                    println!("{}", e);
                    sender_map.lock().unwrap().remove(&peer_addr);
                    false
                }
            }
        }
        Err(_) => {
            println!(
                "An error occurred, terminating connection with {}",
                stream.peer_addr().unwrap()
            );
            stream.shutdown(Shutdown::Both).unwrap();
            false
        }
    } {}
}

fn main() {
    let listener = TcpListener::bind("0.0.0.0:3333").unwrap();
    // accept connections and process them, spawning a new thread for each one
    println!("Server listening on port 3333");

    let (sender_agent, recv_agent) = channel::<(SocketAddr, String)>();
    let sender_map: Arc<Mutex<HashMap<SocketAddr, Sender<String>>>> =
        Arc::new(Mutex::new(HashMap::new()));
    let sender_map_copy = sender_map.clone();

    // Agent thread
    thread::spawn(move || {
        while match recv_agent.recv() {
            Ok((addr, msg)) => {
                print!("[{}]: {}", &addr, msg.as_str());
                for (key, sender_in_map) in sender_map_copy.lock().unwrap().iter() {
                    if key == &addr {
                        continue;
                    }

                    match sender_in_map.send(format!("[{}]: {}", addr, msg)) {
                        Ok(_) => {}
                        Err(e) => println!("{}", e),
                    }
                }
                true
            }
            Err(e) => {
                println!("{:?}", e);
                true
            }
        } {}
    });

    for stream in listener.incoming() {
        let sender_agent_copy = sender_agent.clone();
        let (sender_in_map, recv) = channel();
        match stream {
            Ok(mut stream) => {
                let peer_addr = stream.peer_addr().unwrap();
                println!("New connection: {}", peer_addr);
                stream
                    .write(format!("Welcome {}\n", peer_addr).as_bytes())
                    .unwrap();

                let sender_map_copy = sender_map.clone();
                sender_map_copy
                    .lock()
                    .unwrap()
                    .insert(peer_addr.clone(), sender_in_map.clone());
                thread::spawn(move || {
                    // connection succeeded
                    handle_client(stream, sender_agent_copy, recv, peer_addr, sender_map_copy)
                });
            }
            Err(e) => {
                println!("Error: {}", e);
                /* connection failed */
            }
        }
    }
    // close the socket server
    drop(listener);
}
```