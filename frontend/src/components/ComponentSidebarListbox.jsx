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

// const addItems = [
//   {
//     key: "/home/addJournal",
//     label: "Add Journal Paper",
//     icon: <span class="material-symbols-rounded">description</span>,
//   },
//   {
//     key: "/home/addConferencePaper",
//     label: "Add Conference Paper",
//     icon: <span class="material-symbols-rounded">podium</span>,
//   },
//   {
//     key: "/home/addPatent",
//     label: "Add Patent",
//     icon: <span class="material-symbols-rounded">workspace_premium</span>,
//   },
//   {
//     key: "/home/addBook",
//     label: "Add Book",
//     icon: <span class="material-symbols-rounded">menu_book</span>,
//   },
//   {
//     key: "/home/addProject",
//     label: "Add Project",
//     icon: <span class="material-symbols-rounded">task</span>,
//   },
// ];

const viewItems = [
  {
    key: "/home",
    label: "Home",
    icon: <span class="material-symbols-rounded">home</span>,
  },
  {
    key: "/home/journalpapers",
    label: "Journal Papers",
    icon: <span class="material-symbols-rounded">description</span>,
  },
  {
    key: "/home/conferencepapers",
    label: "Conference Papers",
    icon: <span class="material-symbols-rounded">podium</span>,
  },
  {
    key: "/home/patents",
    label: "Patents",
    icon: <span class="material-symbols-rounded">workspace_premium</span>,
  },
  {
    key: "/home/books",
    label: "Books",
    icon: <span class="material-symbols-rounded">menu_book</span>,
  },
  {
    key: "/home/projects",
    label: "Projects",
    icon: <span class="material-symbols-rounded">task</span>,
  },
];

const settingsItems = [
  {
    key: "/home/editProfile",
    label: "Edit User Profile",
    icon: <span class="material-symbols-rounded">person_edit</span>,
  },
];

export function ListBoxPagesComponentAdd() {
  const { darkTheme, setDarkTheme } = React.useContext(ThemeContext);
  const [isSelected, setIsSelected] = React.useState(false);

  React.useEffect(() => {
    if (isSelected === true) setDarkTheme("dark");
    else setDarkTheme("light");
  }, [isSelected]);

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
          key="3"
          aria-label="Accordion 3"
          title="Settings"
          startContent={
            <div className="flex">
              <span class="material-symbols-rounded">settings</span>
            </div>
          }
        >
          <AccordionItemsList navigate={navigate} items={settingsItems} />

          <Listbox aria-label="Dynamic Actions">
            <ListboxItem
              className={"px-5"}
              onClick={() => setIsSelected(!isSelected)}
              startContent={
                <Switch
                  isSelected={isSelected}
                  onValueChange={(e) => setIsSelected(e)}
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

function AccordionItemsList({ navigate, items }) {
  return (
    <Listbox
      items={items}
      aria-label="Dynamic Actions"
      onAction={(item) => {
        navigate(item);
      }}
      selectionMode="single"
    >
      {items.map((item) => (
        <ListboxItem key={item.key} className={"px-5"} startContent={item.icon}>
          {item.label}
        </ListboxItem>
      ))}
    </Listbox>
  );
}

export function ListBoxPagesComponentView() {
  return <></>;
}
