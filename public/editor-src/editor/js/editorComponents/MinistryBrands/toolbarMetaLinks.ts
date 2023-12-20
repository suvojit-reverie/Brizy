import { ElementModel } from "visual/component/Elements/Types";
import { hexToRgba } from "visual/utils/color";
import { t } from "visual/utils/i18n";
import { defaultValueValue } from "visual/utils/onChange";
import { getOptionColorHexByPalette } from "visual/utils/options";
import { HOVER, NORMAL } from "visual/utils/stateMode";
import { Params } from "../EditorComponent/types";
import { ToolbarItemType } from "../ToolbarItemType";

export const getItems = <
  M extends ElementModel,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  P extends Record<string, any> = Record<string, unknown>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  S extends Record<string, any> = Record<string, unknown>
>({
  v,
  device
}: Params<M, P, S>): ToolbarItemType[] => {
  const dvv = (key: string): unknown => defaultValueValue({ v, key, device });

  const { hex: metaLinksColorHex } = getOptionColorHexByPalette(
    dvv("metaLinksColorHex"),
    dvv("metaLinksColorPalette")
  );
  return [
    {
      id: "toolbarTypography",
      type: "popover-dev",
      config: {
        icon: "nc-font",
        size: device === "desktop" ? "large" : "auto",
        title: t("Typography")
      },
      position: 70,
      options: [
        {
          id: "metaLinksTypography",
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
      devices: "desktop",
      config: {
        title: t("Colors"),
        size: "medium",
        icon: {
          style: {
            backgroundColor: hexToRgba(
              metaLinksColorHex,
              dvv("metaLinksColorOpacity")
            )
          }
        }
      },
      position: 80,
      options: [
        {
          id: "metaLinksColor",
          type: "colorPicker-dev",
          states: [NORMAL, HOVER]
        }
      ]
    }
  ];
};
