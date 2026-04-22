export default async function handler(req, res) {
  try {
    const { url } = req.query;

    if (!url) return res.status(400).send("Missing url");

    const response = await fetch(url);
    let text = await response.text();

    const baseUrl = new URL(url).origin;

    text = text.split("\n").map(line => {
      if (line.startsWith("#") || line.trim() === "") return line;
      if (line.startsWith("http")) return line;
      return baseUrl + line;
    }).join("\n");

    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
    res.setHeader("Access-Control-Allow-Origin", "*");

    return res.status(200).send(text);

  } catch (err) {
    return res.status(500).send(err.message);
  }
}
