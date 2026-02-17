import { html } from "lit";

type sizeType = "small" | "big";

export interface TagProps {
  label: string;
  size?: sizeType;
}

export const Tag = ({ label, size = "small" }: TagProps) => {
  const TagSize = size !== "small" ? "usa-tag--big" : "";

  return html` <span class="usa-tag ${TagSize}">${label}</span> `;
};
