# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](changelog),
and this project adheres to [Semantic Versioning](semver).

## Unreleased

### Added
- Add `package.json` version. [#115]

### Changed

### Deprecated

### Removed

### Fixed

### Security

## 2.1.0 - 2020-12-06 - Dashboard pledge data

### Added
- Add pledges data to admin dashboard. [#100]
- Add `postversion` script to push the version commit and tag to GitHub. [#100]

## 2.0.2 - 2020-12-05 - Minify admin JS

### Fixed
- Fix admin JavaScript minification.

## 2.0.1 - 2020-12-05 - Fix resource links

### Fixed
- Fix broken resource links by passing build environment to render views.

## 2.0.0 - 2020-12-05 - Dashboard download buttons

### Added
- Allow CORS during local development. [#105]
- Add `BUILD_ENV` environment variable. [#105]
- Cache dashboard pledge data client-side. [#104]
- Add dashboard data export buttons. [#102]

### Changed
- Update resource links during local development. [#105]
- Swap `gulp-connect` for `browser-sync`. [#105]
- Improve admin messaging.
- **Breaking change:** Update, rename, and modularize functions.

### Fixed
- Allow auth requests from both API URL and site URL. [#104]

### Security
- Bump `bcrypt` a major version.

## 1.5.0 - 2020-11-30 - Admin dashboard

### Added
- Add admin dashboard [#92]
- Add admin CSS, fonts, and JS to gulp pipeline. [#92]
- Add dashboard route redirects. [#92]

### Changed
- Update ITCSS directory structure. [#92]

### Fixed
- Update pledge validation `delete()` method so `pledges` is required.
- Replace /api redirect loop with client error.

## 1.4.0 - 2020-11-27 - Bulk update pledges

### Added
- Add `updatePledges()` method. [#93]

### Changed
- Change courseCompleted to boolean. [#93]

## 1.3.2 - 2020-11-23 - Prevent duplicate Pledges

### Fixed
- Disable submit button to prevent duplicate POST requests. [#89]

## 1.3.1 - 2020-11-23 - Remove deprecated method call

### Added
- Install `feature-policy` module. [#86]

### Removed
- Remove deprecated `helmet.featurePolicy()` call. [#86]

### Fixed
- Set Feature Policy HTTP header by `feature-policy` module. [#86]

## 1.3.0 - 2020-11-23 - Bulk delete

### Added
- Add a method for bulk-deleting multiple pledges at once. [#84]

### Removed
- Remove deprecated `createPledgeLegacy()` method.

## 1.2.0 - 2020-06-01 - Fix server

### Changed
- Update server redirects.
- Update HTTP headers.
- Remove passwords from response.

### Fixed
- Update slugignore to fix Heroku server build.

## 1.1.0 - 2020-05-26 - Update build pipeline

### Added
- Add dependencies.
- Add GitHub workflow to ping Heroku.

### Changed
- Update Readme.
- Update dependencies.
- Update server redirects and HTTP headers.
- Update build pipeline.
- Update environment variables.
- Update Eleventy configuration.
- Update GitHub Issue and Pull Request templates.
- Update server API - fresh NPSK clone, content type tweaks.
- Update client site files.

## 1.0.0 - Initial release

### Added
- Combine ES and NPSK, remove files, update.

[changelog]: https://keepachangelog.com/en/1.0.0/
[semver]: https://semver.org/spec/v2.0.0.html
[#84]: https://github.com/Visual-Communications/fair-housing-pledge/issues/84
[#86]: https://github.com/Visual-Communications/fair-housing-pledge/issues/86
[#89]: https://github.com/Visual-Communications/fair-housing-pledge/issues/89
[#92]: https://github.com/Visual-Communications/fair-housing-pledge/issues/92
[#93]: https://github.com/Visual-Communications/fair-housing-pledge/issues/93
[#100]: https://github.com/Visual-Communications/fair-housing-pledge/issues/100
[#102]: https://github.com/Visual-Communications/fair-housing-pledge/issues/102
[#104]: https://github.com/Visual-Communications/fair-housing-pledge/issues/104
[#105]: https://github.com/Visual-Communications/fair-housing-pledge/issues/105
[#115]: https://github.com/Visual-Communications/fair-housing-pledge/issues/115
