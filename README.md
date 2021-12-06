# population-composition

このアプリは市区町村別の人口構成を可視化するアプリケーションです。
また、このアプリのリポジトリは、 [Vue.js](https://jp.vuejs.org/index.html) というJavascriptフレームワークと、 [Cypress](https://www.cypress.io) というE2Eテストフレームワークを使った、自己学習用リポジトリです。

## 事前準備

```
git clone <このリポジトリのGit URL>
cd population-composition
npm install
```

```
# RESAS APIの利用登録を行い、発行されたAPIキーをsrc/api/client.jsに記載する
cp src/api/client.js.sample src/api/client.js
vi src/api/client.js
```

## アプリケーションのローカル起動
```
npm run serve
```

## E2Eテストの実行
```
npm run test:e2e
```

## Lintおよび自動修正
```
npm run lint
```

## アプリケーションのビルド
```
npm run build
```
