export default async function handler(req, res) {
  try {
    const url =
      "https://on-tv.site/Blackcode/?action=stream&id=4128&cat=333";

    const response = await fetch(url);

    if (!response.ok) {
      return res.status(500).send("stream error");
    }

    res.setHeader("Content-Type", "video/mp2t");
    res.setHeader("Access-Control-Allow-Origin", "*");

    response.body.pipe(res);

  } catch (e) {
    res.status(500).send(e.message);
  }
}
