import { Separator } from "./ui/separator";

export default function CustomSeparator({ style }) {
    return (
        <Separator className={ `w-full h-[3px] bg-rootColor rounded-full ${ style }` } />
    )
}
