

type ShowNameProps = {
  customerName: string | undefined;
  customerLastName: string | undefined;
};

export default function ShowName({
  customerName,
  customerLastName,
}: ShowNameProps) {
  return (
    <div className="-translate-y-3 flex items-center justify-center flex-col">
     
      <p className=" text-center text-sm sm:text-lg translate-y-2 h-8">
        {`${customerName ? customerName : ""} ${customerLastName ? customerLastName : ""}`}
      </p>
    </div>
  );
}
