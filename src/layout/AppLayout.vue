<script setup>
import AppFooter from './AppFooter.vue'
import AppTopbar from './AppTopbar.vue'
</script>

<template>
  <div class="layout-wrapper select-none">
    <!-- <app-topbar></app-topbar> -->
    <div class="layout-cardapio-container">
      <div class="layout-cardapio">
        <!-- <router-view v-slot="{ Component }">
                    <transition mode="out-in">
                        <component :is="Component" />
                    </transition>
                </router-view> -->
        <router-view></router-view>
      </div>
      <app-footer></app-footer>
    </div>
    <div class="layout-mask animate-fadein"></div>
  </div>
  <!-- <Toast /> -->
</template>

<style lang="scss" scoped>
.layout-cardapio-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
  padding: 0;
  transition: margin-left var(--layout-section-transition-duration);
}

.layout-cardapio {
  flex: 1 1 auto;
  padding-bottom: 2rem;
}
</style>
