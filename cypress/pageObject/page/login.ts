export default class Login {
    static logIn(user: object) {
        cy.login(user['email'], user['password'])
        cy.visible('Signed in successfully')
    }

    static logOut() {
        cy.datacyClick('logOut').then(() => {
            cy.datacyClick('Confirm')
        })
        cy.visible('Logged out successfully')
        cy.url().should('eq', 'https://onehub-next.selise.dev/auth')
    }
}