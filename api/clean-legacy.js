export default async function handler(req, res) {
  // Habilita CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Responde a preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch('https://puzzle-rate-012n12.replit.app/admin/clean-all-legacy');
    const text = await response.text(); // Usamos .text() si no devuelve JSON

    res.status(200).send(text);
  } catch (error) {
    console.error('❌ Proxy error (clean-all-legacy):', error);
    res.status(500).json({ error: 'Failed to clean legacy data' });
  }
}
