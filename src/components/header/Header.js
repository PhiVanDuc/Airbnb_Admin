"use client"

import { useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTokenContext } from "@/hooks/useTokenContext";

import { IoIosMenu } from "react-icons/io";
import { GoBell } from "react-icons/go";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { Skeleton } from "../ui/skeleton";
import check_info_user from "@/actions/ReuseTasks/user/check_info_user";

export default function Header() {
    const router = useRouter();
    const [infoUser, setInfoUser] = useState({});

    const { allTokens, setTokens } = useTokenContext();

    useEffect(() => {
        (async () => {
            await check_info_user({
                allTokens,
                setTokens,
                router,
                setState: setInfoUser
            });
        })();
    }, []);

    const handleSignout = () => {
        router.push("/sign-out");
    }

    return (
        <div className="mb-[40px] md:mb-[50px] flex items-center justify-between">
            <div>
                Search Bar
            </div>

            <div className="flex items-center space-x-[20px]">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <div className="relative">
                            <GoBell size={ 24 } />

                            <span className="absolute inline-block w-[10px] h-[10px] rounded-full bg-rootColor top-[-2px] right-[2px] border-[2px] border-white" />
                        </div>
                    </DropdownMenuTrigger>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center md:space-x-[5px] m-0">
                        <div className="flex relative items-center space-x-[15px] pe-[10px]">
                            <div className="absolute w-[3px] top-0 bottom-0 right-0 rounded-full bg-rootColor" />

                            {
                                infoUser?.image ?
                                (
                                    <Image
                                        width={40}
                                        height={40}
                                        alt="Avatar"
                                        src={infoUser?.image}
                                        priority={true}
                                        className="w-[40px] h-[40px] rounded-full object-cover"
                                    />
                                ) :
                                (
                                    <div className="w-[40px] h-[40px] bg-[#CFCFCF] rounded-full" />
                                )
                            }
                            <div className="flex items-start flex-col">
                                {
                                    !infoUser?.fullname ?
                                    <Skeleton className="h-[15px] w-[100px] mb-[5px] bg-[#CFCFCF]" /> :
                                    <p className="leading-none m-0 text-[14px] font-medium mb-[5px] w-[150px] truncate text-left">{infoUser?.fullname}</p>
                                    
                                }
                                
                                {
                                    !infoUser?.email ?
                                    <Skeleton className="h-[15px] w-[150px] bg-[#CFCFCF]" /> :
                                    <p className="text-[12px] w-[150px] truncate text-left">{infoUser?.email}</p>
                                }
                            </div>
                        </div>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="center" sideOffset={15} className="w-[214.87px] md:w-[249.867px] p-[10px]">
                        <DropdownMenuItem
                            onClick={ handleSignout }
                            className="font-medium text-[14px] py-[5px] px-[10px] cursor-pointer"
                        >
                            Sign out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}