import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { EllipsisVertical, Plus } from "lucide-react";
import ItemForm from "./ItemForm";

type Props = {
    type: "add" | "edit"
}

const EditItemButton = () => {
    return (
        <Button variant="outline" className="flex items-center">
            <EllipsisVertical />
        </Button>
    )
}

const AddItemButton = () => {
    return (
        <Button variant="outline" className="flex items-center cursor-pointer gap-2">
            <Plus />
            <div className="text-wrap">Add a new Item</div>
        </Button>
    )
}

const ItemDialog = ({ type }: Props) => {
    return (
        <Dialog>
        <DialogTrigger>
            {type === "add" ? <AddItemButton /> : <EditItemButton />}
        </DialogTrigger>
        <DialogContent>
            <ItemForm formType={type} />
        </DialogContent>
        </Dialog>
    )
}

export default ItemDialog;