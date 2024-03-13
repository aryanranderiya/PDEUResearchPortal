import * as React from "react";
// import { NextUIProvider } from "@nextui-org/react";
// import { Input } from "@nextui-org/react";
import Login from "./Login";

export default function App() {
  return (
    <main className="dark text-foreground bg-background text-center flex justify-center gap-4 h-screen items-center  flex-col">
      <Login />
    </main>
  );
}
