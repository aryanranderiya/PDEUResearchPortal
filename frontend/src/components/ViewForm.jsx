import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import * as React from "react";

export default function ViewFormTable() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/select/researchpaper",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const jsonData = await response.json();
        setData(jsonData);
        console.log("Data: ", jsonData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <Table aria-label="Collection of Data">
      <TableHeader>
        <TableColumn>DOI</TableColumn>
        <TableColumn>Title</TableColumn>
        <TableColumn>Author(s)</TableColumn>
        <TableColumn>Publish Date</TableColumn>
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
            </TableRow>
          ))}
        </TableBody>
      )}
    </Table>
  );
}
