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

function ComponentTable({ title, description, timePeriod = null }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [analyticsData, setanalyticsData] = React.useState([]);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch("http://localhost:5000/selectcount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),
          timePeriod: timePeriod,
        }),
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
    <>
      <Spacer x={10} />
      <Table
        aria-label="Table with dynamic content"
        defaultSelectedKeys={[]}
        isHeaderSticky
        shadow="lg"
        radius="lg"
        isCompact
        topContent={
          <>
            <div className="flex items-center gap-1">
              <span class="material-symbols-rounded">trending_up</span>
              <span className="table_title">{title}</span>
            </div>
            <span className="table_description">
              {description}
              {timePeriod !== null && (
                <i>
                  {new Date(Date.now() - timePeriod).toDateString()}
                  &nbsp;— Today
                </i>
              )}
            </span>
          </>
        }
      >
        <TableHeader>
          <TableColumn className="table_column">Type</TableColumn>
          <TableColumn className="table_column">Count</TableColumn>
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
                <TableCell className="table_cell">{key}</TableCell>
                <TableCell>{analyticsData[key] || 0}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
}

export default function ComponentAnalyticsTable() {
  return (
    <>
      <ComponentTable
        title={"1 Month"}
        description={"All User Records since 30 days"}
        timePeriod={2592000000}
      />
      <ComponentTable
        title={"3 Month"}
        description={"All User Records since 90 days"}
        timePeriod={7776000000}
      />
      <ComponentTable
        title={"6 Month"}
        description={"All User Records since 180 days"}
        timePeriod={15552000000}
      />
      <ComponentTable
        title={"1 Year"}
        description={"All User Records since 365 days"}
        timePeriod={31540000000}
      />
      <ComponentTable
        title={"All Time"}
        description={"All Time User Records"}
      />
    </>
  );
}
