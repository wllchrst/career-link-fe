import { Pagination, PaginationEllipsis, PaginationNext, PaginationPrevious } from "./pagination"

interface Props {
    onNext: () => void,
    onPrev: () => void,
}

const Paginator = ({onNext, onPrev}:Props) => {

    return (
        <Pagination>
            <PaginationPrevious onClick={onPrev}>Previous</PaginationPrevious>
            <PaginationNext onClick={onNext}>Next</PaginationNext>
        </Pagination>
    )
}

export default Paginator