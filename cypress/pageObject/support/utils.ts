import { rand, randFirstName, randLastName, randPassword} from '@ngneat/falso';
import { Email } from '../components/email';

export const enum UserType {
    internalUsers = 'Internal Users',
    externalUser = 'External Users'
  }
  
export enum UserRoleInternal {
    admin = 'Admin',
    sales = 'Sales',
    presales = 'Presales',
    pim= 'PIM'
  }

export enum UserRoleExternal {
  customerAdmin = 'Customer Admin', 
  user = 'User', 
  partner = 'Partner'
}

export interface User {
    salutation:string, 
    firstname:string,
    lastname:string,
    email:string,
    phone:string,
    role:string,
    language:string,
    type:string,
    signOrderOnline?:string,
    customerName?:any,
    password?:string
  }

export const user = (roles: Array<string>): User => { 
  return {
    salutation : rand(['Mr', 'Ms']),
    firstname : randFirstName(),
    lastname : randLastName(),
    phone : '+975 17'+ String(Math.random()).substring(2,8),
    email : Email.generateMail(),
    role : rand(roles),
    language: 'English',
    type : rand(['Formal', 'Informal']),
    signOrderOnline : rand(['Yes', 'No']),
    customerName :rand(['TELSTRA LIMITED', 'Wise Tran Traders', 'Company Solutions GmbH', 'Tashi Immobilien AG', 'Testa Bodenbeläge AG']),
    password : randPassword()
  }
};