# Caching Proxy Server

A simple HTTP caching proxy server built with Node.js, Express, and Redis.

The server sits between a client and an API. When a request comes in, it first checks whether the response is already stored in Redis. If it is, the cached response is returned immediately. Otherwise, the request is forwarded to the origin server, the response is cached, and then sent back to the client.

This project was built to better understand how proxy servers and caching work in backend applications.

## Features

- Forward requests to any origin server
- Cache responses with Redis
- Return cached responses for repeated requests
- Show whether a response came from the cache using the `X-Cache` header
- Clear all cached data from the command line
- Simple CLI for starting the server

## Technologies

- Node.js
- Express.js
- Redis
- ioredis
- Axios
- Commander

## Getting Started

Clone the repository.

```bash
git clone https://github.com/Doni-githu/caching-proxy-server.git

cd caching-proxy-server
```

Install the dependencies.

```bash
npm install
```

Before running the project, make sure Redis is installed and running on your machine.

## Running the Server

Start the proxy server by providing a port and the origin server.

```bash
proxy --port 3000 --origin https://dummyjson.com
```

Or run it directly with Node.js.

```bash
node src/index.js --port 3000 --origin https://dummyjson.com
```

The proxy server will start on:

```
http://localhost:3000
```

## Example

Suppose the origin server is:

```
https://dummyjson.com
```

Making this request:

```http
GET http://localhost:3000/products
```

will forward the request to:

```http
GET https://dummyjson.com/products
```

### First Request

The response comes from the origin server and is stored in Redis.

```
X-Cache: MISS
```

### Second Request

The same response is returned directly from Redis.

```
X-Cache: HIT
```

This avoids sending another request to the origin server and makes the response faster.

## Clearing the Cache

To remove all cached responses, run:

```bash
proxy clear
```

or

```bash
node src/index.js clear
```

## Cache Duration

Responses are stored in Redis for **15 minutes**. Once they expire, the next request fetches fresh data from the origin server and stores it again.

## Project Structure

```
src/
├── index.js          # CLI entry point
├── server.js         # Express proxy server
├── redis.js          # Redis configuration
└── services/
    └── axios.js      # Handles requests to the origin server
```

## What I Learned

While building this project, I learned how to:

- Build a reverse proxy server with Express
- Store and retrieve cached responses using Redis
- Create a command-line application with Commander
- Forward HTTP requests with Axios
- Improve application performance by reducing unnecessary API calls

## Possible Improvements

There are several features that could be added in the future:

- Support more HTTP methods such as POST, PUT, and DELETE
- Allow the cache expiration time to be configured
- Add request logging
- Docker support
- Unit and integration tests
- Rewrite the project in TypeScript
- Better error handling

## License

This project is available under the MIT License.
