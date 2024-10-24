<script setup lang="ts">
import type { IProduct } from '@/interfaces/IProduct'
import productsAPI from '@/service/ProductsService'
import { useUserStore } from '@/stores/userStore'
import { FilterMatchMode } from '@primevue/core/api'
import { onMounted, onUnmounted, ref, shallowRef } from 'vue'
import { useHead } from '@unhead/vue'
import ImageComponent from '@/components/ImageComponent.vue'

interface IProdByCat {
  id: number
  name: string
  status: string
  products: IProduct[]
}

const __categories = shallowRef<Element>()
const isFixed = shallowRef(false)
const userStore = useUserStore()
const loading = ref(false)
const productsByCategory = ref<IProdByCat[]>()
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

onMounted(async () => {
  try {
    await userStore.fetchData()
    useHead({
      title: userStore.userData.name
    })

    const response = await productsAPI.getCategoriesWithProducts(userStore.slug)
    productsByCategory.value = response.data as IProdByCat[]
  } catch (error) {
    console.error(error)
  }

  window.addEventListener('scroll', handlerListener)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handlerListener)
})

function throttle<T>(fn: (this: T, ...args: any[]) => void, limit: number) {
  let lastCall = 0
  return function (this: T, ...args: any[]) {
    const now = Date.now()
    if (now - lastCall >= limit) {
      lastCall = now
      fn.apply(this, args)
    }
  }
}

const handlerParallax = () => {
  const parallaxImage = document.getElementById('parallax') as HTMLElement
  let scrollPosition = window.pageYOffset

  // Movimenta a imagem mais devagar que o scroll
  parallaxImage.style.transform = `translateY(${scrollPosition * 0.6}px)`
}

const handlerFixedCategories = throttle(() => {
  isFixed.value = __categories.value?.getBoundingClientRect().top === 0
}, 200)

const handlerListener = () => {
  handlerParallax()
  handlerFixedCategories()
}

const scrollToCategory = (categoryId: any) => {
  const categoryElement = document.getElementById(categoryId)
  if (categoryElement) {
    const elementPosition = categoryElement.getBoundingClientRect().top + window.scrollY
    const offsetPosition = elementPosition - 70

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}
</script>

<template>
  <div id="parallax" class="parallax-container">
    <ImageComponent image-class="parallax-image" :image-url="userStore.userData.bannerUrl" />
    <!-- <img
      class="parallax-image"
      src="https://media-cdn.tripadvisor.com/media/photo-s/1b/4d/61/c4/fachada.jpg"
      alt="Imagem do Restaurante"
    /> -->
    <div class="restaurant-name">
      <p class="text-3xl">{{ userStore.userData.name }}</p>
      <p class="text-sm">{{ userStore.userData.description }}</p>
    </div>
  </div>

  <div class="content card menu-container rounded-t-3xl">
    <p class="mb-2 text-2xl font-norma">Categorias</p>
    <div
      ref="__categories"
      class="categories sticky top-0 overflow-x-auto whitespace-nowrap py-2 scrollbar-hide"
      :class="{ categories__shadow: isFixed }"
    >
      <template v-for="category in productsByCategory" :key="category.id">
        <Button
          @click="scrollToCategory(category.id)"
          :label="category.name"
          severity="secondary"
          class="mr-2"
          rounded
        />
      </template>
    </div>

    <div class="products mb-8 mt-2" v-for="category in productsByCategory" :key="category.id">
      <p :id="category.id.toString()" class="mb-4 text-2xl font-semibold">{{ category.name }}</p>
      <div class="cards-container flex flex-row flex-wrap gap-4">
        <template v-for="product in category.products" :key="product.id">
          <CardProduct :product />
        </template>
      </div>
    </div>
  </div>
  <ScrollTop
    :threshold="1000"
    icon="pi pi-arrow-up"
    :buttonProps="{ severity: 'contrast', raised: true, rounded: true }"
  />
</template>

<style lang="scss" scoped>
.parallax-container {
  position: relative;
  height: 40vh; /* Ocupa 40% da tela */
  overflow: hidden;

  /* Imagem de fundo para o efeito paralaxe */
  .parallax-image {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    object-fit: cover;
    transform: translateZ(0); /* Melhora o desempenho no efeito */
    top: 0;
    left: 0;
    will-change: transform; /* Otimiza a performance */
  }

  /* Nome do restaurante */
  .restaurant-name {
    position: absolute;
    bottom: 0;
    margin: 0 0 2.5rem 1.5rem;
    color: white;
    z-index: 1; /* Fica sobre a imagem */
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  }
}

.parallax-container:after {
  content: '';
  position: absolute;
  z-index: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(180deg, transparent 50%, rgba(0, 0, 0, 0.4));
}

/* Conteúdo abaixo da imagem */
.content {
  background: var(--surface-ground);
  z-index: 1;
  position: relative;
  padding: 20px;
  padding: 1.2rem;
  margin-top: -1.5rem;

  .categories {
    z-index: 2;
    background: var(--surface-ground);
    scroll-snap-type: x mandatory;
    scroll-snap-align: center;
    margin: 0 -1.2rem;

    .p-button:nth-child(1) {
      margin-left: 0.5rem;
    }

    .p-button {
      background: var(--cardapio-chip-color);
    }
  }
}

.categories {
  transition: box-shadow 0.2s linear;

  &__shadow {
    box-shadow:
      0 4px 6px -1px rgb(0 0 0 / 0.1),
      0 2px 4px -2px rgb(0 0 0 / 0.1);
  }
}
</style>
