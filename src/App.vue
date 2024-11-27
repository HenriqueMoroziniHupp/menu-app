<script setup lang="ts">
import { RouterView } from 'vue-router'

const userAgent = () => {
  const userAgent = navigator.userAgent.toLowerCase()

  if (/android/i.test(userAgent)) return 'android';
  if (/iphone|ipad|ipod|macintosh/i.test(userAgent)) return 'apple';

  return 'desktop';
}

document.documentElement.classList.add(userAgent())

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
