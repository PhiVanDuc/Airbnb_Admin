import { LuLayoutDashboard } from "react-icons/lu";
import { MdGroups } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { RiArrowRightSLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa6";
import { HiOutlineAdjustmentsVertical } from "react-icons/hi2";
import { TbHomeCheck } from "react-icons/tb";
import { LuMail } from "react-icons/lu";

const sidebar_options = [
    {
        heading: "General",
        infos: [
            {
                title: "Dashboard",
                path: "/",
                icon: <LuLayoutDashboard size={ 24 } />,
            }
        ]
    },
    {
        heading: "Account",
        infos: [
            {
                title: "Roles",
                path: "/roles",
                icon: <FaRegUser size={ 24 } />
            },
            {
                title: "Accounts",
                path: "/accounts",
                icon: <MdGroups size={ 24 } />,
                arrow: <RiArrowRightSLine size={ 24 } />,
                subMenu: true,
                subMenuOptions: [
                    {
                        title: "Admins",
                        path: "/accounts/admins"
                    },
                    {
                        title: "Users",
                        path: "/accounts/users"
                    },
                    {
                        title: "Landlords",
                        path: "/accounts/landlords"
                    },
                ],
            }
        ]
    },
    {
        heading: "Filter",
        infos: [
            {
                title: "Categories",
                path: "/categories",
                icon: <RxDashboard size={ 24 } />
            },
            {
                title: "Filters",
                path: "/filters",
                icon: <HiOutlineAdjustmentsVertical size={ 24 } />
            }
        ]
    },
    {
        heading: "Property",
        infos: [
            {
                title: "Utilities",
                path: "/utilities",
                icon: <TbHomeCheck size={ 24 } />
            }
        ]
    },
    {
        heading: "Service",
        infos: [
            {
                title: "Feedbacks",
                path: "/feedbacks",
                icon: <LuMail size={ 24 } />
            }
        ]
    }
];

export default sidebar_options;