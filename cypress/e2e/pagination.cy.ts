import Login from '../pageObject/page/login';
import UserManagement from '../pageObject/page/userManagement';
import loginCred from '../fixtures/loginCred.json'
import { UserRoleInternal, UserType} from '../pageObject/support/utils';
import internalUser from '../fixtures/internalUser.json'

describe('Admin user', () => {
  before(() => {
    cy.clearAllLocalStorage()
    cy.visit('/')
  })

  it('should login', () => {
    Login.logIn(loginCred)
  })

  it('should set role to admin and go to usermanagement', () => {
    UserManagement.getUserPage()
    UserManagement.setRole(UserRoleInternal.admin)
  })

  it('should find user in table', () => {
    UserManagement.checkContent(internalUser, UserType.internalUsers)
  })
})