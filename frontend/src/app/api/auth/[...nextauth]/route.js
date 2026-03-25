import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const res = await fetch("http://localhost:5000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });
          
          const userObj = await res.json();
          
          if (res.ok && userObj?.data?.token) {
            // Fetch full profile to get _id
            const profileRes = await fetch("http://localhost:5000/auth/me", {
              headers: { Authorization: `Bearer ${userObj.data.token}` },
            });
            const profileObj = await profileRes.json();
            return {
              id: profileObj.data?._id?.toString() || null,
              email: profileObj.data?.email || credentials.email,
              name: profileObj.data?.userName,
              token: userObj.data.token,
            };
          }
          return null;
        } catch (error) {
          return null;
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "mock-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "mock-secret"
    })
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Credentials login: user object has .token from our authorize function
      if (user) {
        token.accessToken = user.token;
        token.id = user.id;
        token.name = user.name;
      }
      // Google login: exchange the Google id_token for our own backend JWT
      if (account?.provider === "google" && account.id_token) {
        try {
          const res = await fetch("http://localhost:5000/auth/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: account.id_token }),
          });
          const body = await res.json();
          if (res.ok && body?.data?.token) {
            token.accessToken = body.data.token;
            token.name = body.data.userName;
            token.email = body.data.email;
            // Fetch real _id via /auth/me
            const meRes = await fetch("http://localhost:5000/auth/me", {
              headers: { Authorization: `Bearer ${body.data.token}` },
            });
            const meBody = await meRes.json();
            token.id = meBody.data?._id?.toString() || null;
          }
        } catch (err) {
          console.error("Google backend exchange failed:", err);
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      session.user.name = token.name;
      return session;
    }
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "default_secret_key_saraha",
});

export { handler as GET, handler as POST };
