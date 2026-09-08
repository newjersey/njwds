import { outputs } from "./outputs.js";

const cssOptions = { selector: ":root, :host", outputReferences: true };
const scssOptions = { outputReferences: true };
export const prefix = "grove";

export default {
  usesDtcg: true,
  source: ["tokens/**/*.json"],
  platforms: {
    css: {
      transformGroup: "css",
      prefix: prefix,
      buildPath: "build/css/",
      files: [
        {
          destination: "tokens.css",
          format: "css/variables",
          options: cssOptions,
        },
        ...outputs.map(({ name, filter }) => ({
          destination: `${name}.css`,
          format: "css/variables",
          options: cssOptions,
          filter,
        })),
      ],
    },
    scss: {
      transformGroup: "scss",
      prefix: prefix,
      buildPath: "build/scss/",
      files: [
        {
          destination: "_tokens.scss",
          format: "scss/variables",
          options: scssOptions,
        },
        ...outputs.map(({ name, filter }) => ({
          destination: `_${name}.scss`,
          format: "scss/variables",
          options: scssOptions,
          filter,
        })),
      ],
    },
    json: {
      transformGroup: "css",
      prefix: prefix,
      buildPath: "build/json/",
      files: [
        {
          destination: "tokens.json",
          format: "json/nested",
        },
        ...outputs.map(({ name, filter }) => ({
          destination: `${name}.json`,
          format: "json/nested",
          filter,
        })),
      ],
    },
  },
};
