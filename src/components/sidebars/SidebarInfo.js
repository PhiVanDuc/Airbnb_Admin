"use client"

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import Link from "next/link";
import CustomIcon from "./CustomIcon";
import { cn } from "@/lib/utils";
import { IoIosArrowUp } from "react-icons/io";

export default function SidebarInfo({ info, option, index_second }) {
    const pathname = usePathname();
    const adj_pathname = useMemo(() => pathname === "/" ? "/dashboard" : pathname, [pathname]);
    const [openOption, setOpenOption] = useState(false);

    useEffect(() => {
        if (info.subMenu) {
            const ul = document.querySelector(".sub_option");
            ul.style.transition = "height 0.3s linear"

            if (!openOption) ul.style.height = "0px";
            else ul.style.height = ul.scrollHeight + "px";
        }
    }, [openOption]);

    const handleOpenOption = () => {
        setOpenOption(!openOption);
    }

    if (!info.subMenu) {
        return (
            <Link
                href={ info.path }
                className={cn(
                    "relative flex justify-between items-center mb-[10px] cursor-pointer p-[15px] rounded-[5px] transition",
                    index_second === (option.infos.length - 1) ? "mb-0" : "",
                    adj_pathname.includes(info.path === "/" ? "/dashboard" : info.path) ? "bg-rootColor text-white" : ""
                )}
            >
                <div className="flex items-center space-x-[15px]">
                    <CustomIcon icon={ info.icon } size={ 24 } className="" />
                    <p className="font-medium text-[14px]">{ info.title }</p>
                </div>

                { 
                    info.subMenu &&
                    <IoIosArrowUp 
                        size={ 20 }
                        className={cn(
                            "transitiond duration-500",
                            openOption ? "rotate-180" : "",
                        )}
                    /> 
                }

                <div className={cn(
                    "absolute top-0 bottom-0 w-[8px] rounded-[99px] bg-rootColor left-[-18px] invisible opacity-0 transition",
                    adj_pathname.includes(info.path === "/" ? "/dashboard" : info.path) ? "visible opacity-100" : ""
                )} />
            </Link>
        )
    }
    else {
        return (
            <div
                className="mb-[10px]"
                key={ info.title } 
            >
                <div
                    className={cn(
                        "relative flex justify-between items-center cursor-pointer p-[15px] rounded-[5px]",
                        index_second === (option.infos.length - 1) ? "mb-0" : "",
                        adj_pathname.includes(info.path === "/" ? "/dashboard" : info.path) ? "bg-rootColor text-white" : ""
                    )}
                    onClick={ handleOpenOption }
                >
                    <div className="flex items-center space-x-[15px]">
                        <CustomIcon icon={ info.icon } size={ 24 } className="" />
                        <p className="font-medium text-[14px]">{ info.title }</p>
                    </div>

                    { 
                        info.subMenu &&
                        <IoIosArrowUp 
                            size={ 20 }
                            className={cn(
                                "transitiond duration-500",
                                openOption ? "rotate-180" : "",
                            )}
                        /> 
                    }

                    <div className={cn(
                        "absolute top-0 bottom-0 w-[8px] rounded-[99px] bg-rootColor left-[-18px] invisible opacity-0 transition",
                        adj_pathname.includes(info.path === "/" ? "/dashboard" : info.path) ? "visible opacity-100" : ""
                    )} />
                </div>

                <ul className={cn(
                    "sub_option h-0 overflow-hidden transition",
                )}>
                    {
                        info.subMenuOptions.map((sub_option) => {
                            return (
                                <li key={ sub_option.title }>
                                    <Link 
                                        href={sub_option.path}
                                        className="relative block px-[15px] py-[5px] space-x-[15px] mt-[5px] transition"
                                    >
                                        <span className="inline-block w-[24px]" />
                                        <span className={cn(
                                            "text-[14px] font-medium hover:text-rootColor transition",
                                            adj_pathname === sub_option.path ? "text-rootColor" : "",
                                        )}>
                                            { sub_option.title }
                                        </span>

                                        <span className={cn(
                                            "absolute inline-block w-[6px] h-[6px] rounded-[99px] bg-rootColor top-[50%] left-[23px] translate-y-[-50%] invisible opacity-0 transition",
                                            adj_pathname === sub_option.path ? "visible opacity-100" : "",
                                        )} />
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}