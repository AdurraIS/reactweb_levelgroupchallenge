import { useState } from "react";


export default function Step3(props: { empresaData: any, usersData: any[] }) {
    const { empresaData, usersData } = props;
    return (
        <>
            <div className="border bg-white rounded-lg p-7 flex flex-col gap-2 w-90 shadow-xl shadow-gray-30">
                <h1 className="text-[20px]">Empresa</h1>
                {empresaData && (
                    <div>
                        <div className="flex flex-row gap-[8px]">
                            <p>Nome:</p>
                            <p>{empresaData.name}</p>
                        </div>
                        <div className="flex flex-row gap-[8px]">
                            <p>CNPJ:</p>
                            <p>{empresaData.cnpj}</p>
                        </div>
                        <div className="flex flex-row gap-[8px]">
                            <p>Email:</p>
                            <p>{empresaData.email}</p>
                        </div>
                        <div className="flex flex-row gap-[4px]">
                            <p>Tipo:</p>
                            <p>{empresaData.type === 1 && "Fornecedor"}</p>
                            <p>{empresaData.type === 2 && "Comprador"}</p>
                            <p>{empresaData.type === 3 && "Ambos"}</p>
                        </div>
                    </div>
                )}

                <h1 className="text-[20px]">Usuários</h1>
                {usersData.map((user, index) => (
                    <div key={index}>
                        <p>Nome do usuário:</p>
                        <p>{user.name}</p>
                        <p>Tipo: {user.role}</p>
                    </div>
                ))}

            </div>

        </>
    );
}
