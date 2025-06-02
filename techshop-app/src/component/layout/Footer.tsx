export default function Footer() {
  return (
    <footer className="hidden w-full bg-white px-6 py-10 text-sm text-gray-700 shadow-inner dark:bg-gray-950 dark:text-gray-300 sm:block">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 sm:flex-row sm:justify-between">
        <div className="flex flex-col gap-3">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">TechShop</h1>
          <p className="max-w-sm text-sm text-gray-500 dark:text-gray-400">
            Nền tảng thương mại điện tử hiện đại dành cho trải nghiệm mua sắm tối ưu.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-md font-semibold text-gray-800 dark:text-white">Hỗ trợ</h2>
          <ul className="flex flex-col gap-1 text-gray-600 dark:text-gray-400">
            <li>
              <a href="#">Trung tâm trợ giúp</a>
            </li>
            <li>
              <a href="#">Chính sách đổi trả</a>
            </li>
            <li>
              <a href="#">Chính sách bảo mật</a>
            </li>
            <li>
              <a href="#">Liên hệ</a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-md font-semibold text-gray-800 dark:text-white">Công ty</h2>
          <ul className="flex flex-col gap-1 text-gray-600 dark:text-gray-400">
            <li>
              <a href="#">Giới thiệu</a>
            </li>
            <li>
              <a href="#">Tuyển dụng</a>
            </li>
            <li>
              <a href="#">Tin tức</a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-md font-semibold text-gray-800 dark:text-white">Kết nối</h2>
          <div className="flex gap-3 text-gray-600 dark:text-gray-400">
            <a href="#">
              <i className="fab fa-facebook hover:text-blue-600" />
            </a>
            <a href="#">
              <i className="fab fa-instagram hover:text-pink-500" />
            </a>
            <a href="#">
              <i className="fab fa-twitter hover:text-blue-400" />
            </a>
            <a href="#">
              <i className="fab fa-youtube hover:text-red-600" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-200 pt-4 text-center text-xs text-gray-500 dark:border-gray-700 dark:text-gray-600">
        © 2025 TechShop. All rights reserved.
      </div>
    </footer>
  )
}
