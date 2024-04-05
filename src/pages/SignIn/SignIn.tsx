import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
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
 

 
export default function SignIn() {
  // ...
    const formSchema = z.object({
        email: z.string().min(5, {
        message: "E-mail deve ter mais que 5 dígitos.",
        }),
        senha: z.string().min(6, {
            message: "Senha deve ter mais de 6 dígitos.",
            }),
    })


    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        email: "",
        senha: "",
    },
    })


    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    }

  return (
   
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="border rounded-lg  p-7 
      flex flex-col gap-2 w-80 shadow-lg shadow-gray-300">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="exemplo@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="senha"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input placeholder="senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-2 bg-blue-600 hover:bg-blue-800" type="submit">Entrar</Button>
      </form>
    </Form>
    
  )
}