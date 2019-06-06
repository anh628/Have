import * as firebaseui from "firebaseui";
import { firebase } from "../firebase/firebase";
import React from "react";

// https://github.com/firebase/firebaseui-web

// initialize the FirebaseUI Widget using Firebase
const ui = new firebaseui.auth.AuthUI(firebase.auth());

/*
  TODO: come up with function that will happen when we signed in successfully
*/
const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById("loader").style.display = "none";
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: "popup",
  signInSuccessUrl: "<url-to-redirect-to-on-success>",
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      scopes: [
        "https://www.googleapis.com/auth/contacts.readonly" // <- not sure what this does but i copied and paste
      ],
      customParameters: {
        // Forces account selection even when one account is available.
        prompt: "select_account"
      }
    }
  ]
  // // Terms of service url.
  // tosUrl: "<your-tos-url>",
  // // Privacy policy url.
  // privacyPolicyUrl: "<your-privacy-policy-url>"
};

/*
 sign-in UI is rendered conditionally
 need to check for a pending redirect operation
 */
if (ui.isPendingRedirect()) {
  ui.start("#firebaseui-auth-container", uiConfig);
}

const AuthenticationButton = () => (
  <div>
    <div id="firebaseui-auth-container" />
    <div id="loader">Loading...</div>
  </div>
);

export default AuthenticationButton;
