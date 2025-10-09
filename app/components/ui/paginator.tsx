import type { User } from "~/types/api"
import { Pagination, PaginationEllipsis, PaginationLink, PaginationNext, PaginationPrevious } from "./pagination"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "~/lib/utils"

interface Props {
    student: User[],
    onNext: () => void,
    onPrev: () => void,
    lastPage: number,
    cur: number,
}

const Paginator = ({student, cur, onNext, onPrev, lastPage}:Props) => {
    
    // Generate page numbers to display
    const generatePageNumbers = () => {
        const delta = 2; // Number of pages to show on each side of current page
        const pages: (number | 'ellipsis')[] = [];
        
        // Always show first page
        if (lastPage >= 1) {
            pages.push(1);
        }
        
        // Add ellipsis after first page if needed
        if (cur > delta + 2) {
            pages.push('ellipsis');
        }
        
        // Add pages around current page
        for (let i = Math.max(2, cur - delta); i <= Math.min(lastPage - 1, cur + delta); i++) {
            pages.push(i);
        }
        
        // Add ellipsis before last page if needed
        if (cur < lastPage - delta - 1) {
            pages.push('ellipsis');
        }
        
        // Always show last page (if different from first)
        if (lastPage > 1) {
            pages.push(lastPage);
        }
        
        return pages;
    };

    const pageNumbers = generatePageNumbers();

    if (lastPage <= 1) {
        return null; // Don't show paginator for single page
    }

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            {/* Page info */}
            <div className="text-sm text-muted-foreground">
                Showing page {cur} of {lastPage} ({student.length} students)
            </div>
            
            <Pagination className="mx-0">
                {/* Previous button */}
                <PaginationPrevious 
                    href={cur > 1 ? `?page=${cur - 1}` : undefined}
                    onClick={cur > 1 ? onPrev : undefined}
                    className={cn(
                        "gap-1 pl-2.5",
                        cur <= 1 && "pointer-events-none opacity-50"
                    )}
                >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                </PaginationPrevious>

                {/* Page numbers */}
                {pageNumbers.map((page, index) => (
                    page === 'ellipsis' ? (
                        <PaginationEllipsis key={`ellipsis-${index}`} />
                    ) : (
                        <PaginationLink
                            key={page}
                            href={`?page=${page}`}
                            isActive={page === cur}
                            className={cn(
                                page === cur && "bg-primary text-primary-foreground font-semibold"
                            )}
                        >
                            {page}
                        </PaginationLink>
                    )
                ))}

                {/* Next button */}
                <PaginationNext 
                    href={cur < lastPage ? `?page=${cur + 1}` : undefined}
                    onClick={cur < lastPage ? onNext : undefined}
                    className={cn(
                        "gap-1 pr-2.5",
                        cur >= lastPage && "pointer-events-none opacity-50"
                    )}
                >
                    Next
                    <ChevronRight className="h-4 w-4" />
                </PaginationNext>
            </Pagination>
        </div>
    )
}

export default Paginator