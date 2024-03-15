import * as React from "react";
import LoginInputs from "../components/LoginInputComponent";
import SelectComponent from "../components/SelectComponent";

export default function Login() {
  return (
    <>
      <main className="dark text-foreground bg-background text-center flex justify-center gap-4 h-screen items-center flex-col w-screen">
        <SelectComponent />
        <LoginInputs />
      </main>
    </>
  );
}
