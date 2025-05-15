import AdditionFloatingButton from '@/component/admin/AdditionFloatingButton'
import AdminImageHolder from '@/component/admin/AdminImageHolder'

export default function AdminImagePage() {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-wrap justify-center gap-3 p-3">
        <AdminImageHolder
          url={
            'https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1'
          }
        />
        <AdminImageHolder
          url={
            'https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1'
          }
        />
        <AdminImageHolder
          url={
            'https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1'
          }
        />
        <AdminImageHolder
          url={
            'https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1'
          }
        />
        <AdminImageHolder
          url={
            'https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1'
          }
        />
        <AdminImageHolder
          url={
            'https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1'
          }
        />
      </div>
      <AdditionFloatingButton url={'/admin/image/add'} />
    </div>
  )
}
