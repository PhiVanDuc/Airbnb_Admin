"use client"

import { useToggleProvider } from "@/hooks/useToggleContext";

import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import CustomSeparator from "./CustomSeparator";

export default function ConfirmDialog() {
    const { toggleInfo, setToggleInfo } = useToggleProvider();

    const handleClose = () => {
        setToggleInfo({ isOpen: false });
    }

    return (
        <div className={cn(
            "fixed inset-0 z-20 transition",
            toggleInfo?.isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}>
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute w-[300px] lg:w-[500px]  p-[30px] bg-white rounded-lg left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
                <div className="mb-[30px]">
                    <h4 className="font-semibold text-[14px] lg:text-[16px] text-center mb-[10px]">Are you sure you want to delete {toggleInfo?.name}?</h4>
                    <CustomSeparator />
                </div>

                <div className="flex items-center justify-center w-full gap-y-[10px] lg:gap-y-0 lg:gap-x-[15px] flex-col lg:flex-row">
                    <Button
                        className="w-[100%] lg:w-[50%] border-[2px] text-[14px] font-semibold" variant="outline"
                        onClick={handleClose}
                    >
                        No
                    </Button>
                    <Button 
                        className="w-[100%] lg:w-[50%] bg-rootColor hover:bg-rootColor text-[14px] font-semibold"
                        onClick={() => {
                            setToggleInfo({ isOpen: false })

                            toggleInfo?.action();    
                        }}
                    >
                        Yes
                    </Button>
                </div>
            </div>
        </div>
    )
}
