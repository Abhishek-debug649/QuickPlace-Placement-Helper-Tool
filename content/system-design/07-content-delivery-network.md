# Module 7: Content Delivery Network (CDN)

## 7.1 What is a CDN?
A geographically distributed network of servers that caches static content (images, videos, JS, CSS) close to users.

> **ANALOGY:** Regional distribution centers for an e-commerce company. Instead of shipping everything from one central warehouse (Mumbai), you have local centers in Delhi, Bangalore, Kolkata. Orders reach customers faster because they're shipped from nearby.

- **WITHOUT CDN:** User in New York requests an image from your server in Mumbai. → High latency (distance = delay)
- **WITH CDN:** CDN serves the image from a New York edge server. → Low latency (nearby)

## HOW IT WORKS:
1. User requests `image.jpg`
2. DNS routes to nearest CDN edge server
3. CDN checks its cache: **HIT** → serve immediately
4. **MISS** → CDN fetches from origin server, caches it, serves to user
5. Future requests for same file → served from CDN (no origin load)

**USE CDN FOR:** Images, videos, CSS, JavaScript, HTML pages, fonts, downloads
**DON'T USE FOR:** Dynamic/personalized content (unless using Edge Computing)

*Examples: Cloudflare, AWS CloudFront, Akamai, Fastly*
