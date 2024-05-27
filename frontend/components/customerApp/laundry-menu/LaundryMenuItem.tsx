import Link from "next/link";
type MenuItemProps = {
  srcImage: string;
  imageCaption: string;

};

export default function MenuItem({ srcImage, imageCaption }: MenuItemProps) {
  return (
    <Link href={"/application/group/3"} className=" size-36 sm:size-48  bg-sky-300 p-2 mb-12 rounded-xl cursor-pointer mx-2">
      <figure className="size-full ">
        <img
          src={srcImage}
          className="size-full rounded-xl"
          alt="machine wash"
        />
        <figcaption className="text-center my-5">{imageCaption}</figcaption>
      </figure>
    </Link>
  );
}
