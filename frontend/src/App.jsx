import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { DefaultCards, AddFormPage } from "./pages/Home";
import SideBar from "./components/SideBar";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const SidebarLayout = () => (
  <>
    <SideBar />
    <Outlet />
  </>
);

export default function App() {
  const navigate = useNavigate();

  const [authenticated, setAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const isAuthenticated = localStorage.getItem("authenticated") === "true";
    setAuthenticated(isAuthenticated);
    if (authenticated) navigate("home");
    else navigate("login");
  }, []);

  return (
    <main className="dark text-foreground bg-background h-screen w-screen flex overflow-hidden">
      {authenticated && <SideBar />}
      <Routes>
        <Route path="home" element={<SidebarLayout />}>
          <Route index element={<DefaultCards />} />
          <Route
            path="addJournal"
            element={<AddFormPage title="Add Journal Papers" />}
          />
          <Route
            path="addConferenceProceedings"
            element={
              <AddFormPage
                title="Add Conference Proceedings"
                is_conference={true}
              />
            }
          />
          <Route path="addPatent" />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </main>
  );
}
