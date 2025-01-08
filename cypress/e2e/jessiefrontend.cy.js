describe('GET /user/{userid}/trip/{tripId}/day/{dayID}', () => {

    beforeEach(() => {
		cy.visit('http://localhost:8080/docs')
	})

    it('Test a GET request', () => {
        cy.get('a[href="#/default/getDay"]').click()
        cy.get('button[class="btn try-out__btn"]').click()
        cy.get('input[placeholder="userId - The user\'s Id"]').type('1')
        cy.get('input[placeholder="tripId - The trip\'s Id"]').type('1')
        cy.get('input[placeholder="dayId - The day\'s Id"]').type('1')
        cy.get('button[class="btn execute opblock-control__btn"]').click()
        
        cy.get('table.responses-table.live-responses-table', { timeout: 10000 }).should('be.visible'); // Ensure the table is visible

        cy.get('table.responses-table.live-responses-table').find('td.response-col_status').should('contain.text', '200');

        cy.get('pre.microlight')
        .should('contain.text', '"id": 1')
        .and('contain.text', '"dayNumber": 1')
        .and('contain.text', '"name": "Snorkeling"')
        .and('contain.text', '"lockedStatus": false');


    })

})



describe('Schemas ', () => {

    beforeEach(() => {
        cy.visit('http://localhost:8080/docs')
    })


    it('Verifies schemas section is visible', () => {
        // Check if the "Schemas" section exists
        cy.contains('Schemas').should('be.visible');
      });

    it('Ensures schema details are hidden initially', () => {
        // Check that the User schema details are not visible
        cy.get('#model-User .model-title').should('be.visible'); // Header is visible
        cy.get('#model-User table').should('not.exist'); // Details table is not yet visible
    });

    it('Expands schema details on click', () => {
        // Click on the User schema
        cy.get('#model-User .model.model-title').click()

        // Check if the details table appears
        cy.get('#model-User table').should('exist').and('be.visible');

        // Verify specific details
        cy.get('#model-User table').contains('id').should('be.visible');
        cy.get('#model-User table').contains('name').should('be.visible');
        cy.get('#model-User table').contains('email').should('be.visible');
        cy.get('#model-User table').contains('password').should('be.visible');

    })
        
    it('Collapses schema details on second click', () => {
        // Click to expand
        cy.get('#model-User .model-title').click();
        cy.get('#model-User table').should('be.visible');
    
        // Click to collapse
        cy.get('#model-User .model-title').click();
        cy.get('#model-User table').should('not.exist');
      });





    



})



