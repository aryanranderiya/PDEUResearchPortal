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
    <div className="form_add">
      <h1 className="title">
        <span class="material-symbols-rounded mr-2">home</span>Dashboard
      </h1>
      <div className="cards">
        <CardComponent
          heading={"Analytics"}
          imagelink={"https://i.ibb.co/8NDDQdZ/Data-report-pana.png"}
          page="./analytics"
          size="sm"
          subheading={"\u00A0"}
        />
        <CardComponent
          heading={"Journal Papers"}
          imagelink={"https://i.ibb.co/jDM9nFw/Research-paper-amico.png"}
          page="./journalpapers"
          size="sm"
          subheading={(dataCount.JournalPapers || 0) + " Journal Papers"}
        />

        <CardComponent
          heading={"Conference Papers"}
          imagelink={"https://i.ibb.co/6WhQFpD/Seminar-pana.png"}
          page="./conferencepapers"
          subheading={(dataCount.ConferencePapers || 0) + " Conference Papers"}
        />

        <CardComponent
          heading={"Patents"}
          imagelink={"https://i.ibb.co/KVxTyyD/Visionary-technology-rafiki.png"}
          page="./patents"
          subheading={(dataCount.Patents || 0) + " Patents"}
        />

        <CardComponent
          heading={"Books"}
          imagelink={"https://i.ibb.co/QjTfXVY/Library-rafiki.png"}
          page="./books"
          subheading={(dataCount.Books || 0) + " Books"}
        />

        <CardComponent
          heading={"Projects"}
          imagelink={"https://i.ibb.co/NVct2Fh/Online-tech-talks-amico.png"}
          page="./projects"
          subheading={(dataCount.Projects || 0) + " Projects"}
        />
      </div>
    </div>

    // <div className="w-full h-screen flex justify-center flex-col items-center">

    //   </div>
    // </div>
  );
}

export function ResearchForm({
  title,
  is_conference = false,
  formReadOnly = true,
  icon,
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
      <h1 className="title">
        <span class="material-symbols-rounded mr-2">podium</span>
        {title}
      </h1>
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
        <span class="material-symbols-rounded mr-2">menu_book</span>
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
        <span class="material-symbols-rounded mr-2">menu_book</span>
        {addorview.charAt(0).toUpperCase()}
        {addorview.slice(1)}
        &nbsp;Details for Patent Applied / Filed / Published
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
  let icon = "";

  switch (type) {
    case "journal":
      title = "Journal Papers";
      addPageURL = "/journalpapers/add";
      viewPageURL = "/journalpapers/view";
      icon = <span className="material-symbols-rounded mr-2">description</span>;
      break;

    case "conference":
      title = "Conference Proceedings";
      shortname = "Conference Papers";
      addPageURL = "/conferencepapers/add";
      viewPageURL = "/conferencepapers/view";
      icon = <span className="material-symbols-rounded mr-2">podium</span>;
      break;

    case "books":
      title = "Research Based Books, Textbooks or Literary Books";
      shortname = "Books";
      addPageURL = "/books/add";
      viewPageURL = "/books/view";
      icon = <span className="material-symbols-rounded mr-2">menu_book</span>;
      break;

    case "patents":
      title = "Patents";
      addPageURL = "/patents/add";
      viewPageURL = "/patents/view";
      icon = (
        <span className="material-symbols-rounded mr-2">workspace_premium</span>
      );
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
      <h1 className="title">
        {icon}
        {title}
      </h1>
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
      <h1 className="title">
        <span className="material-symbols-rounded mr-2">monitoring</span>
        Research Analytics
      </h1>
      <ComponentAnalyticsTable />
    </div>
  );
}
