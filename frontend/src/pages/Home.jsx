import * as React from "react";
import CardComponent from "../components/ComponentCard";
import Form1 from "../components/FormAddResearch";
import Form2 from "../components/FormAddBook";

export function DefaultCards() {
  return (
    <div className="self-center justify-self-center w-full flex flex-row justify-center gap-4 overflow-scroll h-auto">
      <CardComponent
        heading={"Journal Papers"}
        subheading={10}
        imagelink={"https://i.ibb.co/jDM9nFw/Research-paper-amico.png"}
        page="./journalpapers"
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
      />

      <CardComponent
        heading={"Projects"}
        subheading={40}
        imagelink={"https://i.ibb.co/NVct2Fh/Online-tech-talks-amico.png"}
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
