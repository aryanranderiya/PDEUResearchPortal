import * as React from "react";
import LoginInputs from "../components/LoginInputComponent";
import SelectComponent from "../components/SelectComponent";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function signInWithEmail(user_email, user_password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: user_email,
    password: user_password,
  });

  if (!error) localStorage.setItem("authenticated", true);
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return error;
}

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
