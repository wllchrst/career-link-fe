import BootcampDetailCard from "~/components/bootcamp/bootcamp-detail-card";
import BootcampDetailContent from "~/features/bootcamp/components/bootcamp-detail-content";

const BootcampDetail = () => {
  return (
    <>
      <div className={"flex flex-col gap-8 max-w-[100rem]"}>
        <BootcampDetailCard />
        <BootcampDetailContent />
      </div>
    </>
  );
};

export default BootcampDetail;
