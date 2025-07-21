import type { Route } from "./+types/bootcamp-report"

export const loader = async ({ params }: Route.LoaderArgs) => {

    return {id: params.bootcamp}
}

const BootcampReport = ({loaderData}:Route.ComponentProps) => {

    return (<>
        report
    </>)
}

export default BootcampReport