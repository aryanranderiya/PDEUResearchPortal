import * as React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import SideBar from "./components/ComponentSidebar";
import AuthContext from "./contexts/AuthContext";
import ThemeContext from "./contexts/ThemeContext";
import Login from "./pages/Login";
import {
  DefaultCards,
  ResearchForm,
  BookForm,
  PatentForm,
  ViewItems,
  UserProfile,
} from "./pages/Home";
import { NextUIProvider } from "@nextui-org/react";

export default function App() {
  const navigate = useNavigate();
  const { isAuthenticated } = React.useContext(AuthContext);
  const { darkTheme } = React.useContext(ThemeContext);

  React.useEffect(() => {
    if (!isAuthenticated) navigate("/login");
    else if (isAuthenticated && window.location.pathname === "/login")
      navigate("/home");
  }, [isAuthenticated]);

  return (
    <NextUIProvider navigate={navigate}>
      <main
        className={`${darkTheme} text-foreground bg-background h-screen w-screen flex overflow-hidden`}
      >
        {isAuthenticated && <SideBar />}
        <Routes>
          <Route path="home">
            <Route index element={<DefaultCards />} />

            <Route
              path="journalpapers"
              element={<ViewItems type="journal" />}
            />
            <Route path="patents" element={<ViewItems type="patents" />} />
            <Route path="books" element={<ViewItems type="books" />} />
            <Route
              path="conferencepapers"
              element={<ViewItems type="conference" />}
            />

            <Route path="books/add" element={<BookForm />} />
            <Route path="patents/add" element={<PatentForm />} />
            <Route
              path="journalpapers/add"
              element={<ResearchForm title="Add Journal Papers" />}
            />
            <Route
              path="conferencepapers/add"
              element={
                <ResearchForm
                  title="Add Conference Proceedings"
                  is_conference={true}
                />
              }
            />
          </Route>
          <Route path="login" element={<Login />} />
        </Routes>
      </main>
    </NextUIProvider>
  );
}
