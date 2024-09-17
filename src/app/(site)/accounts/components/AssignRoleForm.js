"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToggleProvider } from "@/hooks/useToggleContext";
import { useTokenContext } from "@/hooks/useTokenContext";
import { useForm } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
} from "@/components/ui/form";

import SkeletonAssignRole from "./SkeletonAssignRole";
import CustomSeparator from "@/components/CustomSeparator";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import clientRefresh from "@/util/clientRefresh";
import { assign_roles } from "@/actions/user";
import update_info_user from "@/actions/ReuseTasks/user/update_info_user";

export default function AssignRoleForm({ result }) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [filterdRoles, setFilterdRoles] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [saveRoles, setSaveRoles] = useState([]);

    const { toggleInfo, setToggleInfo } = useToggleProvider();
    const { setTokens } = useTokenContext();

    const form = useForm({
        defaultValues: {
            roles: [],
        }
    });

    // Handle useEffect

    useEffect(() => {
        if (!result?.success) toast.error(result?.message);

        setFilterdRoles(result?.roles);
    }, []);

    useEffect(() => {
        if (toggleInfo?.roles?.length > 0) {
            form.setValue("roles", toggleInfo?.roles);
        }
    }, [toggleInfo]);

    useEffect(() => {
        const timeoutInstance = setTimeout(() => {
            console.log("Actions");
        }, 800);

        return () => {
            clearTimeout(timeoutInstance);
        }
    }, [keyword]);

    // End handle useEffect

    const handleOnChange = (event) => {
        setKeyword(event?.target?.value);
    }

    const handleAssignRole = async (values) => {
        localStorage.removeItem("info_admin");

        const refresh = await clientRefresh({
            router,
            setTokens
        });

        const assign = await assign_roles(
            {
                user_id: toggleInfo?.user_id,
                ...values
            },
            refresh?.accessToken
        );  
        await update_info_user(toggleInfo?.user_id, refresh?.accessToken, router);

        if (assign === 401) router.replace("/sign-out");

        if (!assign?.message) toast.error(assign?.message);
        else toast.success(assign?.message);
    }

    return (
        <div className={cn(
            "fixed inset-0 z-20 transition",
            toggleInfo?.isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}>
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute w-[300px] md:w-[400px] lg:w-[600px] p-[30px] bg-white rounded-lg left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] space-y-[30px]">
                <div>
                    <h4 className="font-semibold text-[14px] lg:text-[16px] text-center mb-[10px]">Assign roles</h4>
                    <CustomSeparator />
                </div>

                <Input
                    type="text"
                    value={keyword}
                    placeholder="Search roles..."
                    onChange={handleOnChange}
                    disabled={ !filterdRoles ? true : false }
                />

                <div>
                    {
                        filterdRoles?.length > 0 ?
                        (
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(handleAssignRole)} className="space-y-[20px]">
                                    <div 
                                        className={cn(
                                            "grid grid-cols-2 lg:grid-cols-3 auto-rows-min gap-[20px]",
                                            filterdRoles?.length > 12 && "h-[125px] overflow-y-auto style-scrollbar"
                                        )}
                                    >
                                        {
                                            filterdRoles?.map((role) => {
                                                return (
                                                    <FormField 
                                                        key={role?.id}
                                                        control={ form.control }
                                                        name="roles"
                                                        render={({ field }) => {
                                                            return (
                                                                <FormItem className="flex items-center space-x-[10px]">
                                                                    <FormControl>
                                                                        <Checkbox 
                                                                            checked={field?.value?.includes(role?.role)}
                                                                            onCheckedChange={(checked) => {
                                                                                return checked ? 
                                                                                field.onChange([...field?.value, role?.role]) :
                                                                                field.onChange(
                                                                                    field.value?.filter(
                                                                                        (value) => value !== role?.role
                                                                                    )
                                                                                )
                                                                            }}
                                                                            className="data-[state=checked]:bg-rootColor data-[state=checked]:border-rootColor"
                                                                        />
                                                                    </FormControl>
                            
                                                                    <FormLabel
                                                                        style={{ marginTop: "0px" }}
                                                                        className="truncate"
                                                                    >
                                                                        {role?.role}
                                                                    </FormLabel>
                                                                </FormItem>
                                                            )
                                                        }}
                                                    />
                                                )
                                            })
                                        }
                                    </div>

                                    <div className="space-y-[10px] lg:space-x-[10px] lg:space-y-0 text-end">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="text-[14px] font-medium w-full lg:w-[150px]"
                                            onClick={() => {
                                                setToggleInfo({ isOpen: false })
                                                form.reset({
                                                    roles: [],
                                                });
                                            }}
                                        >
                                            Close
                                        </Button>

                                        <Button
                                            type="submit"
                                            className="bg-rootColor text-[14px] font-semibold hover:bg-rootColor w-full lg:w-[150px]"
                                        >
                                            Assign
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        ) : 
                        (
                            <div className="flex flex-col gap-y-[20px]">
                                <p className="text-slate-300 font-semibold text-[18px] text-center">Roles empty</p>

                                <div className="text-right">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="text-[14px] font-medium w-full lg:w-[150px]"
                                        onClick={() => {
                                            setToggleInfo({ isOpen: false })
                                            form.reset({
                                                roles: [],
                                            });
                                        }}
                                    >
                                        Close
                                    </Button>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}