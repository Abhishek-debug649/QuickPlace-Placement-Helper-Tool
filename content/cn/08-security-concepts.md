# Module 8: Security Concepts

## 8.1 SSL/TLS
- **SSL (Secure Sockets Layer)** — older, now deprecated
- **TLS (Transport Layer Security)** — current standard (TLS 1.3)
- Provides: Encryption, Authentication, Integrity
- Used in: HTTPS, email, VPN

### TLS HANDSHAKE (simplified):
1. Client says "Hello" (sends supported cipher suites)
2. Server says "Hello" (chooses cipher, sends certificate)
3. Client verifies server's certificate (via CA)
4. Both derive session keys (asymmetric → symmetric)
5. Encrypted communication begins

## 8.2 COMMON ATTACKS
- **DNS Spoofing**: Attacker poisons DNS cache with fake IP mappings
- **ARP Spoofing**: Attacker links their MAC to someone else's IP
- **Man-in-Middle**: Attacker intercepts communication between two parties
- **DDoS**: Distributed Denial of Service — flood server with requests
- **Phishing**: Trick user into revealing credentials via fake sites
- **SQL Injection**: Malicious SQL through input fields
- **SYN Flood**: Send millions of SYN packets, never complete handshake

## 8.3 VPN (Virtual Private Network)
- Creates an encrypted tunnel over the public internet
- Analogy: A private, secure underground tunnel through a public city
- Hides your IP address and encrypts your traffic
- Protocols: OpenVPN, IPSec, WireGuard, L2TP
