// const { i18n } = require('./next-i18next.config');

module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/api/s3-upload': { page: '/api/s3-upload', query: { filename: '' } },
    };
  },
  env: {
    S3_UPLOAD_REGION: process.env.S3_UPLOAD_REGION,
    S3_UPLOAD_KEY: process.env.S3_UPLOAD_KEY,
    S3_UPLOAD_SECRET: process.env.S3_UPLOAD_SECRET,
    S3_UPLOAD_BUCKET: process.env.S3_UPLOAD_BUCKET,
  },
  // i18n,
};
