describe('home page e2e test', () => {
    it('Visits the home page', () => {
        cy.visit("https://localhost:3000");
    });
    it('homepage contains Gretchenkelly title', () => {
      cy.visit("https://localhost:3000");
      cy.contains('Gretchenkelly');
    });

    it('check for number of items greater than 0', () => {
      cy.get('.sale-item').should('have.length.greaterThan', 1)
    })
    
    it('check for number of sale items is greater than 0', () => {
      cy.get('.sale-item').should('have.length.greaterThan', 1)
    })

    it('check for clicking on the first sale-item', () => {

      cy.get('.sale-item').first().as('firstBtn')

      cy.get('@firstBtn').click()
    })

})
