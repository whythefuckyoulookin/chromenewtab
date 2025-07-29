import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Clock } from "./components/clock";
import { ThemeSelect } from "./components/theme-select";
import { Credits } from "./components/credits";
import { SearchBox } from "./components/search-box/search-box";
import { Calendar } from "./components/calendar";
import { Greeting } from "./components/greeting";
import { Bookmarks } from "./components/bookmarks/bookmarks";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="min-h-dvh relative flex w-full items-center justify-center flex-col gap-16">
      <Clock />
      <Greeting />
      <SearchBox />
      <Bookmarks />
      <Credits />
      <Calendar />
      <ThemeSelect />
    </div>
  </StrictMode>
);
