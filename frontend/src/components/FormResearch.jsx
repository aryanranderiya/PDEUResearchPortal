import * as React from "react";
import {
  Input,
  Button,
  Textarea,
  RadioGroup,
  Radio,
  useDisclosure,
  Chip,
  Skeleton,
} from "@nextui-org/react";
import FormAddedModal from "./FormAddedModal";
import { PDEUAuthors, OtherAuthors } from "./ComponentFormAuthors";

export default function Form1({ is_conference = false, formReadOnly = false }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [successfullyUploaded, setsuccessfullyUploaded] = React.useState(true);

  const postType = is_conference ? "conferencepapers" : "journalpapers";
  const quartiles = ["Q1", "Q2", "Q3", "Q4"];
  const journal_indexed = ["Scopus", "Web of Science (WOS)"];
  const levels = ["International", "National"];
  const defaultText = formReadOnly ? "Loading..." : "";
  const [formData, setformData] = React.useState({
    Title: defaultText,
    Abstract: defaultText,
    Journal_Name: defaultText,
    Quartile: defaultText,
    Journal_Indexed: defaultText,
    Publisher_Name: defaultText,
    Volume: defaultText,
    Issue: defaultText,
    Page_start: null,
    Page_end: null,
    Publish_date: null,
    ISSN: defaultText,
    DOI: defaultText,
    Created_By: localStorage.getItem("userId"),
  });

  const [authorData, setauthorData] = React.useState([]);

  const [conferenceFormData, setConferenceFormData] = React.useState({
    DOI: defaultText,
    Conference_Name: defaultText,
    Conference_Date: defaultText,
    Conference_City: defaultText,
    Conference_Level: defaultText,
    Created_By: localStorage.getItem("userId"),
  });

  React.useEffect(() => {
    // console.log({
    //   journalData: formData,
    //   conferenceData: conferenceFormData,
    //   authorData: authorData,
    // });
  }, [formData, conferenceFormData, authorData]);

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

      if (formReadOnly) {
        fetchRecordData("JournalPapers", [
          "DOI",
          new URLSearchParams(window.location.search).get("id"),
        ]).then((response) => setformData(response[0]));

        if (is_conference) {
          fetchRecordData("ConferencePapers", [
            "DOI",
            new URLSearchParams(window.location.search).get("id"),
          ]).then((response) => setConferenceFormData(response[0]));
        }
      }
    },
    [formReadOnly],
    []
  );

  const [users, setUsers] = React.useState([{ user: "none" }]);
  React.useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const response = await fetch(
          `https://pdeu-research-portal-api.vercel.app/select`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: localStorage.getItem("userId"),
              table_name: "Employee",
              columns: "id,name",
            }),
          }
        );

        if (!response.ok) throw new Error(response.error);
        else setUsers(await response.json());
      } catch (error) {
        console.error("Error posting data:", error.message);
      }
    };

    fetchUsernames();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://pdeu-research-portal-api.vercel.app/insert`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: postType,
            journalData: formData,
            conferenceData: conferenceFormData,
            authorData: authorData,
          }),
        }
      );

      if (!response.ok) throw new Error(response.error);
      else {
        setsuccessfullyUploaded(true);
        console.log("Form submitted successfully");
      }
    } catch (error) {
      console.error("Error posting data:", error.message);
      setsuccessfullyUploaded(false);
    }

    onOpen();
  };

  React.useEffect(() => {
    if (formData.DOI) {
      for (let category in authorData) {
        for (let authorIndex in authorData[category]) {
          authorData[category][authorIndex].DOI = formData.DOI;
        }
      }
    }
  }, [authorData, formData.DOI]);

  return (
    <form onSubmit={handleSubmit}>
      <FormAddedModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        successfullyUploaded={successfullyUploaded}
        title={is_conference ? "Conference Proceedings" : "Journal Paper"}
        link={is_conference ? "/home/conferencepapers" : "/home/journalpapers"}
        formData={formData}
      />

      <div className="main_form">
        {formReadOnly && (
          <Chip color="danger" variant="flat">
            Read Only
          </Chip>
        )}

        <Input
          isReadOnly={formReadOnly}
          size="sm"
          type="text"
          label="Paper Title"
          className="max-w-5xl"
          variant="faded"
          isRequired
          value={formData.Title}
          onValueChange={(value) => setformData({ ...formData, Title: value })}
        />

        <Textarea
          label="Abstract"
          className="max-w-5xl"
          variant="faded"
          isRequired
          value={formData.Abstract}
          onValueChange={(value) =>
            setformData({ ...formData, Abstract: value })
          }
          isReadOnly={formReadOnly}
        />

        <Input
          size="sm"
          type="text"
          label="Journal Name"
          variant="faded"
          className="max-w-5xl"
          isRequired
          value={formData.Journal_Name}
          onValueChange={(value) =>
            setformData({ ...formData, Journal_Name: value })
          }
          isReadOnly={formReadOnly}
        />

        <RadioGroup
          label="Quartile"
          orientation="horizontal"
          value={formData.Quartile}
          onValueChange={(e) => setformData({ ...formData, Quartile: e })}
          isReadOnly={formReadOnly}
        >
          {quartiles.map((quartile, index) => (
            <Radio key={index} value={quartile}>
              {quartile}
            </Radio>
          ))}
        </RadioGroup>

        <RadioGroup
          label="Journal Indexed"
          orientation="horizontal"
          value={formData.Journal_Indexed}
          onValueChange={(e) =>
            setformData({ ...formData, Journal_Indexed: e })
          }
          isReadOnly={formReadOnly}
        >
          {journal_indexed.map((journal, index) => (
            <Radio key={index} value={journal}>
              {journal}
            </Radio>
          ))}
        </RadioGroup>

        <Input
          size="sm"
          type="text"
          label="Publisher Name"
          variant="faded"
          className="max-w-5xl"
          isRequired
          value={formData.Publisher_Name}
          onValueChange={(value) =>
            setformData({ ...formData, Publisher_Name: value })
          }
          isReadOnly={formReadOnly}
        />
        <div className="flex max-w-5xl gap-2">
          <Input
            size="sm"
            type="text"
            label="Volume"
            variant="faded"
            className="max-w-5xl"
            value={formData.Volume}
            onValueChange={(value) =>
              setformData({ ...formData, Volume: value })
            }
            isReadOnly={formReadOnly}
          />
          <Input
            size="sm"
            type="text"
            label="Issue"
            variant="faded"
            className="max-w-5xl"
            value={formData.Issue}
            onValueChange={(value) =>
              setformData({ ...formData, Issue: value })
            }
            isReadOnly={formReadOnly}
          />
        </div>

        <div className="flex max-w-5xl gap-2">
          <Input
            size="sm"
            type="number"
            label="Page Start"
            variant="faded"
            className="max-w-5xl"
            value={formData.Page_start || ""}
            onValueChange={(value) =>
              setformData({ ...formData, Page_start: value })
            }
            isReadOnly={formReadOnly}
          />
          <Input
            size="sm"
            type="number"
            label="Page End"
            variant="faded"
            className="max-w-5xl"
            value={formData.Page_end || ""}
            onValueChange={(value) =>
              setformData({ ...formData, Page_end: value })
            }
            isReadOnly={formReadOnly}
          />
        </div>

        <Input
          type="date"
          size="sm"
          label="Paper Publish Date"
          variant="faded"
          className="max-w-5xl"
          isRequired
          value={formData.Publish_date}
          onValueChange={(value) =>
            setformData({ ...formData, Publish_date: value })
          }
          isReadOnly={formReadOnly}
        />

        {/* <DatePicker label="Birth date" className="max-w-[284px]" /> */}

        <Input
          size="sm"
          type="text"
          label="ISSN No./ISBN No."
          variant="faded"
          className="max-w-5xl"
          isRequired
          value={formData.ISSN}
          onValueChange={(value) => setformData({ ...formData, ISSN: value })}
          isReadOnly={formReadOnly}
        />
        <Input
          size="sm"
          type="text"
          label="DOI (i.e https://doi.org/10...)"
          variant="faded"
          className="max-w-5xl"
          isRequired
          value={formData.DOI}
          onValueChange={(value) => {
            setformData({ ...formData, DOI: value });
            setConferenceFormData({ ...conferenceFormData, DOI: value });
          }}
          isReadOnly={formReadOnly}
        />

        <PDEUAuthors
          users={users}
          formDataDOI={formData.DOI}
          setauthorData={setauthorData}
          formReadOnly={formReadOnly}
        />

        <OtherAuthors
          formDataDOI={formData.DOI}
          setauthorData={setauthorData}
          formReadOnly={formReadOnly}
        />

        {is_conference ? (
          <>
            <Input
              size="sm"
              type="text"
              label="Conference Name"
              variant="faded"
              className="max-w-5xl"
              isRequired
              value={conferenceFormData.Conference_Name}
              onValueChange={(value) =>
                setConferenceFormData({
                  ...conferenceFormData,
                  Conference_Name: value,
                })
              }
              isReadOnly={formReadOnly}
            />
            <Input
              size="sm"
              type="date"
              label="Conference Date"
              variant="faded"
              className="max-w-5xl"
              isRequired
              value={conferenceFormData.Conference_Date}
              onValueChange={(value) =>
                setConferenceFormData({
                  ...conferenceFormData,
                  Conference_Date: value,
                })
              }
              isReadOnly={formReadOnly}
            />
            <Input
              size="sm"
              type="text"
              label="Conference City"
              variant="faded"
              className="max-w-5xl"
              isRequired
              value={conferenceFormData.Conference_City}
              onValueChange={(value) =>
                setConferenceFormData({
                  ...conferenceFormData,
                  Conference_City: value,
                })
              }
              isReadOnly={formReadOnly}
            />

            <RadioGroup
              label="Conference Level"
              orientation="horizontal"
              value={conferenceFormData.Conference_Level}
              onValueChange={(e) =>
                setConferenceFormData({
                  ...conferenceFormData,
                  Conference_Level: e,
                })
              }
              isReadOnly={formReadOnly}
            >
              {levels.map((level, index) => (
                <Radio key={index} value={level}>
                  {level}
                </Radio>
              ))}
            </RadioGroup>
          </>
        ) : (
          <></>
        )}

        {!formReadOnly && (
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
              onClick={() => {
                setformData({
                  Title: "",
                  Abstract: "",
                  Journal_Name: "",
                  Quartile: "",
                  Journal_Indexed: "",
                  Publisher_Name: "",
                  Volume: "",
                  Issue: "",
                  Page_start: null,
                  Page_end: null,
                  Publish_date: "",
                  ISSN: "",
                  DOI: "",
                  Created_By: localStorage.getItem("userId"),
                });
                setConferenceFormData({
                  DOI: "",
                  Conference_Name: "",
                  Conference_Date: "",
                  Conference_City: "",
                  Conference_Level: "",
                  Created_By: localStorage.getItem("userId"),
                });
                setauthorData([]);
              }}
            >
              Clear
            </Button>
          </div>
        )}
      </div>
    </form>
  );
}
