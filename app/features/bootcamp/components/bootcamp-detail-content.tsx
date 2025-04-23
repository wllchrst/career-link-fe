import {Link} from "react-router";

const BootcampDetailContent = () => {
    return (
        <>
            <div className="flex flex-col">
                <p className={"text-primary text-3xl font-semibold ml-4 mb-8"}>Bootcamp Content</p>
                <div className="flex flex-col gap-7">
                    <Link to={'/session/1'} type={'single'} className={"box-border flex items-center border-2 gap-x-4 bg-white p-2 rounded-md shadow-md"}>
                        <h2 className={'font-normal text-xl text-green-500 border-r-2 border-green-500 p-6 h-full flex justify-center items-center aspect-square'}>1</h2>
                        <h2 className={'font-normal text-xl text-green-500 p-6 h-full '}>Introduction to HTML CSS JS</h2>
                    </Link>
                    <Link to={'/session/1'} type={'single'} className={"box-border flex items-center border-2 gap-x-4 bg-white p-2 rounded-md shadow-md"}>
                        <h2 className={'font-normal text-xl border-r-2 border-gray-500 p-6 h-full flex justify-center items-center aspect-square'}>2</h2>
                        <h2 className={'font-normal text-xl p-6 h-full '}>Introduction to HTML CSS JS</h2>
                    </Link>
                    <Link to={'/session/1'} type={'single'} className={"box-border flex items-center border-2 gap-x-4 bg-white p-2 rounded-md shadow-md"}>
                        <h2 className={'font-normal text-xl border-r-2 border-gray-500 p-6 h-full flex justify-center items-center aspect-square'}>3</h2>
                        <h2 className={'font-normal text-xl p-6 h-full '}>Introduction to HTML CSS JS</h2>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default BootcampDetailContent;