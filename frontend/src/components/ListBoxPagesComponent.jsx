import * as React from "react";
import { Listbox, ListboxSection, ListboxItem } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";

export default function ListBoxPagesComponent() {
  const items = [
    {
      key: "/",
      label: "Home",
    },
    {
      key: "addJournal",
      label: "Add Journal Paper",
    },
    {
      key: "addConference",
      label: "Add Conference Paper",
    },
    {
      key: "addPatent",
      label: "Add Patent",
    },
    {
      key: "addProject",
      label: "Add Project",
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
      >
        {(item) => (
          <ListboxItem key={item.key} className={"px-5"}>
            {item.label}
          </ListboxItem>
        )}
      </Listbox>
    </>
  );
}
