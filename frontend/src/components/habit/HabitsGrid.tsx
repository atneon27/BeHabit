import HabitCard from "./HabitCard";
import HabitDialog from "./HabitDialog";

const HabitsGrid = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 pt-8 px-5">
            <HabitCard name="Habit 1" description="Description of Habit 1" createdAt={new Date()} count={5} />
            <HabitCard name="Habit 2" description="Description of Habit 2" createdAt={new Date()} count={3} />
            <HabitCard name="Habit 3" description="Description of Habit 3" createdAt={new Date()} count={2} />
            <HabitCard name="Habit 4" description="Description of Habit 4 for the forld fo weofohwoe fhwoenv oweowevne o" createdAt={new Date()} count={1} />
            <HabitCard name="Habit 5" description="Description of Habit 5" createdAt={new Date()} count={0} />
            <HabitDialog type="add" />
        </div>
    )
}

export default HabitsGrid;