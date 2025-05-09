import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HabitSchema } from "@/lib/schemas";
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
import { Textarea } from "@/components/ui/textarea"
import { Pencil, Plus } from "lucide-react";

type Props = {
    formType: "add" | "edit"
}

const HabitForm = ({ formType }: Props) => {
    const form = useForm<z.infer<typeof HabitSchema>>({
        resolver: zodResolver(HabitSchema),
        defaultValues: {
            name: "",
            description: ""
        }
    })

    const onSubmit = (data: z.infer<typeof HabitSchema>) => {
        console.log(data);
    }
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="text-xl font-semibold">
                {formType === "add" ? "Add a new Habit" : "Edit Habit"}
            </div>
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Habit Name</FormLabel>
                    <FormControl>
                        <Input placeholder="Name your habit" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Habit Description</FormLabel>
                    <FormControl>
                        <Textarea placeholder="Describe your habit" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <div className="flex justify-end">
                <Button className="cursor-pointer" type="submit">
                    {formType === "add" ? <Plus /> : <Pencil />}
                    {formType === "add" ? "Add Habit" : "Edit Habit"}
                </Button>
            </div>
            </form>
        </Form>
    )
}

export default HabitForm;