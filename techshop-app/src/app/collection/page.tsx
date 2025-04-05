import path from "node:path";
import fs from "node:fs";
import {CartItemProps, ProductProps} from "@/shared/component/CardProduct";
import CollectionListGrid from "@/shared/component/CollectionListGrid";



export default function CollectionProduct(){
    const filePath = path.join(process.cwd(), 'public/data/collection_product_data.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const dataJson = JSON.parse(fileContent);
    const collectionData: CartItemProps[] = dataJson.products.map((product: ProductProps) => (
        {
            productProps: product
        }
    ))
    return (
        <div className="flex flex-col items-center size-full bg-gray-900 px-0 gap-4">
            <div className={"flex items-center w-full h-fit px-2 py-4"}>
                <div className={"flex items-center gap-4"}>
                    <div className={"flex items-center justify-center"}>
                        <h1 className={"font-bold text-xs"}>Trang chủ</h1>
                    </div>
                    <div className={"flex items-center justify-center"}>
                        <h1 className={"font-bold text-xs"}>Danh mục</h1>
                    </div>
                    <div className={"flex items-center justify-center"}>
                        <h1 className={"font-bold text-xs"}>Sản phẩm</h1>
                    </div>
                </div>
            </div>
            <div className={"container"}>
                <CollectionListGrid name={dataJson.name} collectionData={collectionData} />
            </div>
        </div>
    );
}