import Link from "next/link";

export default function InformationClothingsItem() {
  return (
    <li className=" max-[280px]:text-xs text-sm sm:text-base px-1 sm:px-4 ">
      <Link
        href="/application/group/men/coat"
        className="w-full h-28 sm:h-32 bg-white flex items-center justify-between  mb-4 rounded-xl shadow-xl cursor-pointer px-3"
      >
        <section className="text-center">
          <h2>کت و شلوار مردانه</h2>
          <p>(دست)</p>
          <p>110000 - 190000</p>
        </section>

        <img
          className=" size-24 sm:size-32 rounded-xl p-2"
          src="/images/washing-machine.jpg"
          alt="Washing Machine"
        />
      </Link>
    </li>
  );
}
