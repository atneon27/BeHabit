import { useState } from "react";
import ItemDialog from "./ItemDialog";

type Props = {
    name: string;
    description: string;
    createdAt: Date;
}

const ItemCard = ({ name, description, createdAt }: Props) => {
    const [selected, setSelected] = useState<boolean>(true)

    const handleClick = () => {
        setSelected(prev => !prev)
    }

    return (
        <div className="flex justify-between bg-card rounded-md shadow-sm cursor-pointer dark:shadow-gray-900 py-3 px-5">
            <div className="flex flex-col justify-start w-full" onClick={handleClick}>
                <div className="text-xl font-bold">
                    {name}
                </div>
                <div className="text-sm text-muted-foreground font-semibold">
                    Created at: {createdAt.toLocaleString()}
                </div>
                {selected && <div className="text-sm text-muted-foreground font-semibold pt-5">
                    {description}
                </div>}
            </div>
            <ItemDialog  type="edit"/>
        </div>
    )
}

export default ItemCard;