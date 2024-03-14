import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";

// import { Input } from "@nextui-org/react";
// import { NextUIProvider } from "@nextui-org/react";

export default function App() {
  // return <Login />;
  // return <Home />;

  return (
    <main className="dark text-foreground bg-background h-screen w-screen">
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="login" index element={<Login />} />
      </Routes>
    </main>
  );
}
