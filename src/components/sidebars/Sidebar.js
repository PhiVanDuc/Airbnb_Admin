"use client"

import Image from "next/image";
import CustomSeparator from "../CustomSeparator";
import logo from "@/images/logo.png";

import sidebar_options from "./sidebar_options";
import SidebarInfo from "./SidebarInfo";

export default function Sidebar() {

    return (
        <div className="fixed translate-x-[-100%] lg:sticky lg:translate-x-0 shrink-0 h-dvh p-[30px] top-0 left-0 bottom-0 shadow-xl bg-white w-[300px] overflow-auto no-scrollbar z-10">
            <div className="mb-[15px]">
                <Image
                    alt="Logo Airbnb"
                    width={400}
                    height={400}
                    src={logo}
                    className="w-[120px] object-cover mb-[15px]"
                    priority={true}
                />
                <CustomSeparator />
            </div>

            {
                sidebar_options.map((option) => {
                    return (
                        <div key={ option.heading } className="mb-[15px]">
                            <h4 className="text-[14px] font-semibold mb-[10px]">{ option.heading }</h4>

                            {
                                option.infos.map((info, index_second) => {
                                    return <SidebarInfo key={info.title} info={ info } option={ option } index_second={ index_second } />
                                })
                            }
                        </div>
                    );
                })
            }
        </div>
    )
}