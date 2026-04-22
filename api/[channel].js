import channels from "../channels.json";

export default async function handler(req, res) {
  try {
    const { channel } = req.query;

    const url = channels[channel];

    if (!url) return res.status(404).send("Not found");

    const response = await fetch(url);
    let text = await response.text();

    const base = "https://aaastora.vercel.app";

    let index = 27970;

    text = text.split("\n").map(line => {

      if (line.startsWith("#")) {
        return line;
      }

      if (!line.trim()) return line;

      index++;

      // تحويل أي segment إلى TS وهمي
      return `media_${channel}_${index}.ts`;

    }).join("\n");

    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
    res.setHeader("Access-Control-Allow-Origin", "*");

    return res.status(200).send(text);

  } catch (e) {
    return res.status(500).send(e.message);
  }
}
