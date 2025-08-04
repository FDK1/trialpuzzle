export default async function handler(req, res) {
  const response = await fetch('https://puzzle-rate-012n12.replit.app/save-animals-puzzles', {
    method: req.method,
    headers: {
      'Content-Type': 'application/json',
      ...req.headers,
    },
    body: req.method === 'GET' ? null : JSON.stringify(req.body),
  });

  const data = await response.json();
  res.status(response.status).json(data);
}
