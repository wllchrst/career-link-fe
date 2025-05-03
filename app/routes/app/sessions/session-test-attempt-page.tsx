import { GoArrowLeft } from "react-icons/go";
import { IoFlagSharp } from "react-icons/io5";
import { useState } from "react";

const Quiz = () => {

    const [isFlagged, setIsFlagged] = useState<boolean>(false);

    const handleClick = () => {
        setIsFlagged(!isFlagged);
    }

    return (
        <div className="flex flex-col">
            {/* <div className="flex bg-white shadow rounded-md">
                <GoArrowLeft />
                <div>Pretest Session 3</div>
            </div> */}
            <div className="flex gap-5">
                <div className="flex-2 flex-col bg-white shadow rounded-md p-7">
                    <div className="flex justify-between items-center mb-2">
                        <div className="text-xl font-bold">Question 3</div>
                        <div className={`border cursor-pointer rounded-full p-2 border-accent ${isFlagged ? 'bg-accent' : 'bg-white'}`} onClick={handleClick}>
                            <IoFlagSharp className={`text-md ${isFlagged ? 'text-white' : 'text-accent'}`}/>
                        </div>
                    </div>
                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet risus sed neque vulputate efficitur. Morbi ultricies suscipit sapien sed faucibus. Vestibulum pretium, leo eu dictum volutpat, sem dui consequat dolor, ut hendrerit odio metus quis orci. Sed rhoncus urna nec lacinia finibus. In fermentum purus et nisl laoreet, eget tristique nisl fringilla.
                    </div>
                    <form action="" className="flex flex-col gap-2 mt-2">
                        <div className="flex gap-2">
                            <input type="radio" name="option" id="a" />
                            <label htmlFor="option">Lorem ipsum dolor sit amet</label>
                        </div>
                        <div className="flex gap-2">
                            <input type="radio" name="option" id="b" />
                            <label htmlFor="option">Lorem ipsum dolor sit amet</label>
                        </div>
                        <div className="flex gap-2">
                            <input type="radio" name="option" id="c" />
                            <label htmlFor="option">Lorem ipsum dolor sit amet</label>
                        </div>
                        <div className="flex gap-2">
                            <input type="radio" name="option" id="d" />
                            <label htmlFor="option">Lorem ipsum dolor sit amet</label>
                        </div>
                    </form>
                    <div className="flex justify-between mt-5">
                        <div className="text-white border bg-accent rounded-md p-2 px-4">
                            <div>Prev</div>
                        </div>
                        <div className="text-white border bg-accent rounded-md p-2 px-4">
                            <div>Next</div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-1 flex-col bg-white shadow rounded-md p-7 gap-3 h-fit">
                    <div className="text-xl font-bold">Questions</div>
                    <div className="flex gap-2">
                        <div className="w-10 h-10 flex justify-center items-center text-white bg-accent rounded-md">1</div>
                        <div className="w-10 h-10 flex justify-center items-center text-white bg-accent rounded-md">2</div>
                        <div className="relative w-10 h-10 flex justify-center items-center text-white bg-accent rounded-md">3</div>
                        {/* <div className="w-10 h-10 flex justify-center items-center text-accent bg-white rounded-md border-3 border-accent">3</div> */}
                    </div>
                    <div>Finish Attempt</div>
                </div>
            </div>
        </div>
    );
}

export default Quiz