import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSignupFormSchema } from "@/lib/schemas";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const SignUpForm = () => {
    const form = useForm<z.infer<typeof UserSignupFormSchema>>({
        resolver: zodResolver(UserSignupFormSchema),
        defaultValues: {
            email: "",
            username: "",
            password: ""
        }
    })

    const onSubmit = (data: z.infer<typeof UserSignupFormSchema>) => {
        console.log(data);
    }
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="text-xl font-semibold">Sign Up to BeHabit</div>
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>User Email</FormLabel>
                    <FormControl>
                        <Input placeholder="User Email" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                        <Input placeholder="Username" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input type="password" placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <div className="flex justify-end">
                <Button className="cursor-pointer" type="submit">Sign Up</Button>
            </div>
            </form>
        </Form>
    )
}

export default SignUpForm;