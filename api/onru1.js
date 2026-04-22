export default async function handler(req, res) {
  try {
    const url = "https://on-tv.site/Blackcode/?action=stream&id=4128&cat=333";

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    let text = await response.text();

    const baseUrl = "https://on-tv.site";

    // إعادة كتابة كل الروابط + إخفاء الأصل
    text = text.split("\n").map(line => {

      // تجاهل التعليقات
      if (line.startsWith("#")) {
        // نمنع إظهار KEY الحقيقي (اختياري)
        if (line.includes("URI=")) {
          return line.replace(/URI=".*?"/, `URI="https://aaastora.vercel.app/key.js"`);
        }
        return line;
      }

      if (!line.trim()) return line;

      // أي رابط خارجي نحوله عبر البروكسي
      if (line.includes("manar") || line.includes("http")) {
        return "https://aaastora.vercel.app/proxy?u=" + encodeURIComponent(line);
      }

      return line;

    }).join("\n");

    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
    res.setHeader("Access-Control-Allow-Origin", "*");

    return res.status(200).send(text);

  } catch (err) {
    return res.status(500).send(err.message);
  }
}
