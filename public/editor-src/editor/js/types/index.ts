import { Dictionary } from "./utils";
import { ElementModel } from "editor/js/component/Elements/Types";
import { Palette as ColorPalette } from "visual/utils/color/Palette";
import { Hex } from "visual/utils/color/Hex";
import Config from "visual/global/Config";
import { isWp } from "visual/global/Config/types/configs/WP";
import { GetCollectionItem_collectionItem as CollectionItem } from "visual/utils/api/cms/graphql/types/GetCollectionItem";

export type V = Dictionary<unknown>;

// blocks

export type BlockMetaType = "normal" | "popup";

export type Block = {
  type: string;
  value: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  blockId: string;
  deleted?: boolean;
};

export enum BlockTypeRule {
  include = 1,
  exclude = 2
}

export interface AllRule {
  type: BlockTypeRule;
}

export interface CollectionTypeRule extends AllRule {
  appliedFor: number | null;
  entityType: string;
  // temporary only in fixes
  entityValues: (number | string)[];
}

export interface CollectionItemRule extends AllRule {
  appliedFor: number | null;
  entityType: string;
  mode: "reference" | "specific";
  entityValues: (number | string)[];
}

export type Rule = AllRule | CollectionTypeRule | CollectionItemRule;

export type GlobalBlock = {
  data: Block & { deleted?: boolean };
  status: "draft" | "publish";
  rules: Rule[];
  position: GlobalBlockPosition | null;
  meta: {
    type: BlockMetaType;
    extraFontStyles: ExtraFontStyle[];
    _thumbnailSrc?: string;
    _thumbnailWidth?: number;
    _thumbnailHeight?: number;
    _thumbnailTime?: number;
  };
};

export type SavedBlock = {
  data: Block;
  dataVersion: number;
  meta: {
    type: BlockMetaType;
    extraFontStyles: ExtraFontStyle[];
    _thumbnailSrc?: string;
    _thumbnailWidth?: number;
    _thumbnailHeight?: number;
    _thumbnailTime?: number;
  };
};

export type SavedLayout = {
  data: PageCommon["data"];
  dataVersion: number;
  meta: {
    type: BlockMetaType;
    extraFontStyles: ExtraFontStyle[];
    _thumbnailSrc?: string;
    _thumbnailWidth?: number;
    _thumbnailHeight?: number;
    _thumbnailTime?: number;
  };
};

export type GlobalBlockPosition = {
  align: "top" | "bottom";
  top: number;
  bottom: number;
};

//#region Page

export interface DataCommon {
  id: string;
  data: {
    items: Block[];
    [k: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  };
  dataVersion: number;
  status: "draft" | "publish";
}

interface DataWithTitle extends DataCommon {
  title: string;
}

export interface PageCommon extends DataWithTitle {
  slug: string;
}

export interface PageWP extends PageCommon {
  _kind: "wp";
  is_index: boolean; // TODO: would be nice if WP and cloud types would match
  template: string;
  url: string; // TODO: find out what is this for
}

export interface ExternalStoryCloud extends DataCommon {
  slug: string;
}

export interface InternalPopupCloud extends DataWithTitle {
  rules: Rule[];
  project: number;
}

export interface PageCollection extends PageCommon {
  collectionType: {
    id: string;
    title: string;
  };
  fields: CollectionItem["fields"] | null;
}

export interface PageCustomer extends DataWithTitle {
  groups: {
    id: string;
    name: string;
  }[];
}

export interface CloudPopup extends PageCollection {
  rules: Rule[];
}

export type ExternalPopupCloud = DataCommon;

export interface ShopifyPage extends PageCommon {
  layout: {
    id: string;
    value: string | undefined;
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const isWPPage = (page: Page): page is PageWP => {
  return isWp(Config.getAll());
};

export type Page =
  | PageWP
  | PageCollection
  | ShopifyPage
  | PageCustomer
  | InternalPopupCloud
  | ExternalPopupCloud
  | CloudPopup;

//#endregion

// fonts

export type GoogleFont = {
  kind: "webfonts#webfont";
  family: string;
  category: string;
  variants: string[];
  subsets: string[];
  version: string;
  lastModified: string;
  files: {
    [k: string]: string;
  };
  brizyId: string;
  deleted?: boolean;
};

export type UploadedFont = {
  id: string;
  family: string;
  type: "uploaded";
  weights: string[];
  brizyId: string;
  deleted?: boolean;
};

// authorized

export type Authorized = "pending" | "connected" | "disconnect";

// syncAllowed

export type SyncAllowed = boolean;

// deviceMode

export type DeviceMode = "desktop" | "tablet" | "mobile";

// screenshot

export type Screenshot = {
  _thumbnailSrc: string;
  _thumbnailWidth: number;
  _thumbnailHeight: number;
  _thumbnailTime: number;
};

// style

export interface FontStyle {
  deletable: "off" | "on";
  id: string;
  title: string;
  fontFamily: string;
  fontFamilyType: string;
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
  letterSpacing: number;
  tabletFontSize: number;
  tabletFontWeight: number;
  tabletLineHeight: number;
  tabletLetterSpacing: number;
  mobileFontSize: number;
  mobileFontWeight: number;
  mobileLineHeight: number;
  mobileLetterSpacing: number;
}

export interface Palette {
  id: ColorPalette;
  hex: Hex;
}

export interface Style {
  id: string;
  title: string;
  fontStyles: FontStyle[];
  colorPalette: Palette[];
}

export interface ExtraFontStyle {
  id: string;
}

// Shortcodes

export type Shortcode = {
  component: {
    title: string;
    icon: string;
    id: string;
    resolve: ElementModel;
    position?: number;
    hidden?: boolean;
  };
  pro: boolean;
};

export type Shortcodes = {
  [k: string]: Shortcode[];
};
