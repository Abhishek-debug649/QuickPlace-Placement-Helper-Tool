# Module 6: Microservices vs Monolithic

## 6.1 Monolithic Architecture
All components of an application are deployed as a SINGLE unit. User service, Order service, Payment service, Inventory — all in one codebase.

> **ANALOGY:** A Swiss Army knife — one tool with all functions built in. Or: One large restaurant that handles cooking, cleaning, serving, billing, and décor all in one operation.

- **PROS:** Simple to develop and test initially, Single deployment, No network latency between components.
- **CONS:** As it grows, becomes a "big ball of mud". Must scale the entire app even if only one part is stressed. Deploy everything for even a small change. Technology lock-in.

---

## 6.2 Microservices Architecture
Application split into small, independently deployable services. Each service owns its own data, has its own codebase, runs in its own process.

> **ANALOGY:** A food court — separate stalls for pizza, sushi, burgers. Each stall operates independently with its own staff, menu, ordering system. If the pizza stall closes, you can still get sushi.

- **PROS:** Independent scaling and deployment. Technology freedom. Fault isolation. Small, focused teams per service.
- **CONS:** Distributed system complexity. Network latency between services. Data consistency across services is hard. Operational overhead.

---

## 6.3 Microservices Patterns

### API GATEWAY:
- Single entry point for all client requests. Routes to appropriate microservices.
- Handles: Auth, rate limiting, SSL termination, request logging.
- *Examples: Kong, AWS API Gateway, Nginx*

### SERVICE DISCOVERY:
- Services don't have hardcoded addresses; they register themselves. Other services discover them via a registry.
- *Examples: Consul, Eureka, ZooKeeper*

### CIRCUIT BREAKER:
- Prevents cascading failures: if Service B is down and A keeps calling B, A will also slow down/fail.
- Circuit breaker detects failures and "opens" (stops sending to B). After timeout, tries again (half-open state).
- *Example: Netflix Hystrix, Resilience4j*

### SAGA PATTERN (Distributed Transactions):
- Manage data consistency across multiple services without distributed transactions.
- Sequence of local transactions; each publishes event for the next. If one step fails → compensating transactions undo previous steps.
