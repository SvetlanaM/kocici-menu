import { APP_NAME } from './constants';
import setUppercaseTitle from './setUppercaseTitle';

const getTitle = (title: string) => {
  let base_title = APP_NAME.toUpperCase();
  if (!process.env.NEXT_PUBLIC_CAT_APP_TESTING_API_ENDPOINT) {
    title += ' | TEST';
  } else {
    title += ` | ${base_title}`;
  }
  return title;
};

export default getTitle;
