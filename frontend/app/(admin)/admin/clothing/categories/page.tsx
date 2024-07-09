'use client'
import LoadingPage from '@/components/Loading/LoadingPage';
import ShowHeaderTitle from '@/components/customerSite/ShowHeaderTitle'
import DefaultButton from '@/components/share/defaultButton';
import useAuthContext from '@/hooks/useAuthContext';
import useGetReactQuery from '@/hooks/useGetReactQuery';
import { GET_CLOTHING_CATEGORY } from '@/routeApi/endpoints';
import { ClothingCategoryType } from "@/types/admin";

export default function page() {
  const { infos } = useAuthContext();
  const { data : allcategory, isLoading } = useGetReactQuery(
    infos?._id,
    GET_CLOTHING_CATEGORY,
    ["get all category"]
  );

  if(isLoading){
    return <LoadingPage/>
  }

  return (
    <div className="container min-h-screen h-max  mx-auto  flex flex-col items-center mt-44 pb-20 px-4">
        <ShowHeaderTitle content="دسته‌بندی" />
        <section className='mt-20 w-full h-max '>
        { allcategory?.data.map((item : ClothingCategoryType)=>
        <div key={item._id} className='w-full h-max bg-sky-200 rounded-lg p-2 flex justify-between items-center my-2'>
        <div className='flex items-center justify-center gap-x-2'>
        <img className='size-16' src={item.image_url} alt={ item.name} />
      <div className=''>
        <p>{item.name}</p>
        <p>{item.english_name}</p>
      </div>
        </div>

        <DefaultButton content='حذف' className='!bg-pink-300 h-10 max-[480px]:w-16 w-44 rounded-lg'/>

      </div>
        ) }
        </section>
    </div>
  )
}
