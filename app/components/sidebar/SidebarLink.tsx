import {SidebarMenuButton, SidebarMenuItem} from "~/components/ui/sidebar";
import {NavLink} from "react-router";

interface Props  {
    text:string,
    redirectTo:string,
}

export default function SidebarLink(props: Props) {

    return (
        <SidebarMenuItem>
            <SidebarMenuButton>
                <NavLink to={props.redirectTo}>
                    <h2 className="p-4 text-[var(--dark-gray)] font-medium text-l">
                        {props.text}
                    </h2>
                </NavLink>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}