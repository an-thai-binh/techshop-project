export const EndpointAPI = {
  // BaseUrl
  BaseUrl: 'http://localhost:8080/techshop',

  // AUTHENTICATION
  // POST: Đăng nhập người dùng
  AUTH_LOGIN: '/auth/login',
  // POST: Đăng xuất người dùng
  AUTH_LOGOUT: '/auth/logout',
  // POST: Làm mới token
  AUTH_REFRESH: '/auth/refresh',
  // POST: Đăng ký người dùng mới
  AUTH_REGISTER: '/auth/register',

  // CATEGORY
  // GET: Lấy tất cả danh mục
  CATEGORY_GET_ALL: '/category/all',
  // GET: Lấy danh mục phân trang
  CATEGORY_GET_PAGINATED: '/category',
  // GET: Lấy chi tiết danh mục theo ID
  CATEGORY_GET_BY_ID: '/category/', // +id
  // POST: Tạo danh mục mới
  CATEGORY_CREATE: '/category',
  // PUT: Cập nhật danh mục theo ID
  CATEGORY_UPDATE: '/category/', // +id
  // DELETE: Xoá danh mục theo ID
  CATEGORY_DELETE: '/category/', // +id

  // CART
  // GET: Lấy tất cả giỏ hàng
  CART_GET_ALL: '/cart',
  // GET: Lấy giỏ hàng người dùng hiện tại
  CART_GET_BY_USER: '/cart/show',
  // POST: Tạo mới giỏ hàng
  CART_CREATE: '/cart',
  // PUT: Cập nhật giỏ hàng theo ID
  CART_UPDATE: '/cart/', // +id
  // DELETE: Xoá giỏ hàng theo ID
  CART_DELETE: '/cart/', // +id

  // CART ITEM
  // GET: Lấy tất cả cart item
  CART_ITEM_GET_ALL: '/cartItem',
  // GET: Lấy chi tiết cart item
  CART_ITEM_GET_BY_ID: '/cartItem/', // +id
  // POST: Thêm mới cart item
  CART_ITEM_CREATE: '/cartItem',
  // POST: Thêm sản phẩm vào cart
  CART_ITEM_ADD: '/cartItem/add',
  // POST: Thêm sản phẩm với số lượng
  CART_ITEM_ADD_WITH_QUANTITY: '/cartItem/addWithQuantity',
  // POST: Giảm số lượng cart item
  CART_ITEM_SUBTRACT: '/cartItem/subtract',
  // POST: Xoá cart item theo ID
  CART_ITEM_DELETE: '/cartItem/delete',
  // POST: Xoá toàn bộ cart item
  CART_ITEM_DELETE_ALL: '/cartItem/deleteAll',
  // PUT: Cập nhật cart item theo ID
  CART_ITEM_UPDATE: '/cartItem/', // +id
  // PUT: Cập nhật số lượng cart item
  CART_ITEM_UPDATE_QUANTITY: '/cartItem/updateQuantity',

  // CHOICE
  // GET: Lấy danh sách lựa chọn
  CHOICE_GET_ALL: '/choice',
  // GET: Lấy lựa chọn theo productId
  CHOICE_GET_BY_PRODUCT: '/choice/getByProduct',
  // GET: Lấy chi tiết lựa chọn theo ID
  CHOICE_GET_BY_ID: '/choice/', // +id
  // GET: Lấy lựa chọn kèm values
  CHOICE_GET_WITH_VALUES: '/choice/showValues/', // +id
  // POST: Tạo mới lựa chọn
  CHOICE_CREATE: '/choice',
  // PUT: Cập nhật lựa chọn theo ID
  CHOICE_UPDATE: '/choice/', // +id
  // DELETE: Xoá lựa chọn
  CHOICE_DELETE: '/choice',

  // CHOICE VALUE
  // GET: Lấy chi tiết giá trị lựa chọn
  CHOICE_VALUE_GET: '/choiceValue/', // +id
  // POST: Tạo giá trị lựa chọn mới
  CHOICE_VALUE_CREATE: '/choiceValue',
  // PUT: Cập nhật giá trị lựa chọn
  CHOICE_VALUE_UPDATE: '/choiceValue/', // +id
  // DELETE: Xoá giá trị lựa chọn
  CHOICE_VALUE_DELETE: '/choiceValue/', // +id

  // IMAGE
  // GET: Lấy danh sách hình ảnh
  IMAGE_GET_ALL: '/image',
  // GET: Lấy hình ảnh theo ID
  IMAGE_GET_BY_ID: '/image/', // +id
  // GET: Lấy hình ảnh theo URL
  IMAGE_GET_BY_URL: '/image/showByUrl',
  // GET: Lấy hình ảnh theo productId
  IMAGE_GET_BY_PRODUCT: '/image/showByProduct',
  // POST: Tạo ảnh từ URL
  IMAGE_CREATE_BY_URL: '/image/url',
  // POST: Tạo ảnh từ file upload
  IMAGE_CREATE_BY_FILE: '/image/file',

  // INVENTORY
  // GET: Lấy danh sách tồn kho
  INVENTORY_GET_ALL: '/inventory',
  // GET: Lấy tồn kho theo ID
  INVENTORY_GET_BY_ID: '/inventory/', // +id
  // POST: Tạo tồn kho mới
  INVENTORY_CREATE: '/inventory',
  // PUT: Cập nhật tồn kho
  INVENTORY_UPDATE: '/inventory/', // +id
  // DELETE: Xoá tồn kho
  INVENTORY_DELETE: '/inventory/', // +id

  // OTP
  // POST: Tạo mã OTP cho user
  OTP_GENERATE: '/otp/generate',

  // PRODUCT
  // GET: Lấy danh sách sản phẩm
  PRODUCT_GET_ALL: '/product',
  // GET: Lấy sản phẩm hiển thị
  PRODUCT_DISPLAY_ALL: '/product/display',
  // GET: Lấy sản phẩm hiển thị kèm lọc
  PRODUCT_DISPLAY_FILTER: '/product/display/filter',
  // GET: Lấy sản phẩm theo danh mục
  PRODUCT_DISPLAY_BY_CATEGORY: '/product/display/getByCategory',
  // GET: Lấy chi tiết sản phẩm (admin)
  PRODUCT_GET_BY_ID: '/product/', // +id
  // GET: Lấy chi tiết sản phẩm (khách)
  PRODUCT_GET_DETAIL: '/product/detail/', // +id
  // GET: Tìm kiếm sản phẩm list
  PRODUCT_SEARCH_LIST: '/product/display/searchList',
  // GET: Tìm kiếm sản phẩm có phân trang
  PRODUCT_SEARCH_PAGE: '/product/display/searchPage',
  // POST: Tạo sản phẩm mới
  PRODUCT_CREATE: '/product',
  // POST: Tạo sản phẩm kèm hình
  PRODUCT_CREATE_WITH_IMAGE: '/product/storeWithImage',
  // PUT: Cập nhật sản phẩm
  PRODUCT_UPDATE: '/product/', // +id
  // PUT: Cập nhật sản phẩm kèm hình
  PRODUCT_UPDATE_WITH_IMAGE: '/product/updateWithImage/', // +id
  // DELETE: Xoá sản phẩm
  PRODUCT_DELETE: '/product/', // +id

  // PRODUCT VARIATION
  // GET: Lấy danh sách biến thể
  PRODUCT_VARIATION_GET_ALL: '/productVariation',
  // GET: Lấy chi tiết biến thể
  PRODUCT_VARIATION_GET_BY_ID: '/productVariation/', // +id
  // GET: Lấy chi tiết biến thể đầy đủ
  PRODUCT_VARIATION_GET_FULL: '/productVariation//full', // +id
  // POST: Tạo biến thể mới
  PRODUCT_VARIATION_CREATE: '/productVariation',
  // POST: Tạo biến thể kèm values
  PRODUCT_VARIATION_CREATE_WITH_VALUES: '/productVariation/storeWithValues',
  // PUT: Cập nhật biến thể
  PRODUCT_VARIATION_UPDATE: '/productVariation/', // +id
  // PATCH: Cập nhật nhanh biến thể
  PRODUCT_VARIATION_PATCH: '/productVariation/', // +id
  // DELETE: Xoá biến thể
  PRODUCT_VARIATION_DELETE: '/productVariation/', // +id

  // USER
  // GET: Lấy danh sách người dùng
  USER_GET_ALL: '/user',
  // GET: Lấy chi tiết người dùng
  USER_GET_BY_ID: '/user/', // +id
  // POST: Tạo người dùng mới
  USER_CREATE: '/user',
  // PUT: Cập nhật người dùng
  USER_UPDATE: '/user/', // +id
  // DELETE: Xoá người dùng
  USER_DELETE: '/user/', // +id
  // PUT: Cập nhật thông tin người dùng
  USER_UPDATE_INFO: '/user/updateInfo/', // +id
  // POST: Xác minh tài khoản bằng OTP
  USER_VERIFY_ACCOUNT: '/user/verify',
  // PATCH: Đổi mật khẩu người dùng
  USER_CHANGE_PASSWORD: '/user//changePassword', // +id
  // PATCH: Đổi email người dùng
  USER_CHANGE_EMAIL: '/user//changeEmail', // +id

  // ORDER
  // GET: Lấy danh sách đơn hàng
  ORDER_GET_ALL: '/order',
  // GET: Lấy chi tiết đơn hàng
  ORDER_DETAIL: '/order/detail/',
  // POST: Tạo đơn hàng mới
  ORDER_STORE: '/order',
  // PATCH: Cập nhật trạng thái đơn hàng
  ORDER_UPDATE_STATUS: '/order/', // +id

  // PAYMENT
  // POST: Xử lý thanh toán khi nhận hàng
  CHECKOUT_COD: '/payment/checkout/cod/', // +id
  // POST: Xử lý thanh toán khi thông qua chuyển khoản
  CHECKOUT_TRANSFER: '/payment/checkout/transfer/', // +id
  // PATCH: Cập nhật trạng thái đơn hàng
  PAYMENT_UPDATE_STATUS: '/payment/', // +id

  // STATISTIC
  // GET: Lấy thống kê số lượng các đối tượng trong CSDL
  STATISTIC_COUNT_ENTITIES: '/statistic/countEntities',
}
