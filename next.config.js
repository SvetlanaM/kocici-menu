module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    S3_UPLOAD_REGION: process.env.S3_UPLOAD_REGION,
    S3_UPLOAD_KEY: process.env.S3_UPLOAD_KEY,
    S3_UPLOAD_SECRET: process.env.S3_UPLOAD_SECRET,
    S3_UPLOAD_BUCKET: process.env.S3_UPLOAD_BUCKET,
  },
  generateBuildId: () => 'build',
};
