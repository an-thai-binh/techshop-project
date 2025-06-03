import AddCategoryForm from "@/component/admin/AddCategoryForm";

export const metadata = {
    title: 'Add Category'
}

export default function AddCategoryPage() {
    return (
        <div className="flex h-screen flex-col text-gray-800">
            <h3 className="my-3 text-center text-3xl font-bold uppercase">Thêm thể loại</h3>
            <div className="mx-3 bg-white shadow-md">
                <AddCategoryForm />
            </div>
        </div>
    );
}