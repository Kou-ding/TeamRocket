describe('PUT Frontend Testing - Update Trip', () => {
    it('should update trip details successfully', () => {
      const tripId = '456';
      const updatedTripDetails = {
        name: 'Updated Trip Name',
        description: 'Updated Trip Description',
      };
  
      // Visit the edit trip page
      cy.visit(`/trip/${tripId}/edit`);
  
      // Fill in the update form
      cy.get('input[name="name"]').clear().type(updatedTripDetails.name);
      cy.get('textarea[name="description"]').clear().type(updatedTripDetails.description);
  
      // Submit the update form
      cy.get('button[type="submit"]').click();
  
      // Assert success message
      cy.contains('Trip updated successfully').should('be.visible');
  
      // Assert the updated details are reflected in the UI
      cy.get('.trip-name').should('contain', updatedTripDetails.name);
      cy.get('.trip-description').should('contain', updatedTripDetails.description);
    });
  
    it('should show validation errors for invalid input', () => {
      const tripId = '456';
  
      // Visit the edit trip page
      cy.visit(`/trip/${tripId}/edit`);
  
      // Submit empty form
      cy.get('button[type="submit"]').click();
  
      // Assert validation error messages
      cy.contains('Name is required').should('be.visible');
      cy.contains('Description is required').should('be.visible');
    });
  });

  describe('Explore Frontend Testing - Trip Exploration', () => {
    it('should display a list of trips', () => {
      // Visit the trips page
      cy.visit('/trips');
  
      // Assert that trips are displayed
      cy.get('.trip-card').should('have.length.greaterThan', 0);
  
      // Assert that trip cards contain necessary information
      cy.get('.trip-card').first().within(() => {
        cy.get('.trip-name').should('be.visible');
        cy.get('.trip-description').should('be.visible');
        cy.get('button.view-details').should('be.visible');
      });
    });
  
    it('should navigate to trip details when "View Details" is clicked', () => {
      // Visit the trips page
      cy.visit('/trips');
  
      // Click on "View Details" of the first trip
      cy.get('.trip-card').first().find('button.view-details').click();
  
      // Assert that the trip details page is displayed
      cy.url().should('include', '/trip/');
      cy.contains('Trip Details').should('be.visible');
    });
  });
  