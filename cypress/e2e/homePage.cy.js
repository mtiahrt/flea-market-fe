describe('home page e2e test', () => {
    it('Visits the home page', () => {
        cy.visit("https://flea-market-fe.herokuapp.com");
    });
    it('homepage contains Gretchenkelly title', () => {
        cy.visit("https://flea-market-fe.herokuapp.com");
        cy.contains('Gretchenkelly');
    });
    it('clicking a sale item takes us to the item detail page', () => {
        cy.visit("https://flea-market-fe.herokuapp.com");
        cy.contains('Price').click();
        cy.url().should('include', 'DetailedItem/')
    })
})
