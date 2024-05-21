import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import axios from "axios";
import { useEffect, useState } from "react"
import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import TipoProdutoModal from "./TipoProdutoModal";



export function TipoProdutoCatalog() {

    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageSize, setPageSize] = useState<string>("2");
    const [tipoProdutos, setTipoProdutos] = useState<any[]>();
    const [searchText, setSearchText] = useState("");
    async function search() {
        try {
            await axios.get(`https://localhost:7251/tipoprodutos/paginable/${searchText}?PageNo=${pageNumber}&PageSize=${pageSize}`).then((response) => setTipoProdutos(response.data))
        } catch (error) {
            console.error(error);
        }
    }
    const handleChange = (event) => {
        setSearchText(event.target.value);
    }
    const handleNext = () => {
        var page = pageNumber;
        setPageNumber(page + 1);
    }
    const handlePrevious = () => {
        var page = pageNumber;
        if (page != 1) {
            setPageNumber(page - 1);
        }

    }
    useEffect(() => {
        search();
        console.log(pageSize)
    }, [pageSize, pageNumber])
    useEffect(() => {
        if (location.pathname === "/") {
            search();
        }
    }, [location.pathname]);
    return (
        <div className="justify-center w-full max-w-[70vw] pt-10 flex-col">
            <div className="justify-between px-20 items-center flex flex-row mb-2">
                <div className=" flex-row items-center">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchText}
                        onChange={handleChange}
                        className="focus:outline-none w-[13vw] mr-2 px-4 py-1 rounded-full"
                    />
                    <button className="text-white" onClick={() => search()}>
                        Search
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <Select value={pageSize} onValueChange={setPageSize}>
                        <SelectTrigger className="w-[80px] text-white">
                            <SelectValue placeholder="Size" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>PageSize</SelectLabel>
                                <SelectItem value="2">2</SelectItem>
                                <SelectItem value="5">5</SelectItem>
                                <SelectItem  value=  "10">10</SelectItem>
                                <SelectItem onSelect={()=> setPageSize(15)} value="15">15</SelectItem>
                                <SelectItem onSelect={()=> setPageSize(20)} value="20">20</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <TipoProdutoModal />
                </div>
            </div>

            <div className="px-20 justify-center py-10 flex gap-2 flex-wrap">
                {tipoProdutos?.map((tipo, index) => (
                    <div className="justify-center items-center text-center rounded-[10px] min-w-52 max-w-52 text-wrap p-10 text-white border-[1px] w-fit" key={index}>
                        <div>{tipo.name}</div>
                    </div>
                ))}
            </div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious className="text-white" onClick={handlePrevious} />
                    </PaginationItem>
                    <div className="p-2 text-white">
                        {pageNumber}
                    </div>
                    <PaginationItem>
                        <PaginationNext className="text-white" onClick={handleNext} />
                    </PaginationItem>
                </PaginationContent>

            </Pagination>

        </div>

    )
}
