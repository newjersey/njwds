export const outputs = [
  {
    name: "typography",
    filter: (token) => token.filePath && token.filePath.includes("tokens/typography/"),
  },
  {
    name: "color",
    filter: (token) => token.filePath && token.filePath.includes("tokens/color/"),
  },
  {
    name: "unit",
    filter: (token) => token.filePath && token.filePath.includes("tokens/unit/"),
  },
  {
    name: "breakpoints",
    filter: (token) => token.filePath && token.filePath.includes("tokens/breakpoints/"),
    outputReferences: false,
  },
  {
    name: "layout",
    filter: (token) => token.filePath && token.filePath.includes("tokens/layout/"),
    outputReferences: false,
  },
];

export default outputs;
