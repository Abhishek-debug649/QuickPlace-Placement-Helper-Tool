# Microservices Architecture

**Microservices** is an architectural style where an application is built as a collection of **small, independently deployable services**, each responsible for a specific business capability.

## Monolith vs Microservices

| Aspect | Monolith | Microservices |
|---|---|---|
| **Deployment** | Single deployable unit | Independent deployments |
| **Scaling** | Scale the whole app | Scale individual services |
| **Technology** | Single tech stack | Polyglot (each service can differ) |
| **Failure** | One bug can break all | Isolated failures |
| **Complexity** | Simple at first | Higher operational complexity |
| **Communication** | In-process calls | Network calls (REST/gRPC/MQ) |

## Core Concepts

### Service Registry & Discovery
Services register themselves (e.g., with **Consul** or **Eureka**) so other services can find them dynamically.

### API Gateway
A **single entry point** that routes requests to appropriate services.

```
Client → API Gateway → [Auth Service]
                     → [User Service]
                     → [Order Service]
                     → [Notification Service]
```

### Inter-Service Communication

**Synchronous:** REST, gRPC (direct call, real-time response)  
**Asynchronous:** Message queues — Kafka, RabbitMQ, SQS (decoupled, better for events)

## Design Patterns

### Circuit Breaker
Prevents cascading failures. If a service is down, stop calling it and return a fallback response.

```
CLOSED → (failures > threshold) → OPEN
OPEN   → (after timeout)        → HALF-OPEN
HALF-OPEN → (success)           → CLOSED
HALF-OPEN → (failure)           → OPEN
```

### Saga Pattern
Manages distributed transactions across services using a sequence of local transactions with **compensating transactions** on failure.

### Strangler Fig
Gradually replace a monolith by routing traffic to new microservices one feature at a time.

## Data Management

- Each service owns its **own database** (Database per Service pattern)
- No shared databases → prevents tight coupling
- Eventual consistency via event sourcing

## Challenges

- **Distributed Tracing** → Jaeger, Zipkin
- **Service Mesh** → Istio, Linkerd for traffic management
- **Containerization** → Docker + Kubernetes for orchestration
- **Monitoring** → Prometheus + Grafana

## Interview Tip

> "Start with a monolith, extract services when you clearly understand the domain boundaries. Don't split too early — premature microservices = distributed monolith."
