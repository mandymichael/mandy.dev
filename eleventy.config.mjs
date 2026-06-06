import { DateTime } from "luxon";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

const markdownLib = {
  render(content) {
    return unified()
      .use(remarkParse)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeHighlight, { detect: true, ignoreMissing: true })
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
