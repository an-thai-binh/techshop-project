import { PlusIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export default function AdditionFloatingButton({ url }: { url: string }) {
    return (
        <Link href={url}>
            <div className="fixed bottom-24 lg:bottom-10 right-10 flex justify-center items-center size-14 rounded-full shadow-lg hover:shadow-sm bg-yellow-400 text-white ">
                <PlusIcon title="Thêm dữ liệu" className="font-bold cursor-pointer" />
            </div>
        </Link>
    );
}