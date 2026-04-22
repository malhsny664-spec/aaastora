export default async function handler(req, res) {
  try {
    const url =
      "https://on-tv.site/Blackcode/?action=stream&id=4128&cat=333";

    const response = await fetch(url);

    if (!response.ok) {
      return res.status(500).send("Stream error");
    }

    res.setHeader("Content-Type", "video/mp2t");
    res.setHeader("Access-Control-Allow-Origin", "*");

    return response.body.pipe(res);

  } catch (e) {
    return res.status(500).send(e.message);
  }
}
