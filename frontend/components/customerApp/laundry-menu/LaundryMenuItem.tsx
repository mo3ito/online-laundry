import Link from "next/link";

export type MenuItemProps = {
  srcImage: string;
  imageCaption: string;
  englishNameCategory:string;
  id: string;
};

export default function MenuItem({
  srcImage,
  imageCaption,
  englishNameCategory,
  id,
}: MenuItemProps) {

  console.log(id);
  
  return (
    <li
      key={id}
      className=" size-36 sm:size-48  bg-sky-300 p-2 mb-12 rounded-xl cursor-pointer mx-2"
    >
      <Link href={`/application/group/${englishNameCategory}`} className="size-full">
        <figure className="size-full ">
          <img
            src={srcImage ? srcImage : "/images/no-image.jpg"}
            className=" rounded-xl size-32 sm:size-44"
            alt={`عکس لباس ${imageCaption}`}
          />
          <figcaption className="text-center my-5">{imageCaption}</figcaption>
        </figure>
      </Link>
    </li>
  );
}
