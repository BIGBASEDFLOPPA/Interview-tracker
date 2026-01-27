<template>
  <div class="app-layout">
    <BackgroundStars class="bg-black"/>
    <div class="app-layout__content">
      <MainHeader />
      <main class="app-layout__page">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">

import MainHeader from "../components/ui/MainHeader.vue";
import BackgroundStars from "../components/ui/BackgroundStars.vue";
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
}

.app-layout {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

.app-layout__content {
  position: relative;
  z-index: 1;
}

.app-layout__page {
  max-width: 960px;
  margin: 0 auto;
}
</style>
