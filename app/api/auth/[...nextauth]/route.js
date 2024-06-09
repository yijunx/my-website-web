import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import KeycloakProvider from "next-auth/providers/keycloak";

import { userLogin } from "@utils/backend";

const refreshAccessToken = async (token) => {
  try {
    console.log("i am in refresh!!!");
    console.log(token.refreshTokenExpires);
    console.log(Date.now());
    if (Date.now() > token.refreshTokenExpires) throw Error;

    const details = {
      client_id: process.env.KEYCLOAK_ID,
      grant_type: "refresh_token",
      refresh_token: token.refreshToken,
      // this is required
      client_secret: process.env.KEYCLOAK_SECRET,
    };
    const url = `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`;
    const formBody = [];
    Object.entries(details).forEach(([key, value]) => {
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(value);
      formBody.push(encodedKey + "=" + encodedValue);
    });
    const formData = formBody.join("&");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formData,
    });
    console.log(response);
    const refreshedTokensResp = await response.json();
    if (!response.ok) {
      console.log("response not ok");
      throw refreshedTokensResp;
    }
    console.log("refresh token resp is");
    console.log(refreshedTokensResp);
    return {
      ...token,
      accessToken: refreshedTokensResp.access_token,
      // do it 15 seconds before hand
      accessTokenExpires:
        Date.now() + (refreshedTokensResp.expires_in - 15) * 1000,
      // catch the new refresh token
      refreshToken: refreshedTokensResp.refresh_token ?? token.refreshToken,
      refreshTokenExpires:
        Date.now() + (refreshedTokensResp.refresh_expires_in - 15) * 1000,
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
};

const handler = NextAuth({
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_ID,
      clientSecret: process.env.KEYCLOAK_SECRET,
      issuer: process.env.KEYCLOAK_ISSUER,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // Initial sign in
      if (account && user) {
        // token.accessToken = account.accessToken;
        // token.refreshToken = account.refreshToken;
        // token.accessTokenExpires = account.expires_at * 1000;
        // token.refreshTokenExpired =
        //   Date.now() + account.refresh_expires_in * 1000;
        // token.user = user;
        // return token;
        console.log(account);
        console.log(user);
        console.log(token);
        const stuff = {
          accessToken: account.access_token,
          accessTokenExpires: account.expires_at * 1000, // turn it in miliseconds
          refreshToken: account.refresh_token,
          refreshTokenExpires: Date.now() + account.refresh_expires_in * 1000, // turn it into miliseconds
          user,
        };
        console.log("this is the stuff");
        console.log(stuff);
        return stuff;
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to update it
      console.log("expired, going to refresh");
      return refreshAccessToken(token);
    },
    async session({ session, user, token }) {
      // const theUser = await getUser(session.user.email)
      // console.log("this is session");
      // console.log(session); // use the user inside, session.user, and expires in a month
      // console.log(user); // user undesigned?
      // console.log(token); // all the token except refresh token
      if (token) {
        session.user = token.user;
        session.accessToken = token.accessToken;
        session.error = token.error;
      }
      //console.log(session)
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      try {
        // login user then backend sends the httponly cookie
        // but how do we know the cookie expiration?
        // const s = await userLogin(account.id_token);
        // console.log(s);
        // console.log("this is sign in");
        // console.log(account); // provider, access token and refresh token, providerAccountId (which is sub)
        // console.log(profile); // name email, sub, aud
        // console.log(email); // undegined
        // console.log(credentials); // undefined
        // console.log(user); // name,meial, pciture,sub
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
