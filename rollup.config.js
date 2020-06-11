import babel from "@rollup/plugin-babel";
import copy from "rollup-plugin-copy";
import generatePackageJson from "rollup-plugin-generate-package-json";
import { eslint } from "rollup-plugin-eslint";

export default [
  {
    input: "src/index.js",
    output: { dir: "dist", format: "es" },
    external: ["react", "@reach/rect", /@babel\/runtime/],
    preserveModules: true,
    plugins: [
      eslint(),
      babel({ babelHelpers: "runtime" }),
      copy({
        targets: [
          {
            src: ["README.md", "LICENSE", "src/{Flex,Grid}/*.css"],
            dest: "dist/",
          },
        ],
        flatten: false,
      }),
      generatePackageJson({
        baseContents: (pkg) => {
          const { devDependencies, scripts, ...newPkg } = pkg;
          return newPkg;
        },
      }),
    ],
  },
];
