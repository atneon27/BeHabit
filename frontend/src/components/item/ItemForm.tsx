import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ItemSchema } from "@/lib/schemas";
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

const ItemForm = ({ formType }: Props) => {
    const form = useForm<z.infer<typeof ItemSchema>>({
        resolver: zodResolver(ItemSchema),
        defaultValues: {
            name: "",
            description: ""
        }
    })

    const onSubmit = (data: z.infer<typeof ItemSchema>) => {
        console.log(data);
    }
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="text-xl font-semibold">
                {formType === "add" ? "Add a new Target" : "Edit Target"}
            </div>
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Target Name</FormLabel>
                    <FormControl>
                        <Input placeholder="Name your target" {...field} />
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
                    <FormLabel>Target Description</FormLabel>
                    <FormControl>
                        <Textarea placeholder="Describe your target" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <div className="flex justify-end">
                <Button className="cursor-pointer" type="submit">
                    {formType === "add" ? <Plus /> : <Pencil />}
                    {formType === "add" ? "Add Target" : "Edit Target"}
                </Button>
            </div>
            </form>
        </Form>
    )
}

export default ItemForm;