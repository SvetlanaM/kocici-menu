export default function getEshopUrl(product_brand: string): string {
  if (product_brand) {
    const brand = product_brand.toLowerCase().replace(' ', '_');
    return `https://www.zoohit.cz/shop/kocky/konzervy/${encodeURIComponent(
      brand
    )}`;
  }
}
