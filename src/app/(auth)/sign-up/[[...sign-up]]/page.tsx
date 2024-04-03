import { SignUp } from "@clerk/nextjs";
import React from "react";

const Page = () => {
  return (
    <>
      <h1>Sign-up</h1>
      <SignUp afterSignInUrl="/chat" />
    </>
  );
};

export default Page;
