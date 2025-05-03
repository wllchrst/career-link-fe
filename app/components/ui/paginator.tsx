import { Pagination, PaginationEllipsis, PaginationLink, PaginationNext, PaginationPrevious } from "./pagination"

interface Props {
    onNext: () => void,
    onPrev: () => void,
    lastPage: number,
}

const Paginator = ({onNext, onPrev, lastPage}:Props) => {

    return (
        <Pagination>
            <PaginationPrevious onClick={onPrev} className="hover:text-white">Previous</PaginationPrevious>
            <PaginationLink href="?page=1&per_page=8" className="hover:text-white">1</PaginationLink>
            <PaginationLink href="?page=2&per_page=8" className="hover:text-white">2</PaginationLink>
            <PaginationLink href="?page=3&per_page=8" className="hover:text-white">3</PaginationLink>
            <PaginationEllipsis />
            <PaginationLink href={`?page=${lastPage}&per_page=8`} className="hover:text-white">{lastPage}</PaginationLink>
            <PaginationNext onClick={onNext} className="hover:text-white">Next</PaginationNext>
        </Pagination>
    )
}

export default Paginator