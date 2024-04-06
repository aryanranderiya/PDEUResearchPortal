import * as React from "react";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export default function ListBoxPagesComponent() {
  const items = [
    {
      key: "/home/",
      label: "Home",
      icon: <span class="material-symbols-rounded">home</span>,
    },
    {
      key: "/home/addJournal",
      label: "Add Journal Paper",
      icon: <span class="material-symbols-rounded">description</span>,
    },
    {
      key: "/home/addConferenceProceedings",
      label: "Add Conference Proceedings",
      icon: <span class="material-symbols-rounded">podium</span>,
    },
    {
      key: "/home/addPatent",
      label: "Add Patent",
      icon: <span class="material-symbols-rounded">workspace_premium</span>,
    },
    {
      key: "/home/addProject",
      label: "Add Project",
      icon: <span class="material-symbols-rounded">task</span>,
    },
    {
      key: "/home/addBook",
      label: "Add Book",
      icon: <span class="material-symbols-rounded">menu_book</span>,
    },
  ];

  const navigate = useNavigate();

  return (
    <>
      <Listbox
        items={items}
        aria-label="Dynamic Actions"
        onAction={(item) => {
          navigate(item);
        }}
        selectionMode="single"
      >
        {(item) => (
          <ListboxItem
            key={item.key}
            className={"px-5"}
            startContent={item.icon}
          >
            {item.label}
          </ListboxItem>
        )}
      </Listbox>
    </>
  );
}
