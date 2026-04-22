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

    const proxyBase = "https%3A%2F%2Fwww.manar2.shop%2Fx1%2F";

    let seq = 638600;

    text = text.split("\n").map(line => {

      if (line.startsWith("#")) return line;

      if (!line.trim()) return line;

      seq++;

      // تحويل أي رابط إلى شكل encoded مثل طلبك
      return `${proxyBase}${seq}.js`;

    }).join("\n");

    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
    res.setHeader("Access-Control-Allow-Origin", "*");

    return res.status(200).send(text);

  } catch (e) {
    return res.status(500).send(e.message);
  }
}
