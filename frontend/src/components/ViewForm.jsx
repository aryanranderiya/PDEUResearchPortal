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

export default function ViewFormTable({ type }) {
  const [data, setData] = React.useState([]);

  const [columns, setColumns] = React.useState([{ key: "" }]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [loadingText, setloadingText] = React.useState("Loading...");

  const fetchData = async () => {
    setData([]);
    setColumns([{ key: "" }]);
    setIsLoading(true);
    setloadingText("Loading...");

    try {
      const response = await fetch(
        // `https://pdeu-research-portal-api.vercel.app/select/${type}`,
        `http://localhost:5000/select/${type}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
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
      setloadingText("Error Fetching Data");
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [type]);

  return (
    <Table
      aria-label="Example table with dynamic content"
      selectionMode="single"
      color="primary"
      defaultSelectedKeys={[]}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.key}</TableColumn>}
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
          <TableRow key={item.DOI}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
