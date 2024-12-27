// Test executing the post /user endpoint
describe('post /user', () => {
	beforeEach(() => {
		// Visit the Swagger UI page
		cy.visit('http://localhost:8080/docs')
	})

	it('Generate post /user', () => {
		// Click on the post /user endpoint
		cy.get('a[href="#/default/createUser"]').click()
		// Click on the "Try it out" button
		cy.get('button[class="btn try-out__btn"]').click();
		// Click on the "Execute" button
		cy.get('button[class="btn execute opblock-control__btn"]').click()
	})
})

// Test executing the get /user/{userId} endpoint
describe('get /user/{userId}', () => {
	beforeEach(() => {
		// Visit the Swagger UI page
		cy.visit('http://localhost:8080/docs')
	})

	it('Generate get /user/{userId}', () => {
		// Click on the get /user/{userId} endpoint
		cy.get('a[href="#/default/getUsersTrips"]').click()
		// Click on the "Try it out" button
		cy.get('button[class="btn try-out__btn"]').click();
		// Enter the userId
		cy.get('input[placeholder="userId - The user\'s Id"]').type('1')
		// Click on the "Execute" button
		cy.get('button[class="btn execute opblock-control__btn"]').click()
	})
})

// Test executing the post /user/{userId}/trip endpoint
describe('post /user/1/trip', () => {
	beforeEach(() => {
		// Visit the Swagger UI page
		cy.visit('http://localhost:8080/docs')
	})

	it('Generate post /user/1/trip', () => {
		// Click on the post /user/{userId}/trip endpoint
		cy.get('a[href="#/default/createTrip"]').click()
		// Click on the "Try it out" button
		cy.get('button[class="btn try-out__btn"]').click();
		// Enter the userId
		cy.get('input[placeholder="userId - The user\'s Id"]').type('1') 
		// Click on the "Execute" button
		cy.get('button[class="btn execute opblock-control__btn"]').click()
	})
})

// Test executing the get /user/{userId}/trip/{tripId} endpoint
describe('delete /user/{userId}/trip/{tripId}/day/{dayId}/activity/{activityId}', () => {
	beforeEach(() => {
		// Visit the Swagger UI page
		cy.visit('http://localhost:8080/docs')
	})

	it('Generate delete /user/{userId}/trip/{tripId}/day/{dayId}/activity/{activityId}', () => {
		// Click on the delete /user/{userId}/trip/{tripId}/day/{dayId}/activity/{activityId} endpoint
		cy.get('a[href="#/default/deleteActivity"]').click()
		// Click on the "Try it out" button
		cy.get('button[class="btn try-out__btn"]').click();
		// Enter the userId, tripId, dayId, and activityId
		cy.get('input[placeholder="userId - The user\'s Id"]').type('1') 
		cy.get('input[placeholder="tripId - The trip\'s Id"]').type('1') 
		cy.get('input[placeholder="dayId - The day\'s Id"]').type('1') 
		cy.get('input[placeholder="activityId - The activity\'s Id"]').type('1') 
		// Click on the "Execute" button
		cy.get('button[class="btn execute opblock-control__btn"]').click()
	})
})