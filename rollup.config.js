import fs from "fs";
import path from "path";

import babel from "@rollup/plugin-babel";
import globby from "globby";
import normalizeData from "normalize-package-data";
import sortKeys from "sort-keys";
import { eslint } from "rollup-plugin-eslint";

import original from "./package.json";

export default [
  {
    input: "src/lib/index.js",
    output: { dir: "dist", format: "cjs", exports: "auto" },
    external: ["react", /@babel/, /@juggle/],
    preserveModules: true,
    plugins: [eslint(), babel({ babelHelpers: "runtime" }), writeBundle()],
  },
];

function writeBundle() {
  return {
    name: "write-bundle-task",
    writeBundle: async () => {
      await copyStatic();
      await generateFlow();
      await generatePackageJson();
    },
  };
}

const copyStatic = async () => {
  const copyList = [
    ...["Flex", "Grid"].map((component) => ({
      source: `src/lib/${component}/styles.css`,
      dest: `dist/${component}/styles.css`,
    })),

    ...[...(await globby("*.md")), "LICENSE"].map((file) => ({
      source: file,
      dest: `dist/${file}`,
    })),
  ];

  copyFiles(copyList);
};

const generateFlow = async () => {
  const sourceFiles = await globby(["src/lib/**/*.js", "!**/__tests__/**"]);
  const copyList = sourceFiles.map((file) => ({
    source: file,
    dest: `${file.replace("src/lib", "dist")}.flow`,
  }));
  copyFiles(copyList);
};

const generatePackageJson = async () => {
  const {
    browserslist,
    config,
    dependencies,
    devDependencies,
    ...rest
  } = original;

  const pkg = {
    ...rest,
    dependencies: {
      "@juggle/resize-observer": "^3",
    },
    homepage: "https://gsong.github.io/react-listitem-grid/",
  };

  normalizeData(pkg, true, true);
  const { readme, ...newPkg } = pkg;

  fs.writeFileSync(
    path.join("dist", "package.json"),
    JSON.stringify(sortKeys(newPkg), null, 2),
  );
};

function copyFiles(copyList) {
  copyList.forEach(({ source, dest }) =>
    fs.copyFileSync(path.resolve(source), path.resolve(dest)),
  );
}
