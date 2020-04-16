const config = require('config')
const SRC = config.get('paths.src.client')
const BUILD = config.get('paths.build.client')

module.exports = function (eleventyConfig) {

  // Add pages collection
  eleventyConfig.addCollection('pages', collection => collection.getAll().filter(post => post.data.contentType === 'page'))

  return {
    dir: {
      data: '_data',
      includes: '_includes',
      input: SRC,
      layouts: '_layouts',
      output: BUILD
    }
  }
}
