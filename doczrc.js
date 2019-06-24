// doczrc.js
// eslint-disbale
import path from 'path';
import { css } from 'docz-plugin-css';

export default {
  dest: '/docz-dist',
  codeSandbox: false,
  files: '**/*.mdx',
  typescript: true,
  filterComponents: files => files.filter(filepath => /[w-]*.(js|jsx|ts|tsx)$/.test(filepath)),
  plugins: [
    css({
      preprocessor: 'sass',
      cssmodules: true,
    }),
    css({
      preprocessor: 'postcss',
    }),
  ],
  onCreateWebpackChain(config) {
    config.resolve.alias.set('@components', path.join(__dirname, 'components'));
    return config;
  },
};
