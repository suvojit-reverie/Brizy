import { ElementTypes } from "visual/global/Config/types/configs/ConfigCommon";
import type { ConfigCommon } from "visual/global/Config/types/configs/ConfigCommon";
import { t } from "visual/utils/i18n";

export default function (config: ConfigCommon) {
  return {
    id: "BlogPostMeta",
    title: t("Meta"),
    icon: "t2-shopify-meta",
    resolve: {
      type: "Wrapper",
      value: {
        _styles: ["wrapper"],
        items: [
          {
            type: ElementTypes.BlogPostMeta,
            value: {
              sourceType: "shopify-article",
              ...config.contentDefaults?.[ElementTypes.BlogPostMeta]
            }
          }
        ]
      }
    }
  };
}
