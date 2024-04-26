import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(5, {
    message: "Nome da empresa deve ter mais que 5 dígitos.",
  }),
  email: z.string().min(5, {
    message: "E-mail deve ter mais que 5 dígitos.",
  }),
  cnpj: z.string().min(14, {
    message: "CNPJ deve ter mais que 14 dígitos.",
  }),
  type: z.number().max(3, {
    message: "Deve selecionar uma opção.",
  }),
});

const types = [
  { label: "Fornecedor", value: 1 },
  { label: "Comprador", value: 2 },
  { label: "Ambos", value: 3 },
];

export default function Step1() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      cnpj: "",
      type: 0,
    },
  });
  function onSubmit(){
    localStorage.setItem('count', "1");
  }
  return (
      <Form {...form}>
        <div className="border rounded-lg p-7 flex flex-col gap-2 w-80 shadow-xl shadow-gray-30">
            <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome da Empresa</FormLabel>
                <FormControl>
                  <Input placeholder="Nome da Empresa" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="exemplo@empresa.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cnpj"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CNPJ</FormLabel>
                <FormControl>
                  <Input placeholder="CNPJ" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Tipo</FormLabel>
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
                          <Button key={i} className="bg-white drop-shadow-xl border-slate-200 hover:bg-gray-200 duration-200 border-[1px] text-black w-full rounded-2 mt-2" onClick={()=> {form.setValue("type", type.value)}}>{type.label}</Button>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Este é o tipo da sua empresa.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        <Button className="mt-2 bg-blue-600 w-full hover:bg-blue-800" type="submit">
            Proximo
        </Button>
        </form>
        </div>
        1 - - -
      </Form>
  );
}
