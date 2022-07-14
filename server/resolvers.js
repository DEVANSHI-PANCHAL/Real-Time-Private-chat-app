import jwt from 'jsonwebtoken'
import pc from '@prisma/client'
import {ApolloError,AuthenticationError} from 'apollo-server'
import bcrypt from 'bcryptjs'

const prisma = new pc.PrismaClient()

// console.log(process.env.JWT_SECRET)
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
        },
        SigninUser:async (_,{userSignin})=>{
            const user =await prisma.user.findUnique({where:{email:userSignin.email}})
            if(!user) throw new AuthenticationError("User doesnt exist with this email")
           const doMatch = await bcrypt.compare(userSignin.password,user.password)
           if(!doMatch) throw new AuthenticationError("email or password incorrect")
            const token =  jwt.sign({userId:user.id},process.env.JWT_SECRET)
            return {token}
        }
    }
}

export default resolvers