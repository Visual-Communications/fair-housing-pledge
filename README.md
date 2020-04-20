# Fair Housing Pledge

[![Netlify Status][netlify-deploy-status-badge]][netlify-deploy-status] [![JavaScript Style Guide][standard-badge]][standard]

## Quick Start

### Requirements

1. Node
  - Check if Node is installed: `node --version`
  - If you see a version number, such as `v11.6.0`, proceed to [Get Started](#get-started)
  - If Node isn't installed, [download][node-download] and install it, then proceed to [Get Started](#get-started)

### Get Started

Fork or clone this repo, install dev dependencies, and start:

```bash
git clone https://github.com/Visual-Communications/fair-housing-pledge.git
cd fair-housing-pledge
npm i
npm start
```

## CLI

- `npm start`: Builds website for production
- `npm run build`: Builds website for production 
- `npm run develop`: Builds website for development
- `npm run watch`: Builds markup and watches for changes
- `npm run serve`: Builds website for development, serves to `localhost:8080`, and watches for changes to assets

## /courses/* build steps

### Manual

- Add Google Analytics tracking code snippet to `story.html` before closing </head> tag

## Contributing

If you'd like to contribute, please read the [Code of Conduct][code-of-conduct] and [Contributing instructions][contributing], then fork the repository and use a feature branch. Pull requests are welcome.

[netlify-deploy-status-badge]: https://api.netlify.com/api/v1/badges/da8e7de8-e34c-420a-b428-23ceea2692b8/deploy-status
[netlify-deploy-status]: https://app.netlify.com/sites/fair-housing-pledge/deploys
[standard-badge]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[standard]: https://standardjs.com
[node-download]: https://nodejs.org/en/download/
[aspire]: https://www.filamentgroup.com/lab/aspire/
[code-of-conduct]: blob/master/CODE_OF_CONDUCT.md
[contributing]: blob/master/CONTRIBUTING.md
