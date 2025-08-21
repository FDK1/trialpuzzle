export default async function handler(req, res) {
  // Habilita CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { puzzleId } = req.query; // llega como /api/proxy?puzzleId=123
    if (!puzzleId) {
      return res.status(400).json({ error: 'Missing puzzleId' });
    }

    const url = `https://new-databases-012n12.replit.app/api/how/stats/${encodeURIComponent(puzzleId)}`;

    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error('❌ Proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch puzzle stats' });
  }
}
