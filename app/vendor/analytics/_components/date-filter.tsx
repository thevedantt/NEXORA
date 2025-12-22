"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { format, subDays, startOfToday } from "date-fns"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface DateFilterProps {
    date: DateRange | undefined;
    setDate: (date: DateRange | undefined) => void;
}

export function DateFilter({ date, setDate }: DateFilterProps) {
    const today = startOfToday();

    const presets = [
        {
            label: "Today",
            getValue: () => ({ from: today, to: today }),
        },
        {
            label: "Last 7 Days",
            getValue: () => ({ from: subDays(today, 6), to: today }),
        },
        {
            label: "Last 30 Days",
            getValue: () => ({ from: subDays(today, 29), to: today }),
        },
    ];

    return (
        <div className="flex items-center gap-2">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className={cn(
                            "justify-start text-left font-normal bg-card hover:bg-accent hover:text-accent-foreground",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date range</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                    <div className="flex flex-col sm:flex-row">
                        <div className="border-r border-border p-2 flex flex-col gap-1 min-w-[120px]">
                            <span className="text-xs font-semibold text-muted-foreground px-2 py-1 mb-1">Presets</span>
                            {presets.map((preset) => (
                                <Button
                                    key={preset.label}
                                    variant="ghost"
                                    size="sm"
                                    className="justify-start text-xs font-normal h-8"
                                    onClick={() => setDate(preset.getValue())}
                                >
                                    {preset.label}
                                </Button>
                            ))}
                        </div>
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={1}
                        />
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}
