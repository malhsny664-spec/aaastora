import channels from "../channels.json";

export default async function handler(req, res) {
  try {
    const { name } = req.query;

    const url = channels[name];

    if (!url) {
      return res.status(404).send("Channel not found");
    }

    const response = await fetch(url);
    let text = await response.text();

    const host = "https://on-tv.site";

    text = text.split("\n").map(line => {

      if (line.startsWith("#")) return line;
      if (!line.trim()) return line;

      // تحويل الرابط النسبي لكامل
      if (line.startsWith("/")) {
        line = host + line;
      }

      // استخراج الرابط المشفر
      const match = line.match(/url=(.*)/);

      if (match) {
        const encoded = match[1];

        return `https://aaastora.vercel.app/api/ts?url=${encoded}`;
      }

      return line;

    }).join("\n");

    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "no-store");

    return res.status(200).send(text);

  } catch (e) {
    return res.status(500).send(e.message);
  }
}
