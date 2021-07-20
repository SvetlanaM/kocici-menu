import { APIRoute } from 'next-s3-upload';
import setFilename from '../../utils/setFilename';
export default APIRoute.configure({
  key(req, filename) {
    return `cats/${setFilename(filename)}`;
  },
});
