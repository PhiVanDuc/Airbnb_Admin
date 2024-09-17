import ContentHeader from "@/components/ContentHeader";
import FormEditCategory from "./FormEditCategory";
import { redirect } from "next/navigation";
import WrapperModifyStuff from "@/components/WrapperModifyStuff";

import { detail_category } from "@/actions/category";

export default async function EditCategoryPage({ searchParams }) {
    const { id } = searchParams;
    
    const category = await detail_category(id);
    if (category === 401) redirect("/sign-out");

    const { result, exp, decode, accessToken } = category;
    console.log(category);
    
    return (
        <WrapperModifyStuff exp={exp} decode={decode} token={accessToken}>
            <ContentHeader heading="Edit category" label="Turn back" pathname="/categories?type=property_type" />

            <FormEditCategory data={result} />
        </WrapperModifyStuff>
    )
}
