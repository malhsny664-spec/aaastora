import channels from "../channels.json";

export default async function handler(req, res) {
  try {
    const { name } = req.query;

    const url = channels[name];

    if (!url) return res.status(404).send("Channel not found");

    const response = await fetch(url);
    let text = await response.text();

    let index = 20000;

    text = text.split("\n").map(line => {
      if (line.startsWith("#")) return line;
      if (!line.trim()) return line;

      index++;
      return `https://aaastora.vercel.app/ts?file=${index}.ts`;
    }).join("\n");

    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
    res.setHeader("Access-Control-Allow-Origin", "*");

    return res.status(200).send(text);

  } catch (e) {
    return res.status(500).send(e.message);
  }
}
