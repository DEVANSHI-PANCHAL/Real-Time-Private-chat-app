import { ApolloServer, gql } from 'apollo-server-express'
import typeDefs from './typeDefs.js'
import resolvers from './resolvers.js'
import { WebSocketServer } from 'ws';
import express from 'express'
import { useServer } from 'graphql-ws/lib/use/ws';
import {makeExecutableSchema} from '@graphql-tools/schema'
const app = express();

const context = ({req}) => {
    const {authorization} = req.headers
    if(authorization){
        const {userId} = jwt.verify(authorization,process.env.JWT_SECRET)
        return {userId}
    }
}

const schema = makeExecutableSchema({typeDefs,resolvers})
//create apollo server
const apolloServer = new ApolloServer({ schema,context })

await apolloServer.start()
apolloServer.applyMiddleware({ app, path:"/graphql" });

const server = app.listen(4000,() => {
    const wsServer = new WebSocketServer({
        server,
        path: '/graphql',
      });
      useServer({ schema },wsServer);
      console.log("Apollo and subscription server is up")
})
// const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     context:({req})=>{
//         const {authorization} = req.headers
//         if(authorization){
//           const {userId} = jwt.verify(authorization,process.env,JWT_SECRET)
//           return {userId}
//         }
//     }
// });

// server.listen().then(({ url }) => {
//     console.log(`server ready at ${url}`);
// })

