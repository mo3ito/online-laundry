type MenuItemProps = {
  srcImage: string;
  imageCaption: string;
};

export default function MenuItem({ srcImage, imageCaption }: MenuItemProps) {
  return (
    <li className="size-48  bg-sky-300 p-2 rounded-xl cursor-pointer">
      <figure className="size-full ">
        <img
          src={srcImage}
          className="size-full rounded-xl"
          alt="machine wash"
        />
        <figcaption className="text-center my-5">{imageCaption}</figcaption>
      </figure>
    </li>
  );
}
