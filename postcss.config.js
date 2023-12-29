module.exports = {
    plugins: [
      'postcss-import',
      'postcss-flexbugs-fixes',
      [
        'autoprefixer',
        {
          flexbox: 'no-2009',
        },
      ],
      [
        'postcss-preset-env',
        {
          stage: 3,
        },
      ],
    ],
  };
  