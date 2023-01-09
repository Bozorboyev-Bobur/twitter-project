import NextAuth from "next-auth"
import TwitterProvider from "next-auth/providers/twitter"
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    TwitterProvider({
      // api keys
      // 'JRcuUZZ5LjE0P2V3elgvSBhzO'
      // 9iVNCGh9bccFpGD7HOr3un8zl70ZFcabxswz4I7ja9ut7MK5GJ
      // AAAAAAAAAAAAAAAAAAAAAOnzkQEAAAAAjWlbOfuKiA5Yxwf%2B29pajJhpFDU%3DqeANAImfX4RcE7rCSHbyWdDl2SzWpGqC4pldyAlLSuWItSK3Vy

      //clientId: VXh4clZZWkQ5NkQwUFZ2Zm96RzQ6MTpjaQ
      //clientSecret: 4c_ScCZkmFrtlaPnLgeDRpDBW93B5fC24Us_c6e7XrCdKReWrB
      clientId: process.env.TWITTER_CLIENT_ID || "VXh4clZZWkQ5NkQwUFZ2Zm96RzQ6MTpjaQ",
      clientSecret: process.env.TWITTER_CLIENT_SECRET || "4c_ScCZkmFrtlaPnLgeDRpDBW93B5fC24Us_c6e7XrCdKReWrB",
      version: '2.0',
    })
  ],
  secret: process.env.NEXTAUTH_SECRET || "thisisnextauthpassword"
})