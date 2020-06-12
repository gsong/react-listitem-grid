// flow-typed signature: 0f1539e8dbbdb2c6c30545c28f75c303
// flow-typed version: abc6c99826/@reach/rect_v0.2.x/flow_>=v0.84.x

// @flow

declare module '@reach/rect' {
  declare type Ref<T> = {| current: T |};

  declare export var useRect: <T: ?HTMLElement>(
    ref: Ref<T>,
    observe?: boolean
  ) => DOMRect | null;

  declare export default React$ComponentType<{|
    onChange?: DOMRect => void,
    observe?: boolean,
    children: <T: ?HTMLElement>({ ref: Ref<T>, rect: DOMRect | void }) => React$Node,
  |}>;
}
