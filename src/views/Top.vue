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
          :items="cities"
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
    // 選択可能な都道府県・市区町村
    prefectures: [],
    cities: [],
    // 選択された都道府県・市区町村
    prefecture: null,
    city: null
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
}
</script>
