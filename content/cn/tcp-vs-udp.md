# TCP vs UDP

**TCP (Transmission Control Protocol)** and **UDP (User Datagram Protocol)** are the two main transport layer protocols.

## TCP
- **Connection-oriented**: Three-way handshake (SYN, SYN-ACK, ACK)
- **Reliable**: Guarantees delivery with acknowledgments
- **Ordered**: Maintains packet sequence
- **Flow control**: Uses sliding window protocol
- **Use cases**: Web browsing, email, file transfer

## UDP
- **Connectionless**: No handshake required
- **Unreliable**: No guarantee of delivery
- **No ordering**: Packets may arrive out of order
- **Faster**: Lower overhead, no connection setup
- **Use cases**: Video streaming, gaming, DNS, VoIP

## Comparison

| Feature | TCP | UDP |
|---------|-----|-----|
| Connection | Connection-oriented | Connectionless |
| Reliability | Reliable | Unreliable |
| Speed | Slower | Faster |
| Header Size | 20 bytes | 8 bytes |
| Flow Control | Yes | No |
