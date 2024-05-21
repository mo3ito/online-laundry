import MenuItem from "./LaundryMenuItem";

export default function LaundryMenu() {
  return (
    <ul className="w-full mt-8 px-8 flex items-center justify-between flex-wrap gap-y-12">
      <MenuItem srcImage="/images/washing-machine.jpg" imageCaption="مردانه" />
    </ul>
  );
}
