import * as React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import SideBar from "./components/ComponentSidebar";
import Navbar from "./components/Navbar";
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
  Analytics,
} from "./pages/Home";
import { NextUIProvider } from "@nextui-org/react";

export default function App() {
  const navigate = useNavigate();
  const { isAuthenticated } = React.useContext(AuthContext);
  const { darkTheme } = React.useContext(ThemeContext);

  React.useEffect(() => {
    if (!isAuthenticated) navigate("/login");
    else if (
      (isAuthenticated && window.location.pathname === "/login") ||
      window.location.pathname === "/"
    )
      navigate("/home");
  }, [isAuthenticated]);

  const [sidebarClosed, setsidebarClosed] = React.useState(false);

  return (
    <NextUIProvider navigate={navigate}>
      <main
        className={`${darkTheme} text-foreground bg-background h-screen flex w-screen`}
      >
        {isAuthenticated && <SideBar sidebarClosed={sidebarClosed} />}

        <div className="flex flex-col w-full gap-4 overflow-scroll">
          {isAuthenticated && (
            <Navbar
              sidebarClosed={sidebarClosed}
              setsidebarClosed={setsidebarClosed}
            />
          )}
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

              <Route
                path="books/add"
                element={<BookForm formReadOnly={false} />}
              />
              <Route
                path="patents/add"
                element={<PatentForm formReadOnly={false} />}
              />
              <Route
                path="journalpapers/add"
                element={
                  <ResearchForm
                    title="Add Journal Papers"
                    formReadOnly={false}
                  />
                }
              />
              <Route
                path="conferencepapers/add"
                element={
                  <ResearchForm
                    title="Add Conference Proceedings"
                    is_conference={true}
                    formReadOnly={false}
                  />
                }
              />
              <Route path="books/view" element={<BookForm />} />
              <Route path="patents/view" element={<PatentForm />} />
              <Route
                path="journalpapers/view"
                element={<ResearchForm title="Journal Paper" />}
              />
              <Route
                path="conferencepapers/view"
                element={
                  <ResearchForm
                    title="Conference Proceeding"
                    is_conference={true}
                  />
                }
              />

              <Route path="analytics" element={<Analytics />} />
            </Route>
            <Route path="login" element={<Login />} />
          </Routes>
        </div>
      </main>
    </NextUIProvider>
  );
}
