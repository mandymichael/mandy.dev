import { DateTime } from "luxon";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeExternalLinks from "rehype-external-links";
import rehypeStringify from "rehype-stringify";

const markdownLib = {
  render(content) {
    return unified()
      .use(remarkParse)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeHighlight, { detect: true, ignoreMissing: true })
      .use(rehypeExternalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] })
      .use(rehypeStringify, { allowDangerousHtml: true })
      .processSync(content)
      .toString();
  },
};

export default function (eleventyConfig) {
  eleventyConfig.setLibrary("md", markdownLib);

  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/fonts");

  const toDateTime = (d) => {
    if (!d) return null;
    if (d instanceof Date) return DateTime.fromJSDate(d, { zone: "utc" });
    const iso = DateTime.fromISO(String(d));
    if (iso.isValid) return iso;
    const rfc = DateTime.fromRFC2822(String(d));
    if (rfc.isValid) return rfc;
    return null;
  };

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    const dt = toDateTime(dateObj);
    return dt ? dt.toFormat("dd LLL yyyy") : "";
  });

  eleventyConfig.addFilter("dateIso", (dateObj) => {
    const dt = toDateTime(dateObj);
    return dt ? dt.toISO() : "";
  });

  eleventyConfig.addFilter("dateFromString", (dateStr) => {
    if (!dateStr) return "";
    const rfc = DateTime.fromRFC2822(dateStr);
    if (rfc.isValid) return rfc.toFormat("dd LLL yyyy");
    const iso = DateTime.fromISO(dateStr);
    if (iso.isValid) return iso.toFormat("dd LLL yyyy");
    return dateStr;
  });

  const placeholderCards = [
    "/assets/images/placeholder-card.svg",
    "/assets/images/placeholder-card-2.svg",
    "/assets/images/placeholder-card-3.svg",
    "/assets/images/placeholder-card-4.svg",
    "/assets/images/placeholder-card-5.svg",
    "/assets/images/placeholder-card-6.svg",
    "/assets/images/placeholder-card-7.svg",
    "/assets/images/placeholder-card-8.svg",
    "/assets/images/placeholder-card-9.svg",
    "/assets/images/placeholder-card-10.svg",
    "/assets/images/placeholder-card-11.svg",
  ];

  const hashSeed = (seed) => {
    const str = String(seed || "");
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
    }
    return hash;
  };

  // Assign placeholders to a list of items, ensuring no two adjacent entries share the same image.
  // Items can be post objects (with .url) or external feed objects (with .url).
  // Returns an array of image paths in the same order as the input list.
  eleventyConfig.addFilter("assignPlaceholders", (items) => {
    const results = [];
    for (let i = 0; i < items.length; i++) {
      const seed = items[i].url || String(i);
      let idx = hashSeed(seed) % placeholderCards.length;
      if (i > 0) {
        const prevIdx = placeholderCards.indexOf(results[i - 1]);
        if (idx === prevIdx) {
          idx = (idx + 1) % placeholderCards.length;
        }
      }
      results.push(placeholderCards[idx]);
    }
    return results;
  });

  eleventyConfig.addFilter("limit", (arr, limit) => arr.slice(0, limit));
  eleventyConfig.addFilter("striptags", (str) => String(str).replace(/<[^>]*>/g, ""));
  eleventyConfig.addFilter("truncate", (str, len) => {
    const s = String(str);
    return s.length > len ? s.slice(0, len).trimEnd() + "…" : s;
  });

  const notDraft = (p) => !p.data.tags || !p.data.tags.includes("draft");

  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("src/posts/**/*.md").filter(notDraft).sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addCollection("articles", (api) =>
    api
      .getFilteredByGlob("src/posts/**/*.md")
      .filter(notDraft)
      .filter((p) => p.data.tags && p.data.tags.includes("article"))
      .sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addCollection("featured", (api) =>
    api
      .getFilteredByGlob("src/posts/**/*.md")
      .filter(notDraft)
      .filter((p) => p.data.tags && p.data.tags.includes("featured"))
      .sort((a, b) => b.date - a.date)
      .slice(0, 1)
  );

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
