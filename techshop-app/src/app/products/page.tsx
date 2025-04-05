import SliderDetailProduct from "@/shared/component/SliderDetailProduct";
import path from "node:path";
import * as fs from "node:fs";
import ProductDescription from "@/shared/component/ProductDescription";
import InboxStackIcon from "@/shared/assets/Icon/inbox-stack";
import PhoneIcon from "@/shared/assets/Icon/phone";
import BanknotesIcon from "@/shared/assets/Icon/banknotes";
import InboxIcon from "@/shared/assets/Icon/inbox";
import ArrowPathRoundedIcon from "@/shared/assets/Icon/arow-path-rounded";
import ArrowRightIcon from "@/shared/assets/Icon/arrow-right";

export default function ProductDetail(){
    const filePath = path.join(process.cwd(), 'public/data/product_block_test.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const blocks = JSON.parse(fileContent);
    return(
        <div className="flex flex-col items-center w-full h-full bg-gray-900 px-0 gap-4">
            <div className={"flex items-center w-full px-2 py-4"}>
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
            <div className={"container px-2"}>
                <div className={"flex gap-4"}>
                    <div className={"flex flex-col w-1/2 space-y-4"}>
                        {/*Slider hình ảnh sản phẩm*/}
                        <div className={"flex items-center w-full"}>
                            <div className={"h-[50vh] w-full"}>
                                <SliderDetailProduct/>
                            </div>
                        </div>
                        <hr className={"my-4 border-gray-700"}/>
                        {/*    Chính sách dành cho sản phẩm*/}
                        <div className={"flex items-center"}>
                            <div className={"flex flex-col justify-center gap-2 space-y-4"}>
                                <div className={"flex flex-col gap-4"}>
                                    <div className={"flex items-center"}>
                                        <h1 className={"font-bold text-lg"}>Chính sách dành cho sản phẩm</h1>
                                    </div>
                                    <div className={"flex flex-wrap gap-4"}>
                                        <div className={"flex items-center justify-center gap-2 pr-2 border-r-2"}>
                                            <div className={"flex items-center justify-center"}>
                                                <div className={"size-5 rounded-full"}>
                                                    <InboxStackIcon className={"size-5"} fill={"transparent"} />
                                                </div>
                                            </div>
                                            <div className={"flex items-center justify-center"}>
                                                <h1 className={"text-sm"}>Đóng gói chắc chắn</h1>
                                            </div>
                                        </div>

                                        <div className={"flex items-center justify-center gap-2 pr-2 border-r-2"}>
                                            <div className={"flex items-center justify-center"}>
                                                <div className={"size-5 rounded-full"}>
                                                    <BanknotesIcon className={"size-5"} fill={"transparent"}/>
                                                </div>
                                            </div>
                                            <div className={"flex items-center justify-center"}>
                                                <h1 className={"text-sm"}>Miễn phí giao hàng đơn trên 300k</h1>
                                            </div>
                                        </div>
                                        <div className={"flex items-center justify-center gap-2 pr-2 border-r-2"}>
                                            <div className={"flex items-center justify-center"}>
                                                <div className={"size-5 rounded-full"}>
                                                    <PhoneIcon className={"size-5"} fill={"transparent"}/>
                                                </div>
                                            </div>
                                            <div className={"flex items-center justify-center"}>
                                                <h1 className={"text-sm"}>Hỗ trợ 24/7</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={"flex flex-col gap-4"}>
                                    <div className={"flex items-center"}>
                                        <h1 className={"font-bold text-lg"}>Thông tin thêm</h1>
                                    </div>
                                    <div className={"flex flex-wrap gap-4"}>
                                        <div className={"flex items-center justify-center gap-2"}>
                                            <div className={"flex items-center justify-center"}>
                                                <div className={"size-5 rounded-full"}>
                                                    <InboxIcon className={"size-5"} fill={"transparent"}/>
                                                </div>
                                            </div>
                                            <div className={"flex items-center justify-center"}>
                                                <h1 className={"text-sm"}>Mở hợp kiểm tra nhận hàng</h1>
                                            </div>
                                        </div>
                                        <div className={"flex items-center justify-center gap-2"}>
                                            <div className={"flex items-center justify-center"}>
                                                <div className={"size-5 rounded-full"}>
                                                    <ArrowPathRoundedIcon className={"size-5"} fill={"transparent"}/>
                                                </div>
                                            </div>
                                            <div className={"flex items-center justify-center"}>
                                                <h1 className={"text-sm"}>Đổi trả trong 7 ngày</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className={"my-4 border-gray-700"}/>
                        <div className={"flex items-center w-full"}>
                            <div className={"flex items-center justify-between w-full"}>
                                <div className={"flex items-center"}>
                                    <h1 className={"font-bold text-lg"}>Thông số kĩ thật</h1>
                                </div>
                                <div className={"flex items-center gap-2"}>
                                    <div className={"flex items-center justify-center"}>
                                        <h1 className={"text-xs"}>Xem tất cả</h1>
                                    </div>
                                    <div className={"flex items-center"}>
                                        <div className={"size-4 rounded-full"}>
                                            <ArrowRightIcon className={"size-4"} fill={"transparent"}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className={"my-4 border-gray-700"}/>
                        <div className={"flex items-center w-full"}>
                            <div className={"flex items-center justify-between w-full"}>
                                <div className={"flex items-center"}>
                                    <h1 className={"font-bold text-lg"}>Video liên quan</h1>
                                </div>
                                <div className={"flex items-center gap-2"}>
                                    <div className={"flex items-center justify-center"}>
                                        <h1 className={"text-xs"}>Xem tất cả</h1>
                                    </div>
                                    <div className={"flex items-center"}>
                                        <div className={"size-4 rounded-full "}>
                                            <ArrowRightIcon className={"size-4"} fill={"transparent"}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"flex flex-col w-1/2"}>
                        <div className={"flex flex-col w-full"}>
                            <div className={"flex flex-col justify-center w-full gap-2 px-2"}>
                                <div className={"flex items-center"}>
                                    <h1 className={"text-xl font-bold"}>iPhone 16 Pro Max 256GB</h1>
                                </div>
                                <div className={"flex items-center justify-between py-2"}>
                                    <div className={"flex items-center"}>
                                        <h2 className={"text-sm font-medium text-gray-400"}>No.00911048</h2>
                                    </div>
                                    <div className={"flex items-center"}>
                                        <h2 className={"text-sm font-medium text-gray-400"}>Tình trạng: <span className={"text-blue-500 font-bold text-sm"}>Còn hàng</span></h2>
                                    </div>
                                </div>
                            </div>
                            <div className={"flex flex-col justify-center w-full gap-2 px-2"}>
                                <div className={"flex items-center w-full"}>
                                    <div className={"flex items-center w-[20%]"}>
                                        <h1 className={"text-md font-medium"}>Dung lượng</h1>
                                    </div>
                                    <div className={"flex items-center w-[80%]"}>
                                        <div className={"flex items-center justify-between gap-2 mx-2 px-2"}>
                                            <div className={"flex items-center justify-center"}>
                                                <label className={"flex items-center"}>
                                                    <input type="radio" name={"option"} className={"hidden peer"}/>
                                                    <span className={"px-4 py-2 rounded-md text-sm border-2 peer-checked:border-blue-500"}>256 GB</span>
                                                </label>
                                            </div>
                                            <div className={"flex items-center justify-center"}>
                                                <label className={"flex items-center"}>
                                                    <input type="radio" name={"option"} className={"hidden peer"}/>
                                                    <span className={"px-4 py-2 rounded-md text-sm border-2 peer-checked:border-blue-500"}>512 GB</span>
                                                </label>
                                            </div>
                                            <div className={"flex items-center justify-center"}>
                                                <label className={"flex items-center"}>
                                                    <input type="radio" name={"option"} className={"hidden peer"}/>
                                                    <span className={"px-4 py-2 rounded-md text-sm border-2 peer-checked:border-blue-500"}>1 TB</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={"flex items-center w-full"}>
                                    <div className={"flex items-center w-[20%]"}>
                                        <h1 className={"text-md font-medium"}>Màu sắc</h1>
                                    </div>
                                    <div className={"flex items-center w-[80%]"}>
                                        <div className={"flex items-center justify-start flex-wrap gap-2 mx-2 px-2"}>
                                            <div className={"flex items-center justify-center gap-2 rounded-md"}>
                                                <label className={"flex items-center"}>
                                                    <input type="radio" name={"option-color"} className={"hidden peer"}/>
                                                    <div className={"flex px-2 py-2 rounded-md text-sm border-2 peer-checked:border-blue-500 gap-2"}>
                                                        <div className={"flex items-center justify-center"}>
                                                            <p className={"size-8 bg-blue-500"}></p>
                                                        </div>
                                                        <div className={"flex items-center justify-center"}>
                                                            <span className={"text-sm"}>Titan Sa mạc</span>
                                                        </div>
                                                    </div>
                                                </label>
                                            </div>
                                            <div className={"flex items-center justify-center gap-2 rounded-md"}>
                                                <label className={"flex items-center"}>
                                                    <input type="radio" name={"option-color"} className={"hidden peer"}/>
                                                    <div className={"flex px-2 py-2 rounded-md text-sm border-2 peer-checked:border-blue-500 gap-2"}>
                                                        <div className={"flex items-center justify-center"}>
                                                            <p className={"size-8 bg-blue-500"}></p>
                                                        </div>
                                                        <div className={"flex items-center justify-center"}>
                                                            <span className={"text-sm"}>Titan Sa mạc</span>
                                                        </div>
                                                    </div>
                                                </label>
                                            </div>
                                            <div className={"flex items-center justify-center gap-2 rounded-md"}>
                                                <label className={"flex items-center"}>
                                                    <input type="radio" name={"option-color"} className={"hidden peer"}/>
                                                    <div className={"flex px-2 py-2 rounded-md text-sm border-2 peer-checked:border-blue-500 gap-2"}>
                                                        <div className={"flex items-center justify-center"}>
                                                            <p className={"size-8 bg-blue-500"}></p>
                                                        </div>
                                                        <div className={"flex items-center justify-center"}>
                                                            <span className={"text-sm"}>Titan Sa mạc</span>
                                                        </div>
                                                    </div>
                                                </label>
                                            </div>
                                            <div className={"flex items-center justify-center gap-2 rounded-md"}>
                                                <label className={"flex items-center"}>
                                                    <input type="radio" name={"option-color"} className={"hidden peer"}/>
                                                    <div className={"flex px-2 py-2 rounded-md text-sm border-2 peer-checked:border-blue-500 gap-2"}>
                                                        <div className={"flex items-center justify-center"}>
                                                            <p className={"size-8 bg-blue-500"}></p>
                                                         </div>
                                                        <div className={"flex items-center justify-center"}>
                                                            <span className={"text-sm"}>Titan Sa mạc</span>
                                                        </div>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={"flex items-center w-full bg-gray-800 py-6 rounded-sm px-2"}>
                                    <div className={"flex items-center w-[20%]"}>
                                        <h1 className={"text-md font-medium"}>Giá</h1>
                                    </div>
                                    <div className={"flex items-center w-[80%]"}>
                                        <div className={"flex items-center justify-start flex-wrap gap-2 mx-2 px-2"}>
                                            <div className={"flex items-center"}>
                                                <h1 className={"text-blue-500 text-2xl font-bold"}>239.000đ</h1>
                                            </div>
                                            <div className={"flex items-center"}>
                                                <h1 className={"text-gray-500 text-xl font-bold line-through"}>399.000đ</h1>
                                            </div>
                                            <div className={"flex items-center border border-blue-500 px-2"}>
                                                <h1 className={"text-blue-500 text-xl font-bold"}>-40%</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={"flex items-center w-full px-2 gap-2"}>
                                    <div className={"flex items-center w-[20%]"}>
                                        <h1 className={"text-md font-medium"}>Số lượng</h1>
                                    </div>
                                    <div className={"flex items-center w-[80%]"}>
                                        <div className={"flex items-center px-2"}>
                                            <div className="flex items-center justify-center gap-0 border border-gray-500">
                                                <div className="flex items-center justify-center">
                                                    <button className="bg-gray-500 px-4 py-2 box-content">-</button>
                                                </div>
                                                <div className="flex items-center justify-center">
                                                    <span className="font-bold text-md px-4 py-2">1</span>
                                                </div>
                                                <div className="flex items-center justify-center">
                                                    <button className="bg-gray-500 px-4 py-2 box-content">+</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={"flex items-center w-full gap-2"}>
                                    <div className={"flex items-center w-full gap-2"}>
                                        <div className={"flex items-center w-[50%]"}>
                                            <div className={"flex items-center w-full"}>
                                                <button className={"text-center w-full border-2 border-blue-500 px-4 py-2 rounded-sm shadow drop-shadow-md shadow-gray-700 transform scale-100 transition-all duration-500 active:scale-95"}>
                                                    <h1 className={"text-xl font-bold"}>THÊM VÀO GIỎ</h1>
                                                </button>
                                            </div>
                                        </div>
                                        <div className={"flex items-center w-[50%]"}>
                                            <div className={"flex items-center w-full"}>
                                                <button className={"w-full text-center border border-blue-500 bg-blue-500 px-4 py-2 rounded-sm shadow drop-shadow-md shadow-gray-700 transform scale-100 transition-all duration-500 active:scale-95"}>
                                                    <h1 className={"font-bold text-xl text-shadow"}>MUA NGAY</h1>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    {/*Mô tả saản phẩm*/}
                <hr className={"border-[0.1px] border-gray-700 shadow shadow-blue-500 blur-sm my-8"}/>
                <div className={"flex flex-col my-4"}>
                    <div className={"flex items-center justify-center"}>
                        <h1 className={"text-blue-500 text-3xl font-bold my-2"}>MÔ TẢ SẢN PHẨM</h1>
                    </div>
                    <div className={"flex"}>
                        <ProductDescription blocks={blocks}/>
                    </div>
                </div>
                <hr className={"border-[0.1px] border-gray-700 shadow shadow-blue-500 blur-sm my-4"}/>
            </div>
        </div>
        )
}