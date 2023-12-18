<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { IconType } from '../types'
import IconButton from './IconButton.vue'

const props = defineProps<{ type: IconType; search: string }>()
const icons = ref<string[]>([])

watch(
  () => props.type,
  () => {
    import(`../icons/${props.type}.json`).then(module => {
      icons.value = module.default
    })
  },
  { immediate: true },
)

const displayIcons = computed(() => {
  if (props.search === '') {
    return icons.value
  }

  return icons.value.filter(icon => icon.includes(props.search.toLowerCase()))
})
</script>

<template>
  <div class="gallery-container">
    <IconButton
      v-for="icon in displayIcons"
      :key="icon"
      :type="$props.type"
      :name="icon"
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
