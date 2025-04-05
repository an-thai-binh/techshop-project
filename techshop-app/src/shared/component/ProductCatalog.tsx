'use client';
import { useEffect, useRef } from "react";
import { useUIContext } from "../context/UIContext";

interface ProductCatalogProps {
    className?: string,
}

export default function ProductCatalog(_props: ProductCatalogProps){
    const {state, dispatch} = useUIContext();
    const catalogRef = useRef<HTMLDivElement>(null);
    const handleClickOutside = (e: MouseEvent) => {
        if(state.isCatalogOpen && catalogRef.current && !catalogRef.current.contains(e.target as Node)){
            dispatch({type: "CLOSE_ALL"});
        }
    }
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    },[]);
    return(
        <div ref={catalogRef} className={`absolute ${_props.className} flex-col hidden sm:hidden md:hidden lg:hidden xl:flex items-start gap-2 w-full h-[42vh] px-2 py-1 bg-gray-800 shadow-md border-r-2 border-gray-800 z-20`}>
            <div className="flex flex-col justify-start items-start gap-1 w-full">
                <ul className="flex flex-col p-2 rounded-xl gap-0 size-full">
                <li className="rounded-sm p-2 text-sm hover:bg-gray-700 hover:border-l-2">Tất cả sản phẩm</li>
                <li className="rounded-sm p-2 text-sm hover:bg-gray-700 hover:border-l-2">Laptop cũ</li>
                <li className="rounded-sm p-2 text-sm hover:bg-gray-700 hover:border-l-2">Outlet - Xả tồn</li>
                <li className="rounded-sm p-2 text-sm hover:bg-gray-700 hover:border-l-2">Pre - Order</li>
                <li className="rounded-sm p-2 text-sm hover:bg-gray-700 hover:border-l-2">Phụ kiện Gamming</li>
                <li className="rounded-sm p-2 text-sm hover:bg-gray-700 hover:border-l-2">Phụ kiện điện thoại</li>
                <li className="rounded-sm p-2 text-sm hover:bg-gray-700 hover:border-l-2">Gia dụng thông minh</li>
                <li className="rounded-sm p-2 text-sm hover:bg-gray-700 hover:border-l-2">Phụ kiện thời gian</li>
                </ul>
            </div>
        </div>
    );
}