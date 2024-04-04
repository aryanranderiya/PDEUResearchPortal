import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { DefaultCards, AddFormPage } from "./pages/Home";
import SideBar from "./components/SideBar";
import CardComponent from "./components/CardComponent";
import { useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();

  let pathName = window.location.pathname;
  let arr = pathName.toString().split("/");
  let currentPath = arr[arr.length - 1];

  const [authenticated, setAuthenticated] = React.useState(
    localStorage.getItem("authenticated") || false
  );

  React.useEffect(() => {
    if (authenticated) navigate("/home");
    else navigate("/login");
  }, []);

  return (
    <main className="dark text-foreground bg-background h-screen w-screen flex overflow-hidden">
      {authenticated && currentPath != "login" && <SideBar />}
      <Routes>
        <Route path="/home" element={<DefaultCards />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/home/addJournal"
          element={<AddFormPage title="Add Journal Papers" />}
        />
      </Routes>
    </main>
  );
}
