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
      <div class="image-loading" v-if="loading"></div>
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

.image-loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.6);
  border-radius: inherit;
}

.image-loading::before {
  content: '';
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 5px solid #514b82;
  animation:
    l20-1 0.8s infinite linear alternate,
    l20-2 1.6s infinite linear;
}

@keyframes l20-1 {
  0% {
    clip-path: polygon(50% 50%, 0 0, 50% 0%, 50% 0%, 50% 0%, 50% 0%, 50% 0%);
  }
  12.5% {
    clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%);
  }
  25% {
    clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 100% 100%, 100% 100%);
  }
  50% {
    clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%);
  }
  62.5% {
    clip-path: polygon(50% 50%, 100% 0, 100% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%);
  }
  75% {
    clip-path: polygon(50% 50%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 50% 100%, 0% 100%);
  }
  100% {
    clip-path: polygon(50% 50%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 0% 100%);
  }
}

@keyframes l20-2 {
  0% {
    transform: scaleY(1) rotate(0deg);
  }
  49.99% {
    transform: scaleY(1) rotate(135deg);
  }
  50% {
    transform: scaleY(-1) rotate(0deg);
  }
  100% {
    transform: scaleY(-1) rotate(-135deg);
  }
}
</style>
