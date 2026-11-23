import fs from "node:fs/promises";
import sharp from "sharp";
const root = "public/images/";
const assets = [
  ["botanical-editorial.png", "botanical-editorial.webp", 1400],
  ["botanical-editorial.png", "botanical-editorial-small.webp", 768],
  ["botanical-art.png", "botanical.webp", 1000],
  ["skincare-art.png", "skincare.webp", 1200],
  ["botanical-editorial.png", "supplements.webp", 1000],
  ["skincare-art.png", "pharmacy.webp", 1000],
  ["capsules-reframed.png", "capsules-editorial.avif", 1254, 63],
  ["capsules-reframed.png", "capsules-editorial-small.avif", 768, 60],
  ["gaia.png", "gaia.webp", 600],
];
for (const [input, output, width, quality] of assets) {
  const resized = sharp("assets/source/" + input).resize({
    width,
    withoutEnlargement: true,
  });
  await (
    output.endsWith(".avif")
      ? resized.avif({ quality, effort: 6 })
      : resized.webp({ quality: 83 })
  ).toFile(root + output);
}
const svg = await fs.readFile(root + "logo.svg", "utf8");
const path = svg.match(/<path class="cls-2" d="([^"]+)"/)[1];
await fs.writeFile(
  root + "mark.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.5 27"><path fill="#e5b30f" d="${path}"/></svg>`,
);
await fs.writeFile(
  root + "favicon.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -3 35 35"><rect x="-4" y="-3" width="35" height="35" rx="7" fill="#40234f"/><path fill="#e5b30f" d="${path}"/></svg>`,
);
console.log(
  "Prepared " + assets.length + " optimized images and official brand mark.",
);
