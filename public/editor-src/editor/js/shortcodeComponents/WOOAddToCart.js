import { t } from "visual/utils/i18n";

export default {
  id: "WOOAddToCart",
  title: t("Add to cart"),
  icon: "nc-woo-add-to-cart",
  resolve: {
    type: "Wrapper",
    value: {
      _styles: ["wrapper", "wrapper--WOOAddToCart"],
      items: [
        {
          type: "WOOAddToCart"
        }
      ]
    }
  }
};
