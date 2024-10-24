import { API } from '../settings/axios'

export default {
  async getCategoriesWithProducts(slug: string) {
    return API({
      method: 'GET',
      url: `${slug}/products`
    })
  }
}
