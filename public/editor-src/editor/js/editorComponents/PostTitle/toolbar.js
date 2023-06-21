import Config from "visual/global/Config";
import { isCloud } from "visual/global/Config/types";
import { getSourceIds } from "visual/utils/api";
import { hexToRgba } from "visual/utils/color";
import { t } from "visual/utils/i18n";
import { isPopup } from "visual/utils/models";
import { defaultValueValue } from "visual/utils/onChange";
import { getOptionColorHexByPalette } from "visual/utils/options";
import { HOVER, NORMAL } from "visual/utils/stateMode";
import {
  toolbarLinkAnchor,
  toolbarLinkExternal,
  toolbarLinkPopup
} from "visual/utils/toolbar";
import { getSourceTypeChoices } from "./utils";

export function getItems({ v, device, component }) {
  const config = Config.getAll();
  const IS_GLOBAL_POPUP = isPopup(config);

  const dvv = (key) => defaultValueValue({ v, key, device, state: "normal" });

  const inPopup = Boolean(component.props.meta.sectionPopup);
  const inPopup2 = Boolean(component.props.meta.sectionPopup2);

  const { hex: colorHex } = getOptionColorHexByPalette(
    dvv("colorHex"),
    dvv("colorPalette")
  );

  const sourceType = dvv("sourceType");

  const sourceItemsHandler = config?.api?.sourceItems?.handler;

  return [
    {
      id: "posts",
      type: "popover-dev",
      config: {
        icon: "nc-wp-post-title",
        size: "auto",
        title: t("Title")
      },
      roles: ["admin"],
      position: 70,
      options: [
        {
          id: "sourceType",
          type: "select-dev",
          label: t("Source Type"),
          disabled: isCloud(config),
          device: "desktop",
          placeholder: "Options",
          choices: {
            load: () => getSourceTypeChoices(),
            emptyLoad: {
              title: t("There are no choices")
            }
          }
        },
        {
          id: "sourceID",
          type: "select-dev",
          label: t("Source"),
          disabled: !sourceItemsHandler || sourceType === "",
          device: "desktop",
          placeholder: "Select",
          choices: {
            load: getSourceIds(sourceType, config),
            emptyLoad: {
              title: t("There are no choices")
            }
          }
        }
      ]
    },
    {
      id: "popoverTypography",
      type: "popover-dev",
      config: {
        icon: "nc-font",
        size: device === "desktop" ? "large" : "auto",
        title: t("Typography")
      },
      roles: ["admin"],
      position: 70,
      options: [
        {
          id: "",
          type: "typography-dev",
          config: {
            fontFamily: device === "desktop"
          }
        }
      ]
    },
    {
      id: "toolbarColor",
      type: "popover-dev",
      config: {
        size: "auto",
        title: t("Colors"),
        icon: {
          style: {
            backgroundColor: hexToRgba(colorHex, dvv("colorOpacity"))
          }
        }
      },
      roles: ["admin"],
      devices: "desktop",
      position: 90,
      options: [
        {
          id: "tabsColor",
          type: "tabs-dev",
          tabs: [
            {
              id: "tabText",
              label: t("Text"),
              options: [
                {
                  id: "color",
                  type: "colorPicker-dev",
                  states: [NORMAL, HOVER]
                }
              ]
            },
            {
              id: "tabTextStroke",
              label: t("Stroke"),
              options: [
                {
                  id: "textStrokeBorder",
                  type: "border-dev",
                  config: {
                    width: ["grouped"],
                    styles: ["none", "solid"]
                  },
                  states: [NORMAL, HOVER]
                }
              ]
            },
            {
              id: "tabTextShadow",
              label: t("Shadow"),
              options: [
                {
                  id: "textShadow",
                  type: "textShadow-dev",
                  states: [NORMAL, HOVER]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "toolbarLink",
      type: "popover-dev",
      config: {
        icon: "nc-link",
        size: "medium",
        title: t("Link")
      },
      position: 90,
      options: [
        {
          id: "linkType",
          type: "tabs-dev",
          config: {
            saveTab: true,
            showSingle: true
          },
          tabs: [
            {
              id: "external",
              label: t("URL"),
              options: [
                toolbarLinkExternal({
                  v,
                  device,
                  config: component.context.dynamicContent.config,
                  devices: "desktop",
                  state: "normal"
                }),
                {
                  id: "linkExternalBlank",
                  label: t("Open In New Tab"),
                  type: "switch-dev",
                  devices: "desktop"
                },
                {
                  id: "linkExternalRel",
                  label: t("Make it Nofollow"),
                  type: "switch-dev",
                  devices: "desktop"
                }
              ]
            },
            {
              id: "anchor",
              label: t("Block"),
              options: [
                toolbarLinkAnchor({
                  v,
                  device,
                  devices: "desktop",
                  state: "normal",
                  disabled: IS_GLOBAL_POPUP
                })
              ]
            },
            {
              id: "popup",
              label: t("Popup"),
              options: [
                toolbarLinkPopup({
                  v,
                  component,
                  state: "normal",
                  device: "desktop",
                  canDelete: device === "desktop",
                  disabled:
                    device === "desktop"
                      ? inPopup || inPopup2 || IS_GLOBAL_POPUP
                      : dvv("linkType") !== "popup" || dvv("linkPopup") === ""
                })
              ]
            }
          ]
        }
      ]
    },
    { id: "horizontalAlign", type: "toggle-dev", disabled: true },
    {
      id: "contentHorizontalAlign",
      type: "toggle-dev",
      position: 100,
      choices: [
        { icon: "nc-text-align-left", title: t("Align"), value: "left" },
        { icon: "nc-text-align-center", title: t("Align"), value: "center" },
        { icon: "nc-text-align-right", title: t("Align"), value: "right" },
        { icon: "nc-text-align-justify", title: t("Align"), value: "justify" }
      ]
    },
    {
      id: "advancedSettings",
      type: "advancedSettings",
      sidebarLabel: t("More Settings"),
      position: 110,
      title: t("Settings"),
      roles: ["admin"],
      devices: "desktop",
      icon: "nc-cog"
    }
  ];
}
