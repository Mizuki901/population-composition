import client from './client'

export default {
  getPrefectures: () => {
    return new Promise((resolve , reject) => {
      client.get('/prefectures')
        .then(res => resolve(res))
        .catch(err => reject(JSON.parse(JSON.stringify(err)))) // そのままだと何故かjsonを正しく読み取ってくれないことがあったので、stringifyしてparseしなおすことで、再度jsonオブジェクトに変換している
    })
  }
}