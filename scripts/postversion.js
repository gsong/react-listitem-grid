#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const prettier = require("prettier");

function main() {
  formatAndCopyChangelog();
  updatePackageIdAndFormat();
}

async function formatAndCopyChangelog() {
  const fromPath = path.join(__dirname, "../CHANGELOG.md");
  const toPath = path.join(__dirname, "../dist/CHANGELOG.md");

  const log = fs.readFileSync(fromPath, "utf8");
  const options = await prettier.resolveConfig(fromPath);
  const formatted = prettier.format(log, { ...options, parser: "markdown" });

  [fromPath, toPath].forEach((p) => fs.writeFileSync(p, formatted));
}

async function updatePackageIdAndFormat() {
  const pkgPath = path.join(__dirname, "../dist/package.json");

  const { scripts, ...pkg } = JSON.parse(fs.readFileSync(pkgPath));
  const newPkg = { ...pkg, _id: `${pkg.name}@${pkg.version}` };

  const options = await prettier.resolveConfig(pkgPath);
  fs.writeFileSync(
    pkgPath,
    prettier.format(JSON.stringify(newPkg), { ...options, parser: "json" }),
  );
}

main();
