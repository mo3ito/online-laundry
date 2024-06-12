"use client";
import {  useState } from "react";
import addClothingHandler from "@/app/utils/addClothingHandler";
import minesClothingHandler from "@/app/utils/minesClothingHandler";
import HeaderComponent from "@/components/customerApp/headerComponent/HeaderComponent";
import useOrderCardContext from "@/hooks/useOrderCardContext";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import getData from "@/services/getData";
import LoadingPage from "@/components/Loading/LoadingPage";
import Modal from "@/components/Modal";
import { GET_ONE_TYPE } from "@/routeApi/endpoints";
import useInformation from "@/hooks/useInformation";
import delteHandler from "@/app/utils/deleteHandler";
import confirmDeleteHandler from "@/app/utils/confirmDeleteHandler";
import { ServicesInformationclothing } from "@/types/category";

export default function Page() {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);


  const params = useParams();
  const { orders, setOrders } = useOrderCardContext();
  const { data: information } = useQuery({
    queryKey: ["order"],
    queryFn: () =>
      getData(
        `${GET_ONE_TYPE}/?english_type=${params["services"]}&clothing_category_English=${params["group-type"]}`
      ),
  });

  const {
    informationForDelete,
    setInformationForDelete,
    isTheSameServiceAndType,
  } = useInformation();


  console.log(orders);
  console.log(informationForDelete);
  console.log(params);
  console.log(information);
  

  return (
    <>
      {information ? (
        <div
          style={{ height: `calc(100vh - 248px)` }}
          className="mx-auto w-full sm:w-5/6 md:w-5/6 lg:w-4/6 shadow-xl "
        >
          <HeaderComponent title={information.data.type} as="div" />

          <div className="mx-auto flex flex-col items-center justify-center h-full ">
            <section className="w-full max-[280px]:px-3 px-6  sm:px-8  h-full cursor-auto pt-3 ">
              <table className="translate-y-2 w-full table-auto border-collapse border border-gray-300 text-sm sm:text-base">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2 text-center">
                      خدمات
                    </th>
                    <th className="border border-gray-300 p-2 text-center">
                      {" "}
                      قیمت(تومان)
                    </th>
                    <th className="border border-gray-300 p-2 text-center">
                      عملیات
                    </th>
                  </tr>
                </thead>
                <tbody>
                  { information.data.services.map((service : ServicesInformationclothing)=>
                  <tr key={service._id} className="mb-3">
                  <td className="border border-gray-300 p-2 text-center">
                    {service.service_name}
                    
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {" "}
                    {Number(service.price).toLocaleString(
                      "en-US"
                    )}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    <div className="flex flex-col gap-y-2 sm:flex-row items-center justify-center sm:gap-x-2">
                      <button
                        onClick={() =>
                          addClothingHandler(
                            orders,
                            setOrders,
                            service._id,
                            service.service_name,
                            information.data.type,
                            1,
                            +service.price,
                            +service.price
                          )
                        }
                        className="h-7 w-9 rounded-lg bg-sky-200 text-lg"
                      >
                        +
                      </button>
                      <button
                        onClick={() =>
                          minesClothingHandler(
                            orders,
                            service._id,
                            setOrders,
                            service.service_name,
                            +service.price,
                            1
                          )
                        }
                        className="h-7 w-9 rounded-lg bg-sky-200 text-lg"
                      >
                        -
                      </button>
                      <button
                        onClick={() =>
                          delteHandler(
                            orders,
                            setOrders,
                            service._id,
                            service.service_name,
                            information.data.type,
                            setInformationForDelete,
                            setIsShowModal
                          )
                        }
                        className="h-7 w-9 rounded-lg bg-sky-200 text-lg flex items-center justify-center"
                      >
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M4 8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8ZM6 10V20H18V10H6ZM9 12H11V18H9V12ZM13 12H15V18H13V12ZM7 5V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V5H22V7H2V5H7ZM9 4V5H15V4H9Z"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                  ) }
                </tbody>
              </table>
            </section>
          </div>
        </div>
      ) : (
        <LoadingPage />
      )}
      <Modal
        messageContent="آیا از حذف اطمینان دارید؟"
        setIsShowModal={setIsShowModal}
        isShowModal={isTheSameServiceAndType && isShowModal}
        confirmOnClick={()=>confirmDeleteHandler(informationForDelete , setInformationForDelete , setIsShowModal )}
      />
    </>
  );
}
