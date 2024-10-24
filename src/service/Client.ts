import { API } from '../settings/axios'

export default {
  async getClient(slug: string) {
    return API({
      method: 'GET',
      url: `/client/${slug}`
    })
  }
}
