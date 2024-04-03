import React from "react";
import { SignIn } from "@clerk/nextjs";

function SignInPage() {
  return (
    <>
      <SignIn afterSignInUrl="/" />
    </>
  );
}

export default SignInPage;
