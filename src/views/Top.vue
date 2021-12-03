<template>
  <v-container>
    <v-row class="text-center mt-10">
      <v-col>
        <span>
          人口構成を表示したい都道府県やその市区町村を選択してください。
        </span>
      </v-col>
    </v-row>
    <v-row class="mt-10" justify="center">
      <!-- 都道府県のセレクトボックス -->
      <v-col
        cols="4"
      >
        <v-select
          :items="prefectures"
          label="都道府県"
          outlined
        ></v-select>
      </v-col>
      <!-- 市区町村のセレクトボックス -->
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
  export default {
    name: 'Top',

    data: () => ({
      prefectures: [
        '千葉',
        '東京',
        '神奈川',
      ],
      cities: [
        '渋谷区',
        '目黒区',
        '品川区',
        '大田区',
      ]
    })
  }
</script>
