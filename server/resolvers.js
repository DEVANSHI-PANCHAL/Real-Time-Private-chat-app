
import pc from '@prisma/client'
import {ApolloError,AuthenticationError} from 'apollo-server'
import bcrypt from 'bcryptjs'

const prisma = new pc.PrismaClient()
const resolvers = {
    Query:{
       
    },
    
    Mutation:{
        SignupUser:async(_,{userNew})=>{
     const user =await prisma.user.findUnique({where:{email:userNew.email}})
        if(user) throw new AuthenticationError("user already exixts with this email")  
        const hashedPassword = await bcrypt.hash(userNew.password,10)
           const newUser = await prisma.user.create({
                data:{
                    ...userNew,
                    password:hashedPassword
                }
            })
            return newUser
        }
    }
}

export default resolvers