const setUppercaseTitle = (title: string, brand?: string): string => {
  let finalTitle
  if (typeof title !== 'undefined' && typeof brand !== 'undefined') {
    let smallBrand = brand.toLowerCase().replace(" ", "")
    let smallTitle = title.toLowerCase().replace(" ", "")
    let removedBrandName = smallTitle.replace(smallBrand, '') || title
    finalTitle = removedBrandName[0].toUpperCase() + removedBrandName.slice(1 - removedBrandName.length)
  }
  return finalTitle
}

export default setUppercaseTitle;