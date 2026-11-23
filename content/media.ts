/** Shared source selection for the capsule photograph wherever it appears. */
export function photoSource(src: string) {
  if (src !== "/images/capsules.webp") return { src };
  return {
    src: "/images/capsules-editorial.avif",
    srcSet:
      "/images/capsules-editorial-small.avif 768w, /images/capsules-editorial.avif 1254w",
    sizes:
      "(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) 45vw, 640px",
  };
}
