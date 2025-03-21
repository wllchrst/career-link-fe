import {BootcampMethodTag} from "~/components/bootcamp/bootcamp-method-tag";
import {Button} from "~/components/ui/button";

const BootcampDetailCard = () => {
    return (
        <>
            <div className={"flex bg-white p-6 rounded-xl gap-16"}>
                <div className={"flex flex-col gap-4 justify-center"}>
                    <p className={"text-primary text-3xl font-semibold"}>Bootcamp Alek</p>
                    <BootcampMethodTag type={"Self Learning"}/>
                    <p className={"text-justify"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit
                        natus sunt unde
                        voluptas voluptate. A ab architecto consectetur deserunt dolorem enim eum exercitationem impedit
                        in incidunt minima molestiae molestias nisi, odio officiis perferendis repellendus, sit soluta
                        sunt voluptatum? Autem culpa fugiat hic impedit similique vitae voluptates. Atque commodi
                        delectus et laborum magnam maxime optio, repudiandae saepe sed. Ab accusamus ad alias animi,
                        architecto excepturi facere hic illo nesciunt provident quam quas recusandae reiciendis
                        voluptate voluptatem? Accusantium aperiam, aspernatur at consequuntur dolore eaque error
                        explicabo impedit labore natus necessitatibus nihil nostrum perspiciatis quaerat rerum sequi sit
                        tempore vero? Deleniti, ducimus quisquam?</p>
                    <Button className={"py-6 bg-accent font-normal"}>Enroll Now</Button>
                </div>
                <img src="https://www.teacheracademy.eu/wp-content/uploads/2021/10/successful-teacher-1.jpg" alt=""
                     className="w-lg rounded-lg"/>
            </div>
        </>
    )
}

export default BootcampDetailCard