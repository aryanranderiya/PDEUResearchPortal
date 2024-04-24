import * as React from "react";
import {
  Listbox,
  ListboxItem,
  Accordion,
  Switch,
  AccordionItem,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { SunIcon, MoonIcon } from "./icons";
import ThemeContext from "../contexts/ThemeContext";
import { Button, User } from "@nextui-org/react";
import AuthContext from "../contexts/AuthContext";

const viewItems = [
  {
    key: "/home",
    label: "Dashboard",
    icon: <span className="material-symbols-rounded">home</span>,
  },
  {
    key: "/home/analytics",
    label: "Analytics",
    icon: <span className="material-symbols-rounded">monitoring</span>,
  },
  {
    key: "/home/journalpapers",
    label: "Journal Papers",
    icon: <span className="material-symbols-rounded">description</span>,
  },
  {
    key: "/home/conferencepapers",
    label: "Conference Papers",
    icon: <span className="material-symbols-rounded">podium</span>,
  },
  {
    key: "/home/patents",
    label: "Patents",
    icon: <span className="material-symbols-rounded">workspace_premium</span>,
  },
  {
    key: "/home/books",
    label: "Books",
    icon: <span className="material-symbols-rounded">menu_book</span>,
  },
  {
    key: "/home/projects",
    label: "Projects",
    icon: <span className="material-symbols-rounded">task</span>,
  },
];

export default function SideBar({ sidebarClosed }) {
  const navigate = useNavigate();
  const { darkTheme, setDarkTheme } = React.useContext(ThemeContext);
  const [isSelected, setIsSelected] = React.useState(false);
  const { isAuthenticated, setAuthenticated } = React.useContext(AuthContext);
  const [userAvatarData, setUserAvatarData] = React.useState({
    name: "User",
    profile_photo: "https://links.aryanranderiya.com/l/default_user",
    designation: "",
  });

  React.useEffect(() => {
    if (isSelected === true) setDarkTheme("dark");
    else setDarkTheme("light");
  }, [isSelected, setDarkTheme]);

  React.useEffect(() => {
    if (darkTheme === "dark") setIsSelected(true);
    else setIsSelected(false);
  }, []);

  React.useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://pdeu-research-portal-api.vercel.app/select",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              table_name: "Employee",
              where: ["id", userId],
            }),
          }
        );

        const jsonData = await response.json();
        setUserAvatarData(jsonData[0]);
      } catch (error) {
        console.error("Error fetching data:", error.message, error);
      }
    };

    fetchData();
  }, [isAuthenticated]);

  async function signOut() {
    setAuthenticated(false);
    navigate("/login");
  }

  return (
    <div
      className={`border-small border-default-200 dark:border-default-100 flex flex-col gap-6 justify-between p-4 sidebar h-full ${
        sidebarClosed ? "sidebar_closed" : ""
      }`}
    >
      <User
        name={userAvatarData.name}
        description={userAvatarData.designation}
        avatarProps={{
          isBordered: true,
          showFallback: true,
          src: userAvatarData.profile_photo,
          size: "lg",
        }}
        className="navbar_user"
      />
      <div>
        <Listbox
          items={viewItems}
          aria-label="Dynamic Actions"
          onAction={(item) => {
            navigate(item);
          }}
          selectionMode="single"
          className="listbox1"
        >
          {viewItems.map((item) => (
            <ListboxItem
              key={item.key}
              className={"px-5 w-full"}
              startContent={item.icon}
            >
              {item.label}
            </ListboxItem>
          ))}
        </Listbox>

        <Accordion
          variant="light"
          isCompact
          defaultExpandedKeys={["1"]}
          className="accordion_1"
        >
          <AccordionItem
            key="1"
            aria-label="Settings"
            title="Settings"
            startContent={
              <div className="flex">
                <span className="material-symbols-rounded">settings</span>
              </div>
            }
          >
            <Listbox aria-label="Dynamic Actions">
              <ListboxItem
                className={"px-5 "}
                onClick={() => setIsSelected(!isSelected)}
                startContent={
                  <Switch
                    isSelected={isSelected}
                    onValueChange={setIsSelected}
                    size="md"
                    startContent={<SunIcon />}
                    endContent={<MoonIcon />}
                  />
                }
              >
                Theme
              </ListboxItem>
            </Listbox>
          </AccordionItem>
        </Accordion>
      </div>

      <Button
        color="danger"
        size="md"
        onClick={() => signOut()}
        variant="ghost"
        startContent={<span className="material-symbols-rounded">logout</span>}
      >
        Logout
      </Button>
    </div>
  );
}
