# Module 9: Quick Revision — Key Formulas & Facts

**Bandwidth-Delay Product** = Bandwidth × Round-Trip Time
*(measures amount of data "in flight" in the network)*

**Shannon's Theorem:** Maximum channel capacity
`C = B × log2(1 + S/N)`
C = channel capacity, B = bandwidth, S/N = signal-to-noise ratio

**Nyquist Rate (noiseless):** Max data rate = `2 × B × log2(V)`
V = number of discrete signal levels

### KEY PORT NUMBERS TO REMEMBER:
- **FTP**: 20 (data), 21 (control)
- **SSH**: 22
- **Telnet**: 23
- **SMTP**: 25
- **DNS**: 53
- **HTTP**: 80
- **HTTPS**: 443
- **POP3**: 110
- **IMAP**: 143
- **MySQL**: 3306
- **MongoDB**: 27017
- **Redis**: 6379

### SWITCHING TYPES:
- **Circuit Switching**: Dedicated path (old telephone)
- **Packet Switching**: Data split into packets, routed independently (Internet)
- **Message Switching**: Entire message stored at each node, then forwarded

### PROTOCOL DATA UNITS (PDUs):
- **Layer 7 (App)** → Data
- **Layer 4 (Transport)** → Segment (TCP) / Datagram (UDP)
- **Layer 3 (Network)** → Packet
- **Layer 2 (Data Link)** → Frame
- **Layer 1 (Physical)** → Bits
