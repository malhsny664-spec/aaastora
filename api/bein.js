import channels from "../channels.json";

export default async function handler(req, res) {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).send("Missing channel name");
    }

    const url = channels[name];

    if (!url) {
      return res.status(404).send("Channel not found");
    }

    const response = await fetch(url);

    if (!response.ok) {
      return res.status(500).send("Failed to fetch source");
    }

    let text = await response.text();

    // مهم: لا نعمل fake ts
    // فقط نبدل الروابط الداخلية إلى proxy حقيقي

    const base = "https://aaastora.vercel.app/api/ts";

    text = text.split("\n").map(line => {
      if (line.startsWith("#") || !line.trim()) return line;

      // نحول أي segment إلى stream حقيقي
      return base;
    }).join("\n");

    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
    res.setHeader("Access-Control-Allow-Origin", "*");

    return res.status(200).send(text);

  } catch (e) {
    return res.status(500).send(e.message);
  }
}
