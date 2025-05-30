import { getUserProfile } from '@/app/(auth)/auth/profile/action'
import { UserIcon } from '@heroicons/react/24/outline'

export default async function ProfilePage() {
  const response = await getUserProfile()
  const user = response.data

  return (
    <div className="mx-auto mt-10 max-w-4xl rounded-xl border bg-white/50 px-8 py-10 shadow-lg backdrop-blur-sm">
      {/* Avatar + Tên */}
      <div className="flex flex-col items-center sm:flex-row sm:items-center sm:space-x-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-blue-600 shadow-inner">
          <UserIcon className="h-12 w-12" />
        </div>
        <div className="mt-4 text-center sm:mt-0 sm:text-left">
          <h2 className="text-2xl font-bold text-gray-800">{user.fullName || user.username}</h2>
        </div>
      </div>

      {/* Thông tin */}
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Info label="Tên đăng nhập" value={user.username} />
        <Info label="Email" value={user.email} />
        <Info label="Số điện thoại" value={user.phoneNumber} />
        <Info label="Họ và tên" value={user.fullName} />
        <Info label="Năm sinh" value={user.birthYear} />
        <Info label="Giới tính" value={formatGender(user.gender)} />
      </div>
    </div>
  )
}

function Info({ label, value }: { label: string; value: string | number | null }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-5 shadow-sm transition-all duration-200 ease-in-out hover:shadow-md">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-1 text-base font-semibold text-gray-800">{value ?? '-'}</p>
    </div>
  )
}

function formatGender(gender: string | null): string {
  switch (gender?.toLowerCase()) {
    case 'male':
      return 'Nam'
    case 'female':
      return 'Nữ'
    case 'other':
      return 'Khác'
    default:
      return '-'
  }
}
