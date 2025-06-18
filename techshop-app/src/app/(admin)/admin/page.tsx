import AdminDashboardCount from "@/component/admin/AdminDashboardCount";

export const metadata = {
    title: "Admin Dashboard",
};

export default function AdminDashboardPage() {
    return (
        <div className="">
            <p className="mt-3 text-center text-4xl font-black underline underline-offset-8">Admin Dashboard</p>
            <div className="mt-3 p-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                <AdminDashboardCount />
            </div>
        </div>
    );
}