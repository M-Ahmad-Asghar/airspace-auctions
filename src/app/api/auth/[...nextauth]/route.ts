// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import { clientPromise } from '@/lib/mongodb'
import User from '@/models/User'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Ensure database connection
          await clientPromise;
          
          // Find user and include password for comparison
          const user = await User.findOne({ 
            email: credentials.email.toLowerCase() 
          }).select('+password');
          
          if (!user) {
            return null;
          }

          // Check if user signed up with Google
          if (user.provider === 'google') {
            throw new Error('Please sign in with Google');
          }

          // Verify password
          const isPasswordValid = await user.comparePassword(credentials.password);
          if (!isPasswordValid) {
            return null;
          }

          // Return user object
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            image: user.image,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],
  // adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth', // Your custom sign-in page
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (account?.provider === 'google') {
          // Ensure database connection
          await clientPromise;
          
          // Check if user exists with this email
          const existingUser = await User.findOne({ email: user.email });
          
          if (existingUser && existingUser.provider === 'credentials') {
            // User exists with credentials, don't allow Google sign-in
            return false;
          }
          
          if (!existingUser) {
            // Create new user for Google sign-in
            await User.create({
              email: user.email,
              name: user.name || profile?.name,
              image: user.image || profile?.picture,
              provider: 'google',
              googleId: account.providerAccountId,
              isVerified: true,
            });
          }
        }
        return true;
      } catch (error) {
        console.error('SignIn callback error:', error);
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      console.log('Redirect callback - url:', url, 'baseUrl:', baseUrl);
      
      // If it's a relative callback URL, use it
      if (url.startsWith("/")) return `${baseUrl}${url}`
      
      // If it's on the same origin, allow it
      if (url.startsWith(baseUrl)) return url
      
      // For successful sign-in, redirect to home page
      return `${baseUrl}/`
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, account, user }) {
      if (account && user) {
        token.sub = user.id;
      }
      return token;
    }
  },
  events: {
    async signIn(message) {
      console.log('User signed in:', message.user.email)
    }
  }
})

export { handler as GET, handler as POST }