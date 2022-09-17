import { mPipe } from "fp-utilities";
import { ElementModel } from "visual/component/Elements/Types";
import { DeviceMode } from "visual/types";
import * as Num from "visual/utils/math/number";
import { prop } from "visual/utils/object/get";
import { defaultValueKey } from "visual/utils/onChange";
import { readWithParser } from "visual/utils/reader/readWithParser";
import * as Str from "visual/utils/string/specs";
import { Unit } from "../types";

export interface ImagePatch {
  imageExtension: string;
  imageHeight: number;
  imageSrc: string;
  imageWidth: number;
}

export interface ImageDCPatch {
  imagePopulation: string;
}

export interface SizeTypePatch {
  sizeType: string;
}

export interface UnitPatch {
  [k: string]: unknown;
  widthSuffix?: Unit;
  heightSuffix?: Unit;
  tabletWidthSuffix?: Unit;
  tabletHeightSuffix?: Unit;
  mobileWidthSuffix?: Unit;
  mobileHeightSuffix?: Unit;
}

// is it correct fn name?
export const fromImageElementModel = readWithParser<ElementModel, ImagePatch>({
  imageSrc: mPipe(prop("imageSrc"), Str.read),
  imageExtension: mPipe(prop("imageExtension"), Str.read),
  imageHeight: mPipe(prop("imageHeight"), Num.read),
  imageWidth: mPipe(prop("imageWidth"), Num.read)
});

export const fromImageDCElementModel = readWithParser<
  ElementModel,
  ImageDCPatch
>({
  imagePopulation: mPipe(prop("imagePopulation"), Str.read)
});

export const patchImageSizeType = readWithParser<ElementModel, SizeTypePatch>({
  sizeType: mPipe(prop("sizeType"), Str.read)
});

export const patchImageUnit = (
  patch: ElementModel,
  device: DeviceMode
): UnitPatch | undefined => {
  if (patch) {
    const dvk = (key: string): string =>
      defaultValueKey({ key, device, state: "normal" });
    const [patchKey] = Object.keys(patch).filter(
      (key) => key === dvk("widthSuffix") || key === dvk("heightSuffix")
    );

    return patchKey ? patch : undefined;
  }

  return undefined;
};
