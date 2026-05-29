# Module 4: Important Protocols

## 4.1 DNS — Domain Name System
**WHAT:** Translates domain names to IP addresses
**ANALOGY:** Phone book — you know a person's name (google.com) but need their phone number (IP address) to actually call them

### HOW DNS WORKS (step by step):
1. You type "www.google.com" in your browser
2. Browser checks its own cache first
3. If not found, asks your OS (which checks `/etc/hosts` file)
4. OS asks Recursive Resolver (your ISP's DNS server)
5. Resolver asks Root Name Server (".")
6. Root says "ask the .com TLD server"
7. TLD (.com) server says "ask google.com's authoritative server"
8. Authoritative server returns IP: `142.250.x.x`
9. Your browser connects to that IP

### DNS RECORD TYPES:
- **A**: Domain → IPv4 address (most common)
- **AAAA**: Domain → IPv6 address
- **CNAME**: Alias (www → mysite.com)
- **MX**: Mail server for a domain
- **NS**: Name server for a domain
- **TXT**: Text info (used for email verification, SPF)
- **PTR**: Reverse DNS (IP → Domain)

## 4.2 DHCP — Dynamic Host Configuration Protocol
**WHAT:** Automatically assigns IP addresses to devices on a network
**ANALOGY:** Hotel receptionist who assigns you a room number when you check in, and reclaims it when you check out

### DORA Process:
- **D - Discover**: Client broadcasts "Anyone have an IP for me?"
- **O - Offer**: DHCP Server responds "Here's 192.168.1.50 for you"
- **R - Request**: Client says "Yes, I'll take 192.168.1.50"
- **A - Acknowledge**: Server says "Confirmed! It's yours for 24 hours (lease)"

## 4.3 HTTP / HTTPS
**HTTP (HyperText Transfer Protocol):**
- Application layer protocol for web communication
- Client-server model (browser = client, web server = server)
- Stateless: each request is independent

**HTTP METHODS:**
- **GET**: Retrieve data (read a webpage)
- **POST**: Send data to server (submit a form)
- **PUT**: Update/replace data (update a record)
- **DELETE**: Delete data (remove a record)
- **PATCH**: Partial update
- **HEAD**: Like GET but no body (just headers)

**HTTP STATUS CODES:**
- `1xx`: Informational (100 Continue)
- `2xx`: Success (200 OK, 201 Created, 204 No Content)
- `3xx`: Redirection (301 Moved Permanently, 302 Found)
- `4xx`: Client Error (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found)
- `5xx`: Server Error (500 Internal Server Error, 503 Service Unavailable)

**HTTPS:** HTTP + SSL/TLS encryption
- Data is encrypted between browser and server
- Uses certificates to verify server identity
- Port 443 (HTTP uses port 80)
- **ANALOGY:** HTTP = sending a postcard (anyone can read it); HTTPS = sending a sealed envelope (only recipient can read)

## 4.4 ARP — Address Resolution Protocol
**WHAT:** Maps IP address to MAC address within a local network
**WHY:** Routers/switches need MAC address to actually deliver a frame, but we only know the IP.

**HOW:**
1. Device A wants to reach 192.168.1.5 but doesn't know its MAC
2. A broadcasts "Who has 192.168.1.5? Tell 192.168.1.2!"
3. Device with .1.5 responds with its MAC address
4. Device A caches this (ARP Cache/Table) for future use

## 4.5 ICMP — Internet Control Message Protocol
**WHAT:** Used for error reporting and diagnostics (not for data transfer)
**Tools that use ICMP:**
- **PING**: Tests connectivity (sends ICMP Echo Request, gets Echo Reply)
- **TRACEROUTE**: Shows the path packets take to reach destination

## 4.6 NAT — Network Address Translation
**WHAT:** Translates private IP addresses to a public IP
**WHY:** IPv4 shortage — millions of devices share one public IP
**ANALOGY:** A company has one main phone number (public IP), but many employees (private IPs). Receptionist (NAT router) routes calls.

**Types:**
- **Static NAT**: One private IP ↔ one public IP (1:1)
- **Dynamic NAT**: Pool of public IPs shared among private devices
- **PAT/NAPT**: Multiple private IPs share ONE public IP using different ports (most common — your home router does this)
