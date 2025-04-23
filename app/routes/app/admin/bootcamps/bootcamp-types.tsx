import type { Route } from "./+types/bootcamp-types";

export const loader = async () => {
  // const { data: bootcampTypes } = await getBootcampTypes();
  // return { bootcampTypes };
};

const BootcampTypes = ({}: Route.ComponentProps) => {
  return (
    <>
      <div className="container flex flex-col mt-2">
        <h1 className="text-2xl text-primary font-bold mb-4">Bootcamp Types</h1>
      </div>
    </>
  );
};

export default BootcampTypes;
