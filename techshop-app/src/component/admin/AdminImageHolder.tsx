'use client'
import { ClipboardIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

interface AdminImageHolderProps {
    url: string
};

export default function AdminImageHolder({ url }: AdminImageHolderProps) {

    const handleOnClickCopyButton = async () => {
        try {
            await navigator.clipboard.writeText(url);
            toast.success("Đã sao chép!");
        } catch (error: any) {
            toast.error("Lỗi khi sao chép!");
            throw new Error(error.message);
        }
    }

    return (
        <div className="w-[400px] h-[450px] lg:w-[300px] lg:h-[350px] flex flex-col bg-white shadow-lg">
            <div className="basis-5/6 m-3 mb-0 flex justify-center items-center overflow-hidden">
                <img className="object-contain" src={url}></img>
            </div>
            <div className="basis-1/6 px-3 flex justify-center items-center">
                <ClipboardIcon onClick={handleOnClickCopyButton} className="w-9 h-9 text-gray-400 hover:text-gray-600 cursor-pointer" />
                <a className="flex-1 overflow-hidden line-clamp-2 text-sm text-gray-500 hover:text-gray-900" href={url} target="blank_">
                    {url}
                </a>
            </div>
        </div>
    );
}