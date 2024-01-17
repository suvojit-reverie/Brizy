import {
  cssStyleBgColor,
  cssStyleBgGradient,
  cssStyleBorder,
  cssStyleBorderRadius,
  cssStyleBoxShadow,
  cssStyleColor,
  cssStyleDisplayFlex,
  cssStyleDisplayNone,
  cssStyleFlexHorizontalAlign,
  cssStyleSizePadding,
  cssStyleSpacing,
  cssStyleTextAlign,
  getAllCssStyleTypography
} from "visual/utils/cssStyle";
import { defaultValueValue } from "visual/utils/onChange";
import { CSSValue } from "visual/utils/style2/types";

// Style Sorting Option
export function cssStyleElementEcwidProductsSortingDisplay({
  v,
  device
}: CSSValue): string {
  const dvv = (key: string): unknown => defaultValueValue({ v, key, device });

  return dvv("sortingOptions") === "off"
    ? cssStyleDisplayNone()
    : cssStyleDisplayFlex();
}

export function cssStyleElementEcwidProductsSortingTypography({
  v,
  device,
  state
}: CSSValue): string {
  return getAllCssStyleTypography({
    v,
    device,
    state,
    prefix: "sortingTypography"
  });
}

export function cssStyleElementEcwidProductsSortingSize({
  v,
  device,
  state
}: CSSValue): string {
  return cssStyleSizePadding({
    v,
    device,
    state,
    prefix: "sorting"
  });
}

export function cssStyleElementEcwidProductsSortingColor({
  v,
  device,
  state
}: CSSValue): string {
  return cssStyleColor({ v, device, state, prefix: "sortingColor" });
}

export function cssStyleElementEcwidProductsSortingBgColor({
  v,
  device,
  state
}: CSSValue): string {
  return cssStyleBgColor({ v, device, state, prefix: "sortingBg" });
}

export function cssStyleElementEcwidProductsSortingBgGradient({
  v,
  device,
  state
}: CSSValue): string {
  return cssStyleBgGradient({ v, device, state, prefix: "sorting" });
}

export function cssStyleElementEcwidProductsSortingBorder({
  v,
  device,
  state
}: CSSValue): string {
  return cssStyleBorder({ v, device, state, prefix: "sorting" });
}

export function cssStyleElementEcwidProductsSortingBorderRadius({
  v,
  device,
  state
}: CSSValue): string {
  return cssStyleBorderRadius({ v, device, state, prefix: "sorting" });
}

export function cssStyleElementEcwidProductsSortingBoxShadow({
  v,
  device,
  state
}: CSSValue): string {
  return cssStyleBoxShadow({ v, device, state, prefix: "sorting" });
}

export function cssStyleElementEcwidProductsSortingAlign({
  v,
  device,
  state
}: CSSValue): string {
  return cssStyleFlexHorizontalAlign({ v, device, state, prefix: "sorting" });
}

export function cssStyleElementEcwidProductsSortingSpacing({
  v,
  device,
  state
}: CSSValue): string {
  return cssStyleSpacing({
    v,
    device,
    state,
    prefix: "sorting",
    direction: "bottom"
  });
}

export function cssStyleElementEcwidProductsSortingSpacingRight({
  v,
  device,
  state
}: CSSValue): string {
  return cssStyleSpacing({
    v,
    device,
    state,
    prefix: "sortingRight",
    direction: "right"
  });
}

// Style Products
export function cssStyleElementEcwidProductsBgColor({
  v,
  device,
  state
}: CSSValue): string {
  return cssStyleBgColor({ v, device, state, prefix: "productsBg" });
}

export function cssStyleElementEcwidProductsBgGradient({
  v,
  device,
  state
}: CSSValue): string {
  return cssStyleBgGradient({ v, device, state, prefix: "products" });
}

export function cssStyleElementEcwidProductsBorder({
  v,
  device,
  state
}: CSSValue): string {
  return cssStyleBorder({ v, device, state, prefix: "products" });
}

export function cssStyleElementEcwidProductsBoxShadow({
  v,
  device,
  state
}: CSSValue): string {
  return cssStyleBoxShadow({ v, device, state, prefix: "products" });
}

export function cssStyleElementEcwidProductsGalleryLabelDisplay({
  v,
  device,
  state
}: CSSValue): string {
  const dvv = (key: string): unknown =>
    defaultValueValue({ v, key, device, state });
  const editLabel = dvv("editLabel");

  return editLabel === "off" ? cssStyleDisplayNone() : cssStyleDisplayFlex();
}

export function cssStyleElementEcwidProductsGalleryBottomSpacing({
  v,
  device,
  state
}: CSSValue): string {
  return cssStyleSpacing({
    v,
    device,
    state,
    prefix: "galleryBottom",
    direction: "bottom"
  });
}

// Style SKU
export function cssStyleElementEcwidProductsSKUTypography({
  v,
  device,
  state
}: CSSValue): string {
  return getAllCssStyleTypography({
    v,
    device,
    state,
    prefix: "skuTypography"
  });
}

export function cssStyleElementEcwidProductsSKUColor({
  v,
  device,
  state
}: CSSValue): string {
  return cssStyleColor({ v, device, state, prefix: "skuColor" });
}

export function cssStyleElementEcwidProductsSKUSpacing({
  v,
  device,
  state
}: CSSValue): string {
  return cssStyleSpacing({
    v,
    device,
    state,
    prefix: "sku",
    direction: "bottom"
  });
}

export function cssStyleElementEcwidProductsSubtitleSpacing({
  v,
  device,
  state
}: CSSValue): string {
  return cssStyleSpacing({
    v,
    device,
    state,
    prefix: "subtitle",
    direction: "bottom"
  });
}

// Style Count pages
export function cssStyleElementEcwidProductsCountPagesTypography({
  v,
  device,
  state
}: CSSValue): string {
  return getAllCssStyleTypography({
    v,
    device,
    state,
    prefix: "countPagesTypography"
  });
}

export function cssStyleElementEcwidProductsCountPagesColor({
  v,
  device,
  state
}: CSSValue): string {
  return cssStyleColor({ v, device, state, prefix: "countPagesColor" });
}

export function cssStyleElementEcwidProductsCountPagesAlign({
  v,
  device,
  state
}: CSSValue): string {
  return cssStyleTextAlign({ v, device, state, prefix: "countPages" });
}

export function cssStyleElementEcwidProductsCountPagesSpacing({
  v,
  device,
  state
}: CSSValue): string {
  return cssStyleSpacing({
    v,
    device,
    state,
    prefix: "countPages",
    direction: "bottom"
  });
}

// Style Pagination
export function cssStyleElementEcwidProductsPaginationTypography({
  v,
  device,
  state
}: CSSValue): string {
  return getAllCssStyleTypography({
    v,
    device,
    state,
    prefix: "paginationTypography"
  });
}

export function cssStyleElementEcwidProductsPaginationSpacing({
  v,
  device,
  state
}: CSSValue): string {
  return cssStyleSpacing({
    v,
    device,
    state,
    prefix: "pagination",
    direction: "bottom"
  });
}

// Style Featured Products Title
export function cssStyleElementEcwidProductsFeaturedProductsTypography({
  v,
  device,
  state
}: CSSValue): string {
  return getAllCssStyleTypography({
    v,
    device,
    state,
    prefix: "featuredProductsTypography"
  });
}

export function cssStyleElementEcwidProductsFeaturedProductsColor({
  v,
  device,
  state
}: CSSValue): string {
  return cssStyleColor({ v, device, state, prefix: "featuredProductsColor" });
}

export function cssStyleElementEcwidProductsFeaturedProductsAlign({
  v,
  device,
  state
}: CSSValue): string {
  return cssStyleTextAlign({ v, device, state, prefix: "featuredProducts" });
}

export function cssStyleElementEcwidProductsFeaturedProductsSpacing({
  v,
  device,
  state
}: CSSValue): string {
  return cssStyleSpacing({
    v,
    device,
    state,
    prefix: "featuredProducts",
    direction: "bottom"
  });
}

// Style Label
export function cssStyleElementEcwidProductsLabelTypography({
  v,
  device,
  state
}: CSSValue): string {
  return getAllCssStyleTypography({
    v,
    device,
    state,
    prefix: "labelTypography"
  });
}

export function cssStyleElementEcwidProductsLabelBorderRadius({
  v,
  device,
  state
}: CSSValue): string {
  return cssStyleBorderRadius({ v, device, state, prefix: "label" });
}

export function cssStyleElementEcwidProductsBuyButton({
  v,
  device,
  state
}: CSSValue): string {
  // need to check
  return cssStyleSizePadding({ v, device, state, prefix: "button" });
}

export function cssStyleElementEcwidProductsGallerySize({
  v,
  device
}: CSSValue): string {
  const dvv = (key: string): unknown => defaultValueValue({ v, key, device });

  return dvv("galleryWidth") === "custom"
    ? `width: calc(100%/${dvv("galleryCustomSize")});`
    : "";
}
