import Link from "next/link";
import {
  InformationClothingsItemProps,
  ServicesInformationclothing,
} from "@/types/category";

export default function InformationClothingsItem(
  props: InformationClothingsItemProps
) {
  console.log("props", props);

  const servicePrices = props.services
    .map((service: ServicesInformationclothing) =>
      Number(service.price).toLocaleString("en-US")
    )
    .join(" - ");

  return (
    <li key={props._id} className=" max-[280px]:text-xs text-sm sm:text-base ">
      <Link
        href={`/application/group/${props.clothing_category_English}/${props.english_type}`}
        className="w-full h-28 sm:h-32 bg-white flex items-center justify-between  mb-4 rounded-xl shadow-xl cursor-pointer px-2 sm:px-3"
      >
        <section className="text-center">
          <h2>{props.type}</h2>
          <p>{`(${props.unit})`}</p>
          <p>{servicePrices}</p>
        </section>

        <img
          className=" size-24 sm:size-32 rounded-xl p-2"
          src={props.image_url ? props.image_url : "/images/no-image.jpg"}
          alt={`عکس ${props.type}`}
        />
      </Link>
    </li>
  );
}
