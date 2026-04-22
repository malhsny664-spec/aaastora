import channels from "../channels.json";

export default async function handler(req, res) {
  try {
    const { name } = req.query;

    const url = channels[name];
    const response = await fetch(url);
    let text = await response.text();

    text = text.split("\n").map(line => {

      if (line.startsWith("#")) return line;
      if (!line.trim()) return line;

      // استخراج الرابط المشفر
      const match = line.match(/url=(.*)/);

      if (match) {
        const encoded = match[1];

        // 👇 ده اللي هيظهر للمستخدم
        return `https://aaastora.vercel.app/api/ts?url=${encoded}`;
      }

      return line;

    }).join("\n");

    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
    return res.status(200).send(text);

  } catch (e) {
    return res.status(500).send(e.message);
  }
}
