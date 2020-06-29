const fs = require("fs");
const path = require("path");

const branches = [
  "+([0-9])?(.{+([0-9]),x}).x",
  "release",
  "next",
  "next-major",
  { name: "beta", prerelease: true },
  { name: "alpha", prerelease: true },
];

const plugins = [
  "@semantic-release/commit-analyzer",

  [
    "@semantic-release/release-notes-generator",
    {
      writerOpts: {
        headerPartial: fs.readFileSync(
          path.join(__dirname, "./templates/header.hbs"),
          "utf8",
        ),
      },
    },
  ],

  [
    "@semantic-release/changelog",
    {
      changelogTitle:
        "# Change Log\n\nAll notable changes to this project are documented in this file. See\n[Conventional Commits](https://conventionalcommits.org) for commit guidelines.",
    },
  ],

  ["@semantic-release/npm", { pkgRoot: "dist" }],

  "@semantic-release/github",

  [
    "@semantic-release/git",
    {
      // eslint-disable-next-line no-template-curly-in-string
      message: "chore(release): ${nextRelease.version}\n\n${nextRelease.notes}",
    },
  ],
];

module.exports = { branches, plugins };
