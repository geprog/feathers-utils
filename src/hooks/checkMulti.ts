import { MethodNotAllowed } from "@feathersjs/errors";
import { shouldSkip } from "../utils/shouldSkip";
import { isMulti } from "../utils/isMulti";

import type { HookContext } from "@feathersjs/feathers";

export function checkMulti(): ((context: HookContext) => HookContext) {
  return (context: HookContext): HookContext => {
    if (shouldSkip("checkMulti", context)) { return context; }
    const { service, method } = context;
    if (!service.allowsMulti || !isMulti(context) || method === "find") { return context; }

    if (!service.allowsMulti(method)) {
      throw new MethodNotAllowed(`Can not ${method} multiple entries`);
    }

    return context;
  };
}
