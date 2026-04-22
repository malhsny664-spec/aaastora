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

    // 👇 ده السيرفر الأساسي
    const host = "https://on-tv.site";

    text = text.split("\n").map(line => {

      // سيب التعليقات زي ما هي
      if (line.startsWith("#")) return line;

      if (!line.trim()) return line;

      // 👇 أهم نقطة: نحول الرابط النسبي لكامل
      if (line.startsWith("/")) {
        return host + line;
      }

      return line;

    }).join("\n");

    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
    res.setHeader("Access-Control-Allow-Origin", "*");

    return res.status(200).send(text);

  } catch (e) {
    return res.status(500).send(e.message);
  }
}
