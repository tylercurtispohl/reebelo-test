"use client";
import "@aws-amplify/ui-react/styles.css";
import { Amplify, API, Auth } from "aws-amplify";
import awsExports from "../src/aws-exports";
import { withAuthenticator } from "@aws-amplify/ui-react";
import awsconfig from "../src/aws-exports";

Amplify.configure({ ...awsExports, ssr: true });
Auth.configure(awsconfig);

const withAuthenticatorOptions = {
  hideSignUp: true,
};

export default withAuthenticator(function Home({ signOut, user }) {
  async function callApi() {
    const authenticatedUser = await Auth.currentAuthenticatedUser();
    const token = authenticatedUser.signInUserSession.idToken.jwtToken;
    console.log("token: ", token);

    const requestData = {
      headers: {
        Authorization: token,
      },
    };
    const data = await API.get("helloapi", "/hello", requestData);
    console.log("data: ", data);
  }

  return (
    <main>
      <div>Home</div>
      <h1>Logged in as {user?.username}.</h1>
      <div>
        <button onClick={callApi}>Call API</button>
      </div>
      <div>
        <button onClick={signOut}>Sign out</button>
      </div>
    </main>
  );
}, withAuthenticatorOptions);
