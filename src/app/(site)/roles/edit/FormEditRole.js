"use client"

import { useState, useContext } from "react";
import { TokenContext } from "@/contexts/TokenProvider";
import { useRouter } from "next/navigation";

import list_permission from "@/util/list_permission";
import ContentHeader from "@/components/ContentHeader";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage
} from "@/components/ui/form";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import addRoleSchema from "@/schema/add_role/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { edit_role } from "@/actions/roles";
import clientRefresh from "@/util/clientRefresh";

export default function FormEditRole({ data, id }) {
    const router = useRouter();
    const [pending, setPending] = useState(false);

    const form = useForm({
        resolver: zodResolver(addRoleSchema),
        defaultValues: {
            role: !data?.success ? "" :data?.detail_role?.role,
            permissions: !data?.success ? [] : data?.detail_role?.permissions?.map(permission => permission.permission),
        }
    });

    const { setTokens } = useContext(TokenContext);

    const onSubmit = async (values) => {
        setPending(true);
        
        const refresh = await clientRefresh({
            router,
            setTokens
        });

        const result = await edit_role({ ...values, role_id: id }, refresh?.accessToken);
        if (result === 401) {
            router.push("/sign-out");
            return;
        }

        if (!result.success) {
            toast.error(result?.message);
            return;
        }
        else toast.success(result?.message);

        setPending(false);
    }

    return (
        <>
            {
                data?.success ?
                (
                    <div className="mb-[30px]">
                        <ContentHeader heading="Edit role" label="Turn back" pathname="/roles?pages=1" />

                        <Form {...form}>
                            <form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-[20px]">
                                <FormField
                                    control={ form.control }
                                    name="role"
                                    render={
                                        ({ field }) => {
                                            return (
                                                <FormItem>
                                                    <FormLabel className="font-semibold text-[16px]">Role</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            { ...field }
                                                            type="text"
                                                            placeholder="Type name role..."
                                                            className="px-[20px] py-[15px] bg-transparent border-black"
                                                            disabled={ pending }
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )
                                        }
                                    }
                                />

                                <FormField
                                    control={ form.control }
                                    name="permissions"
                                    render={
                                        () => (
                                            <FormItem>
                                                <FormLabel className="font-semibold text-[16px]">Permissions</FormLabel>
                                                <FormControl>
                                                    <div className="border-[1px] border-black rounded-[5px]">
                                                        <Table>
                                                            <TableCaption className="m-0 py-[3px] border-t-[1px] border-t-black text-black text-[12px] font-medium">Choose permissions for role</TableCaption>

                                                            <TableHeader>
                                                                <TableRow className="border-b-[black]">
                                                                    <TableHead className="font-semibold text-[14px] text-black border-r-[1px] border-black">Function</TableHead>
                                                                    <TableHead className="font-semibold text-[14px] text-black text-center" colSpan="5">Actions</TableHead>
                                                                </TableRow>
                                                            </TableHeader>

                                                            <TableBody>
                                                                {
                                                                    Object.entries(list_permission).map(permission => (
                                                                        <TableRow 
                                                                            key={ permission[0] }
                                                                            className="border-b-[1px] border-b-black hover:bg-transparent"
                                                                        >
                                                                            <TableHead className="font-semibold text-[14px] border-e-[1px] border-e-black">{ permission[0] }</TableHead>
                                                                            {
                                                                                permission[1].map((action, index) => (
                                                                                    <TableCell 
                                                                                        key={ action.id }
                                                                                        className={cn(
                                                                                            "border-e-[1px] border-e-black",
                                                                                            index === permission[1].length - 1 ? "border-e-0" : ""
                                                                                        )}
                                                                                    >
                                                                                        <FormField 
                                                                                            control={ form.control }
                                                                                            name="permissions"
                                                                                            render={
                                                                                                ({ field }) => {
                                                                                                    return (
                                                                                                        <FormItem
                                                                                                            key={ action.value }
                                                                                                            className="flex items-center gap-x-[8px]"
                                                                                                        >
                                                                                                            <FormControl>
                                                                                                                <Checkbox
                                                                                                                    checked={field?.value?.includes(action?.value)}
                                                                                                                    onCheckedChange={(checked) => {
                                                                                                                        return checked ? 
                                                                                                                        field.onChange([...field?.value, action?.value]) :
                                                                                                                        field.onChange(
                                                                                                                            field.value?.filter(
                                                                                                                                (value) => value !== action?.value
                                                                                                                            )
                                                                                                                        )
                                                                                                                    }}
                                                                                                                    className="data-[state=checked]:bg-rootColor data-[state=checked]:border-rootColor"
                                                                                                                    disabled={ pending }
                                                                                                                />
                                                                                                            </FormControl>
                                                                                                            <FormLabel style={{ margin: "0px" }}>{ action?.label }</FormLabel>
                                                                                                        </FormItem>
                                                                                                    )
                                                                                                }
                                                                                            }
                                                                                        />
                                                                                    </TableCell>
                                                                                ))
                                                                            }
                                                                        </TableRow>
                                                                    ))
                                                                }
                                                            </TableBody>
                                                        </Table>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )
                                    }
                                />

                                <div className="text-end">
                                    <Button 
                                        type="submit"
                                        className="min-w-[150px] lg:min-w-[200px] px-[20px] py-[6px] lg:py-[10px] rounded-[5px] bg-rootColor hover:bg-rootColor font-semibold text-[14px] lg:text-[16px] text-center text-white leading-none transition-all"
                                        disabled={ pending }
                                    >
                                        Edit role
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                ) : 
                <h3 className="text-center text-[30px] font-semibold text-slate-300">
                    {
                        data?.message ? 
                        data?.message :
                        data?.error?.expiredAt ?
                        "Loading..." :
                        router.push("/sign-out")
                    }
                </h3>
            }
        </>
    )
}