/**
 * Runtime shim for @ant-design/colors when it is bundled as ESM.
 *
 * Ant Design’s internal code sometimes does
 *   import { blue } from "@ant-design/colors"
 * but the package only provides a Common-JS default export.
 * We attach the expected named palettes to the module object so the
 * import doesn’t crash during tree-shaking.
 *
 * The palettes don’t need to be perfect – Ant Design only checks that
 * they exist – but we pull the real preset values when available.
 */
import colorsCjs from "@ant-design/colors"

// `colorsCjs` is actually the Common-JS `module.exports` object.
const m = colorsCjs as any
const presets = m.presetPalettes || m.default?.presetPalettes || {}

// Fallback helpers
const ensure = (name: string, fallback: string[]) => {
  if (!m[name]) {
    m[name] = presets[name] || fallback
  }
}

// Attach the most common palettes Ant Design references.
ensure("blue", ["#1677FF"])
ensure("red", ["#FF4D4F"])
ensure("green", ["#73D13D"])
ensure("gold", ["#FAAD14"])
ensure("purple", ["#722ED1"])
ensure("grey", ["#8C8C8C"])

// Re-export so ESM named-import syntax also works.
export const blue = m.blue
export const red = m.red
export const green = m.green
export const gold = m.gold
export const purple = m.purple
export const grey = m.grey
export default m
