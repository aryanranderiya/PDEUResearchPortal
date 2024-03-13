import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { Input } from "@nextui-org/react";

export default function App() {
  return (
    <NextUIProvider>
      <main className="dark text-foreground bg-background text-center">
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input type="email" label="Email" />
          <Input type="email" label="Email" placeholder="Enter your email" />
        </div>
      </main>
    </NextUIProvider>
  );
}
