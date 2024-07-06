import Headline from "../Headline"
import StepBox from "./StepBox"

export default function WorkSteps() {
  return (
    <div className="my-10 ">
    <Headline title="مراحل کار در خشک شویی آنلاین مسیتو پاک" />
    <div className="w-full h-max flex justify-center sm:justify-between md:justify-around lg:justify-between items-center flex-wrap container mx-auto">
    <StepBox stepNumber="مرحله اول" title="ثبت سفارش" description="اینترنتی سفارش خودتون رو ثبت کنید. مکان دریافت رو هم مشخص کنید."/>
    <StepBox stepNumber="مرحله دوم" title="دریافت لباس‌ها" description="همکاران ما با شما تماس خواهند گرفت و لباس‌ها را در آدرس و زمانی که تعیین کردید تحویل می‌گیرند."/>
    <StepBox stepNumber="مرحله سوم" title="اجرای سفارش" description="طبق سفارش شما خدمات شستشو و اتوشویی انجام می‌شود و لباس‌ها آماده تحویل می‌شوند."/>
    <StepBox stepNumber="مرحله چهارم" title="تحویل" description="پس از انجام هماهنگی‌های لازم با شما در مکان مورد نطر شما لباس‌ها تحویل داده می‌شوند."/>
    </div>
    </div>
  )
}
