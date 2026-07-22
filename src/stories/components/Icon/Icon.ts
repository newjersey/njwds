import { html } from "lit";

export interface IconProps {
  size: number;
}

export const Icon = ({ size = 1 }: IconProps) => {
  const iconSizeClasses: Record<number, string> = {
    1: "nj-icon--size-scale",
    2: "",
    3: "usa-icon--size-3",
    4: "usa-icon--size-4",
    5: "usa-icon--size-5",
    6: "usa-icon--size-6",
    7: "usa-icon--size-7",
    8: "usa-icon--size-8",
    9: "usa-icon--size-9",
  };

  return html`
    <svg class="usa-icon ${iconSizeClasses[size]}" aria-hidden="true" focusable="false" role="img">
      <use href="./img/sprite.svg#accessibility_new"></use>
    </svg>
  `;
};
