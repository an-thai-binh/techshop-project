import Image from "next/image";
import HotProductSlider from "@/shared/component/HotProductSlider";
import ProductListSlider from "@/shared/component/ProductListSlider";
import Introduce from "@/shared/component/Introduce";
import ProductCatalog from "@/shared/component/ProductCatalog";
import ProductListGrid from "@/shared/component/ProductListGrid";


export default function Home() {
  return (
      <div className="flex flex-col items-center w-full h-full bg-gray-900 px-0 gap-4">
          <div className="flex justify-center xl:justify-end w-full h-[50vh] gap-0 px-2">
            {/* Sidebar */}
            <div className="relative w-[20vw]">
              <ProductCatalog/>
            </div>
            <Introduce/>
          </div>
          <div className="flex items-center justify-between w-full h-[20vh] sm:h-[30vh] md:h-[50vh] lg:h-[70vh] gap-4 px-2">
            <div className="flex items-center justify-center size-full shadow-2xl">
              <div className="relative size-full">
                <Image src={"/image/img_5.jpg"} alt="img_5" layout="fill" objectFit="cover" className="rounded-md"/>
              </div>
            </div>
            <div className="flex items-center justify-center size-full shadow-2xl">
              <div className="relative size-full">
                <Image src={"/image/img_6.jpg"} alt="img_6" layout="fill" objectFit="cover" className="rounded-md"/>
              </div>
            </div>
            <div className="flex items-center justify-center size-full shadow-2xl">
              <div className="relative size-full">
                <Image src={"/image/img_7.jpg"} alt="img_7" layout="fill" objectFit="cover" className="rounded-md"/>
              </div>
            </div>
          </div>
          <HotProductSlider/>
          <ProductListSlider/>
          <ProductListGrid/>
          <ProductListGrid/>
          <ProductListGrid/>
      </div>
  );
}
