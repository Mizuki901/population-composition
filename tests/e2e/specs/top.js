describe('トップページ', () => {
  describe('ルーティング', () => {
    it('ルートURL指定時に、トップページが表示されること', () => {
      cy.visit('/')
      cy.contains('span', '人口構成を表示したい都道府県やその市区町村を選択してください。')
    })
    it('ルート以外の任意のURL指定時に、トップページにリダイレクトされること', () => {
      cy.visit('/#/xxx')
      cy.url().should('not.include', '/#/xxx')
      cy.contains('span', '人口構成を表示したい都道府県やその市区町村を選択してください。')
    })
  })
  describe('コンテンツ', () => {
    it('必要な要素が表示されていること', () => {
      // 都道府県のセレクトボックス
      cy.visit('/')
      // 都道府県というラベルがついたセレクトボックスがあること
      cy.get('.v-select__slot label').contains('都道府県')
      // クリックすると、各県がプルダウンで表示されること
      cy.get('#prefectures').parent().click()
      cy.get('.v-list-item__title').contains('北海道')
      cy.get('.v-list-item__title').contains('青森県')
      cy.get('.v-list-item__title').contains('岩手県')
      // 任意の都道府県を選択できること
      cy.get('#prefectures').type('東京都{enter}', {force: true})

      // 市区町村のセレクトボックス
      cy.get('.v-select__slot label').contains('市区町村')

    })
  })
})
