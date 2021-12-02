<template>
  <v-app>
    <!-- メニューバー -->
    <bar/>
    <!-- コンテンツ -->
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Bar from '@/components/Bar'
export default {
  name: 'App',
  components: {
    Bar,
  },

  data: () => ({
  }),
};
</script>
