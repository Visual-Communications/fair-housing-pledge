const fs = require("fs");
const path = require("path");
const CHANGELOG = fs.readFileSync(path.join("./", "CHANGELOG.md"), "UTF-8");
const { version, repository } = require("./package.json");
const { url } = repository
const repo = url.replace('git+', '').replace('.git', '')

const DEFAULT_UNRELEASED = [
  "## [Unreleased]",
  "",
  "### Added",
  "",
  "### Changed",
  "",
  "### Deprecated",
  "",
  "### Removed",
  "",
  "### Fixed",
  "",
  "### Security",
  ""
];

const changelogLines = CHANGELOG.trim().split("\n");

const versions = changelogLines.reduce((acc, curr) => {
  const matches = curr.match(/## \[(\d+\.\d+\.\d+)]/);

  if (matches && matches.length) {
    acc.push(matches[1]);
  }
  return acc;
}, []);

/**
 * Initialize.
 *
 * @since unreleased
 */
function init () {
  if (versions.length !== new Set(versions).size) {
    console.warn("Duplicate versions found. Check your changelog.");
  }

  if (versions.includes(version)) {
    console.error("Version already exists. Please bump version before releasing");
    return;
  }

  const unreleaseHeadingLine = changelogLines.indexOf("## [Unreleased]");
  const currentReleaseHeadingLine = changelogLines.findIndex((line, index) => {
    if (index <= unreleaseHeadingLine) {
      return false;
    }

    return line.startsWith("## ");
  });
  const unreleaseLinkLine = changelogLines.findIndex((line, index) => {
    if (index <= currentReleaseHeadingLine) {
      return false;
    }

    return line.startsWith("[unreleased]: ");
  });

  const added = [];
  const changed = [];
  const deprecated = [];
  const removed = [];
  const fixed = [];
  const security = [];

  let action = "";

  changelogLines
    .slice(unreleaseHeadingLine + 1, currentReleaseHeadingLine)
    .forEach(line => {
      if (line.trim() === "") {
        return;
      }

      switch (line.trim()) {
        case "### Added":
          action = "added";
          return;
        case "### Changed":
          action = "changed";
          return;
        case "### Deprecated":
          action = "deprecated";
          return;
        case "### Removed":
          action = "removed";
          return;
        case "### Fixed":
          action = "fixed";
          return;
        case "### Security":
          action = "security";
          return;
        default:
          break;
      }

      switch (action) {
        case "added":
          added.push(line);
          break;
        case "changed":
          changed.push(line);
          break;
        case "removed":
          removed.push(line);
          break;
        case "deprecated":
          deprecated.push(line);
          break;
        case "fixed":
          fixed.push(line);
          break;
        case "security":
          security.push(line);
          break;
      }
    });

  if (
    !added.length &&
    !changed.length &&
    !deprecated.length &&
    !removed.length &&
    !fixed.length &&
    !security.length
  ) {
    console.error("No items to release");
    return;
  }

  const today = new Date();
  const dateStr =
    today.getFullYear() +
    "-" +
    ("0" + (today.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + today.getDate()).slice(-2);

  const newRelease = [`## [${version}] - ${dateStr}`, ""];

  if (added.length) {
    newRelease.push("### Added", ...added, "");
  }
  if (changed.length) {
    newRelease.push("### Changed", ...changed, "");
  }
  if (deprecated.length) {
    newRelease.push("### Deprecated", ...deprecated, "");
  }
  if (removed.length) {
    newRelease.push("### Removed", ...removed, "");
  }
  if (fixed.length) {
    newRelease.push("### Fixed", ...fixed, "");
  }
  if (security.length) {
    newRelease.push("### Security", ...security, "");
  }

  fs.writeFileSync(
    "./CHANGELOG.md",
    [
      ...changelogLines.slice(0, unreleaseHeadingLine),
      ...DEFAULT_UNRELEASED,
      ...newRelease,
      ...changelogLines.slice(currentReleaseHeadingLine, unreleaseLinkLine),
      changelogLines[unreleaseLinkLine].substr(
        0,
        changelogLines[unreleaseLinkLine].indexOf("..") + 2
      ) + version,
      `[${version}]: ${repo}/commits/tag/${version}`,
      ...changelogLines.slice(unreleaseLinkLine + 1),
      ""
    ]
      .map(l => l.trim())
      .join("\n")
  );
  console.log("Updated CHANGELOG");
}

module.exports.init = init
