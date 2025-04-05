"use client";
import CardProduct from "./CardProduct";
import {CartItemProps} from "./CardProduct";
interface CollectionProductProps{
    id?: number,
    name?: string,
    collectionData: CartItemProps[]
}
export default function CollectionListGrid(_props: CollectionProductProps) {
        return (
            <div className="flex justify-center size-full px-2">
                <div className="flex flex-col w-full gap-2 px-2 py-1">
                    <div className="flex items-center justify-center w-full p-2 rounded-md">
                        <div className="flex justify-between gap-2 w-full bg-gray-800 rounded-md px-4 py-2">
                            <div className={"flex items-center gap-4"}>
                                <div className={"flex items-center justify-center"}>
                                    <h1 className={"text-lg font-bold"}>{_props.name}</h1>
                                </div>
                                <div className={"flex items-center justify-center"}>
                                    <h1 className={"text-md"}><span className={"text-md font-bold"}>{_props.collectionData.length}</span> sản phẩm</h1>
                                </div>
                            </div>
                            <div className={"flex items-center justify-center gap-2"}>
                                <label htmlFor={"sort-product"}>Sắp xếp</label>
                                <select name="options" id="sort-product" className={"px-2 py-1 rounded-md bg-gray-700"}>
                                    <option value={"option-1"}>Tùy chọn 1</option>
                                    <option value={"option-2"}>Tùy chọn 2</option>
                                    <option value={"option-3"}>Tùy chọn 3</option>
                                    <option value={"option-4"}>Tùy chọn 4</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 h-full gap-2">
                        {
                            _props.collectionData.map((product, index) => (
                                <CardProduct key={index}  productProps={product.productProps} backgroundColor={"bg-gray-800"}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
}