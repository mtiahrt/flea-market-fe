describe('home page e2e test', () => {
    it('Visits the home page', () => {
        cy.visit("https://localhost:3000");
    });
    it('homepage contains Gretchenkelly title', () => {
        cy.visit("https://localhost:3000");
        cy.contains('Gretchenkelly');
    });
    it('clicking a sale item takes us to the item detail page', () => {
        cy.visit("https://localhost:3000");
        cy.contains('Price').click();
        cy.url().should('include', 'DetailedItem/')
    })
})
