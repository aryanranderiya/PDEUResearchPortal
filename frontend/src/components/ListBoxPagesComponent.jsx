import * as React from "react";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export default function ListBoxPagesComponent() {
  const items = [
    {
      key: "/home/",
      label: "Home",
    },
    {
      key: "/home/addJournal",
      label: "Add Journal Paper",
    },
    {
      key: "/home/addConferenceProceedings",
      label: "Add Conference Proceedings",
    },
    {
      key: "/home/addPatent",
      label: "Add Patent",
    },
    {
      key: "/home/addProject",
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
