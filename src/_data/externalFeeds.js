const EleventyFetch = require("@11ty/eleventy-fetch");
const { XMLParser } = require("fast-xml-parser");

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });

const feeds = [
  { url: "https://textlab.dev/feed.xml", source: "Text Lab", sourceUrl: "https://textlab.dev" },
  { url: "https://variablefonts.dev/feed.xml", source: "Variable Fonts", sourceUrl: "https://variablefonts.dev" },
  { url: "https://texteffects.dev/feed.xml", source: "Text Effects", sourceUrl: "https://texteffects.dev" },
];

async function fetchFeed({ url, source, sourceUrl }) {
  try {
    const xml = await EleventyFetch(url, {
      duration: "6h",
      type: "text",
    });
    const parsed = parser.parse(xml);
    const channel = parsed?.rss?.channel;
    if (!channel) return [];

    const items = Array.isArray(channel.item) ? channel.item : channel.item ? [channel.item] : [];

    return items.map((item) => ({
      title: item.title || "",
      url: item.link || item.guid || "",
      date: item.pubDate || item["dc:date"] || "",
      summary: item.description || item["content:encoded"] || "",
      source,
      sourceUrl,
      external: true,
    }));
  } catch (e) {
    console.warn(`[externalFeeds] Failed to fetch ${url}:`, e.message);
    return [];
  }
}

module.exports = async function () {
  const results = await Promise.all(feeds.map(fetchFeed));
  const all = results.flat();

  all.sort((a, b) => {
    const da = a.date ? new Date(a.date) : 0;
    const db = b.date ? new Date(b.date) : 0;
    return db - da;
  });

  return all;
};
