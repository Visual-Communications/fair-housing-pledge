# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](changelog),
and this project adheres to [Semantic Versioning](semver).

## Unreleased

### Added

### Changed

### Deprecated

### Removed

### Fixed

### Security

## 1.4.0 - 2020-11-27 - Bulk update pledges

### Added
- Add `updatePledges()` method. [#93][#93]

### Changed
- Change courseCompleted to boolean. [#93][#93]

## 1.3.2 - 2020-11-23 - Prevent duplicate Pledges

### Fixed
- Disable submit button to prevent duplicate POST requests. [#89][#89]

## 1.3.1 - 2020-11-23 - Remove deprecated method call

### Added
- Install `feature-policy` module. [#86][#86]

### Removed
- Remove deprecated `helmet.featurePolicy()` call. [#86][#86]

### Fixed
- Set Feature Policy HTTP header by `feature-policy` module. [#86][#86]

## 1.3.0 - 2020-11-23 - Bulk delete

### Added
- Add a method for bulk-deleting multiple pledges at once. [#84][#84]

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
[#93]: https://github.com/Visual-Communications/fair-housing-pledge/issues/93
