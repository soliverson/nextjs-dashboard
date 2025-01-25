// auth.config.ts
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      if (isOnDashboard) {
        // Require login to access /dashboard
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to the login page
      } else if (isLoggedIn) {
        // If already logged in, redirect to /dashboard
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      return true;
    },
  },

  // IMPORTANT: Provide the secret for token signing in production
  secret: process.env.NEXTAUTH_SECRET,

  // List your providers here (added empty array for now)
  providers: [],
} satisfies NextAuthConfig;
