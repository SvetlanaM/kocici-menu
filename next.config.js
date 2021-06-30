// const { i18n } = require('./next-i18next.config');

module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    S3_UPLOAD_BUCKET: process.env.S3_UPLOAD_BUCKET,
  },
  // i18n,
};
