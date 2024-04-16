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
import { useNavigate } from "react-router-dom";

const flattenObject = (obj, delimiter = ".", prefix = "") =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? `${prefix}${delimiter}` : "";
    if (
      typeof obj[k] === "object" &&
      obj[k] !== null &&
      Object.keys(obj[k]).length > 0
    )
      Object.assign(acc, flattenObject(obj[k], delimiter, pre + k));
    else acc[pre + k] = obj[k];
    return acc;
  }, {});

export default function ViewFormTable({ type, columnNames }) {
  const [data, setData] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/select/${type}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setData(null);
      }
    };

    fetchData();
  }, [type]);

  return (
    <Table aria-label="Collection of Data">
      <TableHeader>
        {columnNames.map((column) => (
          <TableColumn>
            {console.log("Column: ", column)}
            {column}
          </TableColumn>
        ))}

        <TableColumn></TableColumn>
        <TableColumn></TableColumn>
      </TableHeader>

      {data === null && (
        <TableBody emptyContent={"No rows to display."}></TableBody>
      )}

      {data !== null && (
        <TableBody>
          {Object.entries(data).map((item, index) => (
            <TableRow key={index}>
              {columnNames.map((columnName, columnIndex) => (
                <TableCell key={columnIndex}>
                  {console.log(
                    Object.entries(flattenObject(item[1]))[columnIndex][1]
                  )}
                  {Object.entries(flattenObject(item[1]))[columnIndex][1]}
                </TableCell>
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
      )}
    </Table>
  );
}
