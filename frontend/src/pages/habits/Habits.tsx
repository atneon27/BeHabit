// import { useAuth } from "@/context/AuthContext";

import HabitsGrid from "@/components/habit/HabitsGrid";

const Habits = () => {
//   const { isAuthenticated } = useAuth(); 

//   if(!isAuthenticated) {
//     return (
//         <div className="flex flex-col items-center justify-center h-full">
//             <div className="text-xl text-muted-foreground">
//                 Authenticate yourself to track your habits!
//             </div>
//         </div>
//     )
//   }

  return (
    <div>
        <HabitsGrid />
    </div>
  )
}

export default Habits;