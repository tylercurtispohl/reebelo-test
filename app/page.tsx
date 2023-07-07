"use client";
import Image from "next/image";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import awsExports from "../src/aws-exports";
import { withAuthenticator } from "@aws-amplify/ui-react";

Amplify.configure({ ...awsExports, ssr: true });

export default withAuthenticator(function Home({ signOut, user }) {
  return (
    <main>
      <div>Home</div>
      <h1>Logged in as {user?.username}.</h1>
      <div>
        <button onClick={signOut}>Sign out</button>
      </div>
    </main>
  );
});
