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

export default function ViewFormTable({ type, columnNames, table_name }) {
  const [data, setData] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(
    () => {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:5000/select`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ table_name, columnNames }),
          });

          const jsonData = await response.json();
          setData(jsonData);
          console.log("Data: ", jsonData);
        } catch (error) {
          console.error("Error fetching data:", error.message);
          setData(null);
        }
      };

      fetchData();
    },
    [navigate],
    []
  );

  return (
    <Table aria-label="Collection of Data">
      <TableHeader>
        {columnNames.map((column) => (
          <TableColumn key={column}>{column}</TableColumn>
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
              {Object.entries(item[1]).map(([key, value]) => (
                <TableCell>{value}</TableCell>
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
