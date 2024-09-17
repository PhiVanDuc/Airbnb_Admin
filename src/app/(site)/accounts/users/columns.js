"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTokenContext } from "@/hooks/useTokenContext";
import { useToggleProvider } from "@/hooks/useToggleContext";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const columns = [
    {
        accessorKey: "user",
        header: "User",
        cell: ({row}) => {
            const info = row.original;
            
            return (
                <div className="flex items-center space-x-[10px]">
                    {
                        info?.image ?
                        <Image 
                            alt="Avatar"
                            width={40}
                            height={40}
                            src={info.image}
                            className="w-[40px] h-[40px] rounded-full object-cover"
                            priority={true}
                        /> :
                        <div className="w-[40px] h-[40px] rounded-full bg-slate-300"></div>
                    }

                    <div>
                        <p className="text-[14px] font-medium mb-[5px][">{info?.fullname}</p>
                        <p className="text-[12px]">{info?.email}</p>
                    </div>
                </div>
            );
        }
    },
    {
        id: "assign_roles",
        header: () => (<div className="text-center">Assign roles</div>),
        cell: ({row}) => {
            const info = row.original;
            const { setToggleInfo } = useToggleProvider();

            const handleToggleAssign = () => {
                let filterRoles = [];

                if (info?.roles?.length > 0) {
                    filterRoles = info?.roles?.map(role => {
                        return role?.role
                    });
                }

                setToggleInfo({ 
                    isOpen: true,
                    user_id: info?.id,
                    roles: filterRoles,
                });                
            }

            return (
                <div className="text-center">
                    {
                        info?.providers?.provider !== "credentials" ?
                        <p className="text-[14px] text-slate-400 font-medium">Can't assign!</p> :
                        <Button
                            className="bg-rootColor font-semibold text-white text-[14px] hover:bg-[#872341]"
                            onClick={handleToggleAssign}
                        >
                            Assign
                        </Button>
                    }
                </div>
            )
        }
    },
    {
        accessorKey: "roles",
        header: "User types",
        cell: ({row}) => {
            const info = row.original;

            return (
                <div 
                    className="max-h-[100px] overflow-y-scroll style-scrollbar"
                >
                    <p>User</p>
                    {
                        info?.roles?.length > 0 && <div>
                            {
                                info?.roles?.map(role => (
                                    <p key={role?.id}>{role?.role}</p>
                                ))
                            }
                        </div>
                    }
                </div>
            )
        }
    },
    {
        accessorKey: "provider",
        header: "Account type",
        cell: ({row}) => {
            const info = row.original;

            return <p>{ info?.providers?.provider }</p>
        }
    },
    {
        accessorKey: "status",
        header: "Account status",
        cell: ({row}) => {
            const info = row.original;

            return (
                <p className={cn(
                    "font-semibold text-[14px]",
                    info?.status ? "text-[#0DB91B]" : "text-rootColor"
                )}>
                    { info?.status ? "Active" : "Blocked" }
                </p>
            );
        }
    },
    {
        id: "actions",
        header: () => (<div className="text-center">Actions</div>),
        cell: ({row}) => {
            const handleHref = async (path) => {
            }

            const handleDelete = async (user_id) => {
            }

            return (
                <div className="flex items-center justify-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => { handleHref(`/roles/detail?id=${info.id}`) }}
                            >
                                Detail
                            </DropdownMenuItem>

                            <DropdownMenuSeparator /> 
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => { handleHref(`/roles/edit?id=${info.id}`) }}
                            >
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                                className="cursor-pointer"
                                onClick={() => { handleDelete(info.id) }}
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        }
    },
]

export default columns;