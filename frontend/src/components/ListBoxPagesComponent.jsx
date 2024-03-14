import * as React from "react";
import { Listbox, ListboxSection, ListboxItem } from "@nextui-org/react";

export default function ListBoxPagesComponent() {
  const items = [
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

  return (
    <>
      <Listbox
        items={items}
        aria-label="Dynamic Actions"
        onAction={(key) => alert(key)}
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
