import Login from "../pageObject/page/login";
import loginCred from '../fixtures/loginCred.json'

describe('User', () => {
  before(() => {
    cy.visit('/')
  })

  it('should login', () => {
    Login.logIn(loginCred)
  })

  it('should logout', () => {
    Login.logOut()
  })
})