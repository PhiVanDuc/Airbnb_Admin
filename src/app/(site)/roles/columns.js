"use client"

import { useRouter } from "next/navigation";
import { useTokenContext } from "@/hooks/useTokenContext";
import { useToggleProvider } from "@/hooks/useToggleContext";
import { toast } from "sonner";

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

import { delete_role } from "@/actions/roles";
import clientRefresh from "@/util/clientRefresh";

const columns = [
    {
        accessorKey: "role",
        header: "Role",
    },
    {
        // Row actions
        id: "actions",
        header: () => (<div className="text-center">Actions</div>),
        cell: ({ row }) => {
            const router = useRouter();
            const info = row.original;

            const { setTokens } = useTokenContext();
            const { setToggleInfo } = useToggleProvider();

            const handleHref = (path) => {
                router.push(path);
            }

            const handleDelete = async (role_id) => {
                setToggleInfo({
                    isOpen: true,
                    name: info?.role,
                    action: async () => {
                        const refresh = await clientRefresh({
                            router,
                            setTokens
                        });

                        const result = await delete_role(role_id, refresh?.accessToken);
                        if (result === 401) {
                            router.replace("/sign-out");
                            return;
                        }

                        if (!result?.success) toast.error(result.message);
                        else toast.success(result.message);
                    }
                })
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
    }
];

export default columns;