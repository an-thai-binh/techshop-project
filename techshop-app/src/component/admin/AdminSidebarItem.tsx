import { ArchiveBoxIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

interface AdminSidebarItemProps {
    icon: React.ReactNode;
    label: string;
    page: string;
}

export default function AdminSidebarItem({ icon, label, page }: AdminSidebarItemProps) {
    return (
        <Link href={page}>
            <div className="flex flex-row items-center w-full lg:mb-2 lg:hover:bg-gray-700 lg:hover:rounded-md lg:hover:font-bold">
                <div className="flex-shrink-0 flex justify-center items-center min-w-[50] min-h-[50]">
                    <div className="text-white size-8 hover:size-9 lg:hover:size-8">
                        {icon}
                    </div>
                </div>
                <div className="flex-1 pl-3">
                    <p className="text-white hidden lg:block">{label}</p>
                </div>
            </div>
        </Link>
    );
}
