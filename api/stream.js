const channels = {
  onru1: "https://on-tv.site/Blackcode/?action=stream&id=4128&cat=333",
  onru2: "https://on-tv.site/Blackcode/?action=stream&id=4129&cat=333",
  onru3: "https://on-tv.site/Blackcode/?action=stream&id=4130&cat=333"
};

export default async function handler(req, res) {
  try {
    const { channel } = req.query;

    const url = channels[channel];

    if (!url) {
      return res.status(404).send("Channel not found");
    }

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
