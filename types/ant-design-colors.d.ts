declare module "@ant-design/colors" {
  /**
   * Minimal shim to satisfy any (transitive) `@ant-design/colors` imports.
   * We only declare the named exports that occasionally get referenced.
   * The values are typed `any[]` because we don’t actually consume them –
   * they just need to exist so the compiler/bundler stops throwing.
   */
  // brand palettes
  export const blue: any[]
  export const red: any[]
  export const green: any[]
  export const gold: any[]
  export const purple: any[]
  // neutral palette
  export const grey: any[]
  // fall-back default export (rarely used)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const _default: any
  export default _default
}
