import { get_role } from "@/actions/roles"
import isValidUUID from "@/util/validate_uuid";
import FormEditRole from "./FormEditRole";
import { redirect } from "next/navigation";
import WrapperModifyStuff from "@/components/WrapperModifyStuff";

export default async function DetailRolePage({ searchParams }) {
    if (isValidUUID(searchParams.id)) {
        const role = await get_role(searchParams.id);
        if (role === 401) redirect("/sign-out");

        const { result, exp, decode, accessToken } = role;

        return (
            <WrapperModifyStuff exp={exp} decode={decode} token={accessToken}>
                <FormEditRole data={ result } id={ searchParams.id } />
            </WrapperModifyStuff>
        )
    }
    else {
        return (
            <h3 className="text-center text-[30px] font-semibold text-slate-300">Invalid role id!</h3>
        )
    }
}
