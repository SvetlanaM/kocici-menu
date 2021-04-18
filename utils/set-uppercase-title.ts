const setUppercaseTitle = (title: string): string => title[0].toUpperCase() + title.slice(1 - title.length)

export default setUppercaseTitle;