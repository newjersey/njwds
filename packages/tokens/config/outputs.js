export const outputs = [
  {
    name: "typography",
    filter: (token) => token.filePath && token.filePath.includes("tokens/typography/"),
  },
];

export default outputs;
