import { useState } from "react";
import UserModal from "./UserModal";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormMessage } from "@/components/ui/form";
import Usuario from "../Usuario";
import { FaTrashAlt } from "react-icons/fa";





export default function Step2({ onSubmit }) {
  const [usersData, setUsersData] = useState<Usuario[]>([])
  var finalUsers: Usuario[] = [];
  function handleUsersSubmit(data) {
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
    finalUsers = usersData;
    onSubmit(finalUsers);
  }
  function removeUser(index){
    setUsersData((prevUsers) => {
      return prevUsers.filter((user, i) => i !== index);
  });
  }

  return (
    <>
      <Form {...formUser}>
        <form onSubmit={formUser.handleSubmit(submitUsers)}>
          <div className="border bg-white rounded-lg p-7 flex flex-col gap-2 w-80 shadow-xl shadow-gray-30">
            <div className="flex flex-row justify-between items-center px-2">
              <h1>Usuários</h1>
              <UserModal onSubmit={handleUsersSubmit} />
            </div>

            {usersData.length === 0 ? (
              <h3 className="text-[14px] p-5">Nenhum usuário</h3>
            ) : (
              usersData.map((usuario, index) => (
                <div key={index}>
                  <h3 className="border-1 text-[14px]">
                    {usuario.name}
                  </h3>
                  <Button onClick={() => removeUser(index)}>
                    <FaTrashAlt />
                  </Button>
                </div>
              ))
            )}
            <Button type="submit">Concluir</Button>
          </div>

        </form>
      </Form >
    </>
  );
}
