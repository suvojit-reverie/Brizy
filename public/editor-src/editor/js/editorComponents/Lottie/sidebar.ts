import { t } from "visual/utils/i18n";
import { ToolbarItemType } from "../ToolbarItemType";

export const title = t("Lottie");

export function getItems(): ToolbarItemType[] {
  return [
    {
      id: "sidebarTabs",
      type: "sidebarTabs-dev",
      tabs: [
        {
          id: "styles",
          title: t("Styling"),
          label: t("Styling"),
          options: [
            {
              id: "settingsTabs",
              type: "tabs-dev",
              config: {
                align: "start"
              },
              devices: "desktop",
              tabs: [
                {
                  id: "settingsStyling",
                  label: t("Basic"),
                  options: [
                    {
                      id: "padding",
                      type: "padding-dev",
                      label: t("Padding"),
                      disabled: true
                    },
                    {
                      id: "bgPadding",
                      type: "padding-dev",
                      label: t("Padding"),
                      position: 50
                    }
                  ]
                }
              ]
            },
            {
              id: "padding",
              type: "padding-dev",
              label: t("Padding"),
              devices: "responsive",
              disabled: true
            },
            {
              id: "bgPadding",
              type: "padding-dev",
              label: t("Padding"),
              devices: "responsive",
              position: 50
            }
          ]
        }
      ]
    }
  ];
}
