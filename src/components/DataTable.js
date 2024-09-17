"use client"

import { useRouter } from "next/navigation";

import {
    flexRender,
    getCoreRowModel,
    useReactTable
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function DataTable({ columns, data, table_info, path_paginate }) {
    const router = useRouter();
    const table = useReactTable(
        {
            data,
            columns,
            getCoreRowModel: getCoreRowModel(),
        }
    );

    return (
        <>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {
                            table.getHeaderGroups().map(headerGroup => (
                                <TableRow key={ headerGroup.id }>
                                    {
                                        headerGroup.headers.map((header, index) => (
                                            <TableHead 
                                                key={ header.id }
                                                className={cn(
                                                    index === 0 ? "rounded-tl-md" : "",
                                                    index === headerGroup.headers.length - 1 ? "rounded-tr-md" : "",
                                                )}
                                            >
                                                {
                                                    header.isPlaceholder ?
                                                    null :
                                                    flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )
                                                }
                                            </TableHead>
                                        ))
                                    }
                                </TableRow>
                            ))
                        }
                    </TableHeader>

                    <TableBody>
                        {
                            table.getRowModel().rows?.length ?
                            (
                                table.getRowModel().rows.map((row, first_index) => (
                                    <TableRow
                                        key={ row.id }
                                        data-state={ row.getIsSelected() && "selected" }
                                    >
                                        {
                                            row.getVisibleCells().map((cell, second_index) => (
                                                <TableCell
                                                    key={ cell.id }
                                                    className={cn(
                                                        second_index === row.getVisibleCells().length - 1 && first_index === table.getRowModel().rows.length - 1 ? "rounded-br-md" : "",
                                                        second_index === 0 && first_index === table.getRowModel().rows.length - 1 ? "rounded-bl-md" : ""
                                                    )}
                                                >
                                                    {
                                                        flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext()
                                                        )
                                                    }
                                                </TableCell>
                                            ))
                                        }
                                    </TableRow>
                                ))
                            ) : 
                            (
                                <TableRow>
                                    <TableCell 
                                        colSpan={ columns.length}
                                        className="h-24 text-center"
                                    >
                                        <div>No result.</div>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </div>

            <div className="lg:flex justify-between items-center pt-[20px] pb-[30px] space-y-[20px] lg:space-y-0">
                <p className="text-[14px] font-semibold text-slate-400">
                    Number of pages: { table_info?.paginate?.current_page } / { table_info?.paginate?.total_pages }
                </p>

                <div className="flex space-x-[10px]">
                    <Button
                        variant="outline"
                        className="grow"
                        disabled={ table_info?.paginate?.previous_page ? false : true }
                        onClick={() => { router.push(`${path_paginate}?page=${table_info.paginate.previous_page}`); }}
                    >
                        Previous
                    </Button>

                    <Button
                        variant="outline"
                        className="grow"
                        disabled={ table_info?.paginate?.next_page ? false : true }
                        onClick={() => { router.push(`${path_paginate}?page=${table_info.paginate.next_page}`); }}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </>
    )
}