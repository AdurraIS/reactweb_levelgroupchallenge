import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { setupAPIClient } from "../../shared/api/api";
import { useEffect, useState } from "react";
import Pedido from "./IPedido";
import ItemsModal from "./ItemsModal";
import { useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { IoIosRefresh } from "react-icons/io";

export default function Compras() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const location = useLocation();
  const [userId, setUserId] = useState<any>();
  const api = setupAPIClient();
  async function getPedidos() {
    if(api == null) return;
    try {
      const response = await api.get(`/pedidos/comprador/${localStorage.getItem("id")}`);
      setPedidos(response.data.content)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    setUserId(localStorage.getItem('id'));
    if (location.pathname === "/compras") {
      getPedidos();
    }
  }, [location.pathname]);


  return (
    <>
      <div className="flex flex-col items-center px-[7vw] gap-4 w-full bg-slate-800 py-10">
        <div className="flex flex-row justify-between items-center w-full">
          <div className="text-[24px] text-orange-500">Compras</div>
          <Button className="size-fit p-2" onClick={() => getPedidos()} >
            <IoIosRefresh />
          </Button>
        </div>
        <Table >
          <TableHeader className="bg-gray-900">
            <TableHead className="text-center text-orange-500">ID</TableHead>
            <TableHead className="text-center text-orange-500">FORNECEDOR</TableHead>
            <TableHead className="text-center text-orange-500">COMPRADOR</TableHead>
            <TableHead className="text-center text-orange-500">CONCLUIDO</TableHead>
            <TableHead className="text-center text-orange-500">ITEMS</TableHead>
          </TableHeader>
          <TableBody className="bg-gray-500">
            {pedidos.map((pedido, index) => (
              <TableRow key={index}>
                <TableCell className="text-center text-white">{pedido.id}</TableCell>
                <TableCell className="text-center text-white">{pedido.fornecedor.name}</TableCell>
                <TableCell className="text-center text-white">{pedido.comprador.name}</TableCell>
                <TableCell className="text-center text-white">{pedido.concluido ? "Concluido" : "Pendente"}</TableCell>
                <TableCell className="text-center text-white">
                  <ItemsModal pedidoItems={pedido.items} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>


    </>
  )
}
