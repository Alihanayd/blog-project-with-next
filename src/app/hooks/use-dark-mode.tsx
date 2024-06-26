import { useState } from "react";
import { useCookies } from "react-cookie";

const useDarkMode = (defaultTheme = "dark") => {
  const [theme, setTheme] = useState(defaultTheme);
  const [_, setCookie] = useCookies(["theme"]);

  const setAndSaveTheme = (theme: string) => {
    setTheme(theme);
    document.documentElement.classList.remove("dark");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
    setCookie("theme", theme);
  };
  const toggleTheme = () => {
    setAndSaveTheme(theme === "light" ? "dark" : "light");
  };

  return { theme, toggleTheme };
};

export default useDarkMode;
