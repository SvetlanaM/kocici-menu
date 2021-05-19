const setUppercaseTitle = (title: string): string => {
  if (typeof title !== 'undefined') {
    title[0].toUpperCase() + title.slice(1 - title.length)
  }
  return title
}

export default setUppercaseTitle;