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
      cy.visit('/')
      cy.get('.v-select__slot label').contains('都道府県')
      cy.get('.v-select__slot label').contains('市区町村')
    })
  })
})
