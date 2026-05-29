# Module 2: OSI Model (Open Systems Interconnection)

## 2.1 The 7-Layer OSI Model
**ANALOGY:** Sending a physical letter internationally:
- **Layer 7 (Application)** = You write the letter (what you want to say)
- **Layer 6 (Presentation)** = You translate to the recipient's language
- **Layer 5 (Session)** = You open/close the postal conversation
- **Layer 4 (Transport)** = You split a big letter into numbered pages
- **Layer 3 (Network)** = Post office finds the best route to destination
- **Layer 2 (Data Link)** = Local postal van delivers within neighborhood
- **Layer 1 (Physical)** = The actual road, truck, airplane carrying it

**Mnemonic (Top → Bottom):** "All People Seem To Need Data Processing"
**Mnemonic (Bottom → Top):** "Please Do Not Throw Sausage Pizza Away"

### LAYER 7 — APPLICATION LAYER
- Closest to the end user
- Provides services directly to user applications
- Protocols: HTTP, HTTPS, FTP, SMTP, DNS, SSH, Telnet
- Example: When you type google.com in browser, HTTP works here

### LAYER 6 — PRESENTATION LAYER
- Data translation, encryption, compression
- Converts data to a format the application can use
- Analogy: Translator who converts French to English
- Functions: Encoding (ASCII/Unicode), Encryption (SSL/TLS), Compression
- Example: JPEG, MP3, GIF formats are handled here

### LAYER 5 — SESSION LAYER
- Manages sessions (connections) between applications
- Establishes, maintains, terminates sessions
- Analogy: Phone call setup — ringing, talking, hanging up
- Functions: Session establishment, synchronization, checkpointing
- Example: NetBIOS, RPC (Remote Procedure Call)

### LAYER 4 — TRANSPORT LAYER ← VERY IMPORTANT
- End-to-end communication, reliability, flow control
- Breaks data into **SEGMENTS**
- Protocols: TCP (reliable) and UDP (fast, unreliable)
- Analogy: Courier service — packs items into boxes, numbers them, ensures all boxes arrive and are reassembled in order

**TCP vs UDP (key comparison):**
| Feature | TCP | UDP |
| --- | --- | --- |
| Connection | Connection-based | Connectionless |
| Reliability | Guaranteed | Not guaranteed |
| Order | In-order | No ordering |
| Speed | Slower | Faster |
| Error checking | Yes | Minimal |
| Use case | Web, Email, FTP | Video, DNS, Game |

**PORTS (Layer 4 concept):**
- A port is a numbered endpoint on a device (like a door number in a building)
- Building (IP) = device; Door number (Port) = specific service
- Well-known ports: HTTP=80, HTTPS=443, FTP=21, SSH=22, SMTP=25, DNS=53, Telnet=23

### LAYER 3 — NETWORK LAYER ← VERY IMPORTANT
- Logical addressing (IP addresses) and routing
- Breaks data into **PACKETS**
- Protocols: IP (IPv4/IPv6), ICMP, ARP (sometimes), RIP, OSPF, BGP
- Analogy: GPS + road signs — figures out best route from city A to city B
- Devices: Router

**IP ADDRESSING:**
- IPv4: 32-bit address (e.g., 192.168.1.1)
- IPv6: 128-bit address (e.g., 2001:0db8:85a3::8a2e:0370:7334)
- Why IPv6? IPv4 has ~4 billion addresses; the world needs more

### LAYER 2 — DATA LINK LAYER
- Node-to-node delivery within same network (LAN)
- Uses MAC addresses (physical hardware address)
- Breaks data into **FRAMES**
- Analogy: Local delivery van within a neighborhood (knows house addresses)
- Protocols: Ethernet, Wi-Fi (802.11), PPP
- Devices: Switch, Bridge, NIC (Network Interface Card)

**MAC vs IP:**
- MAC: physical, permanent (like your birth certificate)
- IP: logical, can change (like your home address)

### LAYER 1 — PHYSICAL LAYER
- Actual transmission of raw bits (0s and 1s) over the medium
- Deals with voltages, signals, cables, connectors
- Analogy: The actual wires, fiber, radio waves
- Devices: Hub, Repeater, Cable, NIC hardware

## 2.2 TCP/IP MODEL (4 Layers — Practical Model)
OSI is theoretical; TCP/IP is what the Internet actually uses.

| OSI Layer | TCP/IP Layer |
| --- | --- |
| Application (7) <br> Presentation (6) <br> Session (5) | Application |
| Transport (4) | Transport |
| Network (3) | Internet |
| Data Link (2) <br> Physical (1) | Network Access (Link) |
