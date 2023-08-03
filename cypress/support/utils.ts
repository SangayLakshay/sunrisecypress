import { rand, randFirstName, randLastName, randPassword} from '@ngneat/falso';
import { Email } from '../pageObject/components/email';

export const enum UserType {
    internalUsers = 'Internal Users',
    externalUser = 'External Users'
  }
  
export const enum UserRole {
    admin = 'Admin',
    sales = 'Sales',
    presales = 'Presales',
    pim= 'PIM'
  }

export interface User {
    userType:string,
    salutation:string,
    firstName:string,
    lastName:string,
    email:string,
    phone:string,
    role:string,
    language:string,
    type:string,
    signOrderOnline?:string,
    customerName?:any,
    password?:string
  }

export const user = (): User => { 
  let userType = rand(['Internal Users', 'External Users'])
  let role, signOrderOnline, customerName;
  if (userType == UserType.externalUser) {
    role = rand(['Customer Admin', 'User', 'Partner'])
    signOrderOnline = rand(['Yes', 'No'])
    customerName = rand(['TELSTRA LIMITED', 'Wise Tran Traders', 'Company Solutions GmbH', 'Tashi Immobilien AG', 'Testa Bodenbeläge AG'])
  } else {
    role = rand(['Admin', 'Sales', 'Presales', 'PIM'])
    signOrderOnline = null
    customerName = null
  }
  return {
    userType : userType, 
    salutation : rand(['Mr', 'Ms']),
    firstName : randFirstName(),
    lastName : randLastName(),
    phone : '+975 17'+ String(Math.random()).substring(2,8),
    email : Email.generateMail(),
    role : role,
    language: 'English',
    type : rand(['Formal', 'Informal']),
    signOrderOnline : signOrderOnline,
    customerName :customerName,
    password : randPassword()
  }
};