import { keyToDCFallback2Key } from "visual/editorComponents/EditorComponent/DynamicContent/utils";
import Config from "visual/global/Config";
import { DCTypes } from "visual/global/Config/types/DynamicContent";
import {
  getColorPaletteColor,
  hexToRgba,
  makeStylePaletteCSSVar
} from "visual/utils/color";
import { makePlaceholder } from "visual/utils/dynamicContent";
import { t } from "visual/utils/i18n";
import { defaultValueValue } from "visual/utils/onChange";
import {
  getDynamicContentOption,
  getOptionColorHexByPalette
} from "visual/utils/options";
import { NORMAL } from "visual/utils/stateMode";
import { capByPrefix } from "visual/utils/string";
import { getPopulationColor } from "../utils/dependencies";
import { ColorOption } from "./types";
import { colorValues, gradientValues } from "./utils";

const getColorValue = ({ hex, opacity }) => hexToRgba(hex, opacity);

const shadowToString = (value, config) => {
  if (value.palette) {
    const { palette, opacity, horizontal, vertical, blur } = value;
    return `rgba(var(${makeStylePaletteCSSVar(
      palette,
      config
    )}),${opacity}) ${horizontal}px ${vertical}px ${blur}px`;
  }

  return `${getColorValue({
    hex: value.hex,
    opacity: value.opacity
  })} ${value.horizontal}px ${value.vertical}px ${value.blur}px`;
};

const getColorValues = (v, patch, prefix = "") => {
  const bgColorPaletteKey = capByPrefix(prefix, "bgColorPalette");
  const gradientColorPaletteKey = capByPrefix(prefix, "gradientColorPalette");

  const isColorPalette =
    patch[bgColorPaletteKey] !== v[bgColorPaletteKey] &&
    getColorPaletteColor(patch[bgColorPaletteKey]);

  const bgColorHex = isColorPalette
    ? getColorPaletteColor(patch[bgColorPaletteKey]).hex
    : patch[capByPrefix(prefix, "bgColorHex")];
  const gradientColorHex = patch[gradientColorPaletteKey]
    ? getColorPaletteColor(patch[gradientColorPaletteKey]).hex
    : patch[capByPrefix(prefix, "gradientColorHex")];

  return {
    ...patch,
    [capByPrefix(prefix, "bgColorHex")]: bgColorHex,
    [capByPrefix(prefix, "gradientColorHex")]: gradientColorHex
  };
};

const changeColor = (value, type, config, prefix = "") => {
  const selectType = value[capByPrefix(prefix, "bgColorType")];
  const v = value;

  switch (selectType) {
    case "gradient":
      return Object.assign({}, v, gradientValues(type, value, prefix));
    case "solid":
      return Object.assign({}, v, colorValues(type, value, config, prefix));
    default:
      return Object.assign(
        {},
        v,
        gradientValues(type, value, prefix),
        colorValues(type, value, config, prefix)
      );
  }
};

function getPopulationTabs({ populationColor }, onChange) {
  const translationsMap = {
    p: "P",
    h1: "H1",
    h2: "H2",
    h3: "H3",
    h4: "H4",
    h5: "H5",
    h6: "H6"
  };

  return Object.entries(translationsMap).map(([key, value]) => ({
    id: value,
    label: value,
    options: [
      {
        id: `paragraphColor${value}`,
        type: "colorPicker",
        dependencies: (data) =>
          onChange({
            ...data,
            populationColor: getPopulationColor(populationColor, key, data)
          })
      }
    ]
  }));
}

function getPopulationColorOptions({ populationColor }, onChange) {
  return [
    {
      id: "colorTabs",
      type: "tabs",
      tabs: getPopulationTabs({ populationColor }, onChange)
    }
  ];
}

function patchImage(v, patch) {
  const {
    imageSrc = v.imageSrc,
    imageExtension = v.imageExtension,
    imageFileName = v.imageFileName,
    imageHeight = v.imageHeight,
    imageWidth = v.imageWidth,
    positionX = v.imagePositionX,
    positionY = v.imagePositionY
  } = patch;
  const imagePositionX = positionX || 50;
  const imagePositionY = positionY || 50;

  return {
    imageSrc,
    imageFileName,
    imageExtension,
    imageWidth,
    imageHeight,
    imagePositionX,
    imagePositionY
  };
}

function patchImagePopulation(v, patch) {
  const {
    imagePopulation,
    imagePopulationEntityId,
    imagePopulationEntityType
  } = patch;
  const imageData = {
    imageSrc: v.imageSrc,
    imageFileName: v.imageFileName,
    imageExtension: v.imageExtension,
    imageWidth: v.imageWidth,
    imageHeight: v.imageHeight,
    imagePositionX: v.imagePositionX,
    imagePositionY: v.imagePositionY
  };
  const populationAttr = {};

  if (imagePopulationEntityId) {
    populationAttr.entityId = imagePopulationEntityId;
  }
  if (imagePopulationEntityType) {
    populationAttr.entityType = imagePopulationEntityType;
  }

  const population = imagePopulation
    ? makePlaceholder({ content: imagePopulation, attr: populationAttr })
    : undefined;

  return { ...imageData, imagePopulation: population };
}

function getSimpleColorOptions(v, { context, device }, onChange) {
  const config = Config.getAll();

  const imageDynamicContentChoices = getDynamicContentOption({
    options: context.dynamicContent.config,
    type: DCTypes.image,
    config: { show: true }
  });

  return [
    {
      id: "colorTabs",
      type: "tabs",
      tabs: [
        {
          id: "tabText",
          label: t("Color"),
          options: [
            {
              id: "",
              type: "backgroundColor",
              states: [NORMAL],
              config: {
                withNone: false
              },
              dependencies: (value) => {
                onChange(
                  changeColor(
                    getColorValues(v, value),
                    ColorOption.Color,
                    config
                  )
                );
              }
            }
          ]
        },
        {
          id: "tabBg",
          label: t("Bg. Color"),
          options: [
            {
              id: "text",
              type: "backgroundColor",
              icon: "nc-bold",
              title: t("Text Bg. Color"),
              dependencies: (value) => {
                onChange(
                  changeColor(
                    getColorValues(v, value, "text"),
                    ColorOption.Background,
                    config,
                    "text"
                  )
                );
              }
            }
          ]
        },
        {
          id: "tabShadow",
          label: t("Shadow"),
          options: [
            {
              id: "textShadow",
              type: "textShadow",
              icon: "nc-bold",
              title: t("Text Shadow"),
              dependencies: ({
                textShadowBlur,
                textShadowColorHex,
                textShadowHorizontal,
                textShadowColorOpacity,
                textShadowColorPalette,
                textShadowVertical
              }) => {
                let shadow = {
                  hex: textShadowColorHex,
                  opacity: textShadowColorOpacity,
                  horizontal: textShadowHorizontal,
                  vertical: textShadowVertical,
                  blur: textShadowBlur
                };

                let shadowColorPalette = null;

                if (textShadowColorPalette) {
                  shadow = { ...shadow, palette: textShadowColorPalette };
                  shadowColorPalette = textShadowColorPalette;
                }

                onChange({
                  shadow: shadowToString(shadow, config),
                  shadowColorPalette
                });
              }
            }
          ]
        },
        {
          id: "tabImage",
          label: t("Mask"),
          options: [
            // Use population option type instead of using the `legacy-population` config for imageUpload,
            // because the population id and imageUpload id are different.
            {
              id: "image",
              type: "population",
              label: t("Image"),
              config: imageDynamicContentChoices,
              fallback: {
                id: keyToDCFallback2Key("image"),
                type: "imageUpload"
              },
              option: {
                id: "",
                type: "imageUpload",
                config: {
                  edit: device === "desktop",
                  disableSizes: true
                },
                dependencies: (patch) => {
                  onChange({ backgroundImage: patchImage(v, patch) });
                }
              },
              dependencies: (patch) => {
                onChange({
                  backgroundImage: patchImagePopulation(v, patch)
                });
              }
            }
          ]
        }
      ]
    }
  ];
}

function getTextPopulationOptions() {
  return [
    {
      id: "tabsColor",
      className: "",
      type: "tabs",
      tabs: [
        {
          id: "tabText",
          label: t("Color"),
          options: [
            {
              id: "",
              type: "backgroundColor",
              states: [NORMAL]
            }
          ]
        },
        {
          id: "tabBg",
          label: t("Bg. Color"),
          options: [
            {
              id: "text",
              type: "backgroundColor",
              states: [NORMAL]
            }
          ]
        },
        {
          id: "tabShadow",
          label: t("Shadow"),
          options: [
            {
              id: "textShadow",
              type: "textShadow"
            }
          ]
        },
        {
          id: "mask",
          label: t("Mask"),
          options: [
            {
              id: "bg",
              type: "imageUpload"
            }
          ]
        }
      ]
    }
  ];
}

const getColorToolbar = (v, { device, context }, onChange) => {
  const {
    isPopulationBlock,
    populationColor,
    colorOpacity,
    textPopulation,
    color
  } = v;

  let backgroundColor;

  const dvv = (key) => defaultValueValue({ v, key, device });

  if (textPopulation) {
    const { hex: colorHex } = getOptionColorHexByPalette(
      dvv("bgColorHex"),
      dvv("bgColorPalette")
    );
    backgroundColor = hexToRgba(colorHex, colorOpacity);
  } else {
    // something the color is not defined
    backgroundColor = getColorValue(color ?? {});
  }

  return {
    id: "toolbarColor",
    type: "popover",
    config: {
      size: "medium",
      title: t("Colors"),
      icon: {
        style: {
          backgroundColor
        }
      }
    },
    devices: "desktop",
    roles: ["admin"],
    position: 20,
    options: isPopulationBlock
      ? getPopulationColorOptions({ populationColor }, onChange)
      : v.textPopulation
      ? getTextPopulationOptions()
      : getSimpleColorOptions(v, { device, context }, onChange)
  };
};

export default getColorToolbar;
