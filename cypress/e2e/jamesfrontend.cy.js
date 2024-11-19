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