import {Sidebar, SidebarMenu} from "~/components/ui/sidebar";
import SidebarLink from "~/components/sidebar/sidebar-link";

export default function SidebarContent() {
    return (
        <SidebarMenu className={"py-5 flex flex-col gap-y-4"}>
            <SidebarLink text={"Home Page"} redirectTo={"/"} />
            <SidebarLink text={"Enrichment"} redirectTo={"/enrichment"} />
            <SidebarLink text={"Thesis"} redirectTo={"/thesis"} />
            <SidebarLink text={"Future Plan"} redirectTo={"/future"} />
        </SidebarMenu>
    )
}