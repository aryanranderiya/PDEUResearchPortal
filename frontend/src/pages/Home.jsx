import * as React from "react";
import CardComponent from "../components/ComponentCard";
import Form1 from "../components/FormAddResearch";
import Form2 from "../components/FormAddBook";
import Form3 from "../components/FormAddPatent";
import ViewFormTable from "../components/ViewForm";
import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";

export function DefaultCards() {
  return (
    <div className="self-center justify-self-center w-full flex flex-row justify-center gap-4 overflow-scroll h-auto flex-wrap px-7">
      <CardComponent
        heading={"Journal Papers"}
        subheading={10}
        imagelink={"https://i.ibb.co/jDM9nFw/Research-paper-amico.png"}
        page="./journalpapers"
        size="sm"
      />

      <CardComponent
        heading={"Conference Papers"}
        subheading={20}
        imagelink={"https://i.ibb.co/6WhQFpD/Seminar-pana.png"}
        page="./conferencepapers"
      />

      <CardComponent
        heading={"Patents"}
        subheading={30}
        imagelink={"https://i.ibb.co/KVxTyyD/Visionary-technology-rafiki.png"}
        page="./patents"
      />

      <CardComponent
        heading={"Books"}
        subheading={40}
        imagelink={"https://i.ibb.co/QjTfXVY/Library-rafiki.png"}
        page="./books"
      />

      <CardComponent
        heading={"Projects"}
        subheading={40}
        imagelink={"https://i.ibb.co/NVct2Fh/Online-tech-talks-amico.png"}
        page="./projects"
      />
    </div>
  );
}

export function ResearchForm({ title, is_conference = false }) {
  return (
    <div className="form_add">
      <h1 className="title"> {title}</h1>
      <Form1 is_conference={is_conference} />
    </div>
  );
}

export function BookForm() {
  return (
    <div className="form_add">
      <h1 className="title">
        Add Research Based Books, Textbooks or Literary Books
      </h1>
      <Form2 />
    </div>
  );
}

export function PatentForm() {
  return (
    <div className="form_add">
      <h1 className="title">
        Add Details for Patent Applied / Filed / Published
      </h1>
      <Form3 />
    </div>
  );
}

export function ViewItems({ type }) {
  let title = "Title";
  let shortname = null;
  let addPageURL = "home";
  switch (type) {
    case "research":
      title = "Research Paper";
      addPageURL = "/addJournal";
      break;

    case "conference":
      title = "Conference Proceedings";
      shortname = "Conference Papers";
      addPageURL = "/addConferencePaper";
      break;

    case "books":
      title = "Research Based Books, Textbooks or Literary Books";
      shortname = "Books";
      addPageURL = "/addBook";
      break;

    case "patents":
      title = "Patents";
      addPageURL = "/addPatent";
      break;

    default:
      break;
  }

  const navigate = useNavigate();

  return (
    <div className="form_add">
      <h1 className="title">{title}</h1>
      <ViewFormTable type={type} />
      <Button
        color="primary"
        onClick={() => navigate(`/home${addPageURL}`)}
        className="max-w-sm button_add_new"
        startContent={<span class="material-symbols-rounded">add</span>}
      >
        Add {shortname || title}
      </Button>
    </div>
  );
}
