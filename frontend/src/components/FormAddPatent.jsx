import * as React from "react";
import { Input, Select, SelectItem, Button } from "@nextui-org/react";
import PatentPIs from "./ComponentFormPI";

export default function Form1() {
  const statuses = ["Filed", "Unfiled"];
  const categories = ["Process/Product", "Category 1", "Category2"];
  const [PIData, setPIData] = React.useState([]);
  const [formReadOnly, setformReadOnly] = React.useState(false);

  const [formData, setformData] = React.useState({
    Title: "",
    FileApplicationNo: "",
    Category: "",
    Status: "",
    ApplicationDate: "",
    PublishedDate: "",
    GrantDate: "",
    PI_PDEU: [],
    PI_Outside: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="main_form">
        <Input
          size="sm"
          type="text"
          label="Patent Title"
          variant="faded"
          className="max-w-5xl"
          isRequired
          value={formData.Title}
          onValueChange={(value) => setformData({ ...formData, Title: value })}
        />

        <Input
          size="sm"
          type="text"
          label="File/Application No"
          variant="faded"
          className="max-w-5xl"
          isRequired
          value={formData.FileApplicationNo}
          onValueChange={(value) =>
            setformData({ ...formData, FileApplicationNo: value })
          }
        />

        <Select
          label="Category"
          className="max-w-5xl"
          size="sm"
          isRequired
          value={formData.Category}
          onValueChange={(value) =>
            setformData({ ...formData, Category: value })
          }
        >
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </Select>

        <Select
          label="Status"
          className="max-w-5xl"
          size="sm"
          isRequired
          value={formData.Status}
          onValueChange={(value) => setformData({ ...formData, Status: value })}
        >
          {statuses.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </Select>

        <Input
          size="sm"
          type="date"
          label="Application Date"
          variant="faded"
          className="max-w-5xl"
          isRequired
          value={formData.ApplicationDate}
          onValueChange={(value) =>
            setformData({ ...formData, ApplicationDate: value })
          }
        />

        <Input
          size="sm"
          type="date"
          label="Published Date"
          variant="faded"
          className="max-w-5xl"
          isRequired
          value={formData.PublishedDate}
          onValueChange={(value) =>
            setformData({ ...formData, PublishedDate: value })
          }
        />

        <Input
          size="sm"
          type="date"
          label="Grant Date"
          variant="faded"
          className="max-w-5xl"
          isRequired
          value={formData.GrantDate}
          onValueChange={(value) =>
            setformData({ ...formData, GrantDate: value })
          }
        />

        <PatentPIs
          formDataFileApplicationNo={formData.FileApplicationNo}
          PIData={PIData}
          setPIData={setPIData}
          formReadOnly={formReadOnly}
        />

        <div className="flex max-w-5xl gap-2 items-center justify-center">
          <Button
            color="primary"
            size="md"
            type="submit"
            isDisabled={formReadOnly}
          >
            Submit
          </Button>
          <Button
            color="default"
            size="md"
            variant="ghost"
            isDisabled={formReadOnly}
            onClick={() => {}}
          >
            Clear
          </Button>
        </div>
      </div>
    </form>
  );
}
