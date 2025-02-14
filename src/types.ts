import type { Application, Service } from "@feathersjs/feathers";

export type Path = Array<string|number>;
export type HookType = "before" | "after" | "error";
export type ServiceMethodName = "find" | "get" | "create" | "update" | "patch" | "remove";

export type Handle = "target" | "source" | "combine" | "intersect"| "intersectOrFull";
export type FirstLast = "first" | "last";

//#region hooks

export interface HookSetDataOptions {
  allowUndefined?: boolean
  overwrite?: boolean
}

export interface AddHookOptions {
  types: HookType[],
  methods: ServiceMethodName[],
  orderByType: Record<HookType, FirstLast>
  whitelist?: string[],
  blacklist?: string[],
}

export interface HookRunPerItemOptions {
  wait?: boolean
}

//#endregion

//#region mixins

export interface InitDebounceMixinOptions {
  default: Partial<DebouncedStoreOptions>
  blacklist: string[]
  [key: string]: unknown
}

export type DebouncedFunctionApp = (app?: Application) => void | Promise<void>;

export interface DebouncedStoreOptions {
  leading: boolean
  maxWait: number | undefined
  trailing: boolean
  wait: number
}

/*interface WaitingObject {
    id: Id,
    action: FunctionApp
}*/

//#endregion

//#region utils
export interface PushSetOptions {
  unique?: boolean
}

export type ActionOnEmptyIntersect = (target: unknown, source: unknown, prependKey: Path) => void

export interface MergeQueryOptions<T> extends FilterQueryOptions<T> {
  defaultHandle: Handle,
  actionOnEmptyIntersect: ActionOnEmptyIntersect
  useLogicalConjunction: boolean
  handle?: {
    [key: string]: Handle
  }
}

export interface FilterQueryOptions<T> {
  service?: Service<T>
  operators?: string[],
  filters?: string[],
}

export interface PlainFilterQueryOptions {
  operators?: string[],
  filters?: string[],
}

export interface FilterQueryResult {
  filters: Record<string, unknown>
  query: Record<string, unknown>
  paginate?: unknown
  [key: string]: unknown
}

//#endregion