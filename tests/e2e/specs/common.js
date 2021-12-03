describe('メニューバー', () => {
  it('ページタイトルが正しく表示されていること', () => {
    cy.visit('/')
    cy.contains('.v-toolbar__title', '都道府県別人口構成')    
  })
  
})
