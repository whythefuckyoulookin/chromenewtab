import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { useUsername } from "../hooks/use-username";
import { hoursToGreeting } from "../lib/hours-to-greeting";

export function Widget() {
  const { username, setUsername } = useUsername();
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="flex gap-4 text-nowrap">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        {hoursToGreeting(new Date().getHours())},{" "}
        {!show && username && (
          <Tooltip>
            <TooltipTrigger>
              <span
                onDoubleClick={() => {
                  setShow(true);
                  setValue(username);
                }}
              >
                {username}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Double click for edit</p>
            </TooltipContent>
          </Tooltip>
        )}
      </h2>
      {(!username || show) && (
        <Input
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          onKeyDown={(event) => {
            if (value === "") return;
            if (event.key === "Enter") {
              setUsername(value);
              if (show) setShow(false);
            }
          }}
        />
      )}
    </div>
  );
}
