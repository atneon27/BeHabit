import HabitDialog from "./HabitDialog";
import { useTheme } from "@/context/ThemeContext";

type Props = {
    name: string;
    description: string;
    createdAt: Date;
    count: number;
}

const HabitCard = ({ name, description, createdAt, count }: Props) => {
    const { theme } = useTheme();

    return (
        <div className="relative bg-card rounded-md shadow-sm cursor-pointer dark:shadow-gray-900 py-3 px-5">
            <div className={`absolute -top-2 -right-2 h-5 w-5 rounded-full text-xs font-bold flex items-center justify-center border-2 border-card ${theme === "dark" ? "bg-white text-black" : "bg-black text-white"}`}>
                {count}
            </div>
            <div className="flex justify-between gap-3">
            <div className="flex flex-col gap-2">
                <div className="text-xl font-bold">
                {name}
                </div>
                <div className="text-muted-foreground font-semibold">
                {description}
                </div>
                <div className="text-sm text-muted-foreground font-semibold">
                Created at: {createdAt.toLocaleString()}
                </div>
            </div>
            <div className="flex justify-center items-center">
                <HabitDialog type="edit" />
            </div>
            </div>
        </div>
    )
}

export default HabitCard;