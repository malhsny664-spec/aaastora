export default async function handler(req, res) {
  try {
    const { id } = req.query;

    // هنا تربط الـ ID بالمصدر الحقيقي
    const url =
      "https://on-tv.site/Blackcode/index.php?action=stream&id=" +
      id +
      "&cat=333";

    const response = await fetch(url);
    const buffer = await response.arrayBuffer();

    // مهم للـ IPTV
    res.setHeader("Content-Type", "video/mp2t");
    res.setHeader("Access-Control-Allow-Origin", "*");

    return res.status(200).send(Buffer.from(buffer));

  } catch (err) {
    return res.status(500).send("error");
  }
}
