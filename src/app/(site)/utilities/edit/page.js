import { detail_utility } from "@/actions/utility";
import ContentHeader from "@/components/ContentHeader";
import FormEditUtility from "./FormEditUtility";
import WrapperModifyStuff from "@/components/WrapperModifyStuff";

export default async function EditCategoryPage({ searchParams }) {
    const { id } = searchParams;
    
    const utility = await detail_utility(id);
    if (utility === 401) redirect("/sign-out");

    const { result, exp, decode, accessToken } = utility;
    
    
    return (
        <WrapperModifyStuff exp={exp} decode={decode} token={accessToken}>
            <ContentHeader heading="Edit utilities" label="Turn back" pathname="/utilities?type=favorite" />

            <FormEditUtility data={result} />
        </WrapperModifyStuff>
    )
}
