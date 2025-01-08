describe('post /user', () => {
	beforeEach(() => {
		cy.visit('http://localhost:8080/docs')
	})

	it('Generate post /user', () => {
		cy.get('a[href="#/default/createUser"]').click()
		cy.get('button[class="btn try-out__btn"]').click();
		cy.get('button[class="btn execute opblock-control__btn"]').click()
	})
})

describe('get /user/{userId}', () => {
	beforeEach(() => {
		cy.visit('http://localhost:8080/docs')
	})

	it('Generate get /user/{userId}', () => {
		cy.get('a[href="#/default/getUsersTrips"]').click()
		cy.get('button[class="btn try-out__btn"]').click();
		cy.get('input[placeholder="userId - The user\'s Id"]').type('1')
		cy.get('button[class="btn execute opblock-control__btn"]').click()
	})
})

describe('post /user/1/trip', () => {
	beforeEach(() => {
		cy.visit('http://localhost:8080/docs')
	})

	it('Generate post /user/1/trip', () => {
		cy.get('a[href="#/default/createTrip"]').click()
		cy.get('button[class="btn try-out__btn"]').click();
		cy.get('input[placeholder="userId - The user\'s Id"]').type('1') 
		cy.get('button[class="btn execute opblock-control__btn"]').click()
	})
})