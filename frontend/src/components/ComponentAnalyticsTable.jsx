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

function ComponentTable({ title, description }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [analyticsData, setanalyticsData] = React.useState([]);

  const columns = [
    {
      key: "type",
      label: "Type",
    },
    {
      key: "count",
      label: "Count",
    },
  ];

  const rows = [
    {
      key: "1",
      name: "Tony Reichert",
      role: "CEO",
      status: "Active",
    },
    {
      key: "2",
      name: "Zoey Lang",
      role: "Technical Lead",
      status: "Paused",
    },
    {
      key: "3",
      name: "Jane Fisher",
      role: "Senior Developer",
      status: "Active",
    },
    {
      key: "4",
      name: "William Howard",
      role: "Community Manager",
      status: "Vacation",
    },
  ];
  const fetchAnalytics = async () => {
    try {
      const response = await fetch("http://localhost:5000/selectcount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: localStorage.getItem("userId") }),
      });

      setanalyticsData(await response.json());
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchAnalytics();
  }, []);

  React.useEffect(() => {
    console.log(analyticsData);
    if (analyticsData)
      Object.keys(analyticsData).map((key, index) =>
        console.log(key, analyticsData[key], index)
      );
  }, [analyticsData]);

  return (
    <Table
      aria-label="Table with dynamic content"
      defaultSelectedKeys={[]}
      isHeaderSticky
      topContent={
        <>
          <span className="table_title">{title}</span>
          <span className="table_description">{description}</span>
        </>
      }
    >
      <TableHeader>
        <TableColumn>Type</TableColumn>
        <TableColumn>Count</TableColumn>
      </TableHeader>
      <TableBody
        isLoading={isLoading}
        loadingContent={<Spinner size="lg" />}
        emptyContent={
          <>
            <Spacer y={7} />
            Loading...
          </>
        }
      >
        {analyticsData &&
          Object.keys(analyticsData).map((key, index) => (
            <TableRow key={index}>
              <TableCell>{key}</TableCell>
              <TableCell>{analyticsData[key] || 0}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

export default function ComponentAnalyticsTable() {
  return (
    <>
      <ComponentTable
        title={"1 Month"}
        description={"All Records since 1 Month"}
      />
      <ComponentTable
        title={"3 Month"}
        description={"All Records since 3 Months"}
      />
      <ComponentTable
        title={"6 Month"}
        description={"All Records since 6 Months"}
      />
      <ComponentTable
        title={"1 Year"}
        description={"All Records since 1 Year"}
      />
      <ComponentTable
        title={"All Time"}
        description={"Records from All Time"}
      />
    </>
  );
}
