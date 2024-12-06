<script setup lang="ts">
import type { IProduct } from '@/interfaces/IProduct'
import { computed, onMounted, onUnmounted, ref, shallowRef } from 'vue'
import { useHead } from '@unhead/vue'
import ImageComponent from '@/components/ImageComponent.vue'
import appAPI from '@/service/App'

type TStatus = 'PENDING' | 'ACTIVE' | 'BLOCKED' | 'TERMINATED' | 'TRIAL'

interface IUser {
  name: string
  bannerUrl: string
  description?: string
  status: TStatus
}

interface IProdByCat {
  id: number
  name: string
  status: string
  products: IProduct[]
}

const __categories = shallowRef<Element>()
const isFixed = shallowRef(false)
const userData = shallowRef({} as IUser)
const loaded = ref(false)
const productsByCategory = shallowRef<IProdByCat[]>([])
const search = ref('')

const filteredProductsByCategory = computed<IProdByCat[]>(() => {
  return productsByCategory.value.reduce((acc: IProdByCat[], category) => {
    // Filtra os produtos que correspondem à busca
    const matchingProducts = category.products.filter(
      (product) =>
        product.name?.toLowerCase().includes(search.value.toLowerCase()) ||
        product.description?.toLowerCase().includes(search.value.toLowerCase())
    )

    // Se a categoria tiver produtos correspondentes, a adiciona ao acumulador
    if (matchingProducts.length > 0) {
      return [
        ...acc,
        {
          ...category,
          products: matchingProducts // Inclui apenas produtos correspondentes
        }
      ]
    }

    return acc // Se não houver correspondência, retorna o acumulador sem alterações
  }, [])
})

onMounted(async () => {
  try {
    const { hostname } = window.location
    const slug = hostname.split('.')[0]

    const response = await appAPI.getApp(slug)
    productsByCategory.value = response.data.categories as IProdByCat[]
    userData.value = {
      name: response.data?.name,
      description: response.data?.description,
      bannerUrl: response.data?.bannerUrl,
      status: response.data?.status as TStatus
    }

    useHead({
      title: userData.value.name
    })
    loaded.value = true
  } catch (error) {
    console.error(error)
  }

  window.addEventListener('scroll', handlerListener)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handlerListener)
})

const handlerParallax = () => {
  const parallaxImage = document.getElementById('parallax') as HTMLElement
  let scrollPosition = window.pageYOffset
  parallaxImage.style.transform = `translateY(${scrollPosition * 0.6}px)`
}

const handlerFixedCategories = () => {
  isFixed.value = __categories.value?.getBoundingClientRect().top === 0
}

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
    <template v-if="loaded">
      <ImageComponent
        class="front-image"
        image-class="parallax-image"
        :image-url="userData.bannerUrl"
      />
      <ImageComponent
        class="back-image"
        image-class="parallax-image"
        :image-url="userData.bannerUrl"
      />
    </template>
    <template v-else>
      <Skeleton width="100%" height="100%"></Skeleton>
    </template>
    <div class="restaurant-name">
      <p class="text-3xl">{{ userData.name }}</p>
      <p class="text-sm">{{ userData.description }}</p>
    </div>
  </div>

  <div class="content card menu-container rounded-t-3xl">
    <p class="mb-2 text-2xl" :class="{ 'animate-pulse': !loaded }">Categorias</p>
    <template v-if="loaded">
      <div
        ref="__categories"
        id="carousel"
        class="categories sticky top-0 overflow-x-auto whitespace-nowrap py-2 snap-mandatory snap-x"
        :class="{ categories__shadow: isFixed }"
      >
        <template v-for="category in filteredProductsByCategory" :key="category.id">
          <Button
            @click="scrollToCategory(category.id)"
            :label="category.name"
            severity="secondary"
            class="mr-2 snap-center snap-normal"
            rounded
          />
        </template>
      </div>

      <div
        class="products mb-8 mt-2"
        v-for="category in filteredProductsByCategory"
        :key="category.id"
      >
        <p :id="category.id.toString()" class="mb-4 text-2xl font-semibold">{{ category.name }}</p>
        <div class="cards-container flex flex-row flex-wrap gap-4">
          <template v-for="product in category.products" :key="product.id">
            <CardProduct :product />
          </template>
        </div>
      </div>
      <div
        v-if="!filteredProductsByCategory.length"
        class="not-found flex flex-col items-center gap-4"
      >
        <p>Não encontramos produtos, pesquise novamente ...</p>
        <i class="pi pi-spin pi-compass" style="font-size: 1.5rem"></i>
      </div>
    </template>
    <template v-else>
      <Skeleton class="mt-4 mb-4" height="37px"></Skeleton>
      <Skeleton width="6rem" height="28px" class="mb-4"></Skeleton>
      <Skeleton class="mb-4" width="100%" height="250px"></Skeleton>
      <Skeleton width="100%" height="250px"></Skeleton>
    </template>
  </div>
  <div class="filter z-10 fixed bottom-0 p-2 w-full">
    <IconField iconPosition="left">
      <InputText type="text" v-model="search" placeholder="Pesquisar..." class="w-full glass" />
      <Transition mode="out-in">
        <InputIcon v-if="!search.length" class="pi pi-search" />
        <InputIcon v-else class="pi pi-times" @click="search = ''" />
      </Transition>
    </IconField>
  </div>
  <ScrollTop
    :threshold="1000"
    icon="pi pi-chevron-up"
    :buttonProps="{ severity: 'contrast', raised: true, rounded: true }"
  />
</template>

<style lang="scss" scoped>
.parallax-container {
  position: relative;
  overflow: hidden;

  :deep(.parallax-image) {
    height: 40vh;
    max-height: 40vh;
    overflow: hidden;
    object-fit: cover;
    transform: translateZ(0);
    will-change: transform;
  }

  @media (min-width: 756px) {
    .front-image {
      max-width: 54rem;
      z-index: 5;
      position: relative;
      margin: 0 auto;
    }
  }

  .back-image {
    display: none;
  }

  @media (min-width: 756px) {
    .back-image {
      display: block;
      position: absolute;
      top: 0;
      opacity: 0.85;
      filter: blur(0.5rem);
      transform: scale(1.05);
    }
  }

  .restaurant-name {
    position: absolute;
    bottom: 0;
    margin: 0 0 2.5rem 1.5rem;
    color: white;
    z-index: 10;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  }
}

.parallax-container:after {
  content: '';
  position: absolute;
  z-index: 5;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(180deg, transparent 50%, rgba(0, 0, 0, 0.4));
}

.content {
  background: var(--surface-ground);
  z-index: 5;
  position: relative;
  padding: 1.2rem 1.2rem 0;
  margin-top: -1.5rem;

  .categories {
    z-index: 2;
    background: var(--surface-ground);
    margin: 0 -1.2rem;

    .p-button:nth-child(1) {
      margin-left: 0.5rem;
    }

    .p-button {
      background: var(--cardapio-chip-color);
    }
  }
}

.android .categories {
  scrollbar-width: none;
}

.glass {
  background: var(--glass-background);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  outline: none;
}

.p-scrolltop {
  bottom: 50px !important;
}
</style>
