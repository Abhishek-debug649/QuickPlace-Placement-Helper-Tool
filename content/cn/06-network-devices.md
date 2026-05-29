# Module 6: Network Devices

## 6.1 HUB (Layer 1)
- Broadcasts data to ALL connected devices
- Dumb device — no intelligence
- Analogy: A microphone in a room — everyone hears everything
- Creates a single collision domain (inefficient)

## 6.2 SWITCH (Layer 2)
- Forwards data only to the intended device using MAC address table
- Smart device — learns which MAC is on which port
- Analogy: A post office sorting room — each letter goes to correct slot
- Creates separate collision domains per port

## 6.3 ROUTER (Layer 3)
- Routes packets between different networks using IP addresses
- Connects LAN to WAN (your home network to the Internet)
- Analogy: A GPS + delivery driver — knows best path between cities
- Maintains a routing table

## 6.4 GATEWAY
- Connects two different network architectures/protocols
- Example: Your home router is a gateway between LAN and Internet
- Can operate at any layer

## 6.5 FIREWALL
- Monitors and filters incoming/outgoing traffic based on rules
- Analogy: Security guard at building entrance — checks IDs, blocks threats
- Types: Packet filter, Stateful inspection, Application-layer (proxy)
