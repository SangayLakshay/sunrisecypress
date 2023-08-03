import { User } from "../../support/utils"

export class Email {
    static checkMail(email: string) {
        cy.mailosaurGetMessage(Cypress.env('serverId'), {
            sentTo: email,
          })
            .its('html.body')
            .then((html) => {
              cy.document({ log: false }).invoke({ log: false }, 'write', html)
            })
    }

    static generateMail() {
      const randomId = Cypress._.random(1e6)
      return `test-${randomId}@${Cypress.env('serverId')}.mailosaur.net`
    }

    static acceptInvite(user: User) {
      cy.get('title').should('have.text', 'Email Template')
      cy.get('button').contains('Accept Invitation', {matchCase:false}).click().then(() => {
        cy.get('h1').should('have.text', ' Accept Invitation ')
        cy.typeInput('password', user.password)
        cy.typeInput('cPassword', user.password)
        cy.datacyClick('Accept').then(() => {
          cy.visible('Invitation accepted successfully')
        })
      })

    }
}