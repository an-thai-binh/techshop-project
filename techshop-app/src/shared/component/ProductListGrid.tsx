"use client";
import CardProduct, {ProductProps} from "./CardProduct";
import {useCollection} from "@/shared/hooks/useProduct";

interface ProductListGridProps{
    title: string
    collectionName?: [],
    products?: ProductProps[]
}

export default function ProductListGrid(_props: ProductListGridProps) {
        const products = useCollection("cat_01");
        return (
            <div className="flex justify-center size-full px-2">
                <div className="flex flex-col gap-2 px-2 py-1 w-full">
                    <div className="flex items-center justify-center py-2 rounded-md">
                       <div className={"flex items-center justify-between w-full bg-gray-800 rounded-md"}>
                           <div className={"flex justify-center items-center px-4 py-2"}>
                               <h1 className={"text-md"}>{_props.title}</h1>
                           </div>
                           <div className="flex justify-center gap-2 rounded-md px-4 py-2">
                               {
                                   _props.collectionName?.map((value: string, index) => (
                                       <div key={index} className="w-1/2">
                                           <button className="bg-blue-400 px-2 py-1 rounded-md">
                                               {value}
                                           </button>
                                       </div>
                                   ))
                               }
                           </div>

                       </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 h-fit gap-2">
                        {
                            products?.products.map((prod) => (
                                <CardProduct key={prod.id} backgroundColor="bg-gray-800" productProps={prod}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
}