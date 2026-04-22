export default async function handler(req, res) {
  try {
    const { file } = req.query;

    if (!file) return res.status(400).send("missing file");

    // نفس المصدر الحقيقي
    const url =
      "https://on-tv.site/Blackcode/index.php?action=stream&id=4128&cat=333";

    const response = await fetch(url);
    const buffer = await response.arrayBuffer();

    res.setHeader("Content-Type", "video/mp2t");
    res.setHeader("Access-Control-Allow-Origin", "*");

    return res.status(200).send(Buffer.from(buffer));

  } catch (e) {
    return res.status(500).send("error");
  }
}
