import {
    Command,
    CommandGroup,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DialogClose } from "@radix-ui/react-dialog";

const types = [
    { label: "Admin", value: "ADMIN" },
    { label: "Usuario", value: "USER" },
];
export default function UserModal({ onSubmit }) {

    const [usuarios, setUsuarios] = useState([{}]);

    const formSchema = z.object({
        name: z.string().min(5, {
            message: "Nome do usuário deve ter mais que 5 dígitos.",
        }),
        email: z.string().min(5, {
            message: "E-mail deve ter mais que 5 dígitos.",
        }),
        senha: z.string().min(6, {
            message: "Senha deve ter mais que 6 dígitos.",
        }),
        role: z.string().min(4, {
            message: "Deve selecionar uma opção.",
        }),
    });

    const formUser = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            senha: "",
            role: "",
        },
    });

    function submitUsers(values) {
        onSubmit(values);
        formUser.reset();
    }

    return (
       
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="w-fit rounded-md" variant="outline">Criar Usuário</Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Criar Usuário</DialogTitle>
                        <DialogDescription>
                            Adiciona novo usuário à empresa.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...formUser} >
                        <form onSubmit={formUser.handleSubmit(submitUsers)}>

                        <FormField
                            control={formUser.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex w-fit">Nome de Usuário*</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nome de Usuário" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={formUser.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex mt-2 pt-2 w-fit">E-mail*</FormLabel>
                                    <FormControl>
                                        <Input placeholder="exemplo@empresa.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={formUser.control}
                            name="senha"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex mt-2 pt-2 w-fit">Senha*</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Senha" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={formUser.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Tipo*</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        "w-[150px] justify-between",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value
                                                        ? types.find((type) => type.value === field.value)?.label
                                                        : "Selecione o Tipo"}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[150px] p-0">
                                            <Command>
                                                <CommandGroup>
                                                    {types.map((type, i) => (
                                                        <Button
                                                            key={i}
                                                            className="bg-white drop-shadow-xl border-slate-200 hover:bg-gray-200 duration-200 border-[1px] text-black w-full rounded-2 mt-2"
                                                            onClick={() => {
                                                                formUser.setValue("role", type.value);
                                                            }}
                                                        >
                                                            {type.label}
                                                        </Button>
                                                    ))}
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        Este é o tipo da sua conta.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="submit">Criar</Button>
                            </DialogClose>
                        </DialogFooter>
                        </form >
                    </Form>
                </DialogContent>
            </Dialog>
        
    );
}