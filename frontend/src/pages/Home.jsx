import * as React from "react";
import CardComponent from "../components/ComponentCard";
import Form1 from "../components/FormResearch";
import Form2 from "../components/FormBook";
import Form3 from "../components/FormPatent";
// import FormUserProfile from "../components/FormUserProfile";
import ViewFormTable from "../components/ViewForm";
import ComponentAnalyticsTable from "../components/ComponentAnalyticsTable";
import { useNavigate } from "react-router-dom";
import { Button, Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

export function DefaultCards() {
  const [dataCount, setDataCount] = React.useState({
    Books: 0,
    ConferencePapers: 1,
    JournalPapers: 9,
    Patents: 0,
    Projects: 0,
  });

  React.useEffect(() => {
    const fetchDataCount = async () => {
      try {
        const response = await fetch(
          `https://pdeu-research-portal-api.vercel.app/selectcount`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: localStorage.getItem("userId"),
              timePeriod: null,
            }),
          }
        );

        if (!response.ok) throw new Error(response.error);
        setDataCount(await response.json());
      } catch (error) {
        console.error("Error posting data:", error.message);
      }
    };

    fetchDataCount();
  }, []);

  return (
    <div className="self-center justify-self-center w-full flex flex-row justify-center gap-4 overflow-scroll h-auto flex-wrap px-7">
      <CardComponent
        heading={"Journal Papers"}
        imagelink={"https://i.ibb.co/jDM9nFw/Research-paper-amico.png"}
        page="./journalpapers"
        size="sm"
        subheading={dataCount.JournalPapers || 0}
      />

      <CardComponent
        heading={"Conference Papers"}
        subheading={dataCount.ConferencePapers}
        imagelink={"https://i.ibb.co/6WhQFpD/Seminar-pana.png"}
        page="./conferencepapers"
      />

      <CardComponent
        heading={"Patents"}
        subheading={dataCount.Patents}
        imagelink={"https://i.ibb.co/KVxTyyD/Visionary-technology-rafiki.png"}
        page="./patents"
      />

      <CardComponent
        heading={"Books"}
        imagelink={"https://i.ibb.co/QjTfXVY/Library-rafiki.png"}
        page="./books"
        subheading={dataCount.Books}
      />

      <CardComponent
        heading={"Projects"}
        imagelink={"https://i.ibb.co/NVct2Fh/Online-tech-talks-amico.png"}
        page="./projects"
        subheading={dataCount.Projects}
      />
    </div>
  );
}

export function ResearchForm({
  title,
  is_conference = false,
  formReadOnly = true,
}) {
  const type = is_conference ? "conferencepapers" : "journalpapers";
  const addorview = formReadOnly ? "view" : "add";
  return (
    <div className="form_add">
      <Breadcrumbs>
        <BreadcrumbItem href="/home">Home</BreadcrumbItem>
        <BreadcrumbItem href={`/home/${type}`}>
          {title.replace("Add", "")}
        </BreadcrumbItem>
        <BreadcrumbItem href={`/home/${type}/${addorview}`}>
          {addorview.charAt(0).toUpperCase()}
          {addorview.slice(1)}
        </BreadcrumbItem>
      </Breadcrumbs>
      <h1 className="title"> {title}</h1>
      <Form1 is_conference={is_conference} formReadOnly={formReadOnly} />
    </div>
  );
}

export function BookForm({ formReadOnly = true }) {
  const addorview = formReadOnly ? "view" : "add";

  return (
    <div className="form_add">
      <Breadcrumbs>
        <BreadcrumbItem href="/home">Home</BreadcrumbItem>
        <BreadcrumbItem href={`/home/books`}>Books</BreadcrumbItem>
        <BreadcrumbItem href={`/home/books/${addorview}`}>
          {addorview.charAt(0).toUpperCase()}
          {addorview.slice(1)}
          &nbsp;Books
        </BreadcrumbItem>
      </Breadcrumbs>
      <h1 className="title">
        Add Research Based Books, Textbooks or Literary Books
      </h1>
      <Form2 formReadOnly={formReadOnly} />
    </div>
  );
}

export function PatentForm({ formReadOnly = true }) {
  const addorview = formReadOnly ? "view" : "add";

  return (
    <div className="form_add">
      <Breadcrumbs>
        <BreadcrumbItem href="/home">Home</BreadcrumbItem>
        <BreadcrumbItem href={`/home/patents`}>Patents</BreadcrumbItem>
        <BreadcrumbItem href={`/home/patents/${addorview}`}>
          {addorview.charAt(0).toUpperCase()}
          {addorview.slice(1)}
          &nbsp;Patents
        </BreadcrumbItem>
      </Breadcrumbs>
      <h1 className="title">
        Add Details for Patent Applied / Filed / Published
      </h1>
      <Form3 formReadOnly={formReadOnly} />
    </div>
  );
}

export function ViewItems({ type }) {
  let title = "Title";
  let shortname = null;
  let addPageURL = "home";
  let viewPageURL = "home";

  switch (type) {
    case "journal":
      title = "Journal Papers";
      addPageURL = "/journalpapers/add";
      viewPageURL = "/journalpapers/view";
      break;

    case "conference":
      title = "Conference Proceedings";
      shortname = "Conference Papers";
      addPageURL = "/conferencepapers/add";
      viewPageURL = "/conferencepapers/view";
      break;

    case "books":
      title = "Research Based Books, Textbooks or Literary Books";
      shortname = "Books";
      addPageURL = "/books/add";
      viewPageURL = "/books/view";
      break;

    case "patents":
      title = "Patents";
      addPageURL = "/patents/add";
      viewPageURL = "/patents/view";
      break;

    default:
      break;
  }

  const navigate = useNavigate();

  return (
    <div className="form_add">
      <Breadcrumbs>
        <BreadcrumbItem href="/home">Home</BreadcrumbItem>
        <BreadcrumbItem href={`/home/${type}`}>
          {shortname || title}
        </BreadcrumbItem>
      </Breadcrumbs>
      <h1 className="title">{title}</h1>
      <div className="flex gap-2">
        <Button
          color="primary"
          onClick={() => navigate(`/home${addPageURL}`)}
          className="button_add_new"
          startContent={<span className="material-symbols-rounded">add</span>}
          variant="shadow"
        >
          Add {shortname || title}
        </Button>
      </div>
      <ViewFormTable type={type} url={`/home${viewPageURL}`} />
    </div>
  );
}

export function Analytics() {
  return (
    <div className="form_add">
      <Breadcrumbs>
        <BreadcrumbItem href="/home">Home</BreadcrumbItem>
        <BreadcrumbItem href={"/home/analytics"}>Analytics</BreadcrumbItem>
      </Breadcrumbs>
      <h1 className="title">Research Analytics</h1>
      <ComponentAnalyticsTable />
    </div>
  );
}
