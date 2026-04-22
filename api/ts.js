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

    res.setHeader("Content-Type", "video/mp2t");
    res.setHeader("Access-Control-Allow-Origin", "*");

    return response.body.pipe(res);

  } catch (e) {
    return res.status(500).send(e.message);
  }
}
