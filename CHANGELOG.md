# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](changelog),
and this project adheres to [Semantic Versioning](semver).

<!--
## X.X.X - XXXX-XX-XX - XXXXXX

### Added
### Changed
### Deprecated
### Removed
### Fixed
### Security
-->

## 1.3.0 - 2020-11-23 - Bulk delete

### Added
- Add a method for bulk-deleting multiple pledges at once [#84][#84]

## 1.2.0 - 2020-06-01 - Fix server

### Changed
- Update server redirects
- Update HTTP headers
- Remove passwords from response

### Fixed
- Update slugignore to fix Heroku server build

## 1.1.0 - 2020-05-26 - Update build pipeline

### Added
- Add dependencies
- Add GitHub workflow to ping Heroku

### Changed
- Update Readme
- Update dependencies
- Update server redirects and HTTP headers
- Update build pipeline
- Update environment variables
- Update Eleventy configuration
- Update GitHub Issue and Pull Request templates
- Update server API - fresh NPSK clone, content type tweaks - TODO: Fix Pledges
- Update client site files

## 1.0.0 - Initial release

### Added
- Combine ES and NPSK, remove files, update

[changelog]: https://keepachangelog.com/en/1.0.0/
[semver]: https://semver.org/spec/v2.0.0.html
[#84]: https://github.com/Visual-Communications/fair-housing-pledge/issues/84
