import * as Option from "visual/component/Options/Type";
import { String } from "visual/utils/string/specs";
import { Model } from "./Type";

export const defaultValue: Model = {
  value: ""
};

export const fromElementModel: Option.FromElementModel<"aiText-dev"> = (
  get
) => ({
  value: String.read(get("value"))
});

export const toElementModel: Option.ToElementModel<"aiText-dev"> = (values) => {
  return {
    value: values.value
  };
};
