import * as React from "react";
import SideBar from "../components/SideBar";
import CardComponent from "../components/CardComponent";

export default function Home() {
  return (
    <>
      <div className="flex h-screen w-screen">
        <SideBar />

        {/* 0082ff */}

        <div className="self-center justify-self-center w-screen flex flex-row justify-center gap-4">
          <CardComponent
            heading={"Journal Papers"}
            subheading={10}
            imagelink={"https://i.ibb.co/jDM9nFw/Research-paper-amico.png"}
            page="./JournalPapers"
          />

          <CardComponent
            heading={"Conference Papers"}
            subheading={20}
            imagelink={"https://i.ibb.co/6WhQFpD/Seminar-pana.png"}
          />

          <CardComponent
            heading={"Patents"}
            subheading={30}
            imagelink={
              "https://i.ibb.co/KVxTyyD/Visionary-technology-rafiki.png"
            }
          />

          <CardComponent
            heading={"Projects"}
            subheading={40}
            imagelink={"https://i.ibb.co/NVct2Fh/Online-tech-talks-amico.png"}
          />
        </div>
      </div>
    </>
  );
}
