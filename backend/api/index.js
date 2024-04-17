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
    const { data, error } = await supabase
      .from("JournalPapers")
      .insert([
        {
          Title: formData.title,
          Abstract: formData.abstract,
          Journal_Name: formData.journal_name,
          Quartile: formData.quartile,
          Journal_Indexed: formData.journal_indexed,
          Publisher_Name: formData.publisher_name,
          Volume: formData.volume,
          Issue: formData.issue,
          Page_start: formData.page_start,
          Page_end: formData.page_end,
          Publish_date: formData.publish_date,
          ISSN: formData.ISSN,
          DOI: formData.DOI,
        },
      ])
      .select();

    console.log(data);
    console.log(error);
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(500).json({ error: "Could not Insert into Research Papers" });
  }
});

app.post("/select/:type", cors(corsOptions), async (req, res) => {
  const type = req.params.type;
  let result = undefined;

  switch (type) {
    case "journal":
      result = await readFromTable(
        "JournalPapers",
        "DOI,Title,Authors,Publish_date"
      );

      if (result[0]) res.status(200).json(result[1]);
      else res.status(404).json({ error: "Could not Fetch Journal Data" });

      break;

    case "conference":
      result = await readFromTable(
        "ConferencePapers",
        `DOI,Conference_Name, JournalPapers(Title,Authors,Publish_date)`
      );
      if (result[0]) res.status(200).json(result[1]);
      else res.status(404).json({ error: "Could not Fetch Conference Data" });
      break;

    case "patents":
      result = await readFromTable(
        "Patents",
        `DOI,Conference_Name, JournalPapers(Title,Authors,Publish_date)`
      );
      if (result[0]) res.status(200).json(result[1]);
      else res.status(404).json({ error: "Could not Fetch Patents Data" });
      break;

    case "books":
      result = await readFromTable(
        "Books",
        `DOI,Conference_Name, JournalPapers(Title,Authors,Publish_date)`
      );
      if (result[0]) res.status(200).json(result[1]);
      else res.status(404).json({ error: "Could not Fetch Books Data" });
      break;

    default:
      break;
  }
});

async function readFromTable(table_name, columns = "*", where = []) {
  let query = supabase.from(table_name).select(columns);

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
