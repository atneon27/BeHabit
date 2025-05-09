import ItemCard from "./ItemCard";
import ItemDialog from "./ItemDialog";

const ItemDisplay = () => {
    return (
        <div className="pt-8 px-5">
            <div className="flex justify-end pb-5">
                <ItemDialog type="add" />
            </div>
            <ItemCard name="Item 1" description="Description of Item 1" createdAt={new Date()} />
        </div>
    )
}

export default ItemDisplay;