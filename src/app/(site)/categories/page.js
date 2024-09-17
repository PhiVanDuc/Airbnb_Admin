import ContentHeader from "@/components/ContentHeader";
import DataTable from "@/components/DataTable";
import columns from "./columns";
import ConfirmDialog from "@/components/ConfirmDialog";
import WrapperModifyStuff from "@/components/WrapperModifyStuff";
import { redirect } from "next/navigation";

import { get_categories } from "@/actions/category";

export default async function CategoriesPage({searchParams}) {
    const { page, limit } = searchParams;

    const categories = await get_categories(page, limit);
    if (categories === 401) redirect("/sign-out");

    const { result, exp, decode, accessToken } = categories;

    return (
        <WrapperModifyStuff exp={exp} decode={decode} token={accessToken}>
            <ContentHeader heading="Categories" label="Add category" pathname="/categories/add" />

            <DataTable
                columns={ columns }
                data={
                    result?.success ?
                    result?.categories :
                    []
                }
                table_info={ result }
                path_paginate="/categories"
            />

            <ConfirmDialog />
        </WrapperModifyStuff>
    )
}