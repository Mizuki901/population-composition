describe('メニューバー', () => {
  it('メニューバーに必要な情報が表示されていること', () => {
    cy.visit('/')
    cy.get('.v-app-bar')
    cy.get('.v-app-bar__nav-icon')
    cy.contains('.v-toolbar__title', '市区町村別人口構成')    
  })
  it('ナビゲーションドロワーに必要な情報が表示されていること', () => {
    // 「このアプリについて」ボタン
    cy.visit('/')
    cy.get('.v-app-bar__nav-icon').click()
    cy.get('.v-list-item__title').contains('このアプリについて').click()
    cy.get('.v-card__title').contains('このアプリについて')
    cy.get('#overview-dialog-close-button').contains('OK').click()

    // GitHubリンク
    cy.get('.v-app-bar__nav-icon').click()
    cy.get('.v-list-item__title').contains('GitHub')
    cy.get('.v-list-item-group a')
      .first()
      .should('have.attr', 'href', 'https://github.com/Mizuki901/population-composition')
      .should('have.attr', 'target', '_blank')
  })
})
