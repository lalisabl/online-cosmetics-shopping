const http = require('http'); // Import the built-in 'http' module

// Create an HTTP server that responds with "Hello, World!" to all requests
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World!\n');
});
// Listen on port 3000
const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
