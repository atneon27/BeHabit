import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import SigninForm from "./SignInForm"
import SignUpForm from "./SignUpForm"

type Props = {
    buttonVariant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
    option: "singin" | "signup"
}

export function AuthDialog({ buttonVariant, option}: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={buttonVariant}>
            {option === "singin" ? "Sign in" : "Sign up"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {option === "singin" ? <SigninForm /> : <SignUpForm />}
      </DialogContent>
    </Dialog>
  )
}

export default AuthDialog;