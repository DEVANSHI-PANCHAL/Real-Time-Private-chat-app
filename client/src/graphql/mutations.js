import {gql} from '@apollo/client'

export const SIGNUP_USER = gql`
mutation SignupUser($userNew: UserInput!) {
    SignupUser(userNew: $userNew) {
        id
        email
        firstName
        lastName
    }
}
`
export const LOGIN_USER = gql`
mutation SigninUser($userSignin: UserSigninInput!) {
    SigninUser(userSignin: $userSignin){
        token
    }
}
`
export const SEND_MSG = gql`
mutation MessagesByUser($receiverId: Int!,$text:String!) {
    MessagesByUser(receiverId: $receiverId,text:$text) {
      id
      text
      receiverId
      senderId
      createdAt
    }
  }
`