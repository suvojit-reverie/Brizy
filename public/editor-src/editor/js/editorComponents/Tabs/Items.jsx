import { removeAt } from "timm";
import { hideToolbar } from "visual/component/Toolbar";
import EditorArrayComponent from "visual/editorComponents/EditorArrayComponent";
import { t } from "visual/utils/i18n";

export default class TabsItems extends EditorArrayComponent {
  static get componentId() {
    return "Tabs.Items";
  }

  static defaultProps = {
    className: "",
    renderType: "",
    style: {},
    meta: {},
    verticalMode: ""
  };

  getItemProps(itemData, itemIndex, items) {
    const {
      renderType,
      meta,
      activeTab,
      onChangeNav,
      action,
      verticalMode,
      animationClassName
    } = this.props;
    const cloneRemoveConfig = {
      getItems: () => [
        {
          id: "order",
          type: "order",
          devices: "desktop",
          position: 105,
          roles: ["admin"],
          disabled: items.length < 2,
          config: {
            align: verticalMode === "on" ? "vertical" : "horizontal",
            disable:
              itemIndex === 0
                ? "prev"
                : itemIndex === items.length - 1
                ? "next"
                : undefined,
            onChange: (v) => {
              switch (v) {
                case "prev":
                  this.reorderItem(itemIndex, itemIndex - 1);
                  break;
                case "next":
                  this.reorderItem(itemIndex, itemIndex + 1);
                  break;
              }
            }
          }
        },
        {
          id: "duplicate",
          type: "button",
          devices: "desktop",
          config: {
            icon: "nc-duplicate",
            title: t("Duplicate"),
            reverseTheme: true
          },
          position: 200,
          onClick: () => {
            this.cloneItem(itemIndex);
          }
        },
        ...(items.length > 1
          ? [
              {
                id: "remove",
                type: "button",
                devices: "desktop",
                config: {
                  icon: "nc-trash",
                  title: t("Delete"),
                  reverseTheme: true
                },
                position: 250,
                disable: items.length === 1,
                onClick: () => {
                  hideToolbar();
                  this.removeItem(itemIndex);
                }
              }
            ]
          : [])
      ]
    };

    return {
      meta,
      renderType,
      action,
      animationClassName,
      active: itemIndex === activeTab,
      onChangeNav() {
        onChangeNav(itemIndex);
      },
      toolbarExtend: this.makeToolbarPropsFromConfig2(cloneRemoveConfig)
    };
  }

  removeItem(itemIndex) {
    const dbValue = this.getDBValue() || [];
    const updatedValue = removeAt(dbValue, itemIndex);

    this.props.onChangeNav(0);

    setTimeout(() => {
      this.handleValueChange(updatedValue, { arrayOperation: "remove" });
    }, 0);
  }
}
