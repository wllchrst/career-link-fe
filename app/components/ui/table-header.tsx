import { TableHead, TableHeader } from "./table"

const MasterDataTableHeader = () => {

    return (
        <>
        <TableHeader className="p-5 items-center flex w-full">
              <TableHead className="h-full w-[3%] font-medium text-center">No.</TableHead>
              <TableHead className="h-full w-[12%] text-center">NIM</TableHead>
              <TableHead className="h-full w-[15%] text-center">Name</TableHead>
              <TableHead className="h-full w-[22%] text-center">Email</TableHead>
              <TableHead className="h-full w-[17%] text-center">Phone</TableHead>
              <TableHead className="h-full w-[10%] text-center">Major</TableHead>
              <TableHead className="h-full w-[11%] text-center whitespace-normal word-break">Future Position</TableHead>
              <TableHead className="h-full w-[8%] text-center">Skill</TableHead>
              <TableHead className="h-full w-[4%] text-center">CV</TableHead>
            </TableHeader>
        </>
    )
}

export {MasterDataTableHeader}