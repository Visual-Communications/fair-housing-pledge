"use strict";

module.exports = {
  plugins: [
    require('postcss-import'), // Inline @import rules content
    require('precss'), // Use Sass-like markup in your CSS
    require('postcss-node-sass'), // Parse styles with node-sass
    require('postcss-preset-env'), // Convert modern CSS into something browsers understand
    require('autoprefixer'), // Add vendor prefixes
    require('cssnano')({ // Modern CSS compression
        preset: 'default',
    }),
  ]
};