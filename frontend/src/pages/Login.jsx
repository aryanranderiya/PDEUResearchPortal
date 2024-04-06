import * as React from "react";
import LoginInputs from "../components/LoginInputComponent";
import SelectComponent from "../components/SelectComponent";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export default function Login() {
  return (
    <>
      <main className="dark text-foreground bg-background text-center flex justify-center gap-4 h-screen items-center flex-col w-screen">
        <SelectComponent />
        <LoginInputs />
      </main>
    </>
  );
}
