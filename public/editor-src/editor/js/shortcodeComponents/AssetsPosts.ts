import { ConfigCommon } from "visual/global/Config/types/configs/ConfigCommon";
import { ElementTypes } from "visual/global/Config/types/configs/ElementTypes";
import { t } from "visual/utils/i18n";

export default function (config: ConfigCommon) {
  return {
    id: "AssetsPosts",
    title: t("Assets List"),
    icon: "nc-menu",
    resolve: {
      type: "Wrapper",
      value: {
        _styles: ["wrapper", "wrapper--posts", "wrapper-posts-posts"],
        items: [
          {
            type: ElementTypes.Posts,
            value: {
              _styles: ["posts", "posts-posts"],
              ...config.contentDefaults?.[ElementTypes.AssetsPosts]
            }
          }
        ]
      }
    }
  };
}
