import client from './client'

export default {
  getPrefectures: () => {
    return new Promise((resolve , reject) => {
      client.get('/prefectures')
        .then(res => resolve(res))
        .catch(err => reject(JSON.parse(JSON.stringify(err)))) // そのままだと何故かjsonを正しく読み取ってくれないことがあったので、stringifyしてparseしなおすことで、再度jsonオブジェクトに変換している
    })
  },
  getCities: (prefCode) => {
    return new Promise((resolve , reject) => {
      client.get(`/cities?prefCode=${prefCode}`)
        .then(res => resolve(res))
        .catch(err => reject(JSON.parse(JSON.stringify(err))))
    })
  },
  getPopulationComposition: (prefCode, cityCode) => {
    return new Promise((resolve , reject) => {
      client.get(`/population/composition/perYear?prefCode=${prefCode}&cityCode=${cityCode}`)
        .then(res => resolve(res))
        .catch(err => reject(JSON.parse(JSON.stringify(err))))
    })
  }
}