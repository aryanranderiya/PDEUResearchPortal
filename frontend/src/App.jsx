import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SideBar from "./components/SideBar";

export function AddFormPage({ type }) {
  return (
    <>
      <h1 className="font-bold text-lg">{type}</h1>
    </>
  );
}

export default function App() {
  return (
    <main className="dark text-foreground bg-background h-screen w-screen flex">
      <SideBar />

      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Home />}></Route>
        <Route path="/journalpapers" element={<AddFormPage />} />
        <Route path="/conferencepapers" element={<AddFormPage />} />
      </Routes>
    </main>
  );
}
