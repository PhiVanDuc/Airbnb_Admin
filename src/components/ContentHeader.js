"use client"

import { useRouter } from "next/navigation";
import CustomSeparator from "./CustomSeparator";
import { Button } from "./ui/button";

export default function ContentHeader({ heading, label = "", pathname = "/", button = true }) {
    const router = useRouter();

    return (
        <div className="mb-[50px]">
            <div className="flex items-center justify-between mb-[10px]">
                <h2 className="font-medium text-[24px] lg:text-[30px]">{ heading }</h2>
                {
                    button && (
                        <Button
                            className="min-w-[150px] lg:min-w-[200px] px-[20px] py-[6px] lg:py-[10px] rounded-[5px] bg-rootColor hover:bg-rootColor font-semibold text-[14px] lg:text-[16px] text-center text-white leading-none"
                            onClick={() => { router.push(pathname) }}
                        >
                            { label }
                        </Button>
                    )
                }
            </div>

            <CustomSeparator />
        </div>
    )
}