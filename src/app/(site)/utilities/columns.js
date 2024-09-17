"use client"

import { useRouter } from "next/navigation";
import { useTokenContext } from "@/hooks/useTokenContext";
import { useToggleProvider } from "@/hooks/useToggleContext";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import clientRefresh from "@/util/clientRefresh";
import { delete_utility } from "@/actions/utility";

import * as Ant_Design_Icons from 'react-icons/ai';
import * as Bootstrap_Icons from 'react-icons/bs';
import * as Feather_Icons from 'react-icons/fi';
import * as Font_Awesome_5_Icons from 'react-icons/fa';
import * as Font_Awesome_6_Icons from 'react-icons/fa6';
import * as Hero_Icons from 'react-icons/hi';
import * as Hero_Icons_2 from 'react-icons/hi2';
import * as Icons_8_Line_Awesome from 'react-icons/lia';
import * as Lucide_Icons from 'react-icons/lu';
import * as Material_Design_Icons from 'react-icons/md';
import * as VS_Code_Icons from 'react-icons/vsc';
import * as Weather_Icons from 'react-icons/wi';

const iconLibraries = {
    Ant_Design_Icons: Ant_Design_Icons,
    Bootstrap_Icons: Bootstrap_Icons,
    Feather_Icons: Feather_Icons,
    Font_Awesome_5_Icons: Font_Awesome_5_Icons,
    Font_Awesome_6_Icons: Font_Awesome_6_Icons,
    Hero_Icons: Hero_Icons,
    Hero_Icons_2: Hero_Icons_2,
    Icons_8_Line_Awesome: Icons_8_Line_Awesome,
    Lucide_Icons: Lucide_Icons,
    Material_Design_Icons: Material_Design_Icons,
    VS_Code_Icons: VS_Code_Icons,
    Weather_Icons: Weather_Icons,
};

const columns = [
    {
        accessorKey: "utility",
        header: "Utility",
    },
    {
        accessorKey: "icon",
        header: "Icon",
        cell: ({row}) => {
            const info = row.original;

            return(
                <>
                    {
                        (() => {
                            const IconComponent = iconLibraries[info?.prefix_icon][info?.icon]
                            return <IconComponent size={30} />
                        })()
                    }
                </>
            );
        }
    },
    {
        // Row actions
        id: "actions",
        header: () => (<div className="text-center">Actions</div>),
        cell: ({ row }) => {
            const router = useRouter();
            const info = row.original;

            const { allTokens, setTokens } = useTokenContext();
            const { setToggleInfo } = useToggleProvider();

            const handleHref = (path) => {
                router.push(path);
            }

            const handleDelete = async (utility_id) => {
                setToggleInfo({
                    isOpen: true,
                    name: info?.utility,

                    action: async () => {
                        const refresh = await clientRefresh({
                            router,
                            setTokens
                        });

                        const result = await delete_utility(utility_id, refresh?.accessToken);
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
                                onClick={() => { handleHref(`/utilities/edit?id=${info.id}`) }}
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