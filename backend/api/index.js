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
      // User has logged n successfully
      console.log("User logged in:", data.user);
      res.status(200).json({ message: "Login successful", user: data.user }); // Return success status (200)
    }
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(500).json({ error: "Internal server error" }); // Return internal server error status (500)
  }
});

// Select data based on the type
app.post("/select/:type", cors(corsOptions), async (req, res) => {
  const type = req.params.type;
  const userId = req.body.userId;

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
        "DOI,Conference_Name,JournalPapers(Title,Journal_Indexed,Publish_date)";
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

  let result = await readFromTable(table_name, columns, userId);

  if (result[0]) res.status(200).json(result[1]);
  else res.status(404).json({ error: `Could not Fetch ${table_name} Data` });
});

async function insertintoTable(table_name, form_data, res) {
  console.log("CALLED INSERT INTO TABLE METHOD");

  try {
    const { data, error } = await supabase
      .from(table_name)
      .insert(form_data)
      .select();

    if (error) throw new Error(error.message);

    console.log(`Data successfully inserted into ${table_name}`, data);
    return [`Data successfully inserted into ${table_name}`, 200];
  } catch (error) {
    console.log(`Could not Insert into ${table_name}:  ${error}`);
    return [`Could not Insert into ${table_name}:  ${error}`, 500];
  }
}

// Select data based on the type
app.post("/insert/:type", cors(corsOptions), async (req, res) => {
  const type = req.params.type;
  const formData = req.body;
  let [message, statusCode] = [];

  switch (type) {
    case "journalpapers":
      [message, statusCode] = await insertintoTable(
        "JournalPapers",
        [formData.journalData],
        res
      );
      await insertAuthors(formData.authorData);
      res.status(statusCode).json({ message: message });
      break;

    case "conferencepapers":
      [message, statusCode] = await insertintoTable(
        "JournalPapers",
        [formData.journalData],
        res
      );
      let [message2, statusCode2] = await insertintoTable(
        "ConferencePapers",
        [formData.conferenceData],
        res
      );

      if (statusCode2 === 500 || statusCode === 500)
        res.status(500).json({
          message: {
            journal: message,
            conference: message2,
          },
        });
      else
        res.status(200).json({
          message: {
            journal: message,
            conference: message2,
          },
        });

      await insertAuthors(formData.authorData);
      break;

    case "patents":
      break;

    case "books":
      break;

    default:
      return;
  }
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
        if (error) throw new Error("Error inserting data:" + error.message);
        else console.log("Data inserted successfully:", data);
      })
      .catch((error) => console.error("Error:", error));

  if (OutsideAuthors)
    supabase
      .from("Authors_outside_PDEU")
      .insert(OutsideAuthors)
      .select()
      .then((response) => {
        const { data, error } = response;
        if (error) throw new Error("Error inserting data:" + error.message);
        else console.log("Data inserted successfully:", data);
      })
      .catch((error) => console.error("Error:", error));
}

app.post("/fetchDataCount", async (req, res) => {
  try {
    const tables = [
      "JournalPapers",
      "ConferencePapers",
      "Patents",
      "Books",
      "Projects",
    ];
    const counts = {};

    for (const table of tables) {
      const { count, error } = await supabase
        .from(table)
        .select("*", { count: "exact", head: true });
      if (error) counts[table] = 0;
      else counts[table] = count;
    }

    console.log("Counts:", counts);
    res.status(200).json(counts);
  } catch (error) {
    console.error("Error fetching data counts:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
