import type { User } from "~/types/api"
import { Pagination, PaginationEllipsis, PaginationLink, PaginationNext, PaginationPrevious } from "./pagination"

interface Props {
    student: User[],
    onNext: () => void,
    onPrev: () => void,
    lastPage: number,
    cur: number,
}

const Paginator = ({student, cur, onNext, onPrev, lastPage}:Props) => {

    return (
        <Pagination className="flex gap-5">
            {lastPage > 1 && <PaginationLink href={`?page=${cur-1}`}>Previous</PaginationLink>}

            {
                cur >= 3 && <>
                    {<PaginationLink href={`?page=${cur-2}`}>{cur-2}</PaginationLink>}
                    {<PaginationLink href={`?page=${cur-1}`}>{cur-1}</PaginationLink>}
                    {lastPage > cur && <PaginationLink href={`?page=${cur}`}>{cur}</PaginationLink>}
                </>
            }
            

            {
                cur < 3 && <>
                    {lastPage > 1 && <PaginationLink href={`?page=${1}`}>{1}</PaginationLink>}
                    {lastPage > 2 && <PaginationLink href={`?page=2`}>2</PaginationLink>}
                    {lastPage > 3 && <PaginationLink href={`?page=3`}>3</PaginationLink>}
                </>
            }

            {lastPage > cur + 4 && <PaginationEllipsis />}
            {lastPage > cur + 3 && <PaginationLink href={`?page=${lastPage}`}>{lastPage}</PaginationLink>}
            {lastPage > cur + 1 && <PaginationLink href={`?page=${cur+1}`}>Next</PaginationLink>}
        </Pagination>
    )
}

export default Paginator