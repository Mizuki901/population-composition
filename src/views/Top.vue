<template>
  <v-container>
    <v-row class="text-center mt-10">
      <v-col>
        <p>
          人口構成を表示したい都道府県やその市区町村を選択してください。
        </p>
      </v-col>
    </v-row>
    <!-- 都道府県一覧をローディング中に表示する -->
    <v-row class="mt-5" justify="center" v-show="isLoadingPrefectures">
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
    </v-row>
    <!-- 都道府県・市区町村のセレクトボックス -->
    <v-row class="mt-5" justify="center" v-show="!isLoadingPrefectures">
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
    <!-- 人口構成 -->
    <v-row class="mt-10" justify="center" v-show="isLoadingPopulationComposition">
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
    </v-row>
    <div v-show="!isLoadingPopulationComposition && populationComposition">
      <!-- グラフタイトル -->
      <v-row class="text-center mt-10">
        <v-col>
          <p>
            {{ prefName }} {{ cityName }} の人口構成
          </p>
        </v-col>
      </v-row>
      <!-- 人口構成グラフ -->
      <v-row class="mt-5" justify="center">
        <line-chart
          :chart-data="chartData"
          :options="chartOptions"
          :width="chartWidth"
        ></line-chart>
      </v-row>
    </div>
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
import LineChart from '../plugins/lineChart.js'

export default {
  name: 'Top',
  components: {
    LineChart
  },
  data: () => ({
    // 各種ローディング表示の制御
    isLoadingPrefectures: false,
    isLoadingPopulationComposition: false,
    // セレクトボックスから選択可能な都道府県、市区町村
    prefectures: [],
    cities: [],
    // セレクトボックスで選択された都道府県、市区町村
    prefName: null,
    cityName: null,
    // 人口構成
    populationComposition: null,
    chartData: null,
    chartOptions: null,
    chartWidth: window.innerWidth * 0.8,
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
    cityName: async function () {
      this.isLoadingPopulationComposition = true
      this.populationComposition = null
      if (this.prefCode && this.cityCode) {
        try {
          const res = await resasApi.getPopulationComposition(this.prefCode, this.cityCode)
          this.populationComposition = res.data.result
          this.fillChart()
        } catch (e) {
          if (e.message && e.message === 'Network Error') this.isNetworkError = true        
        }
      }
      this.isLoadingPopulationComposition = false
    },
  },
  methods: {
    fillChart: function () {
      const lineColors = ['#2a9d8f', '#e9c46a', '#f4a261', '#e76f51']
      const labels = ['総人口', '14歳以下', '15~64歳','65歳以上']
      this.chartData = {
        labels: this.populationComposition.data[0].data.map(v => v.year),
        datasets: [0, 1, 2, 3].map(i => {
          return {
            label: labels[i],
            borderColor: lineColors[i],
            pointBackgroundColor: lineColors[i],
            backgroundColor: 'rgba(0, 0, 0, 0)', // グラフの下部分は塗りつぶさない
            borderWidth: 4,
            lineTension: 0,
            data: this.populationComposition.data[i].data.map(v => v.value)
          }
        })          
      }
      this.chartOptions = {
        responsive: false,
      }
    },
  },
}
</script>
