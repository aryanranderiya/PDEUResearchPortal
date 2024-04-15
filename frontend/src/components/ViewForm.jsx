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

export default function ViewFormTable({ type }) {
  const [data, setData] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(
    () => {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:5000/select/${type}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
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
        <TableColumn key="DOI">DOI</TableColumn>

        <TableColumn key="Title">Title</TableColumn>

        <TableColumn key="Author">Author(s)</TableColumn>

        <TableColumn key="Publish Date">Publish Date</TableColumn>

        <TableColumn></TableColumn>

        <TableColumn></TableColumn>
      </TableHeader>
      {data === null && (
        <TableBody emptyContent={"No rows to display."}></TableBody>
      )}
      {data !== null && (
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.DOI}</TableCell>
              <TableCell>{item.Title}</TableCell>
              <TableCell>{item.Abstract}</TableCell>
              <TableCell>{item.Journal_Name}</TableCell>

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
