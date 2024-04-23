import * as React from "react";
import {
  Checkbox,
  AutocompleteItem,
  Button,
  Autocomplete,
  Input,
} from "@nextui-org/react";

export function PDEUAuthors({
  users,
  formDataDOI,
  setauthorData,
  authorData,
  formReadOnly,
}) {
  const [AuthorPDEUInputs, setAuthorPDEUInputs] = React.useState([[]]);

  const handleAuthorInputAddPDEU = () =>
    setAuthorPDEUInputs([...AuthorPDEUInputs, []]);

  const handleAuthorInputRemovePDEU = (index) => {
    const list = [...AuthorPDEUInputs];
    list.splice(index, 1);
    setAuthorPDEUInputs(list);
  };

  const handleAuthorInputChangePDEU = (value, index) => {
    const list = [...AuthorPDEUInputs];
    list[index] = value;
    setAuthorPDEUInputs(list);

    if (value !== "" && users[value] && users[value].id) {
      setauthorData((prevData) => ({
        ...prevData,
        PDEUAuthors: {
          ...prevData.PDEUAuthors,
          [index]: { DOI: formDataDOI, id: users[value].id },
        },
      }));
    } else
      setauthorData((prevData) => ({
        ...prevData,
        PDEUAuthors: {
          ...prevData.PDEUAuthors,
          [index]: { DOI: formDataDOI, id: null },
        },
      }));
  };

  const [InsideAuthorsJson, setInsideAuthorsJson] = React.useState(null);
  const [OutsideAuthorsJson, setOutsideAuthorsJson] = React.useState(null);

  React.useEffect(
    () => {
      const fetchRecordData = async (table_name, where, columns = "*") => {
        try {
          const response = await fetch(
            `https://pdeu-research-portal-api.vercel.app/select`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                columns: columns,
                table_name: table_name,
                where: where,
              }),
            }
          );
          if (!response.ok) throw new Error(response.error);
          return await response.json();
        } catch (error) {
          console.error("Error posting data:", error.message);
        }
      };

      const fetchAuthorInsideOutsideData = async () => {
        if (formReadOnly) {
          setInsideAuthorsJson(
            await fetchRecordData("Authors_inside_PDEU", [
              "DOI",
              new URLSearchParams(window.location.search).get("id"),
            ])
          );

          setOutsideAuthorsJson(
            await fetchRecordData("Authors_outside_PDEU", [
              "DOI",
              new URLSearchParams(window.location.search).get("id"),
            ])
          );
        }
      };

      fetchAuthorInsideOutsideData();
    },
    [formReadOnly],
    []
  );

  function AuthorAllInputs() {
    if (formReadOnly !== true)
      return (
        <>
          {AuthorPDEUInputs.map((value, index) => (
            <div key={index} className="flex max-w-5xl gap-2 items-center">
              <Autocomplete
                label="Author from PDEU"
                className="max-w-5xl"
                size="sm"
                variant="faded"
                isRequired
                onSelectionChange={(e) => handleAuthorInputChangePDEU(e, index)}
                defaultSelectedKey={AuthorPDEUInputs[index]}
                isDisabled={formReadOnly}
              >
                {users.map((user, index) => (
                  <AutocompleteItem key={index} value={user.id || ""}>
                    {user.name}
                  </AutocompleteItem>
                ))}
              </Autocomplete>

              {AuthorPDEUInputs.length !== users.length && (
                <Button
                  color="primary"
                  id="addAuthor"
                  onClick={handleAuthorInputAddPDEU}
                  isDisabled={formReadOnly}
                >
                  Add
                </Button>
              )}
              {AuthorPDEUInputs.length !== 1 && (
                <Button
                  isIconOnly
                  color="danger"
                  aria-label="Remove"
                  onClick={() => handleAuthorInputRemovePDEU(index)}
                  isDisabled={formReadOnly}
                >
                  <span className="material-symbols-rounded">close</span>
                </Button>
              )}
            </div>
          ))}
        </>
      );
    else
      return (
        <>
          {InsideAuthorsJson !== null &&
            Object.entries(InsideAuthorsJson).map((author, index) => (
              <Input
                size="sm"
                type="text"
                label={`Author ${index + 1} from PDEU`}
                variant="faded"
                className="max-w-5xl"
                isRequired
                value={
                  users.find((user) => user.id === author[1].id)?.name || ""
                }
                isReadOnly={formReadOnly}
              />
            ))}

          {OutsideAuthorsJson !== null &&
            Object.entries(OutsideAuthorsJson).map((author, index) => (
              <Input
                size="sm"
                type="text"
                label={`Outside Author ${index + 1}`}
                variant="faded"
                className="max-w-5xl"
                isRequired
                value={author[1].Author_Name}
                isReadOnly={formReadOnly}
              />
            ))}
        </>
      );
  }

  return <AuthorAllInputs />;
}

export function OtherAuthors({ formDataDOI, setauthorData, formReadOnly }) {
  const [AuthorOtherInputs, setAuthorOtherInputs] = React.useState([[]]);

  const handleAuthorInputAddOther = () =>
    setAuthorOtherInputs([...AuthorOtherInputs, []]);

  const handleAuthorInputRemoveOther = (index) => {
    const list = [...AuthorOtherInputs];
    list.splice(index, 1);
    setAuthorOtherInputs(list);
  };

  const handleAuthorInputChangeOther = (value, index) => {
    const list = [...AuthorOtherInputs];
    list[index] = value;
    setAuthorOtherInputs(list);

    if (value !== "")
      setauthorData((prevData) => ({
        ...prevData,

        OutsideAuthors: {
          ...prevData.OutsideAuthors,
          [index]: { DOI: formDataDOI, Author_Name: value },
        },
      }));
    else
      setauthorData((prevData) => ({
        ...prevData,
        OutsideAuthors: {
          ...prevData.OutsideAuthors,
          [index]: { DOI: formDataDOI, Author_Name: null },
        },
      }));
  };

  return (
    <>
      {AuthorOtherInputs.map((value, index) => (
        <div key={index} className="flex max-w-5xl gap-2 items-center">
          <Input
            size="sm"
            type="text"
            label="Author outside of PDEU"
            variant="faded"
            className="max-w-5xl"
            onValueChange={(e) => handleAuthorInputChangeOther(e, index)}
            isDisabled={formReadOnly}
            value={value}
          />
          <Button
            color="primary"
            id="addAuthor"
            onClick={handleAuthorInputAddOther}
            isDisabled={formReadOnly}
          >
            Add
          </Button>

          {AuthorOtherInputs.length !== 1 && (
            <Button
              isIconOnly
              color="danger"
              aria-label="Remove"
              onClick={() => handleAuthorInputRemoveOther(index)}
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
