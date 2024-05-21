
import { useEffect, useState } from "react";
import Step1 from "./Steps/Step1";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Step2 from "./Steps/Step2";
import { Button } from "@/components/ui/button";
import { Navigate, useNavigate } from "react-router-dom";
import Empresa from "./Interfaces/Empresa";
import Usuario from "./Interfaces/Usuario";
import Step3 from "./Steps/Step3";
import axios from "axios";


export default function SignUp() {
  const [step, setStep] = useState(0);
  const [empresaData, setEmpresaData] = useState<Empresa>();
  const [usersData, setUsersData] = useState<Usuario[]>([]);
  const navigator = useNavigate();
  function handleEmpresaSubmit(data: Empresa) {
    setEmpresaData(data);
    console.log(empresaData);
    setStep(step + 1);
  }
  function handleUsersSubmit(data: Usuario[]) {
    setUsersData([...usersData, ...data]);
    setStep(step + 1);
  }
  if (localStorage.getItem('token') !== null) {
    return <Navigate to="/" replace />;
  }
  async function onSubmit() {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/empresas', {
        email: empresaData?.email,
        cnpj: empresaData?.cnpj,
        name: empresaData?.name,
        type: empresaData?.type,
        usuarios: usersData
      });
      if(response.status==200){
        navigator("/signin");
      }
    } catch (error) {
      console.error('Erro ao cadastrar empresa:', error);
    }

  }
  return (
    <>
      <div className="h-screen flex flex-col justify-center m-auto items-center text-black">
        <Breadcrumb className="mb-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              {step === 0 ? (<BreadcrumbLink className="text-black scale-105" >Empresa</BreadcrumbLink>)
                : <BreadcrumbLink className="text-gray-400">Empresa</BreadcrumbLink>}
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {step === 1 ? (<BreadcrumbLink className="text-black scale-105" >Usuarios</BreadcrumbLink>)
                : <BreadcrumbLink className="text-gray-400">Usuarios</BreadcrumbLink>}
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {step === 2 ? (<BreadcrumbLink className="text-black scale-105" >Conclusão</BreadcrumbLink>)
                : <BreadcrumbLink className="text-gray-400">Conclusão</BreadcrumbLink>}
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {step == 0 && (<Step1 onSubmit={handleEmpresaSubmit} />)}
        {step == 1 && (<Step2 onSubmit={handleUsersSubmit} />)}
        {step == 2 && (
          <>
            <Step3 empresaData={empresaData} usersData={usersData} />
            <Button className="mt-2 bg-blue-600 w-full hover:bg-blue-800" type="submit" onClick={() => onSubmit()}>
              Concluir
            </Button>
          </>
        )}

      </div >

    </>
  )
}