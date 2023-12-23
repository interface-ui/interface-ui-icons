<script setup lang="ts">
import { ref } from 'vue'
import { Notifications, Notivue, materialTheme } from 'notivue'
import type { IconType } from './types'
import Gallery from './components/Gallery.vue'
import Search from './components/Search.vue'

const selectedType = ref<IconType>(
  (sessionStorage.getItem('iconType') as IconType) || 'filled',
)
const searchText = ref('')
</script>

<template>
  <header>
    <img class="logo" src="./assets/logo.png" alt="Interface UI Logo">
    <Search v-model:search="searchText" v-model:type="selectedType" />
  </header>

  <main>
    <KeepAlive>
      <Gallery :type="selectedType" :search="searchText" />
    </KeepAlive>
  </main>

  <Notivue v-slot="item">
    <Notifications :item="item" :theme="materialTheme" />
  </Notivue>
</template>

<style>
main {
  margin: 0 auto;
  max-width: 1440px;
  padding: 16px 0;
}
header {
  margin: 32px auto;
  display: flex;
  gap: 32px;
  align-items: center;
  justify-content: center;
}
.logo {
  display: none;
  height: 56px;
}
@media screen and (min-width: 720px) {
  .logo {
    display: inline;
  }
}
[v-cloak] {
  display: none;
}
</style>
