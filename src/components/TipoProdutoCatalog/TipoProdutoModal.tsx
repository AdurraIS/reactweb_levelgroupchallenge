import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";


export default function TipoProdutoModal() {

    const formSchema = z.object({
        name: z.string().min(3, {
            message: "Nome deve ter mais que 3 dígitos.",
        }),

    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await axios.post('https://localhost:7251/tipoprodutos', {
                name: values.name,
            });
        } catch (error) {
            console.error('Erro ao criar Tipo Produto:', error);
        }
    }
    return (

        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-fit h-[30px] border-none">Criar Tipo Produto</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-slate-800 border-none">
                <DialogHeader>
                    <DialogTitle className="text-orange-500">Tipo Produto</DialogTitle>
                </DialogHeader>
                <div className="m-auto h-full py-10 flex flex-col justify-center items-center">

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="p-7 flex flex-col gap-2 w-80 shadow-lg  shadow-gray-900">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-orange-500">Name</FormLabel>
                                        <FormControl>
                                            <Input className="text-white" placeholder="Exemplo: Mesa" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button className="mt-2 bg-blue-600 hover:bg-blue-800" type="submit">Criar</Button>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>

    )
}
