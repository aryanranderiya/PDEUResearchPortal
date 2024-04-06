import * as React from "react";
import LoginInputs from "../components/ComponentLoginInputs";
import SelectComponent from "../components/ComponentLoginSelect";
import { createClient } from "@supabase/supabase-js";
import ThemeContext from "../contexts/ThemeContext";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export default function Login() {
  const { darkTheme } = React.useContext(ThemeContext);

  return (
    <>
      <main
        className={`${darkTheme} text-foreground bg-background text-center flex justify-center gap-4 h-screen items-center flex-col w-screen`}
      >
        <SelectComponent />
        <LoginInputs />
      </main>
    </>
  );
}
