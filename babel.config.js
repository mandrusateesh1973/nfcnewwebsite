module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          corejs: 3,
          modules: 'auto',
          targets: {
            node: true,
            browsers: ['last 2 version', '> 1%', 'not dead'],
          },
        },
      ],
      '@babel/preset-react',
      '@emotion/babel-preset-css-prop',
    ],
    plugins: [
      '@babel/plugin-transform-runtime',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-proposal-numeric-separator',
      [
        '@babel/plugin-syntax-class-properties',
        {
          spec: true,
        },
      ],
      'jsx-control-statements',
      [
        'babel-plugin-root-import',
        {
          rootPathSuffix: 'app/frontend',
        },
      ],
    ],
    env: {
      development: {
        compact: false,
      },
      test: {
        presets: [
          [
            '@babel/preset-env',
            {
              corejs: 3,
              modules: 'auto',
              useBuiltIns: 'usage',
            },
          ],
          '@babel/react',
          'jest',
        ],
        compact: true,
        plugins: ['dynamic-import-node'],
      },
    },
  };
  