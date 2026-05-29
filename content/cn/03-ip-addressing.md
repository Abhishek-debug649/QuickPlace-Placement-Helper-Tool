# Module 3: IP Addressing and Subnetting

## 3.1 IPv4 Addressing
- 32 bits, written in dotted decimal: W.X.Y.Z
- Each octet is 8 bits (0–255)
- Example: 192.168.1.100

### CLASSES:
| Class | Range | Default Mask | Use |
| --- | --- | --- | --- |
| **A** | 1.0.0.0 – 126.255.255.255 | 255.0.0.0 (/8) | Large networks |
| **B** | 128.0.0.0 – 191.255.255.255 | 255.255.0.0 (/16) | Medium nets |
| **C** | 192.0.0.0 – 223.255.255.255 | 255.255.255.0 (/24) | Small nets |
| **D** | 224.0.0.0 – 239.255.255.255 | Multicast | Streaming |
| **E** | 240.0.0.0 – 255.255.255.255 | Reserved | Research |

### SPECIAL ADDRESSES:
- `127.0.0.1`: Loopback (localhost) — your own machine
- `0.0.0.0`: Default/unknown
- `255.255.255.255`: Broadcast (send to everyone on network)
- `192.168.x.x`: Private (home/office LAN)
- `10.x.x.x`: Private (large organizations)

## 3.2 Subnetting
**ANALOGY:** A big apartment building (network) divided into floors (subnets). Each floor has its own mailboxes (hosts). The building address = network ID. Floor number = subnet. Apartment number = host ID.

**Subnet Mask:** Tells which part of IP is network and which is host.
Example: `192.168.1.0/24`
- `/24` means first 24 bits = network, last 8 bits = host
- Can have 2^8 - 2 = 254 usable hosts (subtract network & broadcast)

**CIDR NOTATION:**
- `/8`  = `255.0.0.0` (Class A)
- `/16` = `255.255.0.0` (Class B)
- `/24` = `255.255.255.0` (Class C)
- `/30` = `255.255.255.252` (only 2 usable hosts — for point-to-point links)
