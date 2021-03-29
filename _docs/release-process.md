## Release process

### Development
1. Create feature branch(es) off `master`
2. Make and save your changes, and notate any new features with `@since unreleased` in docblock comments
3. Update the Docs and/or Readme as needed
4. Commit and push your changes (`git add . && git commit -m "<commit-message>" && git push -u origin HEAD`)

If your feature branch correlates to a GitHub issue:
- Prepend the branch name with `#<issue-number>/`
- Prepend the commit message with `#<issue-number>: `

### Preparing for a release
1. Decide your next release version number based on whether it's a major, minor, or patch release (follow semantic versioning)
2. Create a new branch off `master` called `release/<version>` where `<version>` is the new semantic version prepended with `v` (__i.e., `release/v1.0.0`__)
3. Create and **Squash** PR(s) for your feature branch(es) into the new release branch
4. Checkout the new release branch locally
5. Find/replace `@since unreleased` with `@since <version>` where `<version>` is the new semantic version prepended with `v` (__i.e., `release/v1.0.0`__)
  - @todo: Automate this step
6. Commit the docblock changes

### Handle the release
1. Run `npm version <new-version>` where `<new-version>` is `major`/`minor`/`patch`
  - This will automatically bump the `package.json` version, move all your Changelog changes to the new version, commit and push your changes, and create and push a new version tag
2. Create and **Merge Commit** a PR from your release branch into `master`
  - This will automatically build and deploy code in all production environments
