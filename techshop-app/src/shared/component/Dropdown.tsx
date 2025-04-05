'use client';
import { useEffect, useRef } from "react";
import { useUIContext } from "../context/UIContext";

export default function Dropdown() {
    const {state, dispatch} = useUIContext();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (e: MouseEvent) => {
        if(state.isDropdownOpen&&dropdownRef.current && !dropdownRef.current.contains(e.target as Node)){
            dispatch({type: "CLOSE_ALL"});
        }
    }
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }
    ,[]);
    return(
        <div ref={dropdownRef} className="absolute w-[40vw] h-[50vh] bg-gray-700 rounded-md shadow-md top-14 right-0 z-10">
            <div className="flex flex-col justify-center gap-2 size-full">
                <div className="flex items-center justify-center pt-2">
                    <h1 className="text-xl font-bold">GIỎ HÀNG</h1>
                </div>
                <hr className="mx-2"/>
                <div className="flex items-center justify-center grow overflow-hidden py-0 pl-1">
                    <div className="size-full overflow-auto scrollbar-thin scrollbar-thunmb-gray-800 scrollbar-track-transparent">
                        <div className="flex flex-col justify-start gap-4 mx-1">
                            {/* ItemCart */}
                            <div className="flex w-full gap-2">
                                <div className="size-20 bg-gray-500 rounded-sm">ảnh</div>
                                <div className="flex flex-col gap-2 grow">
                                    <div className="flex items-start justify-between grow">
                                        <div className="flex items-center">
                                            <h1 className="font-bold text-md">Macbook Pro M1</h1>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="font-bold text-md">X</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between h-fit rounded-sm">
                                        <div className="flex items-center justify-center gap-0 border border-gray-500">
                                            <div className="flex items-center justify-center">
                                                <button className="bg-gray-500 px-2 box-content">-</button>
                                            </div>
                                            <div className="flex items-center justify-center px-2">
                                                <span className="font-bold text-md">1</span>
                                            </div>
                                            <div className="flex items-center justify-center">
                                                <button className="bg-gray-500 px-2 box-content">+</button>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <span className="text-md font-bold">199.0$</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            <div className="flex w-full gap-2">
                                <div className="size-20 bg-gray-500 rounded-sm">ảnh</div>
                                <div className="flex flex-col gap-2 grow">
                                    <div className="flex items-start justify-between grow">
                                        <div className="flex items-center">
                                            <h1 className="font-bold text-md">Macbook Pro M1</h1>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="font-bold text-md">X</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between h-fit rounded-sm">
                                        <div className="flex items-center justify-center gap-0 border border-gray-500">
                                            <div className="flex items-center justify-center">
                                                <button className="bg-gray-500 px-2 box-content">-</button>
                                            </div>
                                            <div className="flex items-center justify-center px-2">
                                                <span className="font-bold text-md">1</span>
                                            </div>
                                            <div className="flex items-center justify-center">
                                                <button className="bg-gray-500 px-2 box-content">+</button>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <span className="text-md font-bold">199.0$</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="flex w-full gap-2">
                                <div className="size-20 bg-gray-500 rounded-sm">ảnh</div>
                                <div className="flex flex-col gap-2 grow">
                                    <div className="flex items-start justify-between grow">
                                        <div className="flex items-center">
                                            <h1 className="font-bold text-md">Macbook Pro M1</h1>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="font-bold text-md">X</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between h-fit rounded-sm">
                                        <div className="flex items-center justify-center gap-0 border border-gray-500">
                                            <div className="flex items-center justify-center">
                                                <button className="bg-gray-500 px-2 box-content">-</button>
                                            </div>
                                            <div className="flex items-center justify-center px-2">
                                                <span className="font-bold text-md">1</span>
                                            </div>
                                            <div className="flex items-center justify-center">
                                                <button className="bg-gray-500 px-2 box-content">+</button>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <span className="text-md font-bold">199.0$</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="flex w-full gap-2">
                                <div className="size-20 bg-gray-500 rounded-sm">ảnh</div>
                                <div className="flex flex-col gap-2 grow">
                                    <div className="flex items-start justify-between grow">
                                        <div className="flex items-center">
                                            <h1 className="font-bold text-md">Macbook Pro M1</h1>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="font-bold text-md">X</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between h-fit rounded-sm">
                                        <div className="flex items-center justify-center gap-0 border border-gray-500">
                                            <div className="flex items-center justify-center">
                                                <button className="bg-gray-500 px-2 box-content">-</button>
                                            </div>
                                            <div className="flex items-center justify-center px-2">
                                                <span className="font-bold text-md">1</span>
                                            </div>
                                            <div className="flex items-center justify-center">
                                                <button className="bg-gray-500 px-2 box-content">+</button>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <span className="text-md font-bold">199.0$</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="mx-2"/>
                <div className="flex flex-col gap-2 px-2 pb-2">
                    <div className="flex justify-between">
                        <h1 className="text-md font-bold">TỔNG TIỀN</h1>
                        <span className="text-red-700 text-md font-bold">0</span>
                    </div>
                    <div className="flex items-center jsutify-center w-full">
                        <button className="bg-red-700 w-full rounded-md p-1.5 transform scale-100 transition-all duration-300 shadown-md hover:bg-red-600 active:scale-95">XEM GIỎ HÀNG</button>
                    </div>
                </div>
            </div>
        </div>
    );
}