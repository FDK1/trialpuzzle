export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type } = req.query;

  if (!type) {
    return res.status(400).json({ error: 'Tipo de puzzle no especificado' });
  }

  try {
    const backendUrl = `https://new-databases-012n12.replit.app/get-puzzles/${type}`;
    const response = await fetch(backendUrl);

    if (!response.ok) {
      const err = await response.text();
      return res.status(response.status).json({ error: err });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("❌ Error al obtener puzzles:", error);
    return res.status(500).json({ error: "Failed to fetch puzzles from backend" });
  }
}
