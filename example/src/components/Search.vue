<script lang="ts" setup>
import { computed, onBeforeUnmount } from 'vue'
import { type IconType, ICON_TYPES } from '../types'

const props = defineProps<{ search: string; type: IconType }>()
const emit = defineEmits<{
  'update:search': [string]
  'update:type': [IconType]
}>()
let timer: null | NodeJS.Timeout = null

const searchText = computed({
  get() {
    return props.search
  },
  set(value) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      emit('update:search', value)
    }, 300)
  },
})

const iconType = computed({
  get() {
    return props.type
  },
  set(value) {
    sessionStorage.setItem('iconType', value)
    emit('update:type', value)
  },
})

onBeforeUnmount(() => {
  if (timer) {
    clearTimeout(timer)
  }
})
</script>

<template>
  <div class="search">
    <span class="material-icons outlined search-icon">search</span>
    <input
      class="search-input"
      type="text"
      placeholder="Search"
      v-model="searchText"
    />
    <select class="search-select" v-model="iconType">
      <option v-for="iconType in ICON_TYPES" :key="iconType" :value="iconType">
        {{ iconType }}
      </option>
    </select>
  </div>
</template>

<style>
.search {
  display: inline-flex;
  align-items: center;
  height: 56px;
  min-width: 40%;
  border-radius: 56px;
  gap: 16px;
  padding: 0 16px;
  box-sizing: border-box;
  background: linear-gradient(
    0deg,
    rgba(105, 145, 214, 0.08),
    rgba(105, 145, 214, 0.08)
  );
}
.search-icon {
  font-size: 24px;
}
.search-input {
  flex: 1;
}
.search-input,
.search-select {
  height: 24px;
  font-size: 16px;
  background: transparent;
  border: none;
  outline: none;
}
.search-select {
  cursor: pointer;
  border-left: 1px solid rgba(0, 0, 0, 0.3);
  padding: 0 16px;
  color: #5f6368;
}
</style>
