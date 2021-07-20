export default function getEshopUrl(product_brand: string) {
  if (product_brand) {
    let brand = product_brand.toLowerCase().replace(' ', '_')
    return `https://www.zoohit.cz/shop/kocky/konzervy/${encodeURIComponent(brand)}`
  }
}