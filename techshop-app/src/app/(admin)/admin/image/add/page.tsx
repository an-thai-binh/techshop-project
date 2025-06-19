import AddImageForm from "@/component/admin/AddImageForm";


export default function AddImagePage() {
  return (
    <div className="flex h-screen flex-col">
      <h3 className="my-3 text-center text-3xl font-bold uppercase">Thêm hình ảnh</h3>
      <AddImageForm />
    </div>
  )
}
