<template>
  <div>
    <!-- メニューバー -->
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click="showDrawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>市区町村別人口構成</v-toolbar-title>
    </v-app-bar>

    <!-- ナビゲーションドロワー -->
    <v-navigation-drawer
      v-model="showDrawer"
      absolute
      temporary
    >
      <v-list
        nav
      >
        <v-list-item-group
          active-class="text--accent-4"
        >
          <v-list-item @click="showOverviewDialog = true">
            <v-list-item-title>
              このアプリについて
            </v-list-item-title>
          </v-list-item>
          <a href="https://github.com/Mizuki901/population-composition" target="_blank" rel="noopener noreferrer">
            <v-list-item>
              <v-list-item-title>
                GitHub
              </v-list-item-title>
              <v-list-item-icon>
                <v-icon>mdi-github</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </a>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- ダイアログ -->
    <v-dialog
      v-model="showOverviewDialog"
      persistent
      max-width="600"
    >
      <v-card>
        <v-card-title class="text-h5">
          このアプリについて
        </v-card-title>
        <v-card-text>
          <p>
            このアプリは市区町村別の人口構成を可視化するアプリケーションです。<br>
            人口構成のデータには、
            <a href="https://opendata.resas-portal.go.jp" target="_blank" rel="noopener noreferrer">RESAS API</a>
            を使用しています。
          </p>
          <p>
            また、このアプリのリポジトリは、
            <a href="https://jp.vuejs.org/index.html" target="_blank" rel="noopener noreferrer">Vue.js</a>
            というJavascriptフレームワークと、
            <a href="https://www.cypress.io" target="_blank" rel="noopener noreferrer">Cypress</a>
            というE2Eテストフレームワークを使った、自己学習用リポジトリです。<br>
            実際のソースコードは、このメニューバー > GitHub のリンク先から確認できます。
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            id="overview-dialog-close-button"
            color="primary"
            @click="showOverviewDialog = false"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'Bar',

  data: () => ({
    showDrawer: false,
    showOverviewDialog: false,
  }),
}
</script>

<style scoped>
/* <a>タグのデフォルトの装飾をリセットするための設定 */
.v-navigation-drawer__content a {
  text-decoration: none;
}
.v-navigation-drawer__content a:link {
    color: initial;
}
.v-navigation-drawer__content a:visited {
    color: initial;
}
.v-navigation-drawer__content a:hover {
    color: initial;
}
</style>
