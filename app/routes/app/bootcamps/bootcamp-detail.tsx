import BootcampDetailCard from "~/components/bootcamp/bootcamp-detail-card";
import { getBootcamp } from "~/features/bootcamp/api/get-bootcamp";
import BootcampDetailContent from "~/features/bootcamp/components/bootcamp-detail-content";
import type { Route } from "./+types/bootcamp-detail";
import { getBootcampCategory } from "~/features/bootcamp-category/api/get-bootcamp-category";
import { getBootcampType } from "~/features/bootcamp-type/api/get-bootcamp-type";


export const loader = async ({ params }: Route.LoaderArgs) => {

    const { data: bootcamp } = await getBootcamp(params.bootcamp);
    const { data: category } = await getBootcampCategory(bootcamp.category_id);
    const { data: type } = await getBootcampType(bootcamp.type_id);
    
    return { bootcamp, category, type };
 

};

const BootcampDetail = ({ loaderData }: Route.ComponentProps) => {
  
  const { bootcamp, category, type } = loaderData;

  return (
    <>
      <div className={"flex flex-col gap-8 max-w-[100rem]"}>
        <BootcampDetailCard name={bootcamp.name} description={bootcamp.description} category={category} type={type} image={bootcamp.image_path} />
        <BootcampDetailContent />
      </div>
    </>
  );
};

export default BootcampDetail;
