export const config = {
  api: {
    bodyParser: true, // importante para que req.body esté disponible
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Only POST allowed' });
  }

  try {
    const response = await fetch('https://puzzle-rate-012n12.replit.app/save-animals-puzzles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const contentType = response.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');

    const data = isJson ? await response.json() : await response.text();

    res.status(response.status).send(data);
  } catch (error) {
    console.error('❌ Error en función proxy:', error);
    res.status(500).json({
      success: false,
      message: 'Proxy function failed',
      error: error.message,
    });
  }
}
