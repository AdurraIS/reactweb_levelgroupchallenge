import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const types = [
  { label: "Fornecedor", value: 1 },
  { label: "Comprador", value: 2 },
  { label: "Ambos", value: 3 },
];

export default function Step1({ onSubmit }:any) {

  const formSchema = z.object({
    name: z.string()
        .min(5, { message: "Nome da empresa deve ter mais que 5 dígitos.",}),
    email: z.string()
        .min(5, { message: "E-mail deve ter mais que 5 dígitos.",}),
    cnpj: z.string()
        .min(14, { message: "Seu CNPJ tem menos de 14 dígitos.",})
        .max(14, { message: "Seu CNPJ tem mais de 14 dígitos.",}),
    type: z.number()
    .min(1, { message: "Deve selecionar uma opção.",}),
  });

  const empresaForm = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      cnpj: "",
      type: 0,
    },
  });

  function submitEmpresa(values: z.infer<typeof formSchema>) {
    onSubmit(values);
  }

  return (
    <div>
      <Form {...empresaForm}>
        <div className="border bg-white rounded-lg p-7 flex flex-col gap-2 w-80 shadow-xl shadow-gray-30">

          <form onSubmit={empresaForm.handleSubmit(submitEmpresa)}>
            <FormField
              control={empresaForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex w-fit">Nome da Empresa*</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome da Empresa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={empresaForm.control}
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
              control={empresaForm.control}
              name="cnpj"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex mt-2 pt-2 w-fit">CNPJ*</FormLabel>
                  <FormControl>
                    <Input  placeholder="CNPJ" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={empresaForm.control}
              name="type"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel className="mt-2 pt-2 flex flex-col w-fit">Tipo*</FormLabel>
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
                            <Button key={i} className="bg-white drop-shadow-xl border-slate-200 hover:bg-gray-200 duration-200 border-[1px] text-black w-full rounded-2 mt-1" onClick={() => empresaForm.setValue("type", type.value)}>{type.label}</Button>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-2 w-full" type="submit">
              Próximo
            </Button>
          </form>
        </div>

      </Form >
    </div>
  );
}
