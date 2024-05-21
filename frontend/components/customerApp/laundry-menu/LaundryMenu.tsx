import MenuItem from "./LaundryMenuItem";

export default function LaundryMenu({title}:{title: string}) {
  return (
    <div className="overflow-y-auto h-[590px]">
      <h1 className="w-full bg-sky-500 p-3 my-2 text-center text-white">
        {title}
      </h1>
      <ul className="w-full mt-8 px-8 flex items-center justify-between flex-wrap gap-y-12 ">
        <MenuItem
          srcImage="/images/washing-machine.jpg"
          imageCaption="مردانه"
        />
        <MenuItem
          srcImage="/images/washing-machine.jpg"
          imageCaption="مردانه"
        />
        <MenuItem
          srcImage="/images/washing-machine.jpg"
          imageCaption="مردانه"
        />
        <MenuItem
          srcImage="/images/washing-machine.jpg"
          imageCaption="مردانه"
        />
        <MenuItem
          srcImage="/images/washing-machine.jpg"
          imageCaption="مردانه"
        />
        <MenuItem
          srcImage="/images/washing-machine.jpg"
          imageCaption="مردانه"
        />
        <MenuItem
          srcImage="/images/washing-machine.jpg"
          imageCaption="مردانه"
        />
        <MenuItem
          srcImage="/images/washing-machine.jpg"
          imageCaption="مردانه"
        />
        <MenuItem
          srcImage="/images/washing-machine.jpg"
          imageCaption="مردانه"
        />
        <MenuItem
          srcImage="/images/washing-machine.jpg"
          imageCaption="مردانه"
        />
        <MenuItem
          srcImage="/images/washing-machine.jpg"
          imageCaption="مردانه"
        />
        <MenuItem
          srcImage="/images/washing-machine.jpg"
          imageCaption="مردانه"
        />
      </ul>
    </div>
  );
}
