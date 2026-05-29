# Module 5: Message Queues and Async Processing

## 5.1 Why Message Queues?
Instead of services communicating SYNCHRONOUSLY (A calls B and waits), message queues allow ASYNCHRONOUS communication (A sends a message and continues; B processes it when ready).

> **ANALOGY:** Email vs Phone call.
> - Phone call (synchronous): You call, they must answer immediately.
> - Email (asynchronous): You send, they respond when they have time.

**BENEFITS:**
- **Decoupling:** Services don't need to know about each other
- **Load leveling:** Queue absorbs traffic spikes (handle 1M requests with a 100k/s processing system — just queue the backlog)
- **Fault tolerance:** If consumer crashes, messages stay in queue
- **Scalability:** Add more consumers to process faster

---

## 5.2 Key Concepts
- **PRODUCER:** Sends messages to the queue
- **CONSUMER:** Reads and processes messages from the queue
- **MESSAGE:** Data/event being communicated
- **QUEUE/TOPIC:** Where messages are stored temporarily
- **BROKER:** The message queue server (Kafka, RabbitMQ)

---

## 5.3 Kafka vs RabbitMQ

### KAFKA (Distributed Event Streaming):
- High throughput (millions of messages/second)
- Messages are stored on disk (durable, can be replayed)
- Messages persist even after consumption (consumers use offsets)
- Partitions for parallelism
- *Best for: Event sourcing, log aggregation, real-time analytics, audit trails*

### RABBITMQ (Message Broker):
- Messages deleted after consumption
- More complex routing (exchanges, bindings)
- Better for task distribution (work queues)
- *Best for: Task queues, RPC, complex routing requirements*

| Feature | Kafka | RabbitMQ |
| --- | --- | --- |
| **Message persist** | Yes (disk, by time) | Deleted after consume |
| **Throughput** | Very high | High |
| **Replay** | Yes | No (once consumed) |
| **Use case** | Events, streaming | Task queues, RPC |
