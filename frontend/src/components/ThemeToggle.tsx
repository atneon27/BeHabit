import { useTheme } from "../context/ThemeContext"
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div>
            {theme === "light" ? (
                <Button variant="outline" onClick={() => setTheme("dark")}>
                    <Moon />
                </Button>
            ) : (
                <Button variant="outline" onClick={() => setTheme("light")}>
                    <Sun />
                </Button>
            )}
        </div>
    )
}

export default ThemeToggle;