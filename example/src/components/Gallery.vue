<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import useClipboard from 'vue-clipboard3'
import type { IconType } from '../types'
import { rename } from '../utils'
import IconButton from './IconButton.vue'

const props = defineProps<{ type: IconType, search: string }>()
const icons = ref<string[]>([])

watch(
  () => props.type,
  () => {
    import(`../icons/${props.type}.json`).then((module) => {
      icons.value = module.default
    })
  },
  { immediate: true },
)

const displayIcons = computed(() => {
  if (props.search === '')
    return icons.value

  const searchText = props.search.trim().replace(/\s+/g, '_').toLowerCase()
  return icons.value.filter(icon => icon.includes(searchText))
})

const { toClipboard } = useClipboard()

async function copy(text: string) {
  // let iconName = (text + '_' + props.type)
  //   .split('_')
  //   .map(item => item[0].toUpperCase() + item.slice(1))
  //   .join('')
  const iconName = rename(`${text}_${props.type}`)
  const str = `import ${iconName} from '@interface-ui/icons/es/components/${iconName}'`

  toClipboard(str).then(() => {
    console.log('Success')
  }).catch((err) => {
    console.error(err)
  })
}
</script>

<template>
  <div class="gallery-container">
    <IconButton
      v-for="icon in displayIcons"
      :key="icon"
      :type="$props.type"
      :name="icon"
      @click="copy(icon)"
    >
      {{ icon }}
    </IconButton>
  </div>
</template>

<style>
.gallery-container {
  display: grid;
  align-content: start;
  column-gap: 16px;
  row-gap: 26px;
  grid-template-columns: repeat(auto-fill, 112px);
}
</style>
