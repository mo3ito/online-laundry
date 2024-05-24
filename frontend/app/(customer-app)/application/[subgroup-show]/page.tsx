import SubgroupShowHeader from "@/components/customerApp/SubGroupShowHeader";
import SubgroupShow from "@/components/customerApp/SubgroupShow";

export default function page() {
  return (
    <div
      style={{ height: `calc(100vh - 254px)` }}
      className="mx-auto w-full sm:w-5/6 md:w-5/6 lg:w-4/6  shadow-xl  overflow-auto"
    >
      <SubgroupShow/>
    </div>
  );
}
