import Link from "next/link";

export type MenuItemProps = {
  srcImage: string;
  imageCaption: string;
  key: string | undefined;
};

export default function MenuItem({
  srcImage,
  imageCaption,
  key,
}: MenuItemProps) {
  return (
    <li
      key={key}
      className=" size-36 sm:size-48  bg-sky-300 p-2 mb-12 rounded-xl cursor-pointer mx-2"
    >
      <Link href={`/application/group/${imageCaption}`} className="size-full">
        <figure className="size-full ">
          <img
            src={srcImage ? srcImage : "/images/no-image.jpg"}
            className=" rounded-xl aspect-square "
            alt={`عکس لباس ${imageCaption}`}
          />
          <figcaption className="text-center my-5">{imageCaption}</figcaption>
        </figure>
      </Link>
    </li>
  );
}
