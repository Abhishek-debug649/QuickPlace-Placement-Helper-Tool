# Module 1: Fundamentals of Networking

## 1.1 What is a Computer Network?
A computer network is a collection of interconnected devices (computers, phones, printers) that can communicate and share resources.

**ANALOGY:** Think of a network like a postal system.
- Each house = a device (computer/phone)
- Each house has an address = IP address
- Roads connecting houses = cables/wireless links
- Post offices = routers (decide which path a letter/packet takes)
- The letter itself = a data packet

### Key Terms:
- **Node**: Any device on a network (PC, phone, printer)
- **Link**: The physical or logical connection between nodes
- **Bandwidth**: Maximum data transfer rate (like the width of a road)
- **Latency**: Delay in data transmission (time for a letter to arrive)
- **Throughput**: Actual data successfully delivered per unit time

## 1.2 Types of Networks
**PAN (Personal Area Network):**
- Range: ~10 meters
- Example: Bluetooth between your phone and earbuds

**LAN (Local Area Network):**
- Range: Building or campus
- Example: Your home Wi-Fi, office network
- Analogy: Neighborhood where everyone knows each other

**MAN (Metropolitan Area Network):**
- Range: A city
- Example: Cable TV network of a city, city-wide Wi-Fi

**WAN (Wide Area Network):**
- Range: Countries/worldwide
- Example: The Internet, corporate VPNs
- Analogy: The national highway system connecting cities

## 1.3 Network Topologies
**BUS Topology:**
- All devices share a single cable (the "bus")
- Analogy: A single hallway; everyone opens their door to the same hall
- Pro: Simple, cheap | Con: Single cable failure = entire network down

**STAR Topology:**
- All devices connect to a central hub/switch
- Analogy: A wheel — hub at center, devices at the spokes
- Pro: Easy to manage, one device failure doesn't affect others
- Con: Hub failure = whole network down

**RING Topology:**
- Devices connected in a closed loop
- Analogy: Passing a note around a circular table
- Pro: Predictable performance | Con: One break = whole ring fails

**MESH Topology:**
- Every device connects to every other device
- Analogy: A spider web — multiple paths between any two points
- Pro: Highly fault-tolerant | Con: Very expensive, complex wiring

**HYBRID Topology:**
- Combination of above (most real-world networks are hybrid)
- Example: Star topology within each floor, bus connecting floors
