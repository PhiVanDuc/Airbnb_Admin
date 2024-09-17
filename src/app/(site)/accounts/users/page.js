import DataTable from "@/components/DataTable";
import columns from "./columns";
import ContentHeader from "@/components/ContentHeader";
import WrapperModifyStuff from "@/components/WrapperModifyStuff";
import AssignRoleForm from "../components/AssignRoleForm";

import { get_users } from "@/actions/user";
import { get_roles } from "@/actions/roles";

export default async function UsersPage({ searchParams }) {
    let { page, limit } = searchParams;

    const users = await get_users(page, limit);
    const roles = await get_roles(1, 12, true);

    if (users === 401 || roles === 401) redirect("/sign-out");

    let finalDecide;
    if (users?.exp) finalDecide = users;
    else if (roles?.exp || (!users?.exp && !roles?.exp)) finalDecide = roles;

    return (
        <WrapperModifyStuff exp={finalDecide?.exp} decode={finalDecide?.decode} token={finalDecide?.accessToken}>
            <ContentHeader heading="Users" button={false} />

            <DataTable
                columns={columns}
                data={
                    users?.result?.success ?
                    users?.result?.users :
                    []
                }
                table_info={users?.result}
                path_paginate="/accounts/users"
            />

            <AssignRoleForm result={roles.result} />
        </WrapperModifyStuff>
    )
}