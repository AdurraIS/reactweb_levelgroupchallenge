import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { api } from "../../shared/api/api";
import { useEffect, useState } from "react";


export default function Compras(){
    const [pedidos, setPedidos] = useState([]);

      useEffect(() => {
          getPedidos();
      }, []);

    async function getPedidos(){
      try{
        const response = await api.get("/pedidos/comprador/3");
        console.log(response)
        setPedidos(response.data.content);
      } catch (error){
        console.error(error)
      }
      
    
    }
  return (
    <>
      <Table>
        <TableHeader>
          <TableHead>ID</TableHead>
          <TableHead>FORNECEDOR</TableHead>
          <TableHead>COMPRADOR</TableHead>
          <TableHead>CONCLUIDO</TableHead>
        </TableHeader>
        <TableBody>
          {pedidos.map((pedido, index) => (
              <TableRow key={index}>
                  <TableCell>{pedido.id}</TableCell>
                  <TableCell>{pedido.fornecedor}</TableCell>
                  <TableCell>{pedido.comprador}</TableCell>
                  <TableCell>{pedido.concluido && 1}</TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
