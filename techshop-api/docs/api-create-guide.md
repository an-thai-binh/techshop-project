### Quy trình viết API cho 1 entity
1. Tạo Repository cho entity
2. Khởi tạo các lớp Request (Creation, Update), Response của entity
3. Khởi tạo lớp Service cho entity, thực hiện các phương thức sau:
   * index(pageable): lấy toàn bộ danh sách
   * show(id): lấy ra 1 đối tượng dựa trên id
   * store(creationRequest): thêm mới 1 đối tượng vào database
   * update(updateRequest): cập nhật 1 đối tượng trong database
   * destroy(id): xoá 1 record trong database có id tương ứng
4. Khởi tạo Controller tương ứng với các phương thức trong Service:
   * GET: index 
   * GET: show ("/{id}")
   * POST: store
   * UPDATE: update ("{/{id}")
   * DELETE: destroy ("{/id}")