import aws from 'aws-sdk';
import axios from 'axios';
import { PresignedPost } from 'aws-sdk/clients/s3';

export const uploadImage = async (
  file: File,
  slug?: string
): Promise<string | null> => {
  setupAWS();

  const { url, fields } = await getPresignedURL(slug + file.name);

  const formData = new FormData();

  Object.entries({ ...fields, file }).forEach(([key, value]) => {
    formData.append(key, value);
  });

  return await axios
    .post(url, formData)
    .then((response) => response.data)
    .then(() => `${url}/${slug + file.name}`);
};

const getPresignedURL = async (filename: string): Promise<PresignedPost> => {
  const s3 = new aws.S3();
  return s3.createPresignedPost({
    Bucket: process.env.NEXT_PUBLIC_S3_UPLOAD_BUCKET,
    Fields: {
      key: filename,
    },
    Expires: 60,
  });
};

const setupAWS = () => {
  aws.config.update({
    accessKeyId: process.env.NEXT_PUBLIC_S3_UPLOAD_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_UPLOAD_SECRET,
    region: process.env.NEXT_PUBLIC_S3_UPLOAD_REGION,
    signatureVersion: 'v4',
  });
};
