const config = require('config')
const SRC = config.get('paths.src.client')
const BUILD = config.get('paths.build.client')
const yaml = require("js-yaml")

module.exports = function (eleventyConfig) {

  // TODO: Add Eleventy filter(s) for customized sorting
  // https://github.com/11ty/eleventy/issues/898#issuecomment-617628635

  // Define collection(s)
  const collections = [
    { plural: 'pages', single: 'page' },
  ]
  
  // Create collection(s)
  collections.map(c => {
    eleventyConfig.addCollection(c.plural, collection => {
      return collection
        .getAll()
        .filter(post => post.data.contentType === c.single)
    })
  })

  // Add custom data file extension(s)
  eleventyConfig.addDataExtension('yaml', contents => yaml.safeLoad(contents))

  // Deep merge
  eleventyConfig.setDataDeepMerge(true)

  // Support for cooldown period between builds during watch/serve
  eleventyConfig.setWatchThrottleWaitTime(4 * 1000) // 4 seconds

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
