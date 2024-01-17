import { GetItems } from "visual/editorComponents/EditorComponent/types";
import { ToolbarItemType } from "visual/editorComponents/ToolbarItemType";
import { hexToRgba } from "visual/utils/color";
import { t } from "visual/utils/i18n";
import { defaultValueValue } from "visual/utils/onChange";
import { getOptionColorHexByPalette } from "visual/utils/options";
import { HOVER, NORMAL } from "visual/utils/stateMode";
import { Value } from "./types/Value";

export const getItems: GetItems<Value> = ({
  v,
  device,
  state
}): ToolbarItemType[] => {
  const dvv = (key: string) => defaultValueValue({ v, key, device, state });

  const { hex: totalProductsCountColorHex } = getOptionColorHexByPalette(
    dvv("cartTotalProductsCountColorHex"),
    dvv("cartTotalProductsCountColorPalette")
  );

  return [
    {
      id: "toolbarTypographyCartTotalProductsCount",
      type: "popover",
      config: {
        icon: "nc-font",
        size: device === "desktop" ? "large" : "auto",
        title: t("Typography")
      },
      position: 10,
      options: [
        {
          id: "cartTotalProductsCountTypography",
          type: "typography",
          config: {
            fontFamily: device === "desktop"
          }
        }
      ]
    },
    {
      id: "toolbarColorCartTotalProductsCount",
      type: "popover",
      config: {
        size: "auto",
        title: t("Colors"),
        icon: {
          style: {
            backgroundColor: hexToRgba(
              totalProductsCountColorHex,
              dvv("cartTotalProductsCountColorOpacity")
            )
          }
        }
      },
      devices: "desktop",
      position: 20,
      options: [
        {
          id: "cartTotalProductsCountColor",
          type: "colorPicker",
          states: [NORMAL, HOVER]
        }
      ]
    }
  ];
};
