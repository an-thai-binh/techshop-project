import Link from 'next/link'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import AnimationMotion from '@/component/AnimationMotion'

export default function ForbiddenPage() {
  return (
    <AnimationMotion className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 dark:bg-gray-900">
      <div className="flex flex-col items-center gap-4 text-center">
        <ExclamationTriangleIcon className="h-16 w-16 text-yellow-500 dark:text-yellow-400" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          403 – Không có quyền truy cập
        </h1>
        <p className="max-w-md text-gray-600 dark:text-gray-400">
          Bạn không có quyền truy cập trang này. Vui lòng kiểm tra quyền truy cập hoặc quay lại
          trang chủ.
        </p>
        <Link
          href="/"
          className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Quay về trang chủ
        </Link>
      </div>
    </AnimationMotion>
  )
}
