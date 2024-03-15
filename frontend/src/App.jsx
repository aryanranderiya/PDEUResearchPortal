import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SideBar from "./components/SideBar";

export default function App() {
  let pathName = window.location.pathname;
  let arr = pathName.toString().split("/");
  let currentPath = arr[arr.length - 1];

  return (
    <main className="dark text-foreground bg-background h-screen w-screen flex">
      {currentPath.length > 0 && <SideBar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </main>
  );
}
