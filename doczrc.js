// doczrc.js
import { css } from 'docz-plugin-css'

export default {
  dest: '/docz-dist',
  codeSandbox: false,
  files: '**/*.mdx',
  typescript: true,
  filterComponents: (files) =>files.filter(filepath => /[w-]*.(js|jsx|ts|tsx)$/.test(filepath)),
  plugins: [
    css({
      preprocessor: 'sass',
      cssmodules: true,
    }),
    css({
      preprocessor: "postcss",
    }),
  ],
 

  
}