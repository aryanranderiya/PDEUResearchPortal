import express from "express";
import cors from "cors";
import morgan from "morgan";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const corsOptions = {
  origin: [
    "http://localhost:8162",
    "https://research-portal-pdeu.vercel.app",
    "https://research-pdeu.aryanranderiya.com/",
  ],
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
app.post("/select", cors(corsOptions), async (req, res) => {
  const columns = req.body.columns || "*";
  const table_name = req.body.table_name;
  const where = req.body.where || [];

  let query = supabase.from(table_name).select(columns);
  if (where.length > 0) query = query.eq(where[0], where[1]);

  const { data, error } = await query;
  if (!error) {
    console.log("Successfully read from ", table_name);
    res.status(200).json(data);
  } else {
    console.error("Could not read from ", table_name, error);
    res.status(404).json({ error: `Could not Fetch ${table_name} Data` });
  }
});

// Select data based on the type
app.post("/insert", cors(corsOptions), async (req, res) => {
  const type = req.body.type;
  const authorData = req.body.authorData;
  const conferenceFormData = req.body.conferenceFormData;
  const journalData = req.body.journalData;

  let message = "";
  let statusCode = 200;

  switch (type) {
    case "journalpapers":
      [message, statusCode] = await insertintoTable("JournalPapers", [
        journalData,
      ]);
      await insertAuthors(authorData);
      break;

    case "conferencepapers":
      const [conferenceMessage1, conferenceStatus1] = await insertintoTable(
        "JournalPapers",
        [journalData]
      );

      const [conferenceMessage2, conferenceStatus2] = await insertintoTable(
        "ConferencePapers",
        [conferenceFormData]
      );

      message = conferenceMessage1 + conferenceMessage2;
      if (conferenceStatus1 === 500 || conferenceStatus2 === 500)
        statusCode = 500;

      await insertAuthors(authorData);
      break;

    case "patents":
      break;

    case "books":
      break;

    default:
      return;
  }
  // await insertAuthors(formData.authorData);
  res.status(statusCode).json({ message: message });
});

async function insertintoTable(table_name, form_data) {
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

async function insertAuthors(authorFormData) {
  console.log("authorFormData", authorFormData);

  if (authorFormData.PDEUAuthors)
    supabase
      .from("Authors_inside_PDEU")
      .insert(Object.values(authorFormData.PDEUAuthors))
      .select()
      .then((response) => {
        const { data, error } = response;
        if (error) throw new Error("Error inserting data:" + error.message);
        else console.log("Data inserted successfully:", data);
      })
      .catch((error) => console.error("Error:", error));

  if (authorFormData.OutsideAuthors)
    supabase
      .from("Authors_outside_PDEU")
      .insert(Object.values(authorFormData.OutsideAuthors))
      .select()
      .then((response) => {
        const { data, error } = response;
        if (error) throw new Error("Error inserting data:" + error.message);
        else console.log("Data inserted successfully:", data);
      })
      .catch((error) => console.error("Error:", error));
}

app.post("/selectcount", async (req, res) => {
  try {
    const userId = req.body.userId;
    const timePeriod = req.body.timePeriod;

    console.log("timePeriod", timePeriod);

    const tables = [
      "JournalPapers",
      "ConferencePapers",
      "Patents",
      "Books",
      "Projects",
    ];
    const counts = {};

    const { data: employee, error: employeeError } = await supabase
      .from("Employee")
      .select("designation")
      .eq("id", userId)
      .single();

    if (employeeError) throw new Error(employeeError.message);

    const designation = employee.designation;

    for (const table of tables) {
      let query = supabase
        .from(table)
        .select("*", { count: "exact", head: true });

      if (timePeriod !== null)
        query = query.gte(
          "Created_Date",
          new Date(Date.now() - timePeriod).toISOString()
        );

      if (designation.toLowerCase() === "faculty")
        query = query.eq("Created_By", userId);

      const { count, error } = await query;

      if (error) counts[table] = 0;
      else counts[table] = count;
      console.log("error: ", error);
    }

    console.log("Counts:", counts);
    res.status(200).json(counts);
  } catch (error) {
    console.error("Error fetching data counts:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
