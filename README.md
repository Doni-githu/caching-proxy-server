# 🚀 Caching Proxy Server

A lightweight CLI-based HTTP caching proxy server built with **Node.js**, **Express**, and **Redis**. The proxy forwards incoming requests to an origin server, caches successful responses in Redis, and serves cached data for subsequent requests to improve response time and reduce unnecessary network traffic.And this project from [roadmap.sh](https://roadmap.sh/projects/caching-server)

---

## ✨ Features

- Forward HTTP requests to any origin server
- Cache responses using Redis
- Return cached responses when available
- Configurable cache expiration (15 minutes)
- Cache status via `X-Cache` response header
- Clear all cached data from the command line
- Simple CLI interface using Commander

---

## 🛠 Tech Stack

- Node.js
- Express.js
- Redis
- ioredis
- Axios
- Commander

---

## 📂 Project Structure

```
.
├── src
│   ├── index.js          # CLI entry point
│   ├── server.js         # Express proxy server
│   ├── redis.js          # Redis configuration
│   └── services
│       └── axios.js
├── api.http
├── package.json
└── README.md
```

---

## 📦 Installation

Clone the repository

```bash
git clone https://github.com/Doni-githu/caching-proxy-server.git

cd caching-proxy-server
```

Install dependencies

```bash
npm install
```

Make sure Redis is running locally.

Default Redis connection:

```
localhost:6379
```

---

## 🚀 Usage

Start the proxy server

```bash
proxy --port 3000 --origin https://dummyjson.com
```

or

```bash
node src/index.js --port 3000 --origin https://dummyjson.com
```

The proxy server will start on

```
http://localhost:3000
```

---

## 📖 Example

Request

```
GET http://localhost:3000/products
```

The proxy forwards the request to

```
https://dummyjson.com/products
```

### First Request

```
X-Cache: MISS
```

The response is fetched from the origin server and stored in Redis.

### Second Request

```
X-Cache: HIT
```

The cached response is returned directly from Redis.

---

## 🧹 Clear Cache

Clear all cached responses

```bash
proxy clear
```

or

```bash
node src/index.js clear
```

Output

```
Cache cleaned
```

---

## ⏱ Cache Expiration

Responses are cached for **15 minutes**.

```javascript
redis.setex(url, 60 * 15, JSON.stringify(data))
```

After expiration, the next request fetches fresh data from the origin server.

---

## 📡 Response Headers

| Header | Meaning |
|---------|---------|
| X-Cache: HIT | Response served from Redis cache |
| X-Cache: MISS | Response fetched from the origin server |

---

## 💻 Example Commands

Start proxy

```bash
proxy --port 3000 --origin https://dummyjson.com
```

Fetch data

```http
GET http://localhost:3000/products
```

Clear cache

```bash
proxy clear
```

---

## 🎯 Learning Objectives

This project demonstrates:

- Reverse Proxy implementation
- Redis caching
- Express middleware
- HTTP request forwarding
- CLI application development
- REST API communication
- Performance optimization through caching

---