import { HookContext } from "@feathersjs/feathers";
import { getItems } from "feathers-hooks-common";
import { HookRunPerItemOptions } from "../types";
import shouldSkip from "../utils/shouldSkip";

const makeOptions = (
  options: HookRunPerItemOptions
): Required<HookRunPerItemOptions> => {
  options = options || {};
  return Object.assign({
    wait: true
  }, options);
};

const runPerItem = (
  actionPerItem: (item: unknown, context: HookContext) => Promise<unknown>, 
  options: HookRunPerItemOptions
): ((context: HookContext) => Promise<HookContext>) => {
  options = makeOptions(options);
  return async (context: HookContext): Promise<HookContext> => {
    if (shouldSkip("runForItems", context)) { return context; }
    let items = getItems(context);
    items = (Array.isArray(items)) ? items : [items];

    const promises = items.map(async (item: unknown) => {
      await actionPerItem(item, context);
    });

    if (options.wait) {
      await Promise.all(promises);
    }

    return context;
  };
};

export default runPerItem;