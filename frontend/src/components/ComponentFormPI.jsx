import * as React from "react";
import {
  Checkbox,
  Button,
  Input,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";

export default function PatentPIs({
  formDataFileApplicationNo,
  PIData,
  setPIData,
  formReadOnly,
}) {
  const [PIPDEUInputs, setPIPDEUInputs] = React.useState([[]]);
  const [PIOtherInputs, setPIOtherInputs] = React.useState([[]]);
  const [users, setUsers] = React.useState([{ user: "none" }]);

  const handlePIInputAddOther = () => setPIOtherInputs([...PIOtherInputs, []]);
  const handlePIInputAddPDEU = () => setPIPDEUInputs([...PIPDEUInputs, []]);

  const handlePIInputRemovePDEU = (index) => {
    const list = [...PIPDEUInputs];
    list.splice(index, 1);
    setPIPDEUInputs(list);
  };

  const handlePIInputRemoveOther = (index) => {
    const list = [...PIOtherInputs];
    list.splice(index, 1);
    setPIOtherInputs(list);
  };

  React.useEffect(() => {
    if (formDataFileApplicationNo) {
      for (let category in PIData) {
        for (let authorIndex in PIData[category]) {
          PIData[category][authorIndex].FileApplicationNo =
            formDataFileApplicationNo;
        }
      }
    }
  }, [PIData, formDataFileApplicationNo]);

  const handlePIInputChangePDEU = (value, index) => {
    const list = [...PIPDEUInputs];
    list[index] = value;
    console.log("list", list);
    setPIPDEUInputs(list);

    if (value !== "" && users[value] && users[value].id)
      setPIData((prevData) => ({
        ...prevData,
        PI_PDEU: {
          ...prevData.PI_PDEU,
          [index]: {
            FileApplicationNo: formDataFileApplicationNo,
            id: users[value].id,
          },
        },
      }));
    else
      setPIData((prevData) => ({
        ...prevData,
        PI_PDEU: {
          ...prevData.PI_PDEU,
          [index]: { FileApplicationNo: formDataFileApplicationNo, id: null },
        },
      }));
  };

  const handlePIInputChangeOther = (value, index) => {
    const list = [...PIOtherInputs];
    list[index] = value;
    setPIOtherInputs(list);

    if (value !== "" && users[value] && users[value].id)
      setPIData((prevData) => ({
        ...prevData,
        PI_Outside: {
          ...prevData.PI_Outside,
          [index]: {
            FileApplicationNo: formDataFileApplicationNo,
            PI_Name: value,
          },
        },
      }));
    else
      setPIData((prevData) => ({
        ...prevData,
        PI_Outside: {
          ...prevData.PI_Outside,
          [index]: {
            FileApplicationNo: formDataFileApplicationNo,
            PI_Name: value,
          },
        },
      }));
  };

  React.useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const response = await fetch(`http://localhost:5000/fetchusernames`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error(response.error);
        else setUsers(await response.json());
      } catch (error) {
        console.error("Error posting data:", error.message);
      }
    };

    fetchUsernames();
  }, []);

  React.useEffect(() => {}, []);

  return (
    <>
      {PIPDEUInputs.map((value, index) => (
        <div key={index} className="flex max-w-5xl gap-2 items-center">
          <Autocomplete
            label="Principal Investigator(s) from PDEU"
            className="max-w-5xl"
            size="sm"
            variant="faded"
            isRequired
            onSelectionChange={(e) => handlePIInputChangePDEU(e, index)}
            defaultSelectedKey={PIPDEUInputs[index]}
            isDisabled={formReadOnly}
          >
            {users.map((user, index) => (
              <AutocompleteItem key={index} value={user.id || ""}>
                {user.name}
              </AutocompleteItem>
            ))}
          </Autocomplete>
          <Checkbox>First</Checkbox>
          <Checkbox>Corresponding</Checkbox>

          {PIPDEUInputs.length !== users.length && (
            <Button
              color="primary"
              id="addAuthor"
              onClick={handlePIInputAddPDEU}
              isDisabled={formReadOnly}
            >
              Add
            </Button>
          )}
          {PIPDEUInputs.length !== 1 && (
            <Button
              isIconOnly
              color="danger"
              aria-label="Remove"
              onClick={() => handlePIInputRemovePDEU(index)}
              isDisabled={formReadOnly}
            >
              <span className="material-symbols-rounded">close</span>
            </Button>
          )}
        </div>
      ))}

      {PIOtherInputs.map((value, index) => (
        <div key={index} className="flex max-w-5xl gap-2 items-center">
          <Input
            size="sm"
            type="text"
            label="Principal Investigator outside of PDEU"
            variant="faded"
            className="max-w-5xl"
            value={value}
            onValueChange={(e) => handlePIInputChangeOther(e, index)}
            isDisabled={formReadOnly}
          />
          <Checkbox>First</Checkbox>
          <Checkbox>Corresponding</Checkbox>
          <Button
            color="primary"
            id="addPI"
            onClick={handlePIInputAddOther}
            isDisabled={formReadOnly}
          >
            Add
          </Button>

          {PIOtherInputs.length !== 1 && (
            <Button
              isIconOnly
              color="danger"
              aria-label="Remove"
              onClick={() => handlePIInputRemoveOther(index)}
              isDisabled={formReadOnly}
            >
              <span className="material-symbols-rounded">close</span>
            </Button>
          )}
        </div>
      ))}
    </>
  );
}
