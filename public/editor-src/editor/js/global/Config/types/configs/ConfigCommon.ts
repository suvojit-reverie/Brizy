import { Taxonomy } from "visual/global/Config/types/Taxonomy";
import { PostTypesTax } from "visual/global/Config/types/PostTypesTax";
import { ImageDataSize } from "visual/global/Config/types/ImageSize";

export interface ConfigCommon {
  branding: {
    name: string;
  };
  editorVersion: string;
  mode?: string; // add literal type "page" | ...smth else

  taxonomies: Taxonomy[]; // is this property common or just wp?
  postTypesTaxs: PostTypesTax[]; // is this property common or just wp?

  imageSizes: ImageDataSize[];
}
