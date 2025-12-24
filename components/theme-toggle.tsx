"use client"

import * as React from "react"
import { Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider
} from "@/components/ui/tooltip"

export function ThemeToggle() {
    const [isModern, setIsModern] = React.useState(false)

    React.useEffect(() => {
        // Check local storage for persistence
        const isModernStored = localStorage.getItem("theme") === "modern"
        setIsModern(isModernStored)
        if (isModernStored) {
            document.body.classList.add("modern")
        }
    }, [])

    const toggleTheme = () => {
        const newMode = !isModern
        setIsModern(newMode)
        if (newMode) {
            document.body.classList.add("modern")
            localStorage.setItem("theme", "modern")
        } else {
            document.body.classList.remove("modern")
            localStorage.setItem("theme", "aesthetic")
        }
    }

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                    className="h-6 w-6 text-muted-foreground hover:text-foreground hover:bg-transparent"
                >
                    <Palette className="h-4 w-4" />
                    <span className="sr-only">Toggle Theme</span>
                </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
                <p>{isModern ? "Switch to Aesthetic" : "Switch to Modern"}</p>
            </TooltipContent>
        </Tooltip>
    )
}
