"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonAssignRole() {
    return (
        <div className="space-y-[20px]">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-[20px] gap-y-[15px]">
                <Skeleton className="w-auto h-[20px] bg-slate-300" />
                <Skeleton className="w-auto h-[20px] bg-slate-300" />
                <Skeleton className="w-auto h-[20px] bg-slate-300" />
                <Skeleton className="w-auto h-[20px] bg-slate-300" />
                <Skeleton className="w-auto h-[20px] bg-slate-300" />
                <Skeleton className="w-auto h-[20px] bg-slate-300" />
                <Skeleton className="w-auto h-[20px] bg-slate-300" />
                <Skeleton className="w-auto h-[20px] bg-slate-300" />
                <Skeleton className="w-auto h-[20px] bg-slate-300" />
            </div>

            <div className="lg:flex space-y-[10px] lg:space-x-[10px] lg:space-y-0 justify-end">
                <Skeleton className="w-full lg:w-[150px] h-[40px] bg-slate-300" />
                <Skeleton className="w-full lg:w-[150px] h-[40px] bg-slate-300" />
            </div>
        </div>
    )
}
