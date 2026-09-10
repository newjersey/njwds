import { html } from "lit";

import commonData from "../../data/common.json";
import { Accordion } from "../components/Accordion/Accordion";
import { BannerComponent } from "../components/Banner/Banner";
import { Breadcrumb } from "../components/Breadcrumb/Breadcrumb";
import { Button } from "../components/Button/Button";
import { ButtonGroup } from "../components/ButtonGroup/ButtonGroup";
import { Card } from "../components/Card/Card";
import { Checkbox } from "../components/Checkbox/Checkbox";
import { Collection } from "../components/Collection/Collection";
import { ComboboxComponent } from "../components/Combobox/Combobox";
import { Date } from "../components/Date/Date";
import { DatePicker } from "../components/DatePicker/DatePicker";
import { DateRange } from "../components/DateRange/DateRange";
import { FileComponent } from "../components/File/File";
import { File } from "../components/FileInput/File";
import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import { Hero } from "../components/Hero/Hero";
import { Identifier } from "../components/Identifier/Identifier";
import { InPageNavigation } from "../components/InPageNavigation/InPageNavigation";
import { LanguageSelector } from "../components/LanguageSelector/LanguageSelector";
import { Link } from "../components/Link/Link";
import { Modal } from "../components/Modal/Modal";
import { PaginationComponent } from "../components/Pagination/Pagination";
import { Radio } from "../components/Radio/Radio";
import { Search } from "../components/Search/Search";
import { Select } from "../components/Select/Select";
import { Sidenav } from "../components/Sidenav/Sidenav";
import { SummaryBox } from "../components/SummaryBox/SummaryBox";
import { Table } from "../components/Table/Table";
import { Input } from "../components/TextInput/TextInput";
import { Textarea } from "../components/Textarea/Textarea";
import { TimePicker } from "../components/Time/Time";
import { Tooltip } from "../components/Tooltip/Tooltip";
import { Password } from "../templates/Password/Password";

export interface FocusStateQAProps {
  mode: "light" | "dark";
  showErrorStates: boolean;
}

const BUTTON_TYPES = ["primary", "secondary", "tertiary"] as const;

export const FocusStateQA = ({ mode, showErrorStates }: FocusStateQAProps) => {
  const headingClass =
    mode === "dark" ? "font-heading-lg margin-bottom-2 text-white" : "font-heading-lg margin-bottom-2";

  const section = (slug: string, title: string, content: unknown) => html`
    <section data-fqa-scope="${slug}" class="margin-bottom-6">
      <h2 class="${headingClass}">${title}</h2>
      ${content}
    </section>
  `;

  return html`
    <div class="${mode === "dark" ? "usa-dark-background padding-2" : "padding-2"}">
      ${section("accordion", "Accordion", Accordion({ bordered: false, allowMultiple: false }))}
      ${section("breadcrumb", "Breadcrumb", Breadcrumb({ wrap: false }))}
      ${section(
        "button",
        "Button",
        html`
          <div class="grid-row grid-gap margin-bottom-2">
            ${BUTTON_TYPES.map(
              (type) => html`
                <div class="grid-col-auto">
                  ${Button({ label: `${type} button`, type, theme: "light", icon: false })}
                </div>
              `,
            )}
          </div>
          <div class="grid-row grid-gap margin-bottom-2">
            ${BUTTON_TYPES.map(
              (type) => html`
                <div class="grid-col-auto">
                  ${Button({ label: `${type} button`, type, theme: "dark", icon: false })}
                </div>
              `,
            )}
          </div>
          <div class="grid-row grid-gap">
            ${BUTTON_TYPES.map(
              (type) => html`
                <div class="grid-col-auto">
                  ${Button({ label: `${type} button`, type, theme: "danger", icon: false })}
                </div>
              `,
            )}
          </div>
        `,
      )}
      ${section("button-group", "Button group", ButtonGroup({ segmented: false }))}
      ${section(
        "card",
        "Card",
        Card({
          media: true,
          layout: "Default",
          mediaExtend: true,
          flagPositionRight: false,
          mediaFirst: true,
          mediaSize: "md",
        }),
      )}
      ${section(
        "checkbox",
        "Checkbox",
        html`
          ${Checkbox({
            label: "Checkbox label",
            tile: false,
            error: false,
            labelDescription: false,
            helperText: true,
            required: false,
          })}
          <div class="margin-top-3">
            ${Checkbox({
              label: "Tile checkbox label",
              tile: true,
              error: false,
              labelDescription: true,
              helperText: true,
              required: false,
            })}
          </div>
        `,
      )}
      ${section(
        "collection",
        "Collection",
        Collection({
          type: "default",
          externalLinks: false,
          showTags: true,
          showDescription: true,
          showMeta: true,
        }),
      )}
      ${section(
        "combo-box",
        "Combo box",
        ComboboxComponent({
          label: "Select an option",
          defaultValue: "2",
          required: false,
          helperText: true,
          error: false,
        }),
      )}
      ${section(
        "memorable-date",
        "Memorable date",
        Date({ required: false, error: false, success: false, helperText: true }),
      )}
      ${section(
        "date-picker",
        "Date picker",
        DatePicker({ required: false, error: false, helperText: true }),
      )}
      ${section(
        "date-range-picker",
        "Date range picker",
        DateRange({ class: "", required: false, helperText: true, error: false }),
      )}
      ${section(
        "file",
        "File",
        FileComponent({
          error: false,
          multipleFiles: false,
          fileTypes: ".pdf,.txt,.doc,.docx,.jpg,.png,.gif",
          required: false,
          helperText: true,
        }),
      )}
      ${section(
        "file-input",
        "File input",
        File({
          label: "File input label",
          error: false,
          required: false,
          helperText: true,
          multipleFiles: false,
        }),
      )}
      ${section(
        "hero",
        "Hero",
        Hero({
          heading: "Hero heading",
          subheading: "",
          explainerText: "Explainer text for the hero.",
        }),
      )}
      ${section(
        "language-selector",
        "Language selector",
        html`
          ${LanguageSelector({ pattern: "simple", buttonType: "secondary", icon: false })}
          ${LanguageSelector({ pattern: "dropdown", buttonType: "secondary", icon: false })}
        `,
      )}
      ${section(
        "link",
        "Link",
        html`
          ${Link({ label: "Default link", mode: "light", external: false, forceVisited: false })}
          ${Link({ label: "External link", mode: "light", external: true, forceVisited: false })}
          ${Link({ label: "Visited link", mode: "light", external: false, forceVisited: true })}
        `,
      )}
      ${section("pagination", "Pagination", PaginationComponent({ unbounded: false }))}
      ${section(
        "radio",
        "Radio",
        html`
          ${Radio({
            label: "Radio label",
            tile: false,
            error: false,
            labelDescription: false,
            helperText: true,
            required: false,
          })}
          <div class="margin-top-3">
            ${Radio({
              label: "Tile radio label",
              tile: true,
              error: false,
              labelDescription: true,
              helperText: true,
              required: false,
            })}
          </div>
        `,
      )}
      ${section(
        "search",
        "Search",
        html`
          <div class="margin-bottom-3">${Search({ size: "Default" })}</div>
          <div class="margin-bottom-3">${Search({ size: "Big" })}</div>
          <div>${Search({ size: "Small" })}</div>
        `,
      )}
      ${section(
        "select",
        "Select",
        Select({ label: "Select label", required: false, helperText: true, error: false }),
      )}
      ${section("sidenav", "Side navigation", Sidenav())}
      ${section("summary-box", "Summary box", SummaryBox())}
      ${section(
        "table",
        "Table",
        html`
          ${Table({
            border: true,
            compact: false,
            responsiveStack: false,
            scrollable: false,
            sortable: false,
            stickyHeaders: false,
            striped: false,
          })}
          <div class="margin-top-3">
            ${Table({
              border: true,
              compact: false,
              responsiveStack: false,
              scrollable: false,
              sortable: true,
              stickyHeaders: false,
              striped: false,
            })}
          </div>
          <div class="margin-top-3">
            ${Table({
              border: true,
              compact: false,
              responsiveStack: false,
              scrollable: true,
              sortable: false,
              stickyHeaders: false,
              striped: false,
            })}
          </div>
        `,
      )}
      ${section(
        "text-input",
        "Text input",
        Input({ label: "Input label", required: false, helperText: true, error: false, width: "xl" }),
      )}
      ${section(
        "textarea",
        "Textarea",
        Textarea({
          label: "Textarea label",
          required: false,
          helperText: true,
          error: false,
          characterCounter: true,
          width: "xl",
        }),
      )}
      ${section(
        "time-picker",
        "Time picker",
        TimePicker({
          label: "Appointment time",
          required: false,
          error: false,
          success: false,
          helperText: true,
        }),
      )}
      ${section("tooltip", "Tooltip", Tooltip())}
      ${section(
        "password",
        "Password reset form",
        Password({ required: false, helperText: false, error: false }),
      )}
      ${showErrorStates
        ? section(
            "error-states",
            "Error states",
            html`
              <div class="margin-bottom-3">
                ${Input({
                  label: "Input label",
                  required: true,
                  helperText: true,
                  error: true,
                  width: "xl",
                })}
              </div>
              <div class="margin-bottom-3">
                ${Textarea({
                  label: "Textarea label",
                  required: true,
                  helperText: true,
                  error: true,
                  characterCounter: true,
                  width: "xl",
                })}
              </div>
              <div class="margin-bottom-3">
                ${Select({ label: "Select label", required: true, helperText: true, error: true })}
              </div>
              <div class="margin-bottom-3">
                ${ComboboxComponent({
                  label: "Select an option",
                  defaultValue: "2",
                  required: true,
                  helperText: true,
                  error: true,
                })}
              </div>
              <div class="margin-bottom-3">
                ${Date({ required: true, error: true, success: false, helperText: true })}
              </div>
              <div class="margin-bottom-3">
                ${DatePicker({ required: true, error: true, helperText: true })}
              </div>
              <div class="margin-bottom-3">
                ${DateRange({ class: "", required: true, helperText: true, error: true })}
              </div>
              <div class="margin-bottom-3">
                ${TimePicker({
                  label: "Appointment time",
                  required: true,
                  error: true,
                  success: false,
                  helperText: true,
                })}
              </div>
              <div class="margin-bottom-3">
                ${FileComponent({
                  error: true,
                  multipleFiles: false,
                  fileTypes: "",
                  required: true,
                  helperText: true,
                })}
              </div>
              <div class="margin-bottom-3">
                ${File({
                  label: "File input label",
                  error: true,
                  required: true,
                  helperText: true,
                  multipleFiles: false,
                })}
              </div>
              <div class="margin-bottom-3">
                ${Checkbox({
                  label: "Checkbox label",
                  tile: false,
                  error: true,
                  labelDescription: false,
                  helperText: true,
                  required: true,
                })}
              </div>
              <div class="margin-bottom-3">
                ${Radio({
                  label: "Radio label",
                  tile: false,
                  error: true,
                  labelDescription: false,
                  helperText: true,
                  required: true,
                })}
              </div>
            `,
          )
        : ""}
      ${section("header-default", "Header — Default", Header({ variant: "Default", megamenu: false }))}
      ${section(
        "header-extended",
        "Header — Extended",
        Header({ variant: "Extended", megamenu: false }),
      )}
      ${section(
        "banner",
        "Banner",
        BannerComponent({ governor: commonData.gov, ltgovernor: commonData.govlt }),
      )}
      ${section("footer-default", "Footer — Default", Footer({ variant: "Default" }))}
      ${section("footer-big", "Footer — Big", Footer({ variant: "Big" }))}
      ${section("footer-slim", "Footer — Slim", Footer({ variant: "Slim" }))}
      ${section(
        "identifier",
        "Identifier",
        Identifier({ language: "English", logos: "Single", showTaxpayerDisclaimer: false }),
      )}
      ${section(
        "in-page-navigation",
        "In-page navigation",
        InPageNavigation({ label: "On this page", hideContentInStorybook: false }),
      )}
      ${section("modal", "Modal", Modal({ size: "small", forceAction: false, modalId: "" }))}
    </div>
  `;
};
