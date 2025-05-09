import { useAuth } from "@/context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import AuthDialog from "./AuthDialogs";

const AuthOptions = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div className="flex gap-2">
            {!isAuthenticated && <div className="flex gap-4">
                <AuthDialog buttonVariant="default" option="signup" />
                <AuthDialog buttonVariant="outline" option="singin"/>    
            </div>}
            <ThemeToggle />
        </div>
    )
}

export default AuthOptions;