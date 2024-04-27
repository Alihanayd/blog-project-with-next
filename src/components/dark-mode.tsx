"use client";

import useDarkMode from "@/app/hooks/use-dark-mode";

const nextModeIcons: { [key: string]: string } = {
  light: "🌚",
  dark: "🌞",
};

export default function DarkMode({ defaultTheme }: { defaultTheme: string }) {
  const { theme, toggleTheme } = useDarkMode(defaultTheme);
  return <button onClick={toggleTheme}>{nextModeIcons[theme]}</button>;
}
