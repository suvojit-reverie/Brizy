import timm from "timm";
import { autoSave } from "./autoSave";
import { getCollectionItemsIds } from "./collectionItems/getCollectionItemsIds";
import { searchCollectionItems } from "./collectionItems/searchCollectionItems";
import { loadCollectionTypes } from "./collectionTypes/loadCollectionTypes";
import { getConfig } from "./config";
import { addFile } from "./customFile/addFile";
import {
  defaultKits,
  defaultLayouts,
  defaultPopups,
  defaultStories
} from "./defaultTemplates";
import { explodePlaceholder } from "./dynamicContent/explodePlaceholder";
import { makePlaceholder } from "./dynamicContent/makePlaceholder";
import { handler as posts } from "./Elements/Posts";
import { addMedia } from "./media/addMedia";
import { addMediaGallery } from "./media/addMediaGallery";
import { onChange } from "./onChange";
import { popupConditions } from "./popupConditions";
import { publish } from "./publish";
import { savedBlocks } from "./savedBlocks/savedBlocks";
import { savedLayouts } from "./savedBlocks/savedLayouts";
import { savedPopups } from "./savedBlocks/savedPopups";
import { screenshots } from "./screenshots";
import { VISUAL_CONFIG } from "./types/global";

const config = getConfig();

if (!config) {
  throw new Error("Invalid __BRZ_PLUGIN_ENV__");
}

const api = {
  media: {
    addMedia,
    addMediaGallery,
    mediaResizeUrl: config.api.mediaResizeUrl
  },
  customFile: {
    addFile,
    fileUrl: config.api.fileUrl
  },
  savedBlocks,
  savedPopups,
  savedLayouts,
  popupConditions,
  defaultKits: defaultKits(config),
  defaultPopups: defaultPopups(config),
  defaultStories: defaultStories(config),
  defaultLayouts: defaultLayouts(config),
  collectionItems: {
    searchCollectionItems,
    getCollectionItemsIds
  },
  collectionTypes: {
    loadCollectionTypes
  },
  screenshots: screenshots()
};

if (window.__VISUAL_CONFIG__) {
  // API
  window.__VISUAL_CONFIG__.api = api;

  // AutoSave
  window.__VISUAL_CONFIG__.onAutoSave = autoSave;

  // OnChange
  window.__VISUAL_CONFIG__.onChange = onChange;

  // UI
  if (window.__VISUAL_CONFIG__.ui) {
    window.__VISUAL_CONFIG__.ui.publish = publish;
  }

  // Dynamic Content
  if (window.__VISUAL_CONFIG__.dynamicContent) {
    window.__VISUAL_CONFIG__.dynamicContent.makePlaceholder = makePlaceholder;
    window.__VISUAL_CONFIG__.dynamicContent.explodePlaceholder =
      explodePlaceholder;
  }

  if (window.__VISUAL_CONFIG__.elements) {
    window.__VISUAL_CONFIG__.elements = timm.setIn(
      window.__VISUAL_CONFIG__.elements,
      ["posts", "handler"],
      posts
    ) as VISUAL_CONFIG["elements"];
  } else {
    window.__VISUAL_CONFIG__.elements = timm.set(
      window.__VISUAL_CONFIG__.elements,
      "posts",
      { handler: posts }
    );
  }
}
