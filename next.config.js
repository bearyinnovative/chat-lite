module.exports = {
  images: {
    disableStaticImages: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    config.module.rules.push({
      test: /\.png/,
      type: 'asset/resource',
      generator: {
        filename: 'static/[hash][ext][query]',
      },
    });
    if (!config.experiments) config.experiments = {};
    Object.assign(config.experiments, {
      syncWebAssembly: true,
    });
    return config;
  },
};
