const setUppercaseTitle = (title: string, brand?: string): string => {
  let finalTitle
  if (typeof title !== 'undefined' && typeof brand !== 'undefined') {
    
    finalTitle = title[0].toUpperCase() + title.slice(1 - title.length)
  } else {
    finalTitle = title[0].toUpperCase() + title.slice(1 - title.length)
  }
  return finalTitle
}

export default setUppercaseTitle;