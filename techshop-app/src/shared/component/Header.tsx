'use client';
import { useRef } from "react";
import BarsIcon from "../assets/Icon/bars";
import CheckCircleIcon from "../assets/Icon/check-circle";
import SearchIcon from "../assets/Icon/search";
import ShoppingCartIcon from "../assets/Icon/shopping-cart";
import TrophyIcon from "../assets/Icon/trophy";
import TruckIcon from "../assets/Icon/truck";
import UserCircleIcon from "../assets/Icon/user-circle";
import { useUIContext } from "../context/UIContext";
import Dropdown from "./Dropdown";
import ProductCatalog from "./ProductCatalog";

export default function Header() {
  const refCatalog = useRef<HTMLDivElement>(null);
  const {state, dispatch} = useUIContext();
    return (
        <header className="flex flex-col justify-center size-full">
          <div className="flex items-center justify-between flex-wrap gap-5 size-full bg-gray-950 p-2">
            <div className="flex items-center order-1 p-2">
              <h1 className="text-blue-500 text-2xl font-extrabold">Techshop</h1>
            </div>
            <div className="flex items-center justify-between order-3 sm:order-2 md:order-2 lg:order-2 gap-2 w-full sm:w-1/2 md:w-1/2 lg:w-1/2 p-1 bg-gray-800 rounded-md">
              <div className="w-full">
                <input type="text" placeholder="Search" className="w-full bg-transparent text-white px-2 py-1 rounded-none outline-none" />
              </div>
              <div className="flex items-center rounded-md hover:bg-gray-700">
                <button className="p-2">
                  <SearchIcon className="size-6" fill="transparent"/>
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center order-2 sm:order-3 md:order-3 lg:order-3 gap-5 w-auto sm:w-1/6 md:w-1/6 lg:w-1/6">
              <div className="flex items-center">
                <div className="relative flex flex-col items-center justify-center gap-2">
                  <button className="relative p-2 rounded-full hover:bg-gray-700" onMouseDown={() => dispatch({type: "TOGGLE_DROPDOWN"})}>
                    <ShoppingCartIcon className="size-7" fill="transparent"/>
                    <span className="absolute top-0 right-0 bg-blue-500 p-1 rounded-xl text-xs">12</span>
                  </button>
                  {state.isDropdownOpen && <Dropdown/>}
                </div>
              </div>
              <div className="flex items-center rounded-full hover:bg-gray-700">
                <button className="p-2">
                  <UserCircleIcon className="size-7" fill="transparent"/>
                </button>
              </div>
            </div>
          </div>
          <div className="w-full bg-gray-900">
            <div className="flex items-center gap-8 bg-gray-800 px-2 py-4 mx-2">
              <div ref={refCatalog} className="relative flex items-center gap-2 w-[20vw]">
                <button onMouseDown={() => dispatch({type: 'TOGGLE_CATALOG'})} className="size-6 rounded-full">
                  <BarsIcon className="size-6 hover:animate-bounce animate-pulse" fill="transparent"/>
                </button>
                {state.isCatalogOpen && <ProductCatalog className="top-10 -left-2"/>}
                <h1 className="hidden sm:hidden md:hidden lg:hidden xl:block text-sm font-bold">DANH MỤC SẢN PHẨM</h1>
              </div>
              <div className="flex items-start justify-around sm:justify-center md:justify-center lg:justify-normal gap-4 w-full">
                  <div className="flex items-center gap-1">
                    <div className="size-5 rounded-full">
                      <TrophyIcon className="size-5" fill="transparent"/>
                    </div>
                    <h1 className="hidden sm:block md:block lg:block text-xs text-white font-light">Đảm bảo chất lượng</h1>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="size-5 rounded-full">
                      <CheckCircleIcon className="size-5" fill="transparent"/>
                    </div>
                    <h1 className="hidden sm:block md:block lg:block text-xs text-white font-light">Miễn phí vận chuyển đơn trên 300k</h1>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="size-5 rounded-full">
                      <TruckIcon className="size-full" fill="transparent"/>
                    </div>
                    <h1 className="hidden sm:block md:block lg:block text-xs text-white font-light">Mở hộp kiểm tra nhận hàng</h1>
                  </div>
              </div>
            </div>
          </div>
        </header>
    );
}
