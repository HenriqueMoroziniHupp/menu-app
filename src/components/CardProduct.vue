<script setup lang="ts">
import type { IProduct } from '@/interfaces/IProduct'
import ImageComponent from './ImageComponent.vue'

const { product } = defineProps<{ product: IProduct }>()

function formatPrice(price: any) {
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'BRL' }).format(price)
}
</script>

<template>
  <Card class="card-product">
    <template #header>
      <div class="image-wrapper parallax-image absolute aspect-video">
        <DeferredContent>
          <ImageComponent
            image-class="select-none block m-auto aspect-video w-full object-cover"
            :image-url="product.imageUrl as string"
          />
        </DeferredContent>
        <p class="title text-xl">{{ product.name }}</p>
      </div>
    </template>
    <template #subtitle v-if="product.description">{{ product.description }} </template>
    <template #content>
      <div class="flex flex-wrap gap-2" v-if="product.prices.length">
          <Badge
            v-for="price in product.prices"
            :key="price.id"
            :value="`${price.name}: ${formatPrice(price.price)}`"
          />
      </div>
      <template v-else>
        <Badge value="Consultar preço"></Badge>
      </template>
    </template>
  </Card>
</template>

<style lang="scss" scoped>
.p-card {
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.card-product {
  max-width: 42rem;
  overflow: hidden;
  display: flex;
  flex-grow: 1;
  flex-basis: 22rem;
}

.image-wrapper {
  position: relative;
  overflow: hidden;

  .title {
    position: absolute;
    width: 100%;
    bottom: 0;
    color: white;
    padding: 0.6rem 1rem;
    z-index: 1;
  }
}

.image-wrapper::after {
  content: '';
  position: absolute;
  z-index: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 8rem;
  background-image: linear-gradient(180deg, transparent 50%, rgba(0, 0, 0, 0.6));
}
</style>
