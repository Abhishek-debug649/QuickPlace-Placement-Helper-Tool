# OSI Model

**The OSI (Open Systems Interconnection) model** is a conceptual framework that standardizes communication functions into seven layers.

## The 7 Layers

### 7. Application Layer
**Protocols**: HTTP, FTP, SMTP, DNS
Provides network services directly to end-user applications.

### 6. Presentation Layer
**Functions**: Encryption, compression, data translation
Transforms data into a format the application layer can accept.

### 5. Session Layer
**Functions**: Session management, authentication
Manages sessions between applications (e.g., login sessions).

### 4. Transport Layer
**Protocols**: TCP, UDP
- **TCP**: Reliable, connection-oriented, guaranteed delivery
- **UDP**: Unreliable, connectionless, faster for streaming

### 3. Network Layer
**Protocols**: IP, ICMP, ARP
Handles logical addressing (IP addresses) and routing.

### 2. Data Link Layer
**Functions**: MAC addressing, error detection (CRC)
Transfers data between adjacent network nodes.

### 1. Physical Layer
**Functions**: Bit transmission over physical media
Deals with cables, switches, voltages, and data rates.
