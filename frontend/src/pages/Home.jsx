import * as React from "react";
import CardComponent from "../components/CardComponent";
import FormAdd from "../components/FormAdd";
import { Routes, Route } from "react-router-dom";
import Form from "../components/FormAdd";

export function DefaultCards() {
  return (
    <div className="self-center justify-self-center w-full flex flex-row justify-center gap-4">
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

export function AddFormPage({ title }) {
  return (
    <div className="form_add">
      <h1 className="title"> {title}</h1>
      <FormAdd />
    </div>
  );
}
