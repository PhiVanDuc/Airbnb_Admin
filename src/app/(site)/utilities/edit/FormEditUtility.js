"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTokenContext } from "@/hooks/useTokenContext";

import Image from "next/image";
import bg_icons from "@/images/icons.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import {    
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage
} from "@/components/ui/form";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Skeleton } from "@/components/ui/skeleton";

import { useForm } from "react-hook-form";

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
import { IoIosArrowUp } from "react-icons/io";

import { edit_utility } from "@/actions/utility";
import { cn } from "@/lib/utils";

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
    Weather_Icons: Weather_Icons
};

export default function FormEditUtility({ data }) {
    const router = useRouter();
    const [icons, setIcons] = useState(null);
    const [iconCount, setIconCount] = useState(null);
    const [iconChoosed, setIconChoosed] = useState(null);
    const [keyword, setKeyword] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [pending, setPending] = useState(false);

    const { allTokens, setTokens } = useTokenContext();

    const form = useForm({
        // resolver: zodResolver(categorySchema),
        // mode: "onChange",
        defaultValues: {
            utility_name: data?.utility?.utility,
            utility_type: data?.utility?.utility_type,
            icon: data?.utility?.icon,
            prefix_icon: data?.utility?.prefix_icon
        }
    });

    const handleScroll = () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 0) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        if (!iconCount) {
            const loadIcons = async () => {
                const loadedIcons = {};
                for (const [key] of Object.entries(iconLibraries)) {
                    loadedIcons[key] = {
                        icons: iconLibraries[key],
                        count: Object.keys(iconLibraries[key])?.length,
                    }
                }
                setIconCount(loadedIcons);
            };
    
            loadIcons();
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleLoadIcons = (prefix) => {
        if (!iconCount) {
            toast.warning("Loading in progress, please wait!");
            return;
        }

        setIcons({
            prefix,
            icons: iconCount[prefix]?.icons,
        })
    }

    const handleChooseIcon = (prefix, icon) => {
        form.setValue("icon", icon);
        form.setValue("prefix_icon", prefix);
        setIconChoosed({
            prefix: prefix,
            icon,
        });

        toast.success("You just selected the icon!");
    }

    const handleSearchIcon = (e) => {
        const key = e.key;

        if (key === "Enter") {
            console.log(keyword);
        }
    }

    const onSubmit = async (values) => {
        setPending(true);

        setPending(false);
    }
    
    return (
        <div className="space-y-[20px]">
            <div 
                className={cn(
                    "fixed flex items-center justify-center invisible opacity-0 z-[10] w-[40px] h-[40px] bg-black rounded-full right-[20px] bottom-[100px] cursor-pointer transition-all",
                    isVisible ? "visible opacity-100" : ""
                )}
                onClick={() => {
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    })
                }}
            >
                <IoIosArrowUp size={30} className="text-white" />
            </div>

            <Form {...form}>
                <form
                    className="space-y-[20px]"
                    action={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        control={ form.control }
                        name="utility_name"
                        render={({ field }) => {
                            return (
                                <FormItem className="w-full">
                                    <FormLabel className="inline-block mb-[5px] font-semibold text-[14px]">
                                        Utility name
                                    </FormLabel>

                                    <FormControl>
                                        <Input 
                                            type="text" 
                                            placeholder="(pool)"
                                            className="bg-transparent py-[15px] px-[20px] border-black rounded-[5px] placeholder:text-placeholderText focus:border-input"
                                            style={{ marginTop: "0px" }}
                                            { ...field }
                                            disabled={ pending ? true : false }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                        }}
                    />

                    <div className="flex gap-x-[10px]">
                        <FormField
                            control={form.control}
                            name="utility_type"
                            render={({ field }) => {
                                return (
                                    <FormItem className="w-full">
                                        <FormLabel className="inline-block mb-[5px] font-semibold text-[14px]">
                                            Utility type
                                        </FormLabel>
                                        
                                        <Select 
                                            onValueChange={field.onChange} 
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger
                                                    className="w-full bg-transparent border-black text-placeholderText py-[15px] px-[20px]"
                                                    style={{ marginTop: "0px" }}
                                                    disabled={ pending ? true : false }
                                                >
                                                    <SelectValue placeholder="Utility type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            
                                            <SelectContent>
                                                <SelectItem value="favorite">Favorite</SelectItem>
                                                <SelectItem value="standout">Standout</SelectItem>
                                                <SelectItem value="safety">Safety</SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />

                        <FormField
                            control={ form.control }
                            name="icon"
                            render={({ field }) => {
                                const IconComponent = (iconLibraries[iconChoosed?.prefix] || iconLibraries[data?.utility?.prefix_icon])?.[field?.value];

                                return (
                                    <FormItem>
                                        <div 
                                            className="flex flex-col items-center justify-center w-[80px] h-full border border-black rounded-[5px] p-0 m-0"
                                            onClick={(e) => {e.preventDefault()}}
                                        >
                                            {
                                                !field?.value ? 
                                                "Icon" :
                                                IconComponent ? <IconComponent size={30} /> : "Icon"
                                            }
                                        </div>

                                        <FormControl style={{ marginTop: "0px" }}>
                                            <Input
                                                type="text"
                                                className="hidden"
                                                { ...field }
                                            />
                                        </FormControl>
                                    </FormItem>
                                )
                            }}
                        />
                    </div>

                    <Button 
                        className="text-[16px] font-semibold bg-rootColor text-white w-full py-[10px] hover:bg-rootColor"
                        onClick={() => {
                            if (!form.getValues("icon")) toast.warning("Please choose icon for category!");
                        }}
                    >
                        Edit utility
                    </Button>
                </form>
            </Form>

            <div className="pb-[30px]">
                <h4 className="text-[14px] font-bold mb-[5px]">Choose icon</h4>

                {
                    !icons ?
                    (
                        <div className="grid grid-cols-3 auto-rows-auto gap-[20px]">
                            {
                                Object.entries(iconLibraries)?.map(([prefix]) => {
                                    return (
                                        <div
                                            key={prefix}
                                            className="relative flex items-center justify-center h-[180px] rounded-[5px] cursor-pointer p-[20px]"
                                            onClick={ () => { handleLoadIcons(prefix) } }
                                        >
                                            <Image 
                                                alt="Background image icon"
                                                layout="fill"
                                                src={bg_icons}
                                                className="absolute object-cover rounded-[5px] inset-0"
                                            />

                                            <div className="absolute inset-0 bg-black/30 rounded-[5px] z-[1]" />

                                            <div className="relative z-[2] space-y-[5px]">
                                                <p className="text-white text-[18px] font-semibold">{prefix.replace(/_/g, " ").trim()}</p>
                                                {   
                                                    !iconCount ?
                                                    <Skeleton className="w-full h-[15px] bg-slate-300" /> :
                                                    <p className="text-white text-[14px] font-medium">{iconCount[prefix]?.count} icons</p>
                                                }
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    ) :
                    (
                        <div>
                            <div className="flex items-center gap-[10px] mb-[20px]">
                                <Input
                                    placeholder="Search icons..."
                                    className="py-[10px] px-[20px] placeholder:text-placeholderText bg-transparent border-black"
                                    style={{ marginTop: "0px" }}
                                    value={keyword}
                                    onChange={(e) => { setKeyword(e.target.value); }}
                                    onKeyPress={handleSearchIcon}
                                />

                                <Button
                                    className="bg-rootColor hover:bg-rootColor font-semibold"
                                    onClick={() => { setIcons(null) }}
                                    disabled={pending ? true : false}
                                >
                                    Other icons
                                </Button>
                            </div>
                            
                            <div className="grid grid-cols-8 gap-[15px]">
                                {
                                    Object?.keys(icons?.icons)?.map(icon => {
                                        const IconComponent = (iconLibraries[icons?.prefix])[icon];
                                        return (
                                            <div 
                                                key={icon}
                                                className="flex flex-col items-center justify-center bg-slate-200 rounded-[5px] p-[10px] py-[15px] hover:bg-slate-300 transition cursor-pointer"
                                                onClick={() => {handleChooseIcon(icons?.prefix, icon)}}
                                            >
                                                <IconComponent size={30} className="mb-[10px]" />
                                                <p className="w-full text-center truncate text-[12px] text-slate-600 font-medium">{icon}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
