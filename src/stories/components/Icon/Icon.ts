import { html } from "lit";

export interface IconProps {
  size?: number;
}

export const Icon = ({ size = 1 }: IconProps) => {
  const iconSizeMapping = size - 1;

  const iconClassList = [
    "nj-icon--size-scale",
    "",
    "usa-icon--size-3",
    "usa-icon--size-4",
    "usa-icon--size-5",
    "usa-icon--size-6",
    "usa-icon--size-7",
    "usa-icon--size-8",
    "usa-icon--size-9",
  ];

  return html`
    <svg
      class="usa-icon ${iconClassList[iconSizeMapping]}"
      focusable="false"
      aria-hidden="true"
      role="img"
    >
      <use xlink:href="./img/sprite.svg#accessibility_new"></use>
    </svg>
  `;
};
