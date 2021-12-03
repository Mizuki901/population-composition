describe('トップページ', () => {
  describe('ルーティング', () => {
    it('ルートURL指定時に、トップページが表示されること', () => {
      cy.visit('/')
      cy.contains('h1', 'Welcome to Vuetify')
    })
    it('ルート以外の任意のURL指定時に、トップページにリダイレクトされること', () => {
      cy.visit('/#/xxx')
      cy.url().should('not.include', '/#/xxx')
      cy.contains('h1', 'Welcome to Vuetify')
    })
  })
})
