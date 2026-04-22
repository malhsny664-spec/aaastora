export default async function handler(req, res) {
  const url = "https://on-tv.site/Blackcode/?action=stream&id=4128&cat=333";

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
}
