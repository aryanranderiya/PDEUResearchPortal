import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors()); // Initiailise Cross Origin Resource Sharing from different domains
app.use(express.json()); // Initialise API responses to be in json format
app.use(morgan("combined"));

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const port = 5000;
app.listen(port, () => {
  console.log(`> Ready on http://localhost:${port}`);
});

app.post("/login", async (req, res) => {
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

app.post("/insert/researchpaper", async (req, res) => {
  try {
    const formData = req.body;
    const { data, error } = await supabase
      .from("Research Paper")
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
    res.status(500).json({ error: "Could not Insert into Research Papers" }); // Return internal server error status (500)
  }
});

app.get("/select/researchpaper", async (req, res) => {
  let { data, error } = await supabase.from("Research Paper").select("*");

  if (!error) {
    console.log("Read Successfull.", data);
    res.json(data);
  } else {
    console.log("Read Error.", error);
    res.status(500).json({ error: "Could not Select from Research Papers" });
  }
});

app.post("/select/userdata", async (req, res) => {
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
