import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface User {
    subscription?: string
  }
  
  interface Session {
    user: {
      id: string
      email: string
      name?: string
      subscription?: string
    }
  }
}