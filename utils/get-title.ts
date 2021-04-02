import { APP_NAME } from './constants';

const getTitle = (title: string) => {
  let base_title = APP_NAME;
  if (process.env.NEXT_PUBLIC_CAT_APP_TESTING_API_ENDPOINT) {
    title += ' | TEST';
  } else {
    title += ` | ${base_title}`;
  }
  return title
};

export default getTitle;
