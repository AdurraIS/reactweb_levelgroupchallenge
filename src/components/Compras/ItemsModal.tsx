import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";


export default function ItemsModal(props: { pedidoItems: any[] }) {
    const { pedidoItems } = props;
    return (

        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-fit h-[30px] border-none">Items</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-slate-800 border-none">
                <DialogHeader>
                    <DialogTitle className="text-orange-500">Items</DialogTitle>
                </DialogHeader>
                <Table >
                    <TableHeader className="bg-gray-900">
                        <TableHead className="text-center text-orange-500">ID</TableHead>
                        <TableHead className="text-center text-orange-500">PRODUTO</TableHead>
                        <TableHead className="text-center text-orange-500">QUANTIDADE</TableHead>
                        <TableHead className="text-center text-orange-500">VALOR TOTAL</TableHead>
                    </TableHeader>
                    <TableBody className="bg-gray-500">
                        {pedidoItems.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell className="text-center text-white">{item.id}</TableCell>
                                <TableCell className="text-center text-white">{item.produto}</TableCell>
                                <TableCell className="text-center text-white">{item.quantidade}</TableCell>
                                <TableCell className="text-center text-white">{item.valorTotal}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </DialogContent>
        </Dialog>

    )
}
