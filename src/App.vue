<script setup lang="ts">
import { RouterView } from 'vue-router'

const isDesktop = () => {
  const userAgent = navigator.userAgent.toLowerCase()

  return !/android|webos|iphone|ipad|ipod|macintosh|blackberry|iemobile|opera mini/i.test(userAgent)
}

if (isDesktop()) document.documentElement.classList.add('desktop')

const applyPreferenceTheme = () => {
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (prefersDarkMode) {
    document.documentElement.classList.add('app-dark');
  } else {
    document.documentElement.classList.remove('app-dark');
  }
}

applyPreferenceTheme();

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  applyPreferenceTheme();
});
</script>

<template>
  <router-view />
</template>

<style scoped></style>
