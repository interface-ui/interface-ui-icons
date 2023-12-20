import { defineComponent, h } from 'vue'

function extractAttrs(attrsString: string) {
  const matches = attrsString.matchAll(/([a-zA-Z\-]+)="([^"]+)"/gm)
  return [...matches].reduce(
    (attrs, [_, key, value]) => {
      attrs[key] = value
      return attrs
    },
    {} as Record<string, string>,
  )
}

export default function createSvgIcon(content: string) {
  const [_, attrsString, svgContent] = content.match(
    /<svg([^>]+)>([\s\S]+)<\/svg>/,
  )!
  const attrs = extractAttrs(attrsString)

  return defineComponent({
    setup() {
      return () =>
        h('svg', {
          class: 'in-icon-material in-icon',
          ...attrs,
          innerHTML: svgContent,
        })
    },
  })
}
