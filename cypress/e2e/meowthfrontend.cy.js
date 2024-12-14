describe('FT-02: Explore Frontend Testing', () => {
    beforeEach(() => {
      // Visit the API documentation page
      cy.visit('http://localhost:8080/docs');
    });
  
    it('Checks the functionality of the Explore button', () => {
      // Ensure the Explore button is visible
      cy.get('button').contains('Explore').should('be.visible');
  
      // Enter some text in the input field next to the Explore button
      cy.get('input').type('/api-docs');
  
      // Click the Explore button
      cy.get('button').contains('Explore').click();
  
      // Verify the page updates or displays the expected content
      cy.get('.swagger-ui') // Adjust selector if needed
        .should('be.visible');
    });
  
    it('Validates behavior with empty input', () => {
      // Ensure the Explore button is visible
      cy.get('button').contains('Explore').should('be.visible');
  
      // Leave the input field empty and click Explore
      cy.get('button').contains('Explore').click();
  
    });
  });
  
  describe('FT-06: PUT frontend testing ', () => {
    beforeEach(() => {
      // Visit the API documentation page
      cy.visit('http://localhost:8080/docs');
    });
  
    it('Tests the PUT request with valid input', () => {
      // Click on the PUT operation to expand it
      cy.contains('PUT').click();
  
      // Click on the "Try it out" button to enable input fields
      cy.get('button').contains('Try it out').click();
  
      // Fill in the required input fields
      cy.get('input[placeholder="userId - The user\'s Id"]').type('1');
      cy.get('input[placeholder="tripId - The trip\'s Id"]').type('1');
      cy.get('input[placeholder="dayId - The day\'s Id"]').type('1');
      cy.get('input[placeholder="activityId - The activity\'s Id"]').type('1');
  
      // Correctly format the JSON payload and input it into the request body
      cy.get('textarea').clear().type(`{
        "name": "Updated Activity",
        "description": "Updated activity description",
        "lockedStatus": false
      }`, { parseSpecialCharSequences: false });
  
      // Click the "Execute" button to send the PUT request
      cy.get('button').contains('Execute').click();
  
      // Verify that the response table is visible
      cy.get('table.responses-table.live-responses-table', { timeout: 10000 }).should('be.visible');
  
      // Check the response status is 200
      cy.get('table.responses-table.live-responses-table')
        .find('td.response-col_status')
        .should('contain.text', '200');
    });
  });
  
  