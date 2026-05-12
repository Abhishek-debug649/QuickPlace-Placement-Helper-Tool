# DNS — Domain Name System

**DNS** is the "phone book" of the internet — it translates human-readable domain names (e.g., `google.com`) into machine-readable IP addresses (e.g., `142.250.195.46`).

## Why DNS?

Humans remember names, computers use IP addresses. DNS bridges the gap.

```
User types: www.example.com
DNS resolves: 93.184.216.34
Browser connects to: 93.184.216.34:80
```

## DNS Hierarchy

```
                    . (Root)
                   /|\
                  / | \
               .com .org .net ...
              /
           google.com
          /
       www.google.com
```

| Level | Example | Role |
|---|---|---|
| **Root DNS** | 13 root servers worldwide | Knows TLD servers |
| **TLD DNS** | `.com`, `.org`, `.in` servers | Knows authoritative servers |
| **Authoritative DNS** | Google's DNS server | Knows actual IP |
| **Recursive Resolver** | ISP's DNS | Does the work for clients |

## DNS Resolution Process

```
Browser → Recursive Resolver → Root DNS → TLD DNS → Authoritative DNS
                    ↓
              Cached response returned
```

1. **Browser cache** checked first
2. **OS cache** (hosts file) checked
3. **Recursive resolver** (your ISP's DNS) queried
4. Resolver queries **root** → **TLD** → **authoritative** servers
5. IP returned, **cached with TTL**

## DNS Record Types

| Type | Purpose | Example |
|---|---|---|
| **A** | Maps domain to IPv4 | `google.com → 142.250.195.46` |
| **AAAA** | Maps domain to IPv6 | `google.com → 2607:f8b0:...` |
| **CNAME** | Alias for another domain | `www.example.com → example.com` |
| **MX** | Mail exchange server | `example.com → mail.example.com` |
| **NS** | Name server record | Specifies authoritative DNS server |
| **TXT** | Text data (SPF, verification) | `"v=spf1 include:..."` |
| **PTR** | Reverse DNS (IP → domain) | Used in email spam filtering |

## TTL (Time to Live)

Each DNS record has a TTL — how long (in seconds) a resolver should cache the record.

```
Short TTL (300s) → More DNS queries, faster propagation
Long TTL (86400s) → Fewer queries, slower to update
```

## DNS Security

- **DNS Spoofing/Poisoning** — Attacker inserts malicious records
- **DNSSEC** — Cryptographically signs DNS records to prevent forgery
- **DoH (DNS over HTTPS)** — Encrypts DNS queries to prevent eavesdropping

## Interview Tip

> "DNS uses **UDP** (port 53) for regular queries because speed matters more than reliability. It switches to **TCP** for large responses (>512 bytes) like zone transfers."
