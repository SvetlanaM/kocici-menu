const setUppercaseTitle = (title: string): string => {
  let finalTitle;
  if (typeof title !== 'undefined') {
    finalTitle = title[0].toUpperCase() + title.slice(1);
  }
  return finalTitle;
};

export default setUppercaseTitle;
