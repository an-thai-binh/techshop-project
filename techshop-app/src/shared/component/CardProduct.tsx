import Image from "next/image"
import CartIcon from "../assets/Icon/cart"

export interface ProductProps {
    id: number,
    image: string,
    name: string,
    description: string,
    old_price: number,
    discount_percent: number,
    new_price: number
}

export interface CartItemProps {
    backgroundColor?: string;
    productProps: ProductProps | null
}
export default function CardProduct(_props: CartItemProps) {
    return(
            <div className={`flex h-full ${_props.backgroundColor} rounded-md shadow-xl`}>
                <div className="flex flex-col p-2 gap-2 w-full h-full items-center justify-between">
                    <div className="relative flex grow w-full h-[30vh] sm:h-[20vh] md:h-[20vh] lg:h-[20vh] rounded-md overflow-hidden">
                        <Image src="/image/img_2.jpg" layout="fill" objectFit="cover" alt="aloalo" className="rounded-md transform scale-100 hover:scale-110 transition duration-500" />
                    </div>
                    <div className="flex flex-col justify-center gap-1">
                        <h1 className="font-bold text-sm text-center">{_props.productProps?.name}</h1>
                        <p className="font-light text-xs line-clamp-2">{_props.productProps?.description}</p>
                    </div>
                    <div className="flex flex-col justify-center gap-1">
                        <div className="flex items-center gap-2 w-full">
                            <p className="text-xs font-light text-gray-500 line-through"><span>{_props.productProps?.old_price}</span> $</p>
                            <p className="bg-red-900 rounded-sm px-1 py-1 text-xs font-light">-<span>{_props.productProps?.discount_percent}</span>%</p>
                        </div>
                        <div className="flex items-center justify-center w-full">
                            <h1 className="text-sm font-extrabold"><span>{_props.productProps?.old_price}</span> $</h1>
                        </div>
                    </div>
                    <div className="flex items-center w-full">
                        <div className="flex items-center justify-between gap-2 w-full">
                            <div className="hidden sm:flex md:flex lg:flex items-center w-[10%]">
                                <button className="size-full rounded-lg bg-transparent px-2 py-1"></button>
                            </div>
                            <div className="flex items-center justify-center grow">
                                <button className="rounded-lg bg-gray-800 px-4 py-2 hover:bg-gray-700">
                                    <h1 className="text-sm font-bold">MUA NGAY</h1>
                                </button>
                            </div>
                            <div className="hidden sm:flex md:flex lg:flex items-center">
                                <button className="size-full rounded-full">
                                    <div className="flex items-center justify-center p-2 rounded-full hover:bg-gray-700">
                                        <CartIcon className="size-6" fill={"transparent"}/>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}