import decode from "jwt-decode";
import { sendLoginData } from "./FunctionsBack";

export async function signIn(email, password) {
   const request = await sendLoginData(email, password)

   if (request.access_token) {
      localStorage.setItem('access_token', request.access_token);
      return request;
   }

   return request
}

export async function signOut() {
   localStorage.removeItem("access_token");
}

export async function isSignedIn() {
   const access_token = localStorage.getItem("access_token");
   if (!access_token)
      return false;

   try {
      const { exp: expiration } = decode(access_token);
      const isExpired = !!expiration && Date.now() > expiration * 1000;

      if (isExpired)
         return false;
      return true;

   } catch (_) {
      return false;
   }
}
