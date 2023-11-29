import { ThunkAction } from "redux-thunk";
import { mergeDeep } from "timm";
import _ from "underscore";
import { PublishData } from "visual/global/Config/types/configs/ConfigCommon";
import { fontsSelector } from "visual/redux/selectors";
import {
  ActiveElement,
  Authorized,
  Block,
  DeviceMode,
  ExtraFontStyle,
  Font,
  GlobalBlock,
  GlobalBlockNormal,
  GlobalBlockPopup,
  GoogleFont,
  ShopifyPage,
  Style,
  SystemFont,
  UploadedFont
} from "visual/types";
import { ArrayType } from "visual/utils/array/types";
import { uuid } from "visual/utils/uuid";
import { ReduxState, StoreChanged } from "./types";

type UIState = ReduxState["ui"];

type SyncAllowed = ReduxState["syncAllowed"];

type RFonts = ReduxState["fonts"];

type StrictFonts = Required<RFonts>;
export type FontKeyTypes = keyof StrictFonts;

type FontPayload<T extends FontKeyTypes> = {
  type: T;
  fonts: ArrayType<StrictFonts[T]["data"]>[];
};

export type FontsPayload = FontPayload<FontKeyTypes>[];

/// actions

export type ActionHydrate = {
  type: "HYDRATE";
  payload: {
    project: ReduxState["project"];
    projectStatus: {
      locked: boolean;
      lockedBy: boolean | string;
    };
    globalBlocks: ReduxState["globalBlocks"];
    fonts: RFonts;
    page: ReduxState["page"];
    authorized: ReduxState["authorized"];
    syncAllowed: ReduxState["syncAllowed"];
  };
};

export type ActionUpdateBlocks = {
  type: "UPDATE_BLOCKS";
  payload: {
    blocks: Block[];
  };
  meta: {
    is_autosave: 1 | 0;
  };
};

export type ActionMakeNormalToGlobalBlock = {
  type: "MAKE_NORMAL_TO_GLOBAL_BLOCK";
  payload: GlobalBlockNormal;
};

export type ActionMakeGlobalToNormalBlock = {
  type: "MAKE_GLOBAL_TO_NORMAL_BLOCK";
  payload: { block: Block; fromBlockId: string };
};

export type ActionMakePopupToGlobalBlock = {
  type: "MAKE_POPUP_TO_GLOBAL_BLOCK";
  payload: GlobalBlockPopup;
};

export type ActionMakeGlobalBlockToPopup = {
  type: "MAKE_GLOBAL_BLOCK_TO_POPUP";
  payload: { block: Block; fromBlockId: string; parentId: string };
};

export type ActionUpdateGlobalBlock = {
  type: "UPDATE_GLOBAL_BLOCK";
  payload: {
    id: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    title?: string;
    tags?: string;
  };
  meta: {
    is_autosave: 0 | 1;
  };
};

export const UPDATE_DISABLED_ELEMENTS = "UPDATE_DISABLED_ELEMENTS";

export type ActionDisabledElements = {
  type: typeof UPDATE_DISABLED_ELEMENTS;
  payload: string[];
};

export const UPDATE_CURRENT_KIT_ID = "UPDATE_CURRENT_KIT_ID";

export type ActionUpdateKitId = {
  type: typeof UPDATE_CURRENT_KIT_ID;
  payload: string;
};

export const ADD_FONTS = "ADD_FONTS";

export type ActionAddFonts = {
  type: "ADD_FONTS";
  payload: RFonts;
};

export const DELETE_FONTS = "DELETE_FONTS";

export type ActionDeleteFont = {
  type: typeof DELETE_FONTS;
  payload: RFonts;
};

export const UPDATE_DEFAULT_FONT = "UPDATE_DEFAULT_FONT";

export interface ActionUpdateDefaultFont {
  type: typeof UPDATE_DEFAULT_FONT;
  payload: string;
}

export type ActionUpdateTriggers = {
  type: "UPDATE_TRIGGERS";
  payload: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any; // TODO need change any to normal value @Alex T
  };
};

export type ActionUpdatePopupRules = {
  type: "UPDATE_POPUP_RULES";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any; // TODO need change any to normal value @Alex T
};

type ActionUpdateUITmp<K extends keyof UIState> = {
  type: "UPDATE_UI";
  key: K;
  value: UIState[K];
};
export type ActionUpdateUI = ActionUpdateUITmp<keyof UIState>;

export const ADD_GLOBAL_BLOCK = "ADD_GLOBAL_BLOCK";

export type ActionAddGlobalBlock = {
  type: typeof ADD_GLOBAL_BLOCK;
  payload: {
    block: Block;
    fonts: FontsPayload;
    extraFontStyles?: ReduxState["extraFontStyles"];
  };
  meta: {
    insertIndex: number;
  };
};

export type ActionDeleteGlobalBlock = {
  type: "DELETE_GLOBAL_BLOCK";
  payload: {
    id: string;
  };
};

export type ActionAddBlock = {
  type: "ADD_BLOCK";
  payload: {
    block: Block;
    fonts: FontsPayload;
    extraFontStyles?: ReduxState["extraFontStyles"];
  };
  meta: {
    insertIndex: number;
  };
};

export type ActionRemoveBlock = {
  type: "REMOVE_BLOCK";
  payload: {
    index: number;
    id: string;
  };
};

export type ActionRemoveBlocks = {
  type: "REMOVE_BLOCKS";
};

export type ActionUpdateGBRules = {
  type: "UPDATE_GB_RULES";
  payload: {
    rules: GlobalBlock["rules"];
    id: string;
  };
  meta: {
    syncSuccess: (s?: void) => void;
    syncFail: (e?: void) => void;
  };
};

export type ActionReorderBlocks = {
  type: "REORDER_BLOCKS";
  payload: {
    oldIndex: number;
    newIndex: number;
  };
};

export type ActionStoreWasChanged = {
  type: "STORE_WAS_CHANGED";
  payload: StoreChanged;
};

export type ReduxAction =
  | ActionHydrate
  | ActionUpdateGlobalBlock
  | ActionAddFonts
  | ActionDeleteFont
  | ActionUpdateDefaultFont
  | ActionUpdateUI
  | ActionUpdateAuthorized
  | ActionUpdateSyncAllowed
  | ActionUpdateTriggers
  | ActionUpdatePopupRules
  | ActionUpdatePageStatus
  | ActionUpdateKitId
  | ActionDisabledElements
  | ActionUpdatePageLayout
  | ActionUpdateIsHomePage
  | ActionFetchPageSuccess
  | ActionUpdateExtraFontStyles
  | ActionImportTemplate
  | ActionImportKit
  | ActionImportStory
  | ActionAddBlock
  | ActionAddGlobalBlock
  | ActionDeleteGlobalBlock
  | ActionRemoveBlock
  | ActionUpdateGBRules
  | ActionRemoveBlocks
  | ActionReorderBlocks
  | ActionUpdateBlocks
  | ActionMakeNormalToGlobalBlock
  | ActionMakeGlobalToNormalBlock
  | ActionMakePopupToGlobalBlock
  | ActionMakeGlobalBlockToPopup
  | ActionStoreWasChanged
  | ActionUpdatePageTitle
  | AddNewGlobalStyle
  | UpdateCurrentStyleId;

export type ActionUpdateAuthorized = {
  type: "UPDATE_AUTHORIZATION";
  payload: Authorized;
};

export type ActionUpdatePageTitle = {
  type: "UPDATE_PAGE_TITLE";
  payload: string;
};

export type ActionUpdateSyncAllowed = {
  type: "UPDATE_SYNC_ALLOWED";
  payload: SyncAllowed;
};

export const PUBLISH = "PUBLISH";

interface PublishBase {
  status: ReduxState["page"]["status"];
}

interface PublishInternal extends PublishBase {
  type: "internal";
}

interface PublishExternal extends PublishBase {
  type: "external";
  res: (data: PublishData) => void;
}

type PublishPayload = PublishInternal | PublishExternal;

export type ActionUpdatePageStatus = {
  type: typeof PUBLISH;
  payload: PublishPayload;
  meta?: {
    onSuccess: (s?: void) => void;
    onError: (e?: void) => void;
  };
};

export type ActionUpdatePageLayout = {
  type: "UPDATE_PAGE_LAYOUT";
  payload: {
    layout: ShopifyPage["layout"]["id"];
  };
};

export type ActionUpdateIsHomePage = {
  type: "UPDATE_PAGE_IS_HOME_PAGE";
  payload: {
    isHomePage: ShopifyPage["layout"]["isHomePage"];
  };
};

export const FETCH_PAGE_SUCCESS = "FETCH_PAGE_SUCCESS";

export type ActionFetchPageSuccess = {
  type: typeof FETCH_PAGE_SUCCESS;
};

export const UPDATE_EXTRA_FONT_STYLES = "UPDATE_EXTRA_FONT_STYLES";

export type ActionUpdateExtraFontStyles = {
  type: typeof UPDATE_EXTRA_FONT_STYLES;
  payload: ReduxState["extraFontStyles"];
};

/// action creators

export { redo, undo } from "./history/actions";

export function makeNormalToGlobalBlock(
  globalBlock: GlobalBlockNormal
): ActionMakeNormalToGlobalBlock {
  return {
    type: "MAKE_NORMAL_TO_GLOBAL_BLOCK",
    payload: globalBlock
  };
}

export function makeGlobalToNormalBlock({
  fromBlockId,
  block
}: {
  fromBlockId: string;
  block: Block;
}): ActionMakeGlobalToNormalBlock {
  return {
    type: "MAKE_GLOBAL_TO_NORMAL_BLOCK",
    payload: {
      fromBlockId,
      block
    }
  };
}

export function makePopupToGlobalBlock(
  globalBlock: GlobalBlockPopup
): ActionMakePopupToGlobalBlock {
  return {
    type: "MAKE_POPUP_TO_GLOBAL_BLOCK",
    payload: globalBlock
  };
}

export function makeGlobalBlockToPopup({
  fromBlockId,
  parentId,
  block
}: {
  fromBlockId: string;
  block: Block;
  parentId: string;
}): ActionMakeGlobalBlockToPopup {
  return {
    type: "MAKE_GLOBAL_BLOCK_TO_POPUP",
    payload: {
      fromBlockId,
      parentId,
      block
    }
  };
}

export function updateGlobalBlock({
  id,
  data,
  title,
  tags,
  meta
}: {
  id: string;
  data: GlobalBlock["data"];
  title?: string;
  tags?: string;
  meta?: {
    is_autosave?: 1 | 0;
    sourceBlockId?: string;
  };
}): ActionUpdateGlobalBlock {
  return {
    type: "UPDATE_GLOBAL_BLOCK",
    payload: { id, data, title, tags },
    meta: {
      is_autosave: 1,
      ...meta
    }
  };
}

// project

export const updateCurrentKitId = (payload: string): ActionUpdateKitId => {
  return {
    type: "UPDATE_CURRENT_KIT_ID",
    payload
  };
};

export const updateDisabledElements = (
  payload: string[]
): ActionDisabledElements => {
  return {
    type: "UPDATE_DISABLED_ELEMENTS",
    payload
  };
};

type ThunkAddFonts = (
  a: FontsPayload
) => ThunkAction<void, ReduxState, unknown, ActionAddFonts>;

export const addFonts: ThunkAddFonts =
  (addedFonts) =>
  (dispatch, getState): ActionAddFonts => {
    const usedFonts = fontsSelector(getState());
    const newFonts = addedFonts.reduce((acc, curr) => {
      const { type, fonts } = curr;

      // current version of tsc (3.7.3) does not allow
      // calling map on (GoogleFont[] | UploadFont[])
      // but does on (GoogleFont | UploadedFont)[]
      const fontData: (GoogleFont | UploadedFont | SystemFont)[] =
        usedFonts[type]?.data || [];

      // Separated Deleted Font with Normal Font
      const [deletedFonts, normalFont] = _.partition(fonts, (font) =>
        Object.prototype.hasOwnProperty.call(font, "deleted")
      );
      const newFonts = normalFont.map((font) => ({ ...font, brizyId: uuid() }));

      // Make new Data, check deleted Font
      return {
        ...acc,
        [type]: {
          data: fontData
            .map(
              (font) =>
                deletedFonts.find(({ brizyId }) => font.brizyId === brizyId) ||
                font
            )
            .concat(newFonts)
        }
      };
    }, {});

    return dispatch({
      type: "ADD_FONTS",
      payload: mergeDeep(usedFonts, newFonts)
    });
  };

type ThunkDeleteFonts = (
  a: FontPayload<FontKeyTypes>
) => ThunkAction<void, ReduxState, unknown, ActionDeleteFont>;

export const deleteFont: ThunkDeleteFonts =
  (payload) =>
  (dispatch, getState): ActionDeleteFont => {
    const { type, fonts: removedFonts } = payload;
    const fonts = fontsSelector(getState());
    const fontData: Font[] = (fonts[type] && fonts[type]?.data) || [];

    const dataFonts = {
      [type]: {
        data: fontData.map((font) =>
          removedFonts.some(({ brizyId }) => brizyId === font.brizyId)
            ? { ...font, deleted: true }
            : font
        )
      }
    };

    return dispatch({
      type: "DELETE_FONTS",
      payload: mergeDeep(fonts, dataFonts)
    });
  };

export const updateDefaultFont = (font: string): ActionUpdateDefaultFont => {
  return {
    type: "UPDATE_DEFAULT_FONT",
    payload: font
  };
};

export const updateExtraFontStyles = (
  styles: ReduxState["extraFontStyles"]
): ActionUpdateExtraFontStyles => {
  return {
    type: "UPDATE_EXTRA_FONT_STYLES",
    payload: styles
  };
};

export function updateUI<K extends keyof UIState>(
  key: K,
  value: UIState[K]
): ActionUpdateUI {
  return {
    type: "UPDATE_UI",
    key,
    value
  };
}

export const updateStoreWasChanged = (
  payload: ReduxState["storeWasChanged"]
): ActionStoreWasChanged => {
  return {
    type: "STORE_WAS_CHANGED",
    payload
  };
};

// pages

export function updateBlocks({
  blocks,
  meta = {}
}: {
  blocks: Block[];
  meta?: {
    is_autosave?: 0 | 1;
  };
}): ActionUpdateBlocks {
  return {
    type: "UPDATE_BLOCKS",
    payload: {
      blocks
    },
    meta: {
      is_autosave: 1,
      ...meta
    }
  };
}

export const fetchPageSuccess = (): ActionFetchPageSuccess => ({
  type: FETCH_PAGE_SUCCESS
});

type ThunkPublishPage = (
  s: ReduxState["page"]["status"]
) => ThunkAction<Promise<void>, ReduxState, unknown, ActionUpdatePageStatus>;

export const updatePageStatus: ThunkPublishPage =
  (status) =>
  (dispatch): Promise<void> => {
    return new Promise((res, rej) => {
      dispatch({
        type: "PUBLISH",
        payload: { status, type: "internal" },
        meta: {
          onSuccess: res,
          onError: rej
        }
      });
    });
  };

export const updatePageLayout = (layout: string): ActionUpdatePageLayout => {
  return {
    type: "UPDATE_PAGE_LAYOUT",
    payload: { layout }
  };
};

export function addBlock(
  block: { block: Block; fonts: FontsPayload },
  meta = { insertIndex: 0 }
): ActionAddBlock {
  return {
    type: "ADD_BLOCK",
    payload: block,
    meta
  };
}

export function addGlobalBlock(
  block: { block: Block; fonts: FontsPayload },
  meta = { insertIndex: 0 }
): ActionAddGlobalBlock {
  return {
    type: "ADD_GLOBAL_BLOCK",
    payload: block,
    meta
  };
}

export function deleteGlobalBlock({
  id
}: {
  id: string;
}): ActionDeleteGlobalBlock {
  return {
    type: "DELETE_GLOBAL_BLOCK",
    payload: {
      id
    }
  };
}

export function updateGBRules({
  data,
  meta
}: {
  data: {
    rules: GlobalBlock["rules"];
    id: string;
  };
  meta: {
    syncSuccess: (s?: void) => void;
    syncFail: (e?: void) => void;
  };
}): ActionUpdateGBRules {
  return {
    type: "UPDATE_GB_RULES",
    payload: data,
    meta
  };
}

export function removeBlock({
  index,
  id
}: {
  index: number;
  id: string;
}): ActionRemoveBlock {
  return {
    type: "REMOVE_BLOCK",
    payload: {
      index,
      id
    }
  };
}

export function removeBlocks(): ActionRemoveBlocks {
  return {
    type: "REMOVE_BLOCKS"
  };
}

export function reorderBlocks(payload: {
  oldIndex: number;
  newIndex: number;
}): ActionReorderBlocks {
  return {
    type: "REORDER_BLOCKS",
    payload
  };
}

// UI

export function setDeviceMode(mode: DeviceMode): ActionUpdateUI {
  return updateUI("deviceMode", mode);
}

export function setActiveElement(element: ActiveElement): ActionUpdateUI {
  return updateUI("activeElement", element);
}

// authorized

export function updateAuthorization(
  authorized: Authorized
): ActionUpdateAuthorized {
  return {
    type: "UPDATE_AUTHORIZATION",
    payload: authorized
  };
}

// syncAllowed

export function updateSyncAllowed(
  syncAllowed: SyncAllowed
): ActionUpdateSyncAllowed {
  return {
    type: "UPDATE_SYNC_ALLOWED",
    payload: syncAllowed
  };
}

// updatePageTitle

export function updatePageTitle(title: string): ActionUpdatePageTitle {
  return {
    type: "UPDATE_PAGE_TITLE",
    payload: title
  };
}

export const updatePageIsHomePage = (
  isHomePage: string | null
): ActionUpdateIsHomePage => {
  return {
    type: "UPDATE_PAGE_IS_HOME_PAGE",
    payload: { isHomePage }
  };
};

// region Add New Global Style

export enum ActionTypes {
  "ADD_NEW_GLOBAL_STYLE" = "ADD_NEW_GLOBAL_STYLE",
  "IMPORT_KIT" = "IMPORT_KIT",
  "IMPORT_STORY" = "IMPORT_STORY",
  "IMPORT_TEMPLATE" = "IMPORT_TEMPLATE",
  "UPDATE_CURRENT_STYLE_ID" = "UPDATE_CURRENT_STYLE_ID",
  "UPDATE_CURRENT_STYLE" = "UPDATE_CURRENT_STYLE"
}

// templates

export type ActionImportTemplate = {
  type: ActionTypes.IMPORT_TEMPLATE;
  payload: {
    blocks: Block[];
    fonts: FontsPayload;
    extraFontStyles: Array<ExtraFontStyle>;
    styles?: Style[];
    currentStyleId?: string;
  };
  meta: {
    insertIndex: number;
  };
};

export const importTemplate = (
  template: {
    blocks: Block[];
    fonts: FontsPayload;
    extraFontStyles: Array<ExtraFontStyle>;
  },
  meta = { insertIndex: 0 }
): ActionImportTemplate => ({
  meta,
  type: ActionTypes.IMPORT_TEMPLATE,
  payload: template
});

export const updateCurrentStyle = (currentStyle: string) => ({
  type: ActionTypes.UPDATE_CURRENT_STYLE,
  payload: currentStyle
});

export type ActionImportStory = {
  type: ActionTypes.IMPORT_STORY;
  payload: {
    blocks: Block[];
    fonts: FontsPayload;
    extraFontStyles: Array<{ id: string }>;
    styles?: Style[];
    currentStyleId?: string;
  };
  meta: {
    insertIndex: number;
  };
};

export const importStory = (
  story: {
    blocks: Block[];
    fonts: FontsPayload;
    extraFontStyles: Array<{ id: string }>;
  },
  meta = { insertIndex: 0 }
): ActionImportStory => ({
  type: ActionTypes.IMPORT_STORY,
  payload: story,
  meta
});

export interface ActionImportKit {
  type: ActionTypes.IMPORT_KIT;
  payload: {
    selectedKit: string;
    styles: Style[];
    fonts: FontsPayload;
  };
}

// kit

interface Kit {
  selectedKit: string;
  styles: Style[];
  fonts: FontsPayload;
}

export const importKit = (payload: Kit): ActionImportKit => ({
  type: ActionTypes.IMPORT_KIT,
  payload
});

export type AddNewGlobalStyle = {
  type: ActionTypes.ADD_NEW_GLOBAL_STYLE;
  payload: Style;
};

export const addNewGlobalStyle = (payload: Style): AddNewGlobalStyle => ({
  type: ActionTypes.ADD_NEW_GLOBAL_STYLE,
  payload
});

export type UpdateCurrentStyleId = {
  type: ActionTypes.UPDATE_CURRENT_STYLE_ID;
  payload: string;
};

export const updateCurrentStyleId = (
  payload: string
): UpdateCurrentStyleId => ({
  type: ActionTypes.UPDATE_CURRENT_STYLE_ID,
  payload
});

// endregion
