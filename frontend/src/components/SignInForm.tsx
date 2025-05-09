import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSigninFormSchema } from "@/lib/schemas";
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

const SigninForm = () => {
    const form = useForm<z.infer<typeof UserSigninFormSchema>>({
        resolver: zodResolver(UserSigninFormSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    })

    const onSubmit = (data: z.infer<typeof UserSigninFormSchema>) => {
        console.log(data);
    }
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="text-xl font-semibold">Sign In to BeHabit</div>
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
                <Button className="cursor-pointer" type="submit">Sign In</Button>
            </div>
            </form>
        </Form>
    )
}

export default SigninForm;