<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  imageUrl: {
    type: String,
    required: true
  },
  containerClass: {
    type: String,
    default: ''
  },
  imageClass: {
    type: String,
    default: ''
  }
})

const loading = ref(true)
const fallback = ref('')

const onImageLoad = () => (loading.value = false)
const onImageError = () =>
  (fallback.value =
    'https://media.istockphoto.com/id/1409329028/nl/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=kjjJo94L0PMnao7QCBGaLCbZoesoeriXo1T0gbzrLrQ=')
</script>

<template>
  <div :class="['image-container', containerClass]">
    <img
      :class="['select-none image', imageClass]"
      :src="fallback || imageUrl"
      draggable="false"
      @load="onImageLoad"
      @error="onImageError"
    />
    <Transition>
      <div class="image-loading loader" v-if="loading"/>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.image-container {
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 100%;

  .image {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}
</style>
