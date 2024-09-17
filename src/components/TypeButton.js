"use client"

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function TypeButton({ objType, path, type }) {
    const router = useRouter();

    return (
        <div className="lg:bg-[#CFCFCF] lg:inline-block lg:rounded-[5px] mb-[20px] space-y-[10px] lg:space-y-0">
            {
                Object.entries(objType)?.map((element, index) => {
                    return (
                        <Button
                            key={element[0]}
                            className={cn(
                                "text-[14px] font-semibold text-[#868686] bg-[#CFCFCF] w-full lg:w-[150px] py-[15px] hover:bg-[#CFCFCF] rounded-[5px] lg:rounded-none",
                                index === 0 && "lg:rounded-l-[5px]",
                                index === Object.entries(objType)?.length - 1 && "lg:rounded-r-[5px]",
                                (type === element[1] || (!type && index === 0)) && "bg-rootColor text-white hover:bg-rootColor"
                            )}
                            onClick={() => { router.push(`${path}?type=${element[1]}`) }}
                        >
                            { element[0] }
                        </Button>
                    )
                })
            }
        </div>
    )
}