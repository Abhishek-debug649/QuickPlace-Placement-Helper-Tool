# Load Balancing

A **load balancer** acts as the "traffic cop" sitting in front of your servers and routing client requests across all servers fulfilling those requests.

### Algorithms
- **Round Robin**: Requests are distributed across the group of servers sequentially.
- **Least Connections**: A new request is sent to the server with the fewest current connections to clients.
- **IP Hash**: The IP address of the client is used to determine which server receives the request.
