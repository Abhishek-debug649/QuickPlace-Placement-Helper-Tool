# Module 5: Transport Layer — TCP in Depth

## 5.1 TCP Three-Way Handshake
**Purpose:** Establish a reliable connection before data transfer

**ANALOGY:** Two people starting a phone call:
- "Can you hear me?" → **SYN**
- "Yes, can you hear me?" → **SYN-ACK**
- "Yes!" → **ACK**
[Now both sides confirm connection and start talking]

**Steps:**
1. Client → Server : **SYN** (I want to connect, seq=x)
2. Server → Client : **SYN-ACK** (OK, I'm ready, seq=y, ack=x+1)
3. Client → Server : **ACK** (Acknowledged, ack=y+1)

## 5.2 TCP Four-Way Termination
**Steps to close a TCP connection:**
1. Client → Server : **FIN** (I'm done sending)
2. Server → Client : **ACK** (Got it)
3. Server → Client : **FIN** (I'm done too)
4. Client → Server : **ACK** (OK, closing)

## 5.3 TCP Flow Control & Congestion Control
**Flow Control:**
- Receiver tells sender how much data it can handle (window size)
- Prevents fast sender from overwhelming slow receiver
- **ANALOGY:** Your water jug (receive buffer) can only hold so much; the tap (sender) must not fill it faster than you can drink

**Congestion Control:**
- Prevents too much data from being sent on the network
- Algorithms: Slow Start, Congestion Avoidance, Fast Retransmit
