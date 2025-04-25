import { AlertCircle } from "lucide-react"
import { Card, CardContent } from "./card"

const EmptyMessage = ({title, text}:{title:string,text:string}) => {
    return (
        <Card className="w-full max-w-md mx-auto mt-10 text-center bg-transparent border-none shadow-none">
            <CardContent className="flex flex-col items-center gap-4 py-2">
                <AlertCircle className="text-gray-500" size={48} />
                <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
                <p className="text-sm text-gray-500">
                    {text}
                </p>
            </CardContent>
        </Card>
    )
}

export default EmptyMessage