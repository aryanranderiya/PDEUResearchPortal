import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
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
  const [data, setData] = React.useState(null);
  const [keys, setKeys] = React.useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/select/${type}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const jsonData = await response.json();
      if (!response.ok) throw new Error(jsonData.error);
      const finalData = Object.entries(jsonData).map((item) =>
        flattenObject(item[1])
      );
      setData(finalData);
      setKeys(Object.keys(finalData[0]));
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setData(null);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [type]);

  return (
    <Table aria-label="Collection of Data">
      <TableHeader>
        {keys !== null ? (
          keys.map((item) => <TableColumn>{item}</TableColumn>)
        ) : (
          <TableColumn></TableColumn>
        )}

        <TableColumn></TableColumn>
        <TableColumn></TableColumn>
      </TableHeader>

      <TableBody emptyContent={"No Data"}>
        {data !== null &&
          data.map((record, index) => (
            <TableRow key={index}>
              {Object.entries(record).map(([key, value]) => (
                <TableCell key={key}>{value}</TableCell>
              ))}
              <TableCell>
                <Button
                  color="danger"
                  aria-label="Like"
                  size="sm"
                  startContent={
                    <span class="material-symbols-rounded">edit</span>
                  }
                >
                  Edit
                </Button>
              </TableCell>

              <TableCell>
                <Button
                  color="primary"
                  aria-label="Like"
                  size="sm"
                  startContent={
                    <span class="material-symbols-rounded">visibility</span>
                  }
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
