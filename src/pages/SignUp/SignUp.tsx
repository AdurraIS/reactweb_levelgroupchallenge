
import { useState } from "react";
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


export default function SignUp() {
  const [step, setStep] = useState(0);
  const [empresaData, setEmpresaData] = useState({});
  const [usersData, setUsersData] = useState([]);
  function goToStep(numero: number) {
    setStep(numero);
  }
  function onSubmit(){
  }
  function handleEmpresaSubmit(data) {
    setEmpresaData( data );
    console.log(empresaData);
    setStep(step + 1);
  }
  function handleUsersSubmit(data) {
    setUsersData( data );
    console.log(usersData);
    setStep(step + 1);
  }

  return (
    <>
      <div className="h-screen flex flex-col justify-center m-auto items-center text-black">
        <Breadcrumb className="mb-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => goToStep(0)}>Empresa</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => goToStep(1)}>Usuarios</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
            {step == 0 && (<Step1 empresaData={empresaData} onSubmit={handleEmpresaSubmit}/>)}
            {step == 1 && (<Step2 onSubmit={handleUsersSubmit}/>)}
            {step == 2 && ( 
            <Button className="mt-2 bg-blue-600 w-full hover:bg-blue-800" type="submit">
              Concluir
            </Button>)}
           
      </div >

    </>
  )
}