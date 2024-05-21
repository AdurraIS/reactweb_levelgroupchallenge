import { useState } from "react";
import UserModal from "./UserModal";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Usuario from "../Interfaces/Usuario";
import { FaTrashAlt } from "react-icons/fa";





export default function Step2({ onSubmit }: any) {
  const [usersData, setUsersData] = useState<Usuario[]>([])

  function handleUsersSubmit(data: Usuario) {
    setUsersData([...usersData, data]);

  }
  const userSchema = z.object({
    name: z.string(),
    email: z.string(),
    senha: z.string(),
    role: z.string(),
  });
  const formSchema = z.object({
    usuarios: z.array(userSchema).min(1, { message: "É necessario no minímo 1 úsuario" }),
  });
  const formUser = useForm({
    resolver: zodResolver(formSchema),

  });

  function submitUsers() {
    try {
      if (usersData.filter((user) => user.role === "ADMIN").length == 0) {
        throw new Error("Ao menos um usuario deve ser do tipo ADMIN");
      }
      onSubmit(usersData);
    } catch (error) {
      console.error(error);
    }
    console.log("Step2");
    console.log(usersData);
  }
  function removeUser(index: number) {
    setUsersData((prevUsers) => {
      return prevUsers.filter((_, i) => i !== index);
    });
  }

  return (
    <>
      <Form {...formUser}>

        <div className="border bg-white rounded-lg p-7 flex flex-col gap-2 w-80 shadow-xl shadow-gray-30">
          <div className="flex flex-row justify-between items-center px-2">
            <h1>Usuários</h1>
            <UserModal onSubmit={handleUsersSubmit} />
          </div>


          <div className="border-[1px] rounded p-4 mt-3 mb-2">
            {usersData.length == 0 ? (<h3 className="text-[14px]">Nenhum usuario</h3>) : (
              usersData.map((usuario, index) => (
                <div key={index} className="flex flex-row py-2 items-center justify-between">
                  <h3 className="border-1 text-[14px]">
                    {usuario.name}
                  </h3>
                  <Button className="size-fit bg-red-700 hover:bg-red-800 w-fit" onClick={() => removeUser(index)}>
                    <FaTrashAlt size="10px" />
                  </Button>
                </div>
              ))
            )}
          </div>
          <form onSubmit={() => submitUsers()}>
            {usersData.filter((user) => user.role === "ADMIN").length == 0 ? (
              <>
                <h3 className="text-[14px] mb-3 px-2 text-red-500">Adicione pelo menos um usuario admin</h3>
                <div className="bg-gray-400 rounded-md text-center opacity-50 w-full p-2 hover:bg-gray-400 hover:cursor-default">Concluir</div>
              </>
            ) : (<Button className="w-full" type="submit">Concluir</Button>)}
          </form>
        </div>
      </Form >
    </>
  );
}
