import channels from "../channels.json";

export default async function handler(req, res) {
  try {
    const { name } = req.query;

    const url = channels[name];

    if (!url) {
      return res.status(404).send("Channel not found");
    }

    const response = await fetch(url);

    if (!response.ok) {
      return res.status(500).send("Source error");
    }

    let text = await response.text();

    // 👇 أهم نقطة هنا:
    // لا نعمل fake URLs
    // نترك الروابط الأصلية كما هي (direct streaming)

    const base = "https://www.manar2.shop";

    text = text.split("\n").map(line => {

      if (line.startsWith("#")) return line;

      if (!line.trim()) return line;

      // نمرر الرابط كما هو (بدون كسر)
      return line.startsWith("http")
        ? line
        : base + line;

    }).join("\n");

    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
    res.setHeader("Access-Control-Allow-Origin", "*");

    return res.status(200).send(text);

  } catch (e) {
    return res.status(500).send(e.message);
  }
}
