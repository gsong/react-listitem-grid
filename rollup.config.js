import babel from "@rollup/plugin-babel";
import fs from "fs";
import globby from "globby";
import normalizeData from "normalize-package-data";
import path from "path";
import sortKeys from "sort-keys";
import { eslint } from "rollup-plugin-eslint";

import original from "./package.json";

export default [
  {
    input: "src/lib/index.js",
    output: { dir: "dist", format: "es" },
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

const copyStatic = () => {
  const copyList = [
    ...["Flex", "Grid"].map((component) => ({
      source: `src/lib/${component}/styles.css`,
      dest: `dist/${component}/styles.css`,
    })),
    ...["CHANGELOG.md", "README.md", "LICENSE"].map((file) => ({
      source: file,
      dest: `dist/${file}`,
    })),
  ];
  copyFiles(copyList);
};

const generateFlow = async () => {
  const sourceFiles = await globby("src/lib/**/*.js");
  const copyList = sourceFiles.map((file) => ({
    source: file,
    dest: `${file.replace("src/lib", "dist")}.flow`,
  }));
  copyFiles(copyList);
};

const generatePackageJson = async () => {
  const {
    browserslist,
    dependencies,
    devDependencies,
    scripts,
    ...rest
  } = original;

  const pkg = {
    ...rest,
    dependencies: {
      "@juggle/resize-observer": "^3",
    },
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
