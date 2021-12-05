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
      // 都道府県というラベルがついたセレクトボックスがあること
      cy.get('.v-select__slot label').contains('都道府県')
      // クリックすると、各県がプルダウンで表示されること
      cy.get('#prefectures').parent().click()
      cy.get('.v-list-item__title').contains('北海道')
      cy.get('.v-list-item__title').contains('青森県')
      cy.get('.v-list-item__title').contains('岩手県')
      // 任意の都道府県を選択できること
      // <v-select>は、実際には<select>ではなく、<input type="text">で実装されているため、cy.select()ではなくcy.type()で操作する必要がある
      // また、<input>にはreadonly="readonly"属性が付いているので、{force: true}オプションが必要
      cy.get('#prefectures').type('東京都{enter}', {force: true})

      // 市区町村というラベルがついたセレクトボックスがあること
      cy.get('.v-select__slot label').contains('市区町村')
      // クリックすると、各市区町村がプルダウンで表示されること
      cy.get('#cities').parent().click()
      cy.get('.v-list-item__title').contains('千代田区')
      cy.get('.v-list-item__title').contains('中央区')
      cy.get('.v-list-item__title').contains('港区')
      // 任意の市区町村を選択できること
      cy.get('#cities').type('千代田区{enter}', {force: true})
    })
  })
})
