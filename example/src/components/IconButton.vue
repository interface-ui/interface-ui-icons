<script lang="ts" setup>
import { computed } from 'vue'
import type { IconType } from '../types'

const props = defineProps<{ type: IconType, name: string }>()
const iconName = computed(() =>
  props.name
    .split('_')
    .map(item => item[0].toUpperCase() + item.slice(1))
    .join(' '),
)
</script>

<template>
  <button v-cloak class="icon-button">
    <span class="material-icons" :class="$props.type">
      {{ $props.name }}
    </span>
    <span class="icon-name">{{ iconName }}</span>
  </button>
</template>

<style>
.icon-button {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border: none;
  outline: none;
  height: 128px;
  width: 96px;
  border-radius: 8px;
  user-select: none;
  background: transparent;
  cursor: pointer;

  &:hover {
    background-color: rgba(60, 64, 67, 0.04);
  }
  &:focus {
    background-color: rgba(60, 64, 67, 0.12);
  }
}
@media screen and (min-width: 720px) {
  .icon-button {
    width: 112px;
  }
}
.icon-name {
  color: #5f6368;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  font-family:
    Google Sans,
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  letter-spacing: 0.1px;
}
</style>
