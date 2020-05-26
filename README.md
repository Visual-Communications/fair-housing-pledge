# Fair Housing Pledge

[![Netlify Status][netlify-deploy-badge]][netlify-deploys] [![JavaScript Style Guide][standard-badge]][standard]

This client-side JAMstack static website is built with Eleventy, Gulp, PostCSS, and Webpack, and configured for deployment to a CDN via Netlify. It has CI/CD setup - deploy by merging a pull request into the master branch on GitHub.

Sass is linted, transpiled into CSS, post-processed with PostCSS, beautified in development, and minified in production, with source maps. JavaScript is linted, transpiled with Babel, bundled with Webpack, concatenated, and minified in production, with source maps.

[FairHousingPledge.com][fhp]

## Quick Start

### Requirements

1. Node
  - Check if Node is installed: `node --version`
  - If you see a version number, such as `v14.2.0`, proceed to [Get Started](#get-started)
  - If Node isn't installed, [download][node-download] and install it (or use [nvm][nvm]), then proceed to [Get Started](#get-started)

### Get Started

Fork or clone this repo, install dependencies, add environment variables, and start:

```bash
# Clone the repo
git clone https://github.com/Visual-Communications/fair-housing-pledge.git
cd fair-housing-pledge

# Install dependencies
npm install

# Add environment variables:
# See ./config/custom-environment-variables.json
# and ./_docs/environment-variables.md
touch ./.env

npm start
```

## Documentation

[Project documentation][docs] files are in the `_docs` directory.

## Contributing

If you'd like to contribute, please read the [Code of Conduct][code-of-conduct] and [Contributing instructions][contributing], then fork the repository and use a feature branch. Pull requests are welcome.

[netlify-deploy-badge]: https://api.netlify.com/api/v1/badges/da8e7de8-e34c-420a-b428-23ceea2692b8/deploy-status
[netlify-deploys]: https://app.netlify.com/sites/fair-housing-pledge/deploys
[standard-badge]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[standard]: https://standardjs.com
[fhp]: https://fairhousingpledge.com/
[node-download]: https://nodejs.org/en/download/
[nvm]: https://github.com/nvm-sh/nvm
[docs]: _docs/
[code-of-conduct]: blob/master/CODE_OF_CONDUCT.md
[contributing]: blob/master/CONTRIBUTING.md
