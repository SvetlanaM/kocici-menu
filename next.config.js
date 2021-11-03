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

  async exportPathMap() {
    const pathMap = {
      '/tips': { page: '/tips', query: { slug: 'about' } },
    };
    // now get the dynamic stuff:
    // const articles = await getPosts();
    // articles.map((post) => {
    //   pathMap[`/article/${post.link}`] = {
    //     page: '/post',
    //     query: { slug: post.link },
    //   };
    // });
    return pathMap;
  },
};
