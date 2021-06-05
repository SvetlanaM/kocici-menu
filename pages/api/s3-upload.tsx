import { APIRoute } from 'next-s3-upload';
import setFilename from '../../utils/set-filename';
export default APIRoute.configure({
  key(req, filename) {
    return `cats/${setFilename(filename)}`;
  },
});
