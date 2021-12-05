<template>
  <v-container>
    <v-row class="text-center mt-10">
      <v-col>
        <span>
          人口構成を表示したい都道府県やその市区町村を選択してください。
        </span>
      </v-col>
    </v-row>
    <!-- 都道府県一覧をローディング中に表示する -->
    <v-row class="mt-10" justify="center" v-show="isLoadingPrefectures">
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
    </v-row>
    <!-- 都道府県・市区町村のセレクトボックス -->
    <v-row class="mt-10" justify="center" v-show="!isLoadingPrefectures">
      <!-- 都道府県 -->
      <v-col
        cols="4"
      >
        <v-select
          id="prefectures"
          v-model="prefName"
          :items="prefectures.map(v => v.prefName)"
          label="都道府県"
          outlined
        ></v-select>
      </v-col>
      <!-- 市区町村 -->
      <v-col
        cols="4"
      >
        <v-select
          id="cities"
          v-model="cityName"
          :items="cities.map(v => v.cityName)"
          label="市区町村"
          outlined
        ></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import resasApi from '@/api/resasApi'

export default {
  name: 'Top',
  data: () => ({
    isLoadingPrefectures: false,
    // セレクトボックスから選択可能な都道府県、市区町村
    prefectures: [],
    cities: [],
    // セレクトボックスで選択された都道府県、市区町村
    prefName: null,
    cityName: null,
  }),
  mounted() {
    this.isLoadingPrefectures = true
    resasApi.getPrefectures()
      .then(res => {
        this.prefectures = res.data.result
      })
      .finally(() => {
        this.isLoadingPrefectures = false
      })
  },
  computed: {
    prefCode: function () {
      if (!this.prefName || !this.prefectures.length === 0) return null
      return this.prefectures.find(v => v.prefName === this.prefName).prefCode
    },
    cityCode: function () {
      if (!this.cityName || !this.cities.length === 0) return null
      return this.cities.find(v => v.cityName === this.cityName).cityCode
    },
  },
  watch: {
    prefName: function () {
      // 都道府県が選択される度に、現在選択済みの市区町村をリセットする
      this.cityName = null
      resasApi.getCities(this.prefCode)
        .then(res => {
          this.cities = res.data.result
        })
    },
  },
}
</script>
