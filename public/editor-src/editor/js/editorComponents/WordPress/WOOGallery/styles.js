import { renderStyles } from "visual/utils/cssStyle";

export function style(v, vs, vd) {
  const styles = {
    ".brz &&:hover": {
      standart: ["cssStyleSizeWidth"]
    },
    ".brz && .woocommerce-product-gallery > .flex-viewport:hover": {
      standart: ["cssStyleBoxShadow", "cssStyleBorder", "cssStyleBorderRadius"],
      interval: ["cssStyleHoverTransition", "cssStylePropertyHoverTransition"]
    },
    ".brz && .woocommerce-product-gallery > .woocommerce-product-gallery__wrapper:hover": {
      standart: ["cssStyleBoxShadow", "cssStyleBorder", "cssStyleBorderRadius"],
      interval: ["cssStyleHoverTransition", "cssStylePropertyHoverTransition"]
    },
    ".brz &&:hover .flex-control-thumbs": {
      standart: [
        "cssStyleElementWOOGalleryParentSize",
        "cssStyleElementWOOGallerySpacing",
        "cssStyleElementWOOGallerySpacingStyleLeftRigth",
        "cssStyleElementWOOGalleryChildStyle"
      ]
    },
    ".brz && .flex-control-thumbs li:hover": {
      standart: [
        "cssStyleElementWOOGalleryBetweenThumbnail",
        "cssStyleElementWOOGalleryThumbnailSize",
        "cssStyleElementWOOGalleryBoxShadowThumbnail",
        "cssStyleElementWOOGalleryBorderRadiusThumbnail",
        "cssStyleElementWOOGalleryBorderThumbnail"
      ],
      interval: ["cssStyleHoverTransition", "cssStylePropertyHoverTransition"]
    },
    ".brz && .woocommerce-product-gallery__trigger": {
      standart: ["cssStyleElementWOOGalleryZoomReposition"]
    }
  };

  return renderStyles({ v, vs, vd, styles });
}
