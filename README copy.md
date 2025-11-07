# Nền Tảng Học Trực Tuyến - Toán, Vật Lý, Hóa Học

## Mô Tả Dự Án

Website học trực tuyến tối ưu về tốc độ, tính năng thuận tiện, tối ưu cho khả năng học nhanh - nhớ lâu cho học sinh trung học.

## Đối Tượng Sử Dụng

- **Học sinh trung học phổ thông**
- **Giáo viên**
- **Quản trị viên website (ADMIN)**

## Công Nghệ Sử Dụng

- **Frontend:** HTML, CSS, JavaScript (TypeScript)
- **Backend:** Java MVC Framework Struts (theo yêu cầu)
- **Database:** SQL Server (theo yêu cầu)

## Cấu Trúc Thư Mục

```
Project/
├── index.html              # Trang đăng nhập/đăng ký
├── dashboard.html          # Trang dashboard chính
├── content.html           # Trang nội dung học tập
├── exercises.html         # Trang bài tập
├── payment.html           # Trang thanh toán
├── forum.html             # Trang diễn đàn
├── teacher-content.html    # Quản lý nội dung (Giáo viên)
├── admin-accounts.html     # Quản lý tài khoản (Admin)
├── css/
│   ├── main.css           # CSS chính
│   ├── auth.css           # CSS cho trang đăng nhập/đăng ký
│   └── dashboard.css      # CSS cho dashboard
└── js/
    ├── auth.js            # Xử lý đăng nhập/đăng ký
    ├── dashboard.js       # Logic dashboard
    ├── content.js         # Quản lý nội dung học tập
    ├── exercises.js       # Quản lý bài tập
    ├── payment.js         # Xử lý thanh toán
    ├── forum.js           # Quản lý diễn đàn
    ├── teacher-content.js # Quản lý nội dung (Giáo viên)
    └── admin-accounts.js  # Quản lý tài khoản (Admin)
```

## Chức Năng Chính

### 1. Quản Lý Tài Khoản
- Đăng ký sử dụng (Ngoại trừ ADMIN)
- Đăng nhập với vai trò khác nhau
- Xem/cập nhật thông tin cá nhân
- Khôi phục tài khoản/mật khẩu

### 2. Chức Năng Học Sinh
- **Truy cập nội dung học tập:**
  - Xem bài giảng (video, tài liệu, đề thi thử) về Toán, Vật Lý, Hóa học
  - Xem đánh giá, phản hồi về chất lượng nội dung
- **Làm bài tập:**
  - Thực hiện bài tập trắc nghiệm hoặc tự luận
  - Nhận kết quả ngay lập tức (trắc nghiệm)
- **Tham gia bài kiểm tra**
- **Theo dõi tiến độ học tập:**
  - Xem thống kê điểm số, bài đã hoàn thành
  - Nhắc lịch học
  - Gợi ý nội dung học tập theo năng lực
- **Tương tác với giáo viên:**
  - Đặt câu hỏi, trao đổi trực tuyến
  - Xem livestream của giáo viên
- **Tìm kiếm nội dung học tập**
- **Thi đua học tập:**
  - Tham gia thi đua
  - Xem bảng xếp hạng
- **Tải tài liệu lý thuyết và bài tập**
- **Diễn đàn trao đổi** (theo bộ môn)
- **Nạp tiền và thanh toán:**
  - Nạp tiền qua VNPay hoặc MoMo
  - Thanh toán tài liệu có phí
- **Báo cáo lỗi/nội dung sai**
- **Nhận thông báo** qua email/SMS

### 3. Chức Năng Giáo Viên
- **Quản lý nội dung:**
  - Tìm kiếm nội dung
  - Tải lên bài giảng, tạo bài tập, bài kiểm tra (có phí/miễn phí)
  - Cập nhật, chỉnh sửa, xóa, ẩn nội dung
- **Quản lý học sinh:**
  - Theo dõi danh sách, điểm số, tiến độ học tập
  - Phân tích dữ liệu học sinh
  - Xuất dữ liệu thành PDF/Excel
- **Chấm bài và phản hồi:**
  - Chấm bài tự luận
  - Cung cấp nhận xét, giải đáp thắc mắc
- **Tạo lịch học/bài kiểm tra**
- **Cá nhân hóa nội dung**
- **Trao đổi nhóm với nhiều học sinh**
- **Quản lý phản hồi học sinh**
- **Theo dõi doanh thu** từ đề đã bán

### 4. Chức Năng Admin
- **Quản lý tài khoản:**
  - Tìm kiếm, thêm, xóa, chỉnh sửa tài khoản
- **Quản lý nội dung:**
  - Tìm kiếm nội dung
  - Kiểm duyệt nội dung đăng tải
  - Chỉnh sửa, xóa nội dung
  - Phê duyệt bài giảng, bài tập
- **Quản lý quyền truy cập:**
  - Phân quyền cho các nhóm người dùng
- **Phân tích dữ liệu hệ thống:**
  - Dashboard thống kê
  - Thống kê theo từng bộ môn
  - Quản lý giao dịch, doanh thu
- **Giám sát lỗi hệ thống**
- **Quản lý thông báo toàn hệ thống**

## Cách Sử Dụng

1. Mở file `index.html` trong trình duyệt
2. Đăng ký tài khoản mới hoặc đăng nhập
3. Chọn vai trò (Học Sinh, Giáo Viên, hoặc Admin)
4. Sau khi đăng nhập, bạn sẽ được chuyển đến dashboard tương ứng với vai trò

## Lưu Ý

- Đây là giao diện prototype, các chức năng được mô phỏng bằng JavaScript
- Trong ứng dụng thực tế, sẽ tích hợp với backend Java và database SQL Server
- Dữ liệu hiện tại được lưu trong localStorage (chỉ để demo)

## Tác Giả

Nhóm 33 - Đồ Án CNPM

## Phiên Bản

v1.0 - Prototype giao diện HTML/CSS/JavaScript
"# CNPM" 
"# CNPM" 
