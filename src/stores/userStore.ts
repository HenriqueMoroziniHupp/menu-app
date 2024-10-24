import Client from '@/service/Client'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

interface IUser {
  id: number
  slug: string
  email: string
  name: string
  bannerUrl: string
  description?: string
  role: string
}

type TUserVisual = Pick<IUser, 'name' | 'description' | 'bannerUrl'>

export const useUserStore = defineStore(
  'client',
  () => {
    const user = ref({} as IUser)

    const fetchData = async () => {
      const { hostname } = window.location
      const slug = hostname.split('.')[0]
      const response = await Client.getClient(slug)

      user.value = response.data
    }

    const slug = computed(() => user.value.slug)

    const userData = computed<TUserVisual>(() => ({
      name: user.value?.name,
      description: user.value?.description,
      bannerUrl: user.value.bannerUrl
    }))

    function $reset() {
      user.value = {} as IUser
    }

    return { fetchData, slug, userData, $reset }
  }
  // {
  //   persist: {
  //     storage: sessionStorage
  //   }
  // }
)
