import http from 'http';

const PORT = 3000;
const ARTIFICIAL_LATENCY_RANGE = [500, 1500];

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'GET' && req.url === '/api/toss') {
    const sides = ["heads", "tails"];
    const rndIdx = Math.round(Math.random());
    const result = sides[rndIdx];

    const [min, max] = ARTIFICIAL_LATENCY_RANGE;
    const latency = Math.floor(Math.random() * (max - min + 1)) + min;

    setTimeout(() => {
      res.writeHead(200);
      res.end(JSON.stringify({ result }));
    }, latency);
    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
