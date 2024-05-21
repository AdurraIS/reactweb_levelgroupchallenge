import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { IoIosRefresh } from 'react-icons/io';
import { setupAPIClient } from '@/shared/api/api';
import { useLocation } from 'react-router-dom';
import { TipoProdutoCatalog } from '@/components/TipoProdutoCatalog/TipoProdutoCatalog';

export default function Dashboard() {
    const [completos, setCompletos] = useState<number>(0);
    const [pendentes, setPendentes] = useState<number>(0);
    const api = setupAPIClient();
    const location = useLocation();

    if (localStorage.getItem('token') === null) {
        return <Navigate to="/signin" replace />;
    }

    async function refresh() {
        if (!api) return;
        var completos = 0;
        var incompletos = 0;
        try {
            const response = await api.get(`/pedidos/comprador/${localStorage.getItem('id')}`);
            const pedidos = response.data.content;
            pedidos.forEach((pedido) => {
                if (pedido.concluido) {
                    completos += 1;
                } else {
                    incompletos += 1;
                }
            });
            setCompletos(completos);
            setPendentes(incompletos);
        } catch (error) {
            console.error('Erro ao fazer a requisição de pedidos:', error);
        }
    }

    useEffect(() => {
        if (location.pathname === '/') {
            refresh();
        }
    }, [location.pathname, api]);

    return (
        <div className='flex w-full bg-slate-800 flex-row'>
            <TipoProdutoCatalog/>
            <div className='w-[22vw] my-10 px-6 border-orange-500 border-l-2'>
                <h3 className='text-orange-500'>Pedidos</h3>
                <div className='flex flex-row gap-2 border-slate-900 text-white justify-center items-center border-2 rounded-xl w-full p-2'>
                    <div>
                        <div className='flex flex-row w-fit items-center gap-2'>
                            <div className='size-3 rounded-[50%] bg-green-600'></div>
                            <p>{completos} Completos</p>
                        </div>
                        <div className='flex flex-row w-fit items-center gap-2'>
                            <div className='size-3 rounded-[50%] bg-red-600'></div>
                            <p>{pendentes} Pendentes</p>
                        </div>
                    </div>
                </div>
            </div>
            <Button
                className="size-8 p-2 absolute right-0 text-slate-900 bg-white hover:text-white duration-300"
                onClick={refresh}
            >
                <IoIosRefresh size="32px" />
            </Button>
        </div>
    );
}
