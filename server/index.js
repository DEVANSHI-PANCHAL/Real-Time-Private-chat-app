import {ApolloServer,gql} from 'apollo-server'
import crypto from 'crypto'

const users = [
    {
        id:"random",
        firstName:"mukesh",
        lastName:"kumar",
        email:"mukeshkumar@gmail.com",
        password:"123456"
    },
    {
        id:"random1",
        firstName:"suresh",
        lastName:"sharma",
        email:"surya@gmail.com",
        password:"123456"
    },
]

const Todos = [
    {
        title:"buy book",
        by:"random"
    },
    {
        title:"write code",
        by:"random1"
    },
    {
        title:"record video",
        by:"abcdefg"
    },
]


const typeDefs = gql`
type Query{
    users:[User]
    user(id:ID!):User
}
type UserInput{
    firstName:String!
    lastName:String!
    email:String!
    password:String!
}
type Mutation{
    createUser(userNew:UserInput!):User
}
type User{
    id:ID!
    firstName:String!
    lastName:String!
    email:String!
    todos:[Todo]
}

type Todo{
    title:String!
    by:ID!
}
`






const resolvers = {
    Query:{
        users:()=>users,
        user:(_,{id})=>{
            console.log(id)
        return users.find(item=>item.id == id)
        }
    },
    User:{
        todos:(parent)=>{
            console.log(parent)
           return Todos.filter(todo=>todo.by == parent.id)
        }
    },
    Mutation:{
        createUser:(_,{userNew})=>{
            const newUser = {
                id:crypto.randomUUID(),
                ...userNew
            }
            users.push(newUser)
            return newUser
        }
    }
}


const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url})=>{
    console.log(`server ready at ${url}`);
})