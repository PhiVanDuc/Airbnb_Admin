import { get_utilities } from "@/actions/utility";
import ContentHeader from "@/components/ContentHeader";
import DataTable from "@/components/DataTable";
import columns from "./columns";
import TypeButton from "@/components/TypeButton";
import ConfirmDialog from "@/components/ConfirmDialog";
import { redirect } from "next/navigation";
import WrapperModifyStuff from "@/components/WrapperModifyStuff";

export default async function UtilitiesPage({ searchParams }) {
    const arrType = ["favorite", "standout", "safety"];
    const { page, limit, type } = searchParams;
    const finalType = arrType.includes(type) ? type : "favorite";

    const utilities = await get_utilities(page, limit, finalType);
    if (utilities === 401) redirect("/sign-out");

    const { result, exp, decode, accessToken } = utilities;

    return (
        <WrapperModifyStuff exp={exp} decode={decode} token={accessToken}>
            <ContentHeader heading="Utilities" label="Add utility" pathname="/utilities/add" />

            <TypeButton
                objType={
                    {
                        "Favorite": "favorite",
                        "Standout": "standout",
                        "Safety": "safety"
                    }
                }
                path="utilities"
                type={finalType}
            />

            <DataTable
                columns={ columns }
                data={
                    result?.success ?
                    result?.utilities :
                    []
                }
                table_info={ result }
                path_paginate="/utilities"
            />

            <ConfirmDialog />
        </WrapperModifyStuff>
    )
}