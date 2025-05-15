import { ClipboardIcon } from "@heroicons/react/24/outline";

interface AdminImageHolderProps {
    url: string
};

export default function AdminImageHolder({ url }: AdminImageHolderProps) {
    return (
        <div className="w-[400px] h-[450px] lg:w-[300px] lg:h-[350px] flex flex-col bg-white shadow-lg">
            <div className="basis-5/6 m-3 mb-0 flex justify-center items-center overflow-hidden">
                <img className="object-contain" src={url}></img>
            </div>
            <div className="basis-1/6 mx-3 flex justify-center items-center">
                <ClipboardIcon className="w-[40px] h-[40px] text-gray-400 hover:text-gray-600 cursor-pointer" />
                <a className="flex-1 overflow-hidden" href={url} target="blank_">
                    <p className="line-clamp-2 text-sm text-gray-500 hover:text-gray-900">{url}</p>
                </a>
            </div>
        </div>
    );
}