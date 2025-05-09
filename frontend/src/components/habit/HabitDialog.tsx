import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Pencil, Plus } from "lucide-react";
import HabitForm from "./HabitForm";

type Props = {
    type: "add" | "edit"
}

const EditHabitButton = () => {
    return (
        <Button variant="outline" className="flex items-center">
            <Pencil />
        </Button>
    )
}

const AddHabitButton = () => {
    return (
        <Button variant="outline" className="flex h-full w-full flex-col items-center gap-2">
            <Plus />
            <div className="text-wrap">Add a new Habit</div>
        </Button>
    )
}

const HabitDialog = ({ type }: Props) => {
    return (
        <Dialog>
        <DialogTrigger>
            {type === "add" ? <AddHabitButton /> : <EditHabitButton />}
        </DialogTrigger>
        <DialogContent>
            <HabitForm formType={type} />
        </DialogContent>
        </Dialog>
    )
}

export default HabitDialog;
