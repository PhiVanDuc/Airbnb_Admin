import ContentHeader from "@/components/ContentHeader";
import columns from "./columns";
import DataTable from "@/components/DataTable";
import ConfirmDialog from "@/components/ConfirmDialog";
import { redirect } from "next/navigation";

import { get_roles } from "@/actions/roles";
import WrapperModifyStuff from "@/components/WrapperModifyStuff";

export default async function RolesPage({ searchParams }) {
    let { page, limit } = searchParams;

    const roles = await get_roles(page, limit);
    if (roles === 401) redirect("/sign-out");
    
    const { result, exp, decode, accessToken } = roles;

    return (
        <WrapperModifyStuff exp={exp} decode={decode} token={accessToken} >
            <ContentHeader heading="Roles" label="Add role" pathname="/roles/add" />

            <DataTable
                columns={ columns }
                data={
                    result?.success ?
                    result?.roles?.rows :
                    []
                }
                table_info={ result }
                path_paginate="/roles"
            />

            <ConfirmDialog />
        </WrapperModifyStuff>
    )
}