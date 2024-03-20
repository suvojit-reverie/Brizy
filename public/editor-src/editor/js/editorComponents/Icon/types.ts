import { ElementModel } from "visual/component/Elements/Types";
import { Target } from "visual/component/Link/types/Target";
import { Type } from "visual/component/Link/types/Type";
import { Block } from "visual/types";
import { CssId } from "visual/utils/models/cssId";
import { WithClassName } from "visual/utils/options/attributes";
import { ComponentsMeta } from "visual/editorComponents/EditorComponent/types";

export interface Value extends ElementModel, CssId {
  name: string;
  type: string;

  linkPage: string;
  popups: Block[];
  linkPopup: string;
  linkLightBox: string;
  linkExternal: string;
  linkExternalBlank: Target;
  linkExternalRel: string;
  linkPopulation: string;
  linkAnchor: string;
  linkUpload: string;
  linkExternalType: "linkExternal" | "linkPopulation";
  linkType: Type;
  customClassName: string;
  customID: string;
  linkToSlide: number;

  customSize: number;
  tabletCustomSize: number;
  mobileCustomSize: number;

  customSizeSuffix: string;
  tabletCustomSizeSuffix: string;
  mobileCustomSizeSuffix: string;
}

export interface Props extends WithClassName {
  meta: ComponentsMeta;
  attributes: Record<string, string | number>;
}

export interface Patch {
  [k: string]: string;
}

export type PatchValue = Value | Patch;
