import channels from "../channels.json";

export default async function handler(req, res) {
  try {
    const { channel } = req.query;

    const url = channels[channel];

    if (!url) {
      return res.status(404).send("Channel not found");
    }

    const response = await fetch(url);
    let text = await response.text();

    const base = "https://aaastora.vercel.app";

    // تحويل كل شيء إلى ts وهمي نظيف
    text = text.split("\n").map(line => {

      if (line.startsWith("#")) {
        // إخفاء KEY الحقيقي (اختياري)
        if (line.includes("URI=")) {
          return line.replace(/URI=".*?"/, `URI="${base}/key.js"`);
        }
        return line;
      }

      if (!line.trim()) return line;

      // أي segment يتحول إلى ts محمي
      return base + "/" + Math.floor(Math.random() * 999999) + ".ts";

    }).join("\n");

    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
    res.setHeader("Access-Control-Allow-Origin", "*");

    return res.status(200).send(text);

  } catch (err) {
    return res.status(500).send(err.message);
  }
}
