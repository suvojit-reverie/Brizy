import { t } from "visual/utils/i18n";

export function getItems() {
  return [
    {
      id: "toolbarWOOCategories",
      type: "popover",
      config: {
        icon: "nc-woo-categories",
        title: t("Shop Categories")
      },
      devices: "desktop",
      position: 10,
      options: [
        {
          id: "WOOCategoriesTabs",
          type: "tabs",
          tabs: [
            {
              id: "layoutTab",
              label: t("Layout"),
              options: [
                {
                  id: "columns",
                  label: t("Columns"),
                  type: "slider",
                  config: {
                    min: 1,
                    max: 6,
                    inputMin: 1,
                    inputMax: 6
                  }
                },
                {
                  id: "number",
                  label: t("Categories Count"),
                  type: "inputText",
                  devices: "desktop",
                  config: {
                    size: "short"
                  }
                }
              ]
            },
            {
              id: "orderTab",
              label: t("Filter"),
              options: [
                {
                  id: "orderBy",
                  label: t("Filter By"),
                  type: "select",
                  devices: "desktop",
                  choices: [
                    { title: t("Name"), value: "name" },
                    { title: t("Slug"), value: "slug" },
                    { title: t("Description"), value: "description" },
                    { title: t("Count"), value: "count" }
                  ]
                },
                {
                  id: "order",
                  devices: "desktop",
                  label: t("Order"),
                  type: "radioGroup",
                  choices: [
                    { value: "ASC", icon: "nc-up" },
                    { value: "DESC", icon: "nc-down" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "toolbarSettings",
      type: "popover",
      config: {
        icon: "nc-cog"
      },
      position: 110,
      options: [
        {
          id: "width",
          label: t("Width"),
          type: "slider",
          config: {
            min: 1,
            max: 100,
            units: [{ value: "%", title: "%" }]
          }
        },
        {
          id: "grid",
          type: "grid",
          config: {
            separator: true
          },
          devices: "desktop",
          columns: [
            {
              id: "grid-settings",
              width: 50,
              options: [
                {
                  id: "styles",
                  type: "sidebarTabsButton",
                  config: {
                    tabId: "styles",
                    text: t("Styling"),
                    icon: "nc-cog"
                  }
                }
              ]
            },
            {
              id: "grid-effects",
              width: 50,
              options: [
                {
                  id: "effects",
                  type: "sidebarTabsButton",
                  config: {
                    tabId: "effects",
                    text: t("Effects"),
                    icon: "nc-flash"
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ];
}
