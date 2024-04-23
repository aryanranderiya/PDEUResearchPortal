import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Spinner,
  getKeyValue,
  Spacer,
} from "@nextui-org/react";
import * as React from "react";
import { useNavigate } from "react-router-dom";

const flattenObject = (obj, delimiter = ".", prefix = "") =>
  Object.keys(obj).reduce((acc, k) => {
    if (
      typeof obj[k] === "object" &&
      obj[k] !== null &&
      Object.keys(obj[k]).length > 0
    )
      Object.assign(acc, flattenObject(obj[k], delimiter, k));
    else acc[k] = obj[k];
    return acc;
  }, {});

export default function ViewFormTable({ type, url }) {
  const [data, setData] = React.useState([]);
  const [columns, setColumns] = React.useState([{ key: "" }]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [loadingText, setloadingText] = React.useState("Loading...");
  const [btnsEditEnable, setbtnsEditEnable] = React.useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    setData([]);
    setColumns([{ key: "" }]);
    setIsLoading(true);
    setloadingText("Loading...");
    let table_name = "";
    let columns = "";

    switch (type) {
      case "journal":
        table_name = "JournalPapers";
        columns = "DOI,Title,Journal_Indexed,Publish_date";
        break;

      case "conference":
        table_name = "ConferencePapers";
        columns =
          "DOI,Conference_Name,JournalPapers(Title,Journal_Indexed,Publish_date)";
        break;

      case "patents":
        table_name = "Patents";
        columns =
          "FileApplicationNo,Status,Title,ApplicationDate,PublishedDate,GrantDate";
        break;

      case "books":
        table_name = "Books";
        columns = "DOI,Book_Title,Book_Type,Publisher_name,Book_Publish_Date";
        break;

      default:
        return;
    }
    try {
      const response = await fetch(
        `https://pdeu-research-portal-api.vercel.app/select`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            table_name: table_name,
            columns: columns,
            where: ["Created_By", localStorage.getItem("userId")],
          }),
        }
      );

      const jsonData = await response.json();
      if (!response.ok) throw new Error(jsonData.error);
      const finalData = Object.entries(jsonData).map((item) =>
        flattenObject(item[1])
      );
      setData(finalData);
      setColumns(Object.keys(finalData[0]).map((key) => ({ key })));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setloadingText("No Data Found");
      setIsLoading(false);
    }
  };

  const fetchDesignation = async () => {
    try {
      const response = await fetch(
        `https://pdeu-research-portal-api.vercel.app/select`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            table_name: "Employee",
            columns: "designation",
            where: ["id", localStorage.getItem("userId")],
          }),
        }
      );

      const designationResponseJson = await response.json();
      if (!response.ok) throw new Error(designationResponseJson.error);
      if (designationResponseJson[0].designation !== "Employee")
        setbtnsEditEnable(true);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  React.useEffect(() => {
    fetchData();
    fetchDesignation();
  }, [type]);

  return (
    <Table
      aria-label="Table with dynamic content"
      defaultSelectedKeys={[]}
      isHeaderSticky
      isCompact
      shadow="lg"
      radius="lg"
    >
      <TableHeader columns={columns}>
        {columns.map((column) => (
          <TableColumn key={column.key}>{column.key} </TableColumn>
        ))}
        <TableColumn>
          {Object.keys(data).length ? "View Record" : ""}
        </TableColumn>
        <TableColumn>
          {Object.keys(data).length ? "Edit Record" : ""}
        </TableColumn>
      </TableHeader>
      <TableBody
        items={data}
        isLoading={isLoading}
        loadingContent={<Spinner size="lg" />}
        emptyContent={
          <>
            <Spacer y={7} />
            {loadingText}
          </>
        }
      >
        {(item) => (
          <TableRow key={Object.values(item)[0]}>
            {columns.map((column) => (
              <TableCell key={column.key}>
                {getKeyValue(item, column.key)}
              </TableCell>
            ))}
            <TableCell>
              <Button
                aria-label="View"
                startContent={
                  <span className="material-symbols-rounded">visibility</span>
                }
                color="primary"
                size="sm"
                onPress={() => navigate(`${url}?id=${Object.values(item)[0]}`)}
              >
                View
              </Button>
            </TableCell>

            <TableCell>
              <Button
                aria-label="Edit"
                startContent={
                  <span className="material-symbols-rounded">edit</span>
                }
                isDisabled={btnsEditEnable}
                color="danger"
                size="sm"
              >
                Edit
              </Button>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
