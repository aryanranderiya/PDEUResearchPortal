import * as React from "react";
import {
  Listbox,
  ListboxItem,
  ListboxSection,
  Accordion,
  Switch,
  AccordionItem,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { SunIcon, MoonIcon } from "./Icons";
import ThemeContext from "../contexts/ThemeContext";

const addItems = [
  {
    key: "/home/addJournal",
    label: "Add Journal Paper",
    icon: <span class="material-symbols-rounded">description</span>,
  },
  {
    key: "/home/addConferencePaper",
    label: "Add Conference Paper",
    icon: <span class="material-symbols-rounded">podium</span>,
  },
  {
    key: "/home/addPatent",
    label: "Add Patent",
    icon: <span class="material-symbols-rounded">workspace_premium</span>,
  },
  {
    key: "/home/addBook",
    label: "Add Book",
    icon: <span class="material-symbols-rounded">menu_book</span>,
  },
  {
    key: "/home/addProject",
    label: "Add Project",
    icon: <span class="material-symbols-rounded">task</span>,
  },
];

const viewItems = [
  {
    key: "/home/viewJournals",
    label: "View Journal Paper",
    icon: <span class="material-symbols-rounded">description</span>,
  },
  {
    key: "/home/viewConferencePaper",
    label: "View Conference Paper",
    icon: <span class="material-symbols-rounded">podium</span>,
  },
  {
    key: "/home/viewPatents",
    label: "View Patent",
    icon: <span class="material-symbols-rounded">workspace_premium</span>,
  },
  {
    key: "/home/viewBooks",
    label: "View Book",
    icon: <span class="material-symbols-rounded">menu_book</span>,
  },
  {
    key: "/home/viewProjects",
    label: "View Project",
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
        items={addItems}
        aria-label="Dynamic Actions"
        onAction={(item) => {
          navigate(item);
        }}
        selectionMode="single"
      >
        <ListboxItem
          key={"/home"}
          className={"px-5"}
          startContent={<span class="material-symbols-rounded">home</span>}
        >
          Home
        </ListboxItem>
      </Listbox>

      <Accordion variant="bordered" isCompact defaultExpandedKeys={["1"]}>
        <AccordionItem
          key="1"
          aria-label="Accordion 1"
          title="Add"
          startContent={
            <div className="flex">
              <span class="material-symbols-rounded">add</span>
            </div>
          }
        >
          <AccordionItemsList navigate={navigate} items={addItems} />
        </AccordionItem>

        <AccordionItem
          key="2"
          aria-label="Accordion 1"
          title="View"
          startContent={
            <div className="flex">
              <span class="material-symbols-rounded">visibility</span>
            </div>
          }
        >
          <AccordionItemsList navigate={navigate} items={viewItems} />
        </AccordionItem>

        <AccordionItem
          key="3"
          aria-label="Accordion 1"
          title="Settings"
          startContent={
            <div className="flex">
              <span class="material-symbols-rounded">settings</span>
            </div>
          }
        >
          <AccordionItemsList navigate={navigate} items={settingsItems} />

          <div className="flex flex-col items-end">
            <Switch
              isSelected={isSelected}
              onValueChange={(e) => setIsSelected(e)}
              size="md"
              startContent={<SunIcon />}
              endContent={<MoonIcon />}
            ></Switch>
          </div>
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

// function AccordionItemsView({ navigate }) {
//   return (
//     <Listbox
//       items={viewItems}
//       aria-label="Dynamic Actions"
//       onAction={(item) => {
//         navigate(item);
//       }}
//       selectionMode="single"
//     >
//       {viewItems.map((item) => (
//         <ListboxItem key={item.key} className={"px-5"} startContent={item.icon}>
//           {item.label}
//         </ListboxItem>
//       ))}
//     </Listbox>
//   );
// }

export function ListBoxPagesComponentView() {
  return <></>;
}
