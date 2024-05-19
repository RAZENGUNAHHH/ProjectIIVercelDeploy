
import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import connectDB from "../../../../../config/database"
import bcrypt from "bcrypt";
import userModel from "../../../../../model/userModel"
import GoogleProvider from "next-auth/providers/google";


export const authOptions : NextAuthOptions = {
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. 'Sign in with...')
          name: 'Credentials',
          // The credentials is used to generate a suitable form on the sign in page.
          // You can specify whatever fields you are expecting to be submitted.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {},
          async authorize(credentials : any, req) {
            if(!credentials) return null
            await connectDB()
            const find_user = await userModel.findOne({ email : credentials.email})

            if (find_user && await bcrypt.compare(credentials.pwd , find_user.password)){
                return {
                    id : find_user._id,
                    student_id : find_user.student_id,
                    email : find_user.email,
                    name : find_user.name,
                    sur_n  : find_user.sur_n,
                    role : find_user.role,
                    ac_y : find_user.ac_year
                }
            }else{
                throw new Error('Invalid student or password')
            }
            const res = await fetch("/your/endpoint", {
              method: 'POST',
              body: JSON.stringify(credentials),
              headers: { "Content-Type": "application/json" }
            })
            const user = await res.json()
      
            // If no error and we have user data, return it
            if (res.ok && user) {
              return user
            }
          }
        }),
        GoogleProvider({
          clientId: String(process.env.GOOGLE_CLIENT_ID),
          clientSecret: String(process.env.GOOGLE_CLIENT_SECRET)
        })
      ],
      session : {
        strategy : 'jwt'
      },
      secret : process.env.NEXTAUTH_SECRET,
      pages : {
        signIn : '/signIn'
      },
      callbacks: {

        async redirect({ url, baseUrl }) {
          return baseUrl
        },
        async session({ session, user, token }) {
            if (session.user){
              // @ts-ignore
              session.user.id = token.id
             // @ts-ignore
              session.user.student_id = token.student_id
               // @ts-ignore
              session.user.name = token.name
               // @ts-ignore
              session.user.sur_n = token.sur_n
              // @ts-ignore
              session.user.ac_y = token.ac_y
               // @ts-ignore
              session.user.role  = token.role
            }
          return session
        },
        async jwt({ token, user}) {
            if(user){
                 token.id = user.id
                // @ts-ignore
                 token.student_id  = user.student_id
                 // @ts-ignore
                 token.name  = user.name
                 // @ts-ignore
                 token.sur_n  = user.sur_n
                  // @ts-ignore
                 token.ac_y  = user.ac_y
                   // @ts-ignore
                 token.role  = user.role
            }
          return token
        }
    }
      

}

const handler = NextAuth(authOptions)

export { handler as GET , handler as POST}

