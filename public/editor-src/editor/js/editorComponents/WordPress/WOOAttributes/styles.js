import { renderStyles } from "visual/utils/cssStyle";

export function style(v, vs, vd) {
  const styles = {
    ".brz &&:hover": {
      standart: ["cssStyleSizeWidth"]
    },
    ".brz &&:hover .woocommerce-product-attributes-item": {
      standart: [
        "cssStyleElementWOOAttributesAttributesFontFamily",
        "cssStyleElementWOOAttributesAttributesFontSize",
        "cssStyleElementWOOAttributesAttributesFontWeight",
        "cssStyleElementWOOAttributesAttributesLetterSpacing",
        "cssStyleElementWOOAttributesAttributesFontVariation",
        "cssStyleElementWOOAttributesAttributeColor"
      ]
    },
    ".brz &&:hover .woocommerce-product-attributes-item .woocommerce-product-attributes-item__label":
      {
        standart: [
          "cssStyleElementWOOAttributesAttributesLineHeight",
          "cssStyleElementWOOAttributesSpacing"
        ]
      },
    ".brz &&:hover .woocommerce-product-attributes-item .woocommerce-product-attributes-item__value":
      {
        standart: [
          "cssStyleElementWOOAttributesAttributesLineHeight",
          "cssStyleElementWOOAttributesSpacing"
        ]
      },
    ".brz &&:hover table th": {
      standart: ["cssStyleElementWOOAttributesBorder"]
    },
    ".brz &&:hover table td": {
      standart: ["cssStyleElementWOOAttributesBorder"]
    },
    ".brz && table tr:last-child th, .brz && table tr:last-child td": {
      standart: ["cssStyleElementWOOAttributesLastElementBorder"]
    },
    ".brz &&:hover h2": {
      standart: [
        "cssStyleElementWOOAdditionalTitleFontFamily",
        "cssStyleElementWOOAdditionalTitleFontSize",
        "cssStyleElementWOOAdditionalTitleLineHeight",
        "cssStyleElementWOOAdditionalTitleFontWeight",
        "cssStyleElementWOOAdditionalTitleLetterSpacing",
        "cssStyleElementWOOAdditionalTitleFontVariation",
        "cssStyleElementWOOAdditionalTitleColor",
        "cssStyleElementWOOAdditionalTitleSpacing"
      ]
    }
  };

  return renderStyles({ v, vs, vd, styles });
}
