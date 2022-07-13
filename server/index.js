import {ApolloServer,gql} from 'apollo-server'

const typeDefs = gql`
type Query{
    greet:String
}
`
const resolvers = {
    Query:{
        greet:()=>"Hello world"
    }
}

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url})=>{
    console.log(`server ready at ${url}`);
})