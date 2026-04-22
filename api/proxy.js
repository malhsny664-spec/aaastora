export default async function handler(req, res) {
  try {
    const { u } = req.query;

    const response = await fetch(u);
    const buffer = await response.arrayBuffer();

    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Access-Control-Allow-Origin", "*");

    return res.status(200).send(Buffer.from(buffer));

  } catch (err) {
    return res.status(500).send("error");
  }
}
