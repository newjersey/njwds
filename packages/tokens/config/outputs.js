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
    name: "breakpoints",
    filter: (token) => token.filePath && token.filePath.includes("tokens/breakpoints/"),
  },
];

export default outputs;
