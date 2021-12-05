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
    <!-- ネットワーク接続エラー時のダイアログ -->
    <v-dialog
      v-model="isNetworkError"
      persistent
      max-width="360"
    >
      <v-card>
        <v-card-text class="pt-5">
          ネットワークの接続に問題があります。<br>
          ネットワークに接続できているかを再度確認して、このアプリを開き直してください。
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="isNetworkError = false"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
    // 各種エラー
    isNetworkError: false,
  }),
  async mounted() {
    this.isLoadingPrefectures = true
    try {
      const res = await resasApi.getPrefectures()
      this.prefectures = res.data.result
    } catch (e) {
      if (e.message && e.message === 'Network Error') this.isNetworkError = true
    }
    this.isLoadingPrefectures = false
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
    prefName: async function () {
      // 都道府県が選択される度に、現在選択済みの市区町村をリセットする
      this.cityName = null
      try {
        const res = await resasApi.getCities(this.prefCode)
        this.cities = res.data.result
      } catch (e) {
        if (e.message && e.message === 'Network Error') this.isNetworkError = true
      }
    },
  },
}
</script>
