export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
 
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { parameter, lang = "es" } = req.query;

    if (!/^\d+$/.test(parameter || "")) {
      return res.status(400).json({ error: "Invalid parameter" });
    }

    const langSafe = /^[a-z]{2}(?:-[A-Za-z]{2})?$/.test(lang) ? lang : "es";

    const BASE = "https://new-databases-012n12.replit.app/";
    const url = new URL(`/api/puzzles_es/by_puzzle/${parameter}`, BASE);
    url.searchParams.set("includeAllKeys", "true");
    url.searchParams.set("lang", langSafe);

    const response = await fetch(url.toString(), { headers: { "Accept": "application/json" } });
    if (!response.ok) {
      return res.status(response.status).json({ error: "Upstream fetch failed" });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error("❌ Proxy error puzzlesNumber:", err);
    return res.status(500).json({ error: "Failed to fetch puzzles number" });
  }
}
