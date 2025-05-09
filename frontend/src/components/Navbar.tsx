import { useTheme } from "../context/ThemeContext"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import AuthOptions from "./AuthOptions";

const Navbar = () => {
    const { theme } = useTheme();

    return (
        <div className={`flex flex-row justify-between items-center p-3 ${theme === "dark" ? "shadow-sm shadow-gray-800" : "shadow-md"}`}>
            <div className="text-2xl font-bold">
                <Tooltip>
                    <TooltipTrigger className="cursor-pointer">BeHabit</TooltipTrigger>
                    <TooltipContent>
                    <p>Your Custom Habit Tracker</p>
                    </TooltipContent>
                </Tooltip>
            </div>
            <AuthOptions />
        </div>
    )
}

export default Navbar;