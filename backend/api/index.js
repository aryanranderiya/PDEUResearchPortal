import express from "express";
import cors from "cors";
import morgan from "morgan";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const corsOptions = {
  origin: ["http://localhost:8162", "https://research-portal-pdeu.vercel.app"],
  optionsSuccessStatus: 200,
  methods: ["GET", "POST"], // Specify the HTTP methods allowed
}; /* This configuration allows requests from the specified origin and sets the optionsSuccessStatus to 200 to ensure preflight requests (OPTIONS) receive a successful response status.*/

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("combined")); // For logging formatting

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const port = 5000;

app.listen(port, () => {
  console.log(`> Ready on http://localhost:${port}`);
});

app.get("/hey", async (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.post("/login", cors(corsOptions), async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      // Handle login error
      console.error("Error logging in:", error.message);
      res.status(401).json({ error: "Invalid credentials" }); // Return unauthorized status (401)
    } else {
      // User has logged in successfully
      console.log("User logged in:", data.user);
      res.status(200).json({ message: "Login successful", user: data.user }); // Return success status (200)
    }
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(500).json({ error: "Internal server error" }); // Return internal server error status (500)
  }
});

app.post("/insert/journalpapers", cors(corsOptions), async (req, res) => {
  try {
    const formData = req.body;
    const authorData = req.body.authorData;
    console.log("authorFormDataPDEU", authorData);
    await insertAuthors(authorData);

    // const { data, error } = await supabase
    //   .from("JournalPapers")
    //   .insert([formData.journalData])
    //   .select();

    // console.log("Data Successfully Inserted!", data);
    // console.log(error);
    // res.status(200).json({ message: "Inserted!" });
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(500).json({ error: "Could not Insert into Research Papers" });
  }
});

app.post("/insert/conferencepapers", cors(corsOptions), async (req, res) => {
  try {
    const journalFormData = req.body.journalData;
    const conferenceFormData = req.body.conferenceData;
    const authorFormDataPDEU = Object.values(req.body.authorDataPDEU);

    // console.log("journalFormData", journalFormData);
    // console.log("conferenceFormData", conferenceFormData);
    console.log("authorFormDataPDEU", authorFormDataPDEU);

    // const { data: journalData, error: journalError } = await supabase
    //   .from("JournalPapers")
    //   .insert([journalFormData])
    //   .select();
    // if (journalError) throw new Error(journalError.message);
    // console.log("Data Successfully Inserted! Journal", journalData);

    // const { data: conferenceData, error: conferenceError } = await supabase
    //   .from("ConferencePapers")
    //   .insert([conferenceFormData])
    //   .select();
    // if (conferenceError) throw new Error(conferenceError.message);
    // console.log("Data Successfully Inserted! Conference", conferenceData);

    // const { data: authorDataPDEU, error: authorDataPDEUError } = await supabase
    //   .from("Authors_inside_PDEU")
    //   .insert(authorFormDataPDEU)
    //   .select();
    // if (authorDataPDEUError) throw new Error(authorDataPDEUError.message);
    // console.log("Data Successfully Inserted! Conference", authorDataPDEU);

    // res.status(200).json({ message: "Data successfully inserted" });
  } catch (error) {
    console.error("Error inserting data:", error.message);
    res.status(500).json({ error: "Could not insert data" });
  }
});

// Select data based on the type
app.post("/select/:type", cors(corsOptions), async (req, res) => {
  const type = req.params.type;
  const userId = req.body.userId;

  let result = undefined;
  let table_name = undefined;
  let columns = undefined;

  switch (type) {
    case "journal":
      table_name = "JournalPapers";
      columns = "DOI,Title,Journal_Indexed,Publish_date";
      break;

    case "conference":
      table_name = "ConferencePapers";
      columns =
        "DOI,Conference_Name,JournalPapers(Title,Publish_date,Journal_Indexed)";
      break;

    case "patents":
      table_name = "Patents";
      columns = "";
      break;

    case "books":
      table_name = "Books";
      columns = "";
      break;

    default:
      return;
  }

  result = await readFromTable(table_name, columns, userId);

  if (result[0]) res.status(200).json(result[1]);
  else res.status(404).json({ error: `Could not Fetch ${table_name} Data` });
});

// Read from any table (Select)
async function readFromTable(table_name, columns = "*", userId, where = []) {
  let query = supabase
    .from(table_name)
    .select(columns)
    .eq("Created_By", userId);

  if (where.length > 0) {
    query = query.eq(where[0], where[1]);
  }

  const { data, error } = await query;

  if (!error) {
    console.log("\nRead Successfull.", table_name, data, "\n");
    return [true, data];
  } else {
    console.log("Read Error.", table_name, error);
    return [false, error];
  }
}

// User information display in sidebar
app.post("/userinfo", cors(corsOptions), async (req, res) => {
  const userId = req.body.userId;

  let { data, error } = await supabase
    .from("Employee")
    .select("*")
    .eq("id", userId);

  if (!error) {
    console.log("Reading User Data from Employee Successfull.", data);
    res.json(data);
  } else {
    console.log("Read Error.", error);
    res.status(500).json({ error: "Could not Select from Employee" });
  }
});

// Fetch all the usernames for author select in form
app.post("/fetchusernames", cors(corsOptions), async (req, res) => {
  let { data, error } = await supabase.from("Employee").select("id,name");

  if (!error) {
    console.log("Reading User Data from Employee Successfull.", data);
    res.status(200).json(data);
  } else {
    console.log("Read Error.", error);
    res.status(500).json({ error: "Could not Select from Employee" });
  }
});

async function insertAuthors(authorFormData) {
  const PDEUAuthors = Object.values(authorFormData.PDEUAuthors) || null;
  const OutsideAuthors = Object.values(authorFormData.OutsideAuthors) || null;

  if (PDEUAuthors)
    supabase
      .from("Authors_inside_PDEU")
      .insert(PDEUAuthors)
      .select()
      .then((response) => {
        const { data, error } = response;
        if (error) console.error("Error inserting data:", error.message);
        else console.log("Data inserted successfully:", data);
      })
      .catch((error) => console.error("Error:", error.message));

  if (OutsideAuthors)
    supabase
      .from("Authors_outside_PDEU")
      .insert(OutsideAuthors)
      .select()
      .then((response) => {
        const { data, error } = response;
        if (error) console.error("Error inserting data:", error.message);
        else console.log("Data inserted successfully:", data);
      })
      .catch((error) => console.error("Error:", error.message));
}
