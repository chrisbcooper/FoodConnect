module.exports = function (api) {
    api.cache(() => process.env.NODE_ENV);
  
    const presets = [['@babel/preset-env']];
    const plugins = [
      [
        require.resolve('babel-plugin-module-resolver'),
        {
          root: ['./'],
          alias: {
            '@app': './src',
            '@redux': './src/redux'
          },
        },
      ],
    ];
  
    return {
      presets,
      plugins,
    };
  };
  