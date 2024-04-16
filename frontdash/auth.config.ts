import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/',
  },
  callbacks: {
    jwt: async ({ token, user, session }) => {
      // console.log("jwt callback", {token, user, session});
      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
          email: user.email
        }
      }
      return token;
    },
    session: async ({ session, token, user }) => {
      // console.log("session callback", {session, token, user});
      if (token) {
        return {
          ...session,
            ...session.user,
            id: token.id,
            name: token.name,
            email: token.email
        };
      } 
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname === '/';
      const isOnLogIn = nextUrl.pathname.startsWith('/login');
      const isOnRegistration = nextUrl.pathname.startsWith('/registration');
      const isOnMenu = nextUrl.pathname.endsWith('/menu');
      const isOnBusiness = nextUrl.pathname.includes('business');
      const isOnCart = nextUrl.pathname.includes('breakdown');

      if (!isOnDashboard && !isOnLogIn && !isOnRegistration && !isOnMenu && !isOnBusiness && !isOnCart) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn && isOnLogIn) {
        return Response.redirect(new URL('/', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;