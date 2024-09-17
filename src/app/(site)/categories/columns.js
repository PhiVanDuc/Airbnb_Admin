"use client"

import { useEffect, useState } from "react";
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

import { delete_category } from "@/actions/category";
import { Skeleton } from "@/components/ui/skeleton";
import clientRefresh from "@/util/clientRefresh";

const iconLibraries = {
    Ant_Design_Icons: async () => await import("react-icons/ai"),
    Bootstrap_Icons: async () => await import("react-icons/bs"),
    Feather_Icons: async () => await import("react-icons/fi"),
    Font_Awesome_5_Icons: async () => await import("react-icons/fa"),
    Font_Awesome_6_Icons: async () => await import("react-icons/fa6"),
    Hero_Icons: async () => await import("react-icons/hi"),
    Hero_Icons_2: async () => await import("react-icons/hi2"),
    Icons_8_Line_Awesome: async () => await import("react-icons/lia"),
    Lucide_Icons: async () => await import("react-icons/lu"),
    Material_Design_Icons: async () => await import("react-icons/md"),
    VS_Code_Icons: async () => await import("react-icons/vsc"),
    Weather_Icons: async () => await import("react-icons/wi"),
};

const renderIcon = (prefix, name_icon, s) => {
    const [IconComponent, setIconComponent] = useState(null);

    useEffect(() => {
        (async () => {
            const Icon = (await iconLibraries[prefix]())[name_icon];
            setIconComponent(<Icon size={s} />);
        })();
    }, [prefix, name_icon])

    return (
        <span key={name_icon}>
            { IconComponent ? IconComponent : <Skeleton className="w-[28px] h-[28px] rounded-[5px] bg-slate-300" /> }
        </span>
    );
}

const columns = [
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "category_type",
        header: "Type",
        cell: ({ row }) => {
            const info = row.original;
            const type = info?.category_type;

            return (type.charAt(0).toUpperCase() + type.slice(1))?.replace("_", " ");
        }
    },
    {
        accessorKey: "icon",
        header: "Icon",
        cell: ({row}) => {
            const info = row.original;

            return(
                <>
                    {renderIcon(info.prefix_icon, info.icon, 28)}
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

            const { setTokens } = useTokenContext();
            const { setToggleInfo } = useToggleProvider();

            const handleHref = (path) => {
                router.push(path);
            }

            const handleDelete = async (category_id) => {
                setToggleInfo({
                    isOpen: true,
                    name: info?.category,
                    action: async () => {
                        const refresh = await clientRefresh({
                            router,
                            setTokens
                        });

                        const result = await delete_category(category_id, refresh?.accessToken);
                        if (result === 401) {
                            router.replace("/sign-out");
                            return;
                        }

                        if (!result?.success) toast.error(result.message);
                        else toast.success(result.message);
                    }
                });
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
                                onClick={() => { handleHref(`/categories/edit?id=${info.id}`) }}
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