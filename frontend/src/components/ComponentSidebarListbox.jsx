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

// const settingsItems = [
//   // {
//   //   key: "/home/userProfile",
//   //   label: "Edit User Profile",
//   //   icon: <span className="material-symbols-rounded">person_edit</span>,
//   // },
// ];

export function ListBoxPagesComponentAdd() {
  const { darkTheme, setDarkTheme } = React.useContext(ThemeContext);
  const [isSelected, setIsSelected] = React.useState(false);

  React.useEffect(() => {
    if (isSelected === true) setDarkTheme("dark");
    else setDarkTheme("light");
  }, [isSelected, setDarkTheme]);

  React.useEffect(() => {
    if (darkTheme === "dark") setIsSelected(true);
    else setIsSelected(false);
  }, []);

  const navigate = useNavigate();

  return (
    <div className="sidebar_div">
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
            className={"px-5"}
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
              className={"px-5"}
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
  );
}
