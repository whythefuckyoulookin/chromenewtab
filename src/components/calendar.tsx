import { useState } from "react";
import { Calendar as DayPickerCalendar } from "./ui/calendar";
import { dateDiffInDays } from "@/lib/date-diff";
import { Button } from "./ui/button";

export function Calendar() {
  const today = new Date();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [month, setMonth] = useState(today);

  return (
    <div className="flex p-3 flex-col rounded-lg border absolute bottom-0 right-0 mr-12 mb-12">
      <DayPickerCalendar
        className="p-0"
        month={month}
        onMonthChange={setMonth}
        fixedWeeks
        showWeekNumber
        mode="single"
        selected={date}
        onSelect={(_date) => {
          if (_date?.toDateString() === today.toDateString()) return;
          setDate(_date);
        }}
        footer={
          <div className="flex justify-between w-0 break-words flex-1 border-t mt-2 pt-2">
            <span className="text-wrap text-ellipsis truncate text-xs text-muted-foreground">
              {date && (
                <>
                  Days between today and {date.toLocaleDateString()}:{" "}
                  {dateDiffInDays(today, date)}
                </>
              )}
            </span>
            <Button
              disabled={
                month.getFullYear() === today.getFullYear() &&
                month.getMonth() === today.getMonth()
              }
              onClick={() => setMonth(today)}
              size="sm"
              variant="secondary"
            >
              Go today
            </Button>
          </div>
        }
      />
    </div>
  );
}
