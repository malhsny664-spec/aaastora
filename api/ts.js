export default async function handler(req, res) {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).send("Missing url");
    }

    const target = `https://on-tv.site/Blackcode/index.php?action=stream&url=${url}`;

    const response = await fetch(target, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Referer": "https://on-tv.site/"
      }
    });

    if (!response.ok) {
      return res.status(500).send("Stream error");
    }

    const buffer = await response.arrayBuffer();

    res.setHeader("Content-Type", "video/mp2t");
    res.setHeader("Access-Control-Allow-Origin", "*");

    return res.status(200).send(Buffer.from(buffer));

  } catch (e) {
    return res.status(500).send(e.message);
  }
}
