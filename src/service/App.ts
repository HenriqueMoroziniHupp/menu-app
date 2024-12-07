import { API } from '../settings/axios'

export default {
  async getApp(slug: string) {
    return API({
      method: 'GET',
      url: `/app/${slug}`
    })
  }
}
