// Dashboard functionality
class DashboardManager {
    constructor() {
        this.currentUser = null;
        this.authManager = null;
        this.init();
    }

    init() {
        // Check if user is logged in
        const savedUser = localStorage.getItem('currentUser');
        if (!savedUser) {
            window.location.href = 'index.html';
            return;
        }

        this.currentUser = JSON.parse(savedUser);
        this.loadDashboard();
        this.initEventListeners();
    }

    initEventListeners() {
        // Logout button
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
                    localStorage.removeItem('currentUser');
                    window.location.href = 'index.html';
                }
            });
        }
    }

    loadDashboard() {
        // Update user info
        const userNameEl = document.getElementById('user-name');
        const userAvatarEl = document.getElementById('user-avatar');
        if (userNameEl && this.currentUser) {
            userNameEl.textContent = this.currentUser.name || 'Người Dùng';
        }
        if (userAvatarEl && this.currentUser && this.currentUser.name) {
            userAvatarEl.textContent = this.currentUser.name.charAt(0).toUpperCase();
        }

        // Load navigation menu
        this.loadNavigation();

        // Check if there's an action parameter in URL
        const params = new URLSearchParams(window.location.search);
        const action = params.get('action');
        
        const dashboardContent = document.getElementById('dashboard-content');
        
        // If action parameter exists, load that specific content
        if (action) {
            this.handleMenuAction(action);
            return;
        }

        // Load dashboard content based on role (default)
        const role = this.currentUser.role || this.getRoleFromURL();
        
        if (role === 'student') {
            dashboardContent.innerHTML = this.getStudentDashboard();
        } else if (role === 'teacher') {
            dashboardContent.innerHTML = this.getTeacherDashboard();
        } else if (role === 'admin') {
            dashboardContent.innerHTML = this.getAdminDashboard();
        } else {
            dashboardContent.innerHTML = '<div class="alert alert-error">Vai trò không hợp lệ</div>';
        }
    }

    getRoleFromURL() {
        const params = new URLSearchParams(window.location.search);
        return params.get('role') || 'student';
    }

    loadNavigation() {
        const navMenu = document.getElementById('nav-menu');
        const role = this.currentUser.role || this.getRoleFromURL();
        
        // Get current page/action from URL
        const params = new URLSearchParams(window.location.search);
        const action = params.get('action');
        const currentPage = action ? action.replace('show', '').toLowerCase() : 'dashboard';
        
        let menuItems = [];
        
        if (role === 'student') {
            menuItems = [
                { text: 'Trang Chủ', href: 'dashboard.html', action: null, active: currentPage === 'dashboard' },
                { text: 'Nội Dung Học Tập', href: 'content.html', action: null, active: currentPage === 'content' },
                { text: 'Bài Tập', href: 'exercises.html', action: null, active: currentPage === 'exercises' },
                { text: 'Bài Kiểm Tra', href: '#', action: 'showTests', active: currentPage === 'tests' },
                { text: 'Tiến Độ Học Tập', href: '#', action: 'showProgress', active: currentPage === 'progress' },
                { text: 'Tương Tác GV', href: '#', action: 'showTeacherInteraction', active: currentPage === 'teacher-interaction' },
                { text: 'Diễn Đàn', href: 'forum.html', action: null, active: currentPage === 'forum' },
                { text: 'Thanh Toán', href: 'payment.html', action: null, active: currentPage === 'payment' },
                { text: 'Tài Khoản', href: '#', action: 'showProfile', active: currentPage === 'profile' }
            ];
        } else if (role === 'teacher') {
            menuItems = [
                { text: 'Trang Chủ', href: 'dashboard.html', action: null, active: currentPage === 'dashboard' },
                { text: 'Quản Lý Nội Dung', href: '#', action: 'showContentManagement', active: currentPage === 'content-management' },
                { text: 'Quản Lý Học Sinh', href: '#', action: 'showStudentManagement', active: currentPage === 'student-management' },
                { text: 'Chấm Bài', href: '#', action: 'showGrading', active: currentPage === 'grading' },
                { text: 'Lịch Học', href: '#', action: 'showSchedule', active: currentPage === 'schedule' },
                { text: 'Livestream', href: '#', action: 'showLivestream', active: currentPage === 'livestream' },
                { text: 'Tài Khoản', href: '#', action: 'showProfile', active: currentPage === 'profile' }
            ];
        } else if (role === 'admin') {
            menuItems = [
                { text: 'Trang Chủ', href: 'dashboard.html', action: null, active: currentPage === 'dashboard' },
                { text: 'Quản Lý Tài Khoản', href: '#', action: 'showAccountManagement', active: currentPage === 'account-management' },
                { text: 'Quản Lý Nội Dung', href: '#', action: 'showContentManagement', active: currentPage === 'content-management' },
                { text: 'Phân Quyền', href: '#', action: 'showPermissions', active: currentPage === 'permissions' },
                { text: 'Thống Kê', href: '#', action: 'showStatistics', active: currentPage === 'statistics' },
                { text: 'Giao Dịch', href: '#', action: 'showTransactions', active: currentPage === 'transactions' },
                { text: 'Tài Khoản', href: '#', action: 'showProfile', active: currentPage === 'profile' }
            ];
        }

        navMenu.innerHTML = '';
        menuItems.forEach(item => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.textContent = item.text;
            
            if (item.action) {
                a.href = '#';
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.handleMenuAction(item.action, a);
                });
            } else {
                a.href = item.href;
            }
            
            if (item.active) {
                a.style.color = 'var(--text-primary)';
                a.style.fontWeight = '800';
                a.style.transform = 'scale(1.29)';
                a.style.transformOrigin = 'center';
            }
            
            li.appendChild(a);
            navMenu.appendChild(li);
        });
    }

    handleMenuAction(action, eventElement = null) {
        const dashboardContent = document.getElementById('dashboard-content');
        const role = this.currentUser.role || this.getRoleFromURL();
        
        // Update active menu item
        document.querySelectorAll('.nav-menu a').forEach(a => {
            a.style.color = '';
            a.style.fontWeight = '';
            a.style.transform = '';
            a.style.transformOrigin = '';
        });
        
        if (eventElement) {
            eventElement.style.color = 'var(--text-primary)';
            eventElement.style.fontWeight = '800';
            eventElement.style.transform = 'scale(1.29)';
            eventElement.style.transformOrigin = 'center';
        }
        
        if (role === 'student') {
            switch(action) {
                case 'showContent':
                    window.location.href = 'content.html';
                    return;
                case 'showExercises':
                    window.location.href = 'exercises.html';
                    return;
                case 'showTests':
                    dashboardContent.innerHTML = this.getStudentTests();
                    break;
                case 'showProgress':
                    dashboardContent.innerHTML = this.getStudentProgress();
                    break;
                case 'showTeacherInteraction':
                    dashboardContent.innerHTML = this.getTeacherInteraction();
                    break;
                case 'showForum':
                    window.location.href = 'forum.html';
                    return;
                case 'showPayment':
                    window.location.href = 'payment.html';
                    return;
                case 'showProfile':
                    dashboardContent.innerHTML = this.getProfile();
                    break;
                default:
                    dashboardContent.innerHTML = this.getStudentDashboard();
            }
        } else if (role === 'teacher') {
            switch(action) {
                case 'showContentManagement':
                    dashboardContent.innerHTML = this.getTeacherContentManagement();
                    break;
                case 'showStudentManagement':
                    dashboardContent.innerHTML = this.getTeacherStudentManagement();
                    break;
                case 'showGrading':
                    dashboardContent.innerHTML = this.getTeacherGrading();
                    break;
                case 'showSchedule':
                    dashboardContent.innerHTML = this.getTeacherSchedule();
                    break;
                case 'showLivestream':
                    dashboardContent.innerHTML = this.getTeacherLivestream();
                    break;
                case 'showProfile':
                    dashboardContent.innerHTML = this.getProfile();
                    break;
                default:
                    dashboardContent.innerHTML = this.getTeacherDashboard();
            }
        } else if (role === 'admin') {
            switch(action) {
                case 'showAccountManagement':
                    dashboardContent.innerHTML = this.getAdminAccountManagement();
                    break;
                case 'showContentManagement':
                    dashboardContent.innerHTML = this.getAdminContentManagement();
                    break;
                case 'showPermissions':
                    dashboardContent.innerHTML = this.getAdminPermissions();
                    break;
                case 'showStatistics':
                    dashboardContent.innerHTML = this.getAdminStatistics();
                    break;
                case 'showTransactions':
                    dashboardContent.innerHTML = this.getAdminTransactions();
                    break;
                case 'showProfile':
                    dashboardContent.innerHTML = this.getProfile();
                    break;
                default:
                    dashboardContent.innerHTML = this.getAdminDashboard();
            }
        }
    }

    getStudentDashboard() {
        const progressSection = this.renderProgressSection(this.getProgressData());

        return `
            <div class="dashboard-header">
                <h1>Chào mừng, ${this.currentUser.name || 'Học Sinh'}!</h1>
                <p>Bảng điều khiển dành cho Học Sinh</p>
            </div>

            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-book"></i></div>
                    <div class="stat-info">
                        <h3>15</h3>
                        <p>Bài Giảng Đã Học</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-pen"></i></div>
                    <div class="stat-info">
                        <h3>8</h3>
                        <p>Bài Tập Đã Hoàn Thành</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-chart-bar"></i></div>
                    <div class="stat-info">
                        <h3>8.6</h3>
                        <p>Điểm Trung Bình</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-bullseye"></i></div>
                    <div class="stat-info">
                        <h3>3</h3>
                        <p>Bài Kiểm Tra Sắp Tới</p>
                    </div>
                </div>
            </div>

            <h2 class="section-title">Nội Dung Học Tập</h2>
            <div class="subject-filters">
                <button class="filter-btn active" onclick="filterDashboard('all')">Tất Cả</button>
                <button class="filter-btn" onclick="filterDashboard('math')">Toán</button>
                <button class="filter-btn" onclick="filterDashboard('physics')">Vật Lý</button>
                <button class="filter-btn" onclick="filterDashboard('chemistry')">Hóa Học</button>
            </div>

            <div class="content-grid">
                ${this.getContentCards('student', 6)}
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
                <button class="btn btn-primary" onclick="window.location.href='content.html'">Xem Tất Cả Nội Dung</button>
            </div>

            <h2 class="section-title">Tiến Độ Học Tập</h2>
            ${progressSection}
            
            <div style="text-align: center; margin-top: 20px;">
                <button class="btn btn-primary" onclick="window.location.href='dashboard.html?action=showProgress'">Xem Tất Cả Tiến Độ</button>
            </div>

            <h2 class="section-title">Lịch Học & Thông Báo</h2>
            <div class="card">
                <div class="card-body">
                    <p><strong>📅 Bài kiểm tra Toán:</strong> Ngày 15/12/2024 - 14:00</p>
                    <p><strong>📅 Bài kiểm tra Vật Lý:</strong> Ngày 18/12/2024 - 14:00</p>
                    <p><strong>📅 Deadline bài tập Hóa Học:</strong> Ngày 20/12/2024</p>
                </div>
            </div>
        `;
    }

    getTeacherDashboard() {
        return `
            <div class="dashboard-header">
                <h1>Chào mừng, ${this.currentUser.name || 'Giáo Viên'}!</h1>
                <p>Bảng điều khiển dành cho Giáo Viên</p>
            </div>

            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-users"></i></div>
                    <div class="stat-info">
                        <h3>125</h3>
                        <p>Học Sinh</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-clipboard-list"></i></div>
                    <div class="stat-info">
                        <h3>42</h3>
                        <p>Bài Giảng Đã Tạo</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-chart-bar"></i></div>
                    <div class="stat-info">
                        <h3>28</h3>
                        <p>Bài Cần Chấm</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-wallet"></i></div>
                    <div class="stat-info">
                        <h3>2.5M</h3>
                        <p>Doanh Thu</p>
                    </div>
                </div>
            </div>

            <h2 class="section-title">Nội Dung Của Tôi</h2>
            <div class="content-grid">
                ${this.getContentCards('teacher')}
            </div>

            <h2 class="section-title">Học Sinh Gần Đây</h2>
            <div class="card">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Tên Học Sinh</th>
                            <th>Lớp</th>
                            <th>Điểm TB</th>
                            <th>Trạng Thái</th>
                            <th>Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Nguyễn Văn A</td>
                            <td>12A1</td>
                            <td>8.5</td>
                            <td><span class="badge badge-success">Tích Cực</span></td>
                            <td><button class="btn btn-sm btn-primary">Xem Chi Tiết</button></td>
                        </tr>
                        <tr>
                            <td>Trần Thị B</td>
                            <td>12A2</td>
                            <td>9.0</td>
                            <td><span class="badge badge-success">Tích Cực</span></td>
                            <td><button class="btn btn-sm btn-primary">Xem Chi Tiết</button></td>
                        </tr>
                        <tr>
                            <td>Lê Văn C</td>
                            <td>11B1</td>
                            <td>7.5</td>
                            <td><span class="badge badge-warning">Cần Cải Thiện</span></td>
                            <td><button class="btn btn-sm btn-primary">Xem Chi Tiết</button></td>
                        </tr>
                        <tr>
                            <td>Phạm Thị D</td>
                            <td>12A1</td>
                            <td>9.2</td>
                            <td><span class="badge badge-success">Tích Cực</span></td>
                            <td><button class="btn btn-sm btn-primary">Xem Chi Tiết</button></td>
                        </tr>
                        <tr>
                            <td>Hoàng Văn E</td>
                            <td>12A2</td>
                            <td>8.3</td>
                            <td><span class="badge badge-success">Tích Cực</span></td>
                            <td><button class="btn btn-sm btn-primary">Xem Chi Tiết</button></td>
                        </tr>
                        <tr>
                            <td>Vũ Thị F</td>
                            <td>11B1</td>
                            <td>7.8</td>
                            <td><span class="badge badge-warning">Cần Cải Thiện</span></td>
                            <td><button class="btn btn-sm btn-primary">Xem Chi Tiết</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
    }

    getAdminDashboard() {
        return `
            <div class="dashboard-header">
                <h1>Chào mừng, ${this.currentUser.name || 'Quản Trị Viên'}!</h1>
                <p>Bảng điều khiển dành cho Quản Trị Viên</p>
            </div>

            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-users"></i></div>
                    <div class="stat-info">
                        <h3>1,250</h3>
                        <p>Tổng Người Dùng</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-chalkboard-teacher"></i></div>
                    <div class="stat-info">
                        <h3>85</h3>
                        <p>Giáo Viên</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-book"></i></div>
                    <div class="stat-info">
                        <h3>420</h3>
                        <p>Bài Giảng</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-wallet"></i></div>
                    <div class="stat-info">
                        <h3>125M</h3>
                        <p>Doanh Thu</p>
                    </div>
                </div>
            </div>

            <h2 class="section-title">Nội Dung Cần Kiểm Duyệt</h2>
            <div class="card">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Tiêu Đề</th>
                            <th>Người Tạo</th>
                            <th>Ngày Tạo</th>
                            <th>Trạng Thái</th>
                            <th>Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Giải tích hàm số</td>
                            <td>Nguyễn Văn A</td>
                            <td>10/12/2024</td>
                            <td><span class="badge badge-warning">Chờ Duyệt</span></td>
                            <td>
                                <button class="btn btn-sm btn-secondary">Duyệt</button>
                                <button class="btn btn-sm btn-danger">Từ Chối</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Dao động điều hòa</td>
                            <td>Trần Thị B</td>
                            <td>11/12/2024</td>
                            <td><span class="badge badge-warning">Chờ Duyệt</span></td>
                            <td>
                                <button class="btn btn-sm btn-secondary">Duyệt</button>
                                <button class="btn btn-sm btn-danger">Từ Chối</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Hóa học hữu cơ</td>
                            <td>Lê Văn C</td>
                            <td>09/12/2024</td>
                            <td><span class="badge badge-warning">Chờ Duyệt</span></td>
                            <td>
                                <button class="btn btn-sm btn-secondary">Duyệt</button>
                                <button class="btn btn-sm btn-danger">Từ Chối</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Bài tập Toán nâng cao</td>
                            <td>Phạm Thị D</td>
                            <td>08/12/2024</td>
                            <td><span class="badge badge-warning">Chờ Duyệt</span></td>
                            <td>
                                <button class="btn btn-sm btn-secondary">Duyệt</button>
                                <button class="btn btn-sm btn-danger">Từ Chối</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Điện từ học</td>
                            <td>Hoàng Văn E</td>
                            <td>12/12/2024</td>
                            <td><span class="badge badge-warning">Chờ Duyệt</span></td>
                            <td>
                                <button class="btn btn-sm btn-secondary">Duyệt</button>
                                <button class="btn btn-sm btn-danger">Từ Chối</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Phản ứng hóa học</td>
                            <td>Vũ Thị F</td>
                            <td>07/12/2024</td>
                            <td><span class="badge badge-success">Đã Duyệt</span></td>
                            <td>
                                <button class="btn btn-sm btn-primary">Xem Chi Tiết</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 class="section-title">Thống Kê Theo Bộ Môn</h2>
            <div class="grid grid-3">
                <div class="card">
                    <h3>Toán</h3>
                    <p><strong>Bài giảng:</strong> 150</p>
                    <p><strong>Học sinh:</strong> 450</p>
                    <p><strong>Doanh thu:</strong> 45M VNĐ</p>
                </div>
                <div class="card">
                    <h3>Vật Lý</h3>
                    <p><strong>Bài giảng:</strong> 135</p>
                    <p><strong>Học sinh:</strong> 380</p>
                    <p><strong>Doanh thu:</strong> 38M VNĐ</p>
                </div>
                <div class="card">
                    <h3>Hóa Học</h3>
                    <p><strong>Bài giảng:</strong> 135</p>
                    <p><strong>Học sinh:</strong> 420</p>
                    <p><strong>Doanh thu:</strong> 42M VNĐ</p>
                </div>
            </div>
        `;
    }

    getContentCards(userType, limit = null) {
        const contents = [
            { title: 'Đại số và Giải tích - Chương 1', subject: 'Toán', type: 'Bài giảng', students: 120 },
            { title: 'Dao động điều hòa', subject: 'Vật Lý', type: 'Video', students: 95 },
            { title: 'Hóa học hữu cơ - Cơ bản', subject: 'Hóa Học', type: 'Tài liệu', students: 88 },
            { title: 'Bài tập Toán nâng cao', subject: 'Toán', type: 'Bài tập', students: 150 },
            { title: 'Điện từ học', subject: 'Vật Lý', type: 'Bài giảng', students: 110 },
            { title: 'Phản ứng hóa học', subject: 'Hóa Học', type: 'Video', students: 92 },
            { title: 'Hình học không gian', subject: 'Toán', type: 'Bài giảng', students: 135 },
            { title: 'Sóng cơ và sóng âm', subject: 'Vật Lý', type: 'Video', students: 105 },
            { title: 'Cân bằng hóa học', subject: 'Hóa Học', type: 'Tài liệu', students: 98 },
            { title: 'Lượng giác cơ bản', subject: 'Toán', type: 'Bài giảng', students: 128 },
            { title: 'Quang học', subject: 'Vật Lý', type: 'Video', students: 112 },
            { title: 'Điện hóa học', subject: 'Hóa Học', type: 'Bài giảng', students: 87 }
        ];
        
        // Limit số lượng hiển thị nếu được chỉ định
        const displayContents = limit ? contents.slice(0, limit) : contents;

        return displayContents.map(content => `
            <div class="content-card" data-subject="${content.subject}">
                <div class="content-card-image"></div>
                <div class="content-card-body">
                    <h3 class="content-card-title">${content.title}</h3>
                    <p class="content-card-description">
                        <span class="badge badge-info">${content.subject}</span>
                        <span class="badge badge-success">${content.type}</span>
                    </p>
                    <div class="content-card-footer">
                        <div class="content-meta">
                            <span>👥 ${content.students} học sinh</span>
                        </div>
                        <div class="action-buttons">
                            <button class="btn btn-sm btn-primary" onclick="window.location.href='content.html'">Xem</button>
                            ${userType === 'teacher' ? '<button class="btn btn-sm btn-secondary">Sửa</button>' : ''}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    getProgressData() {
        return [
            { label: 'Toán - Đại số và Giải tích', value: 75 },
            { label: 'Vật Lý - Dao động điều hòa', value: 82 },
            { label: 'Hóa Học - Hóa học hữu cơ', value: 90 },
            { label: 'Toán - Xác suất và Thống kê', value: 48 },
            { label: 'Vật Lý - Quang học', value: 64 },
            { label: 'Hóa Học - Phản ứng oxi hóa khử', value: 58 },
            { label: 'Toán - Số phức nâng cao', value: 72 },
            { label: 'Vật Lý - Điện từ học', value: 88 }
        ];
    }

    renderProgressSection(progressData) {
        const items = progressData.map(item => this.renderProgressItem(item.label, item.value)).join('');
        return `
            <div class="progress-section">
                ${items}
            </div>
        `;
    }

    renderProgressItem(label, value) {
        const percentage = Math.max(0, Math.min(100, Number(value) || 0));
        const color = this.getProgressColor(percentage);
        return `
            <div class="progress-item">
                <div class="progress-header">
                    <span class="progress-label">${label}</span>
                    <span class="progress-value">${percentage}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${percentage}%; background: ${color};"></div>
                </div>
            </div>
        `;
    }

    getProgressColor(value) {
        const percent = Math.max(0, Math.min(100, value));
        if (percent < 50) {
            return '#FF4D4F';
        }

        const hue = Math.min(120, 20 + (percent - 50) * 2);
        return `hsl(${hue}, 80%, 50%)`;
    }

    // ========== STUDENT FUNCTIONS ==========
    
    getStudentContent() {
        return `
            <div class="dashboard-header">
                <h1>Nội Dung Học Tập</h1>
                <p>Xem bài giảng, video, tài liệu về Toán, Vật Lý, Hóa học</p>
            </div>
            
            <div class="subject-filters">
                <button class="filter-btn active" onclick="filterDashboard('all')">Tất Cả</button>
                <button class="filter-btn" onclick="filterDashboard('math')">Toán</button>
                <button class="filter-btn" onclick="filterDashboard('physics')">Vật Lý</button>
                <button class="filter-btn" onclick="filterDashboard('chemistry')">Hóa Học</button>
            </div>
            
            <div class="content-grid">
                ${this.getContentCards('student', 6)}
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
                <button class="btn btn-primary" onclick="window.location.href='content.html'">Xem Tất Cả Nội Dung</button>
            </div>
        `;
    }

    getStudentExercises() {
        return `
            <div class="dashboard-header">
                <h1>Bài Tập</h1>
                <p>Thực hiện các bài tập trắc nghiệm hoặc tự luận, nhận kết quả ngay lập tức</p>
            </div>
            
            <div class="subject-filters">
                <button class="filter-btn active" onclick="filterDashboard('all')">Tất Cả</button>
                <button class="filter-btn" onclick="filterDashboard('math')">Toán</button>
                <button class="filter-btn" onclick="filterDashboard('physics')">Vật Lý</button>
                <button class="filter-btn" onclick="filterDashboard('chemistry')">Hóa Học</button>
            </div>
            
            <div class="content-grid">
                <div class="content-card" data-subject="Toán">
                    <div class="content-card-image"></div>
                    <div class="content-card-body">
                        <h3 class="content-card-title">Bài tập Đại số - Chương 1</h3>
                        <p class="content-card-description">
                            <span class="badge badge-info">Toán</span>
                            <span class="badge badge-success">Trắc nghiệm</span>
                            <span class="badge badge-warning">Trung bình</span>
                        </p>
                        <div class="content-card-footer">
                            <div class="content-meta">
                                <span>📝 20 câu</span>
                                <span>⏱️ 30 phút</span>
                            </div>
                            <button class="btn btn-sm btn-primary" onclick="window.location.href='exercises.html'">Làm Bài</button>
                        </div>
                    </div>
                </div>
                
                <div class="content-card" data-subject="Vật Lý">
                    <div class="content-card-image"></div>
                    <div class="content-card-body">
                        <h3 class="content-card-title">Bài tập Dao động điều hòa</h3>
                        <p class="content-card-description">
                            <span class="badge badge-info">Vật Lý</span>
                            <span class="badge badge-success">Tự luận</span>
                            <span class="badge badge-danger">Khó</span>
                        </p>
                        <div class="content-card-footer">
                            <div class="content-meta">
                                <span>📝 5 câu</span>
                                <span>⏱️ 45 phút</span>
                                <span>✅ Đã hoàn thành - 85%</span>
                            </div>
                            <button class="btn btn-sm btn-primary" onclick="window.location.href='exercises.html'">Xem Lại</button>
                        </div>
                    </div>
                </div>
                
                <div class="content-card" data-subject="Hóa Học">
                    <div class="content-card-image"></div>
                    <div class="content-card-body">
                        <h3 class="content-card-title">Bài tập Hóa học hữu cơ</h3>
                        <p class="content-card-description">
                            <span class="badge badge-info">Hóa Học</span>
                            <span class="badge badge-success">Trắc nghiệm</span>
                            <span class="badge badge-success">Dễ</span>
                        </p>
                        <div class="content-card-footer">
                            <div class="content-meta">
                                <span>📝 25 câu</span>
                                <span>⏱️ 35 phút</span>
                            </div>
                            <button class="btn btn-sm btn-primary" onclick="window.location.href='exercises.html'">Làm Bài</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
                <button class="btn btn-primary" onclick="window.location.href='exercises.html'">Xem Tất Cả Bài Tập</button>
            </div>
        `;
    }

    getStudentTests() {
        return `
            <div class="dashboard-header">
                <h1>Bài Kiểm Tra</h1>
                <p>Làm bài kiểm tra định kỳ hoặc kiểm tra thử để đánh giá kiến thức</p>
            </div>
            
            <div class="grid grid-2">
                <div class="card">
                    <h2 style="margin-bottom: 15px;">Bài Kiểm Tra Sắp Tới</h2>
                    <div style="margin-bottom: 15px; padding: 15px; background: var(--bg-secondary); border-radius: 12px;">
                        <p><strong>📅 Bài kiểm tra Toán:</strong> Ngày 15/12/2024 - 14:00</p>
                        <p><strong>Thời gian:</strong> 60 phút</p>
                        <p><strong>Số câu:</strong> 30 câu trắc nghiệm</p>
                        <button class="btn btn-primary" style="margin-top: 10px;">Xem Chi Tiết</button>
                    </div>
                    <div style="margin-bottom: 15px; padding: 15px; background: var(--bg-secondary); border-radius: 12px;">
                        <p><strong>📅 Bài kiểm tra Vật Lý:</strong> Ngày 18/12/2024 - 14:00</p>
                        <p><strong>Thời gian:</strong> 45 phút</p>
                        <p><strong>Số câu:</strong> 25 câu trắc nghiệm</p>
                        <button class="btn btn-primary" style="margin-top: 10px;">Xem Chi Tiết</button>
                    </div>
                    <div style="margin-bottom: 15px; padding: 15px; background: var(--bg-secondary); border-radius: 12px;">
                        <p><strong>📅 Bài kiểm tra Hóa Học:</strong> Ngày 22/12/2024 - 14:00</p>
                        <p><strong>Thời gian:</strong> 50 phút</p>
                        <p><strong>Số câu:</strong> 28 câu trắc nghiệm</p>
                        <button class="btn btn-primary" style="margin-top: 10px;">Xem Chi Tiết</button>
                    </div>
                    <div style="padding: 15px; background: var(--bg-secondary); border-radius: 12px;">
                        <p><strong>📅 Kiểm tra cuối kỳ Toán:</strong> Ngày 28/12/2024 - 08:00</p>
                        <p><strong>Thời gian:</strong> 90 phút</p>
                        <p><strong>Số câu:</strong> 40 câu (trắc nghiệm + tự luận)</p>
                        <button class="btn btn-primary" style="margin-top: 10px;">Xem Chi Tiết</button>
                    </div>
                </div>
                
                <div class="card">
                    <h2 style="margin-bottom: 15px;">Lịch Sử Kiểm Tra</h2>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Bài Kiểm Tra</th>
                                <th>Môn</th>
                                <th>Điểm</th>
                                <th>Ngày</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Kiểm tra giữa kỳ</td>
                                <td>Hóa Học</td>
                                <td>9.0</td>
                                <td>05/12/2024</td>
                            </tr>
                            <tr>
                                <td>Kiểm tra 15 phút</td>
                                <td>Toán</td>
                                <td>8.5</td>
                                <td>28/11/2024</td>
                            </tr>
                            <tr>
                                <td>Kiểm tra định kỳ</td>
                                <td>Vật Lý</td>
                                <td>8.0</td>
                                <td>20/11/2024</td>
                            </tr>
                            <tr>
                                <td>Kiểm tra 15 phút</td>
                                <td>Hóa Học</td>
                                <td>9.5</td>
                                <td>15/11/2024</td>
                            </tr>
                            <tr>
                                <td>Kiểm tra định kỳ</td>
                                <td>Toán</td>
                                <td>8.8</td>
                                <td>10/11/2024</td>
                            </tr>
                            <tr>
                                <td>Kiểm tra thử</td>
                                <td>Vật Lý</td>
                                <td>7.5</td>
                                <td>05/11/2024</td>
                            </tr>
                            <tr>
                                <td>Kiểm tra 15 phút</td>
                                <td>Toán</td>
                                <td>9.0</td>
                                <td>30/10/2024</td>
                            </tr>
                            <tr>
                                <td>Kiểm tra định kỳ</td>
                                <td>Hóa Học</td>
                                <td>8.5</td>
                                <td>25/10/2024</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    getStudentProgress() {
        const progressSection = this.renderProgressSection(this.getProgressData());

        return `
            <div class="dashboard-header">
                <h1>Tiến Độ Học Tập</h1>
                <p>Xem thống kê điểm số, bài đã hoàn thành, và các phần còn yếu</p>
            </div>
            
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-book"></i></div>
                    <div class="stat-info">
                        <h3>15</h3>
                        <p>Bài Giảng Đã Học</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-pen"></i></div>
                    <div class="stat-info">
                        <h3>8</h3>
                        <p>Bài Tập Đã Hoàn Thành</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-chart-bar"></i></div>
                    <div class="stat-info">
                        <h3>85%</h3>
                        <p>Điểm Trung Bình</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-bullseye"></i></div>
                    <div class="stat-info">
                        <h3>3</h3>
                        <p>Bài Kiểm Tra Sắp Tới</p>
                    </div>
                </div>
            </div>
            
            <h2 class="section-title">Tiến Độ Theo Môn Học</h2>
            ${progressSection}
            
            <div class="grid grid-2" style="margin-top: 30px;">
                <div class="card">
                    <h3>Điểm Số Theo Môn</h3>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Môn</th>
                                <th>Điểm TB</th>
                                <th>Bài Đã Làm</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Toán</td>
                                <td>8.5</td>
                                <td>12/15</td>
                            </tr>
                            <tr>
                                <td>Vật Lý</td>
                                <td>8.8</td>
                                <td>10/12</td>
                            </tr>
                            <tr>
                                <td>Hóa Học</td>
                                <td>9.0</td>
                                <td>15/15</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div class="card">
                    <h3>Gợi Ý Học Tập</h3>
                    <p style="margin-bottom: 10px;">📌 Cần cải thiện phần Đại số và Giải tích</p>
                    <p style="margin-bottom: 10px;">📌 Ôn tập thêm về Dao động điều hòa</p>
                    <p style="margin-bottom: 10px;">✅ Đã hoàn thành tốt phần Hóa học hữu cơ</p>
                    <button class="btn btn-primary" style="margin-top: 15px;">Xem Chi Tiết</button>
                </div>
            </div>
        `;
    }

    getTeacherInteraction() {
        return `
            <div class="dashboard-header">
                <h1>Tương Tác Với Giáo Viên</h1>
                <p>Đặt câu hỏi hoặc trao đổi trực tuyến về bài tập/bài kiểm tra</p>
            </div>
            
            <div class="grid grid-2">
                <div class="card">
                    <h2 style="margin-bottom: 15px;">Đặt Câu Hỏi</h2>
                    <form>
                        <div class="form-group">
                            <label>Chọn Giáo Viên</label>
                            <select>
                                <option>Nguyễn Thị A - Toán</option>
                                <option>Trần Văn B - Vật Lý</option>
                                <option>Lê Thị C - Hóa Học</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Chủ Đề</label>
                            <input type="text" placeholder="Ví dụ: Câu hỏi về đạo hàm">
                        </div>
                        <div class="form-group">
                            <label>Nội Dung Câu Hỏi</label>
                            <textarea rows="5" placeholder="Nhập câu hỏi của bạn..."></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Gửi Câu Hỏi</button>
                    </form>
                </div>
                
                <div class="card">
                    <h2 style="margin-bottom: 15px;">Tin Nhắn Gần Đây</h2>
                    <div style="max-height: 400px; overflow-y: auto;">
                        <div style="padding: 15px; border-bottom: 1px solid var(--border-color);">
                            <p><strong>Nguyễn Thị A:</strong> Em đã hiểu rồi, cảm ơn cô!</p>
                            <small style="color: #999;">2 giờ trước</small>
                        </div>
                        <div style="padding: 15px; border-bottom: 1px solid var(--border-color);">
                            <p><strong>Trần Văn B:</strong> Câu hỏi của em đã được giải đáp.</p>
                            <small style="color: #999;">1 ngày trước</small>
                        </div>
                        <div style="padding: 15px; border-bottom: 1px solid var(--border-color);">
                            <p><strong>Lê Thị C:</strong> Em cần hỗ trợ về bài tập hóa học...</p>
                            <small style="color: #999;">2 ngày trước</small>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card" style="margin-top: 20px;">
                <h2 style="margin-bottom: 15px;">Livestream</h2>
                <div class="content-grid">
                    <div class="content-card">
                        <div class="content-card-image"></div>
                        <div class="content-card-body">
                            <h3 class="content-card-title">Livestream Toán - Đại số</h3>
                            <p class="content-card-description">
                                <span class="badge badge-info">Toán</span>
                                <span class="badge badge-danger">Đang Live</span>
                            </p>
                            <div class="content-card-footer">
                                <div class="content-meta">
                                    <span>👥 45 học sinh</span>
                                    <span>🕒 15:00 - 16:30</span>
                                </div>
                                <button class="btn btn-sm btn-primary">Tham Gia</button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="content-card">
                        <div class="content-card-image"></div>
                        <div class="content-card-body">
                            <h3 class="content-card-title">Livestream Vật Lý - Dao động</h3>
                            <p class="content-card-description">
                                <span class="badge badge-info">Vật Lý</span>
                                <span class="badge badge-warning">Sắp Bắt Đầu</span>
                            </p>
                            <div class="content-card-footer">
                                <div class="content-meta">
                                    <span>📅 20/12/2024</span>
                                    <span>🕒 14:00 - 15:30</span>
                                </div>
                                <button class="btn btn-sm btn-primary">Đăng Ký</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getForum() {
        return `
            <div class="dashboard-header">
                <h1>Diễn Đàn Trao Đổi</h1>
                <p>Trao đổi, đặt câu hỏi và chia sẻ kiến thức theo từng bộ môn</p>
            </div>
            
            <div class="card" style="margin-bottom: 20px;">
                <button class="btn btn-primary" onclick="window.location.href='forum.html'">Tạo Bài Viết Mới</button>
            </div>
            
            <div class="subject-filters">
                <button class="filter-btn active" onclick="filterDashboard('all')">Tất Cả</button>
                <button class="filter-btn" onclick="filterDashboard('math')">Toán</button>
                <button class="filter-btn" onclick="filterDashboard('physics')">Vật Lý</button>
                <button class="filter-btn" onclick="filterDashboard('chemistry')">Hóa Học</button>
            </div>
            
            <div style="margin-top: 20px;">
                <div class="card" style="margin-bottom: 15px;" data-subject="Toán">
                    <div style="display: flex; gap: 15px; padding: 15px;">
                        <div style="font-size: 48px;">📐</div>
                        <div style="flex: 1;">
                            <h3 style="margin-bottom: 5px;">Câu hỏi về đạo hàm</h3>
                            <p style="color: var(--text-secondary); margin-bottom: 10px;">Em không hiểu cách tính đạo hàm của hàm số phức tạp...</p>
                            <div style="display: flex; gap: 20px; color: var(--text-light); font-size: 14px;">
                                <span>👤 Nguyễn Văn A</span>
                                <span>💬 5 trả lời</span>
                                <span>👁️ 23 lượt xem</span>
                                <span>🕒 2 giờ trước</span>
                            </div>
                        </div>
                        <button class="btn btn-sm btn-primary" onclick="window.location.href='forum.html'">Xem Chi Tiết</button>
                    </div>
                </div>
                <div class="card" style="margin-bottom: 15px;" data-subject="Vật Lý">
                    <div style="display: flex; gap: 15px; padding: 15px;">
                        <div style="font-size: 48px;">⚛️</div>
                        <div style="flex: 1;">
                            <h3 style="margin-bottom: 5px;">Dao động điều hòa có ứng dụng gì?</h3>
                            <p style="color: var(--text-secondary); margin-bottom: 10px;">Em muốn tìm hiểu về ứng dụng thực tế của dao động điều hòa...</p>
                            <div style="display: flex; gap: 20px; color: var(--text-light); font-size: 14px;">
                                <span>👤 Trần Thị B</span>
                                <span>💬 8 trả lời</span>
                                <span>👁️ 45 lượt xem</span>
                                <span>🕒 5 giờ trước</span>
                                <span class="badge badge-success">Đã Giải Quyết</span>
                            </div>
                        </div>
                        <button class="btn btn-sm btn-primary" onclick="window.location.href='forum.html'">Xem Chi Tiết</button>
                    </div>
                </div>
                <div class="card" style="margin-bottom: 15px;" data-subject="Hóa Học">
                    <div style="display: flex; gap: 15px; padding: 15px;">
                        <div style="font-size: 48px;">🧪</div>
                        <div style="flex: 1;">
                            <h3 style="margin-bottom: 5px;">Cân bằng phương trình hóa học</h3>
                            <p style="color: var(--text-secondary); margin-bottom: 10px;">Có cách nào nhanh để cân bằng phương trình hóa học không?</p>
                            <div style="display: flex; gap: 20px; color: var(--text-light); font-size: 14px;">
                                <span>👤 Lê Văn C</span>
                                <span>💬 12 trả lời</span>
                                <span>👁️ 67 lượt xem</span>
                                <span>🕒 1 ngày trước</span>
                            </div>
                        </div>
                        <button class="btn btn-sm btn-primary" onclick="window.location.href='forum.html'">Xem Chi Tiết</button>
                    </div>
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
                <button class="btn btn-primary" onclick="window.location.href='forum.html'">Xem Tất Cả Bài Viết</button>
            </div>
        `;
    }

    getPayment() {
        return `
            <div class="dashboard-header">
                <h1>Thanh Toán</h1>
                <p>Nạp tiền vào tài khoản và thanh toán tài liệu có phí</p>
            </div>
            
            <div class="grid grid-2">
                <div class="card">
                    <h2 style="margin-bottom: 15px;">Nạp Tiền Vào Tài Khoản</h2>
                    <div style="text-align: center; padding: 30px 0;">
                        <h1 style="font-size: 48px; color: var(--primary-color); margin-bottom: 10px;">500,000</h1>
                        <p style="font-size: 18px; color: #666;">VNĐ</p>
                    </div>
                    <form>
                        <div class="form-group">
                            <label>Số Tiền Nạp (VNĐ)</label>
                            <input type="number" min="10000" step="10000" value="100000">
                        </div>
                        <div class="form-group">
                            <label>Phương Thức Thanh Toán</label>
                            <select>
                                <option>VNPay</option>
                                <option>MoMo</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary">Nạp Tiền</button>
                    </form>
                </div>
                
                <div class="card">
                    <h2 style="margin-bottom: 15px;">Tài Liệu Đã Mua</h2>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Tên Tài Liệu</th>
                                <th>Môn</th>
                                <th>Giá</th>
                                <th>Ngày</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Dao động điều hòa</td>
                                <td>Vật Lý</td>
                                <td>50,000 VNĐ</td>
                                <td>10/12/2024</td>
                            </tr>
                            <tr>
                                <td>Hóa học hữu cơ</td>
                                <td>Hóa Học</td>
                                <td>30,000 VNĐ</td>
                                <td>08/12/2024</td>
                            </tr>
                            <tr>
                                <td>Phản ứng hóa học</td>
                                <td>Hóa Học</td>
                                <td>40,000 VNĐ</td>
                                <td>05/12/2024</td>
                            </tr>
                            <tr>
                                <td>Sóng cơ và sóng âm</td>
                                <td>Vật Lý</td>
                                <td>45,000 VNĐ</td>
                                <td>03/12/2024</td>
                            </tr>
                            <tr>
                                <td>Tích phân và ứng dụng</td>
                                <td>Toán</td>
                                <td>55,000 VNĐ</td>
                                <td>01/12/2024</td>
                            </tr>
                            <tr>
                                <td>Quang học</td>
                                <td>Vật Lý</td>
                                <td>50,000 VNĐ</td>
                                <td>28/11/2024</td>
                            </tr>
                        </tbody>
                    </table>
                    <button class="btn btn-secondary" style="width: 100%; margin-top: 15px;" onclick="window.location.href='payment.html'">Xem Chi Tiết</button>
                </div>
            </div>
        `;
    }

    // ========== TEACHER FUNCTIONS ==========
    
    getTeacherContentManagement() {
        return `
            <div class="dashboard-header">
                <h1>Quản Lý Nội Dung</h1>
                <p>Tải lên bài giảng, tạo bài tập, bài kiểm tra, bộ đề có phí hoặc miễn phí</p>
            </div>
            
            <div class="card" style="margin-bottom: 20px;">
                <button class="btn btn-primary" onclick="window.location.href='teacher-content.html'">Tạo Nội Dung Mới</button>
            </div>
            
            <div class="search-bar">
                <input type="text" placeholder="Tìm kiếm nội dung..." style="flex: 1;">
                <button class="btn btn-primary">Tìm Kiếm</button>
            </div>
            
            <div class="card">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Tiêu Đề</th>
                            <th>Môn Học</th>
                            <th>Loại</th>
                            <th>Giá</th>
                            <th>Trạng Thái</th>
                            <th>Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Đại số và Giải tích - Chương 1</td>
                            <td>Toán</td>
                            <td>Bài giảng</td>
                            <td>Miễn phí</td>
                            <td><span class="badge badge-success">Đã Duyệt</span></td>
                            <td>
                                <button class="btn btn-sm btn-primary">Sửa</button>
                                <button class="btn btn-sm btn-danger">Xóa</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Dao động điều hòa</td>
                            <td>Vật Lý</td>
                            <td>Video</td>
                            <td>50,000 VNĐ</td>
                            <td><span class="badge badge-success">Đã Duyệt</span></td>
                            <td>
                                <button class="btn btn-sm btn-primary">Sửa</button>
                                <button class="btn btn-sm btn-danger">Xóa</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Hóa học hữu cơ - Cơ bản</td>
                            <td>Hóa Học</td>
                            <td>Tài liệu</td>
                            <td>30,000 VNĐ</td>
                            <td><span class="badge badge-success">Đã Duyệt</span></td>
                            <td>
                                <button class="btn btn-sm btn-primary">Sửa</button>
                                <button class="btn btn-sm btn-danger">Xóa</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Bài tập Toán nâng cao</td>
                            <td>Toán</td>
                            <td>Bài tập</td>
                            <td>Miễn phí</td>
                            <td><span class="badge badge-success">Đã Duyệt</span></td>
                            <td>
                                <button class="btn btn-sm btn-primary">Sửa</button>
                                <button class="btn btn-sm btn-danger">Xóa</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Điện từ học</td>
                            <td>Vật Lý</td>
                            <td>Bài giảng</td>
                            <td>Miễn phí</td>
                            <td><span class="badge badge-success">Đã Duyệt</span></td>
                            <td>
                                <button class="btn btn-sm btn-primary">Sửa</button>
                                <button class="btn btn-sm btn-danger">Xóa</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Phản ứng hóa học</td>
                            <td>Hóa Học</td>
                            <td>Video</td>
                            <td>40,000 VNĐ</td>
                            <td><span class="badge badge-success">Đã Duyệt</span></td>
                            <td>
                                <button class="btn btn-sm btn-primary">Sửa</button>
                                <button class="btn btn-sm btn-danger">Xóa</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Hình học không gian</td>
                            <td>Toán</td>
                            <td>Bài giảng</td>
                            <td>Miễn phí</td>
                            <td><span class="badge badge-warning">Chờ Duyệt</span></td>
                            <td>
                                <button class="btn btn-sm btn-primary">Sửa</button>
                                <button class="btn btn-sm btn-danger">Xóa</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Sóng cơ và sóng âm</td>
                            <td>Vật Lý</td>
                            <td>Video</td>
                            <td>45,000 VNĐ</td>
                            <td><span class="badge badge-success">Đã Duyệt</span></td>
                            <td>
                                <button class="btn btn-sm btn-primary">Sửa</button>
                                <button class="btn btn-sm btn-danger">Xóa</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
                <button class="btn btn-primary" onclick="window.location.href='teacher-content.html'">Quản Lý Đầy Đủ</button>
            </div>
        `;
    }

    getTeacherStudentManagement() {
        return `
            <div class="dashboard-header">
                <h1>Quản Lý Học Sinh</h1>
                <p>Theo dõi danh sách học sinh, điểm số, tiến độ học tập, và mức độ tham gia</p>
            </div>
            
            <div class="card">
                <div class="search-bar" style="margin-bottom: 20px;">
                    <input type="text" placeholder="Tìm kiếm học sinh..." style="flex: 1;">
                    <select>
                        <option>Tất Cả Lớp</option>
                        <option>12A1</option>
                        <option>12A2</option>
                        <option>11B1</option>
                    </select>
                    <button class="btn btn-primary">Tìm Kiếm</button>
                </div>
                
                <table class="table">
                    <thead>
                        <tr>
                            <th>Tên Học Sinh</th>
                            <th>Lớp</th>
                            <th>Điểm TB</th>
                            <th>Bài Đã Làm</th>
                            <th>Tham Gia</th>
                            <th>Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Nguyễn Văn A</td>
                            <td>12A1</td>
                            <td>8.5</td>
                            <td>15/20</td>
                            <td><span class="badge badge-success">Tích Cực</span></td>
                            <td>
                                <button class="btn btn-sm btn-primary">Xem Chi Tiết</button>
                                <button class="btn btn-sm btn-secondary">Xuất PDF</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Trần Thị B</td>
                            <td>12A2</td>
                            <td>9.0</td>
                            <td>18/20</td>
                            <td><span class="badge badge-success">Tích Cực</span></td>
                            <td>
                                <button class="btn btn-sm btn-primary">Xem Chi Tiết</button>
                                <button class="btn btn-sm btn-secondary">Xuất PDF</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Lê Văn C</td>
                            <td>11B1</td>
                            <td>7.5</td>
                            <td>12/20</td>
                            <td><span class="badge badge-warning">Cần Cải Thiện</span></td>
                            <td>
                                <button class="btn btn-sm btn-primary">Xem Chi Tiết</button>
                                <button class="btn btn-sm btn-secondary">Xuất PDF</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Phạm Thị D</td>
                            <td>12A1</td>
                            <td>9.2</td>
                            <td>19/20</td>
                            <td><span class="badge badge-success">Tích Cực</span></td>
                            <td>
                                <button class="btn btn-sm btn-primary">Xem Chi Tiết</button>
                                <button class="btn btn-sm btn-secondary">Xuất PDF</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Hoàng Văn E</td>
                            <td>12A2</td>
                            <td>8.3</td>
                            <td>16/20</td>
                            <td><span class="badge badge-success">Tích Cực</span></td>
                            <td>
                                <button class="btn btn-sm btn-primary">Xem Chi Tiết</button>
                                <button class="btn btn-sm btn-secondary">Xuất PDF</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Vũ Thị F</td>
                            <td>11B1</td>
                            <td>7.8</td>
                            <td>13/20</td>
                            <td><span class="badge badge-warning">Cần Cải Thiện</span></td>
                            <td>
                                <button class="btn btn-sm btn-primary">Xem Chi Tiết</button>
                                <button class="btn btn-sm btn-secondary">Xuất PDF</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Đỗ Văn G</td>
                            <td>12A1</td>
                            <td>8.7</td>
                            <td>17/20</td>
                            <td><span class="badge badge-success">Tích Cực</span></td>
                            <td>
                                <button class="btn btn-sm btn-primary">Xem Chi Tiết</button>
                                <button class="btn btn-sm btn-secondary">Xuất PDF</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Bùi Thị H</td>
                            <td>12A2</td>
                            <td>8.0</td>
                            <td>14/20</td>
                            <td><span class="badge badge-success">Tích Cực</span></td>
                            <td>
                                <button class="btn btn-sm btn-primary">Xem Chi Tiết</button>
                                <button class="btn btn-sm btn-secondary">Xuất PDF</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="card" style="margin-top: 20px;">
                <h2 style="margin-bottom: 15px;">Xuất Dữ Liệu</h2>
                <div class="grid grid-2">
                    <button class="btn btn-secondary">Xuất Excel - Điểm Số</button>
                    <button class="btn btn-secondary">Xuất PDF - Báo Cáo</button>
                </div>
            </div>
        `;
    }

    getTeacherGrading() {
        return `
            <div class="dashboard-header">
                <h1>Chấm Bài và Phản Hồi</h1>
                <p>Chấm bài tự luận, cung cấp nhận xét hoặc giải đáp thắc mắc của học sinh</p>
            </div>
            
            <div class="card">
                <h2 style="margin-bottom: 15px;">Bài Tập Cần Chấm</h2>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Học Sinh</th>
                            <th>Bài Tập</th>
                            <th>Môn</th>
                            <th>Nộp Lúc</th>
                            <th>Trạng Thái</th>
                            <th>Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Nguyễn Văn A</td>
                            <td>Bài tập Đại số - Chương 1</td>
                            <td>Toán</td>
                            <td>10/12/2024 14:30</td>
                            <td><span class="badge badge-warning">Chờ Chấm</span></td>
                            <td>
                                <button class="btn btn-sm btn-primary">Chấm Bài</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Trần Thị B</td>
                            <td>Dao động điều hòa - Tự luận</td>
                            <td>Vật Lý</td>
                            <td>09/12/2024 16:20</td>
                            <td><span class="badge badge-success">Đã Chấm</span></td>
                            <td>
                                <button class="btn btn-sm btn-secondary">Xem Lại</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Lê Văn C</td>
                            <td>Bài tập Hóa học hữu cơ</td>
                            <td>Hóa Học</td>
                            <td>10/12/2024 09:15</td>
                            <td><span class="badge badge-warning">Chờ Chấm</span></td>
                            <td>
                                <button class="btn btn-sm btn-primary">Chấm Bài</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Phạm Thị D</td>
                            <td>Bài tập Giải tích</td>
                            <td>Toán</td>
                            <td>08/12/2024 15:45</td>
                            <td><span class="badge badge-success">Đã Chấm</span></td>
                            <td>
                                <button class="btn btn-sm btn-secondary">Xem Lại</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Hoàng Văn E</td>
                            <td>Bài tập Điện từ học</td>
                            <td>Vật Lý</td>
                            <td>09/12/2024 11:20</td>
                            <td><span class="badge badge-warning">Chờ Chấm</span></td>
                            <td>
                                <button class="btn btn-sm btn-primary">Chấm Bài</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Vũ Thị F</td>
                            <td>Bài tập Axit và Bazơ</td>
                            <td>Hóa Học</td>
                            <td>07/12/2024 13:30</td>
                            <td><span class="badge badge-success">Đã Chấm</span></td>
                            <td>
                                <button class="btn btn-sm btn-secondary">Xem Lại</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Đỗ Văn G</td>
                            <td>Bài tập Lượng giác</td>
                            <td>Toán</td>
                            <td>10/12/2024 17:00</td>
                            <td><span class="badge badge-warning">Chờ Chấm</span></td>
                            <td>
                                <button class="btn btn-sm btn-primary">Chấm Bài</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="card" style="margin-top: 20px;">
                <h2 style="margin-bottom: 15px;">Thắc Mắc Của Học Sinh</h2>
                <div style="max-height: 400px; overflow-y: auto;">
                    <div style="padding: 15px; border-bottom: 1px solid var(--border-color);">
                        <p><strong>Nguyễn Văn A:</strong> Em không hiểu cách giải bài tập số 5...</p>
                        <small style="color: var(--text-light);">2 giờ trước</small>
                        <button class="btn btn-sm btn-primary" style="margin-top: 10px;">Trả Lời</button>
                    </div>
                    <div style="padding: 15px; border-bottom: 1px solid var(--border-color);">
                        <p><strong>Trần Thị B:</strong> Em cần giải thích về công thức dao động...</p>
                        <small style="color: var(--text-light);">5 giờ trước</small>
                        <button class="btn btn-sm btn-primary" style="margin-top: 10px;">Trả Lời</button>
                    </div>
                    <div style="padding: 15px; border-bottom: 1px solid var(--border-color);">
                        <p><strong>Lê Văn C:</strong> Em không biết cách cân bằng phương trình này...</p>
                        <small style="color: var(--text-light);">1 ngày trước</small>
                        <button class="btn btn-sm btn-primary" style="margin-top: 10px;">Trả Lời</button>
                    </div>
                    <div style="padding: 15px; border-bottom: 1px solid var(--border-color);">
                        <p><strong>Phạm Thị D:</strong> Em muốn hỏi về bài tập tích phân...</p>
                        <small style="color: var(--text-light);">1 ngày trước</small>
                        <button class="btn btn-sm btn-primary" style="margin-top: 10px;">Trả Lời</button>
                    </div>
                    <div style="padding: 15px; border-bottom: 1px solid var(--border-color);">
                        <p><strong>Hoàng Văn E:</strong> Em cần giải thích về điện từ học...</p>
                        <small style="color: var(--text-light);">2 ngày trước</small>
                        <button class="btn btn-sm btn-primary" style="margin-top: 10px;">Trả Lời</button>
                    </div>
                    <div style="padding: 15px;">
                        <p><strong>Vũ Thị F:</strong> Em không hiểu về cấu trúc nguyên tử...</p>
                        <small style="color: var(--text-light);">2 ngày trước</small>
                        <button class="btn btn-sm btn-primary" style="margin-top: 10px;">Trả Lời</button>
                    </div>
                </div>
            </div>
        `;
    }

    getTeacherSchedule() {
        return `
            <div class="dashboard-header">
                <h1>Lịch Học và Bài Kiểm Tra</h1>
                <p>Lên lịch cho các bài kiểm tra hoặc nhắc nhở học sinh về bài tập</p>
            </div>
            
            <div class="card" style="margin-bottom: 20px;">
                <button class="btn btn-primary">Tạo Lịch Mới</button>
            </div>
            
            <div class="grid grid-2">
                <div class="card">
                    <h2 style="margin-bottom: 15px;">Lịch Sắp Tới</h2>
                    <div style="margin-bottom: 15px;">
                        <p><strong>📅 Bài kiểm tra Toán:</strong> Ngày 15/12/2024 - 14:00</p>
                        <p><strong>Lớp:</strong> 12A1, 12A2</p>
                        <button class="btn btn-sm btn-primary">Chỉnh Sửa</button>
                    </div>
                    <hr>
                    <div style="margin-top: 15px;">
                        <p><strong>📅 Deadline bài tập:</strong> Ngày 20/12/2024</p>
                        <p><strong>Môn:</strong> Vật Lý</p>
                        <button class="btn btn-sm btn-primary">Chỉnh Sửa</button>
                    </div>
                </div>
                
                <div class="card">
                    <h2 style="margin-bottom: 15px;">Lịch Sử</h2>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Sự Kiện</th>
                                <th>Ngày</th>
                                <th>Trạng Thái</th>
                            </tr>
                        </thead>
                    <tbody>
                        <tr>
                            <td>Bài kiểm tra Hóa Học</td>
                            <td>05/12/2024</td>
                            <td><span class="badge badge-success">Hoàn Thành</span></td>
                        </tr>
                        <tr>
                            <td>Deadline bài tập Toán</td>
                            <td>01/12/2024</td>
                            <td><span class="badge badge-success">Hoàn Thành</span></td>
                        </tr>
                        <tr>
                            <td>Bài kiểm tra Vật Lý</td>
                            <td>28/11/2024</td>
                            <td><span class="badge badge-success">Hoàn Thành</span></td>
                        </tr>
                        <tr>
                            <td>Deadline bài tập Hóa Học</td>
                            <td>25/11/2024</td>
                            <td><span class="badge badge-success">Hoàn Thành</span></td>
                        </tr>
                        <tr>
                            <td>Bài kiểm tra Toán giữa kỳ</td>
                            <td>20/11/2024</td>
                            <td><span class="badge badge-success">Hoàn Thành</span></td>
                        </tr>
                        <tr>
                            <td>Deadline bài tập Vật Lý</td>
                            <td>15/11/2024</td>
                            <td><span class="badge badge-success">Hoàn Thành</span></td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    getTeacherLivestream() {
        return `
            <div class="dashboard-header">
                <h1>Livestream</h1>
                <p>Livestream trao đổi cùng lúc với nhiều học sinh</p>
            </div>
            
            <div class="card" style="margin-bottom: 20px;">
                <button class="btn btn-primary">Tạo Livestream Mới</button>
            </div>
            
            <div class="content-grid">
                <div class="content-card">
                    <div class="content-card-image"></div>
                    <div class="content-card-body">
                        <h3 class="content-card-title">Livestream Toán - Đại số</h3>
                        <p class="content-card-description">
                            <span class="badge badge-danger">Đang Live</span>
                            <span class="badge badge-info">Toán</span>
                        </p>
                        <div class="content-card-footer">
                            <div class="content-meta">
                                <span>👥 45 học sinh</span>
                                <span>🕒 15:00 - 16:30</span>
                            </div>
                            <button class="btn btn-sm btn-primary">Quản Lý</button>
                        </div>
                    </div>
                </div>
                
                <div class="content-card">
                    <div class="content-card-image"></div>
                    <div class="content-card-body">
                        <h3 class="content-card-title">Livestream Vật Lý - Dao động</h3>
                        <p class="content-card-description">
                            <span class="badge badge-warning">Sắp Bắt Đầu</span>
                            <span class="badge badge-info">Vật Lý</span>
                        </p>
                        <div class="content-card-footer">
                            <div class="content-meta">
                                <span>📅 20/12/2024</span>
                                <span>🕒 14:00 - 15:30</span>
                            </div>
                            <button class="btn btn-sm btn-primary">Chỉnh Sửa</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card" style="margin-top: 20px;">
                <h2 style="margin-bottom: 15px;">Nhóm Chat</h2>
                <p>Quản lý các nhóm chat nhỏ dưới quyền quản lý của giáo viên</p>
                <button class="btn btn-secondary" style="margin-top: 10px;">Tạo Nhóm Chat</button>
            </div>
        `;
    }

    // ========== ADMIN FUNCTIONS ==========
    
    getAdminAccountManagement() {
        return `
            <div class="dashboard-header">
                <h1>Quản Lý Tài Khoản</h1>
                <p>Tìm kiếm, thêm, xóa, chỉnh sửa tài khoản của học sinh, giáo viên và quản trị viên</p>
            </div>
            
            <div class="card" style="margin-bottom: 20px;">
                <div class="search-bar">
                    <input type="text" placeholder="Tìm kiếm theo tên, email..." style="flex: 1;">
                    <select>
                        <option>Tất Cả</option>
                        <option>Học Sinh</option>
                        <option>Giáo Viên</option>
                        <option>Quản Trị Viên</option>
                    </select>
                    <button class="btn btn-primary">Tìm Kiếm</button>
                    <button class="btn btn-secondary" onclick="window.location.href='admin-accounts.html'">Thêm Tài Khoản</button>
                </div>
            </div>
            
            <div class="card">
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Họ và Tên</th>
                            <th>Email</th>
                            <th>Vai Trò</th>
                            <th>Trạng Thái</th>
                            <th>Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Nguyễn Văn A</td>
                            <td>nguyenvana@example.com</td>
                            <td><span class="badge badge-info">Học Sinh</span></td>
                            <td><span class="badge badge-success">Hoạt Động</span></td>
                            <td>
                                <button class="btn btn-sm btn-primary">Sửa</button>
                                <button class="btn btn-sm btn-danger">Xóa</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
                <button class="btn btn-primary" onclick="window.location.href='admin-accounts.html'">Quản Lý Đầy Đủ</button>
            </div>
        `;
    }

    getAdminContentManagement() {
        return `
            <div class="dashboard-header">
                <h1>Quản Lý Nội Dung</h1>
                <p>Kiểm duyệt, chỉnh sửa, xóa nội dung của hệ thống</p>
            </div>
            
            <div class="card">
                <h2 style="margin-bottom: 15px;">Nội Dung Cần Kiểm Duyệt</h2>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Tiêu Đề</th>
                            <th>Người Tạo</th>
                            <th>Ngày Tạo</th>
                            <th>Trạng Thái</th>
                            <th>Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Giải tích hàm số</td>
                            <td>Nguyễn Văn A</td>
                            <td>10/12/2024</td>
                            <td><span class="badge badge-warning">Chờ Duyệt</span></td>
                            <td>
                                <button class="btn btn-sm btn-success">Duyệt</button>
                                <button class="btn btn-sm btn-danger">Từ Chối</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="card" style="margin-top: 20px;">
                <h2 style="margin-bottom: 15px;">Quản Lý Diễn Đàn</h2>
                <p>Kiểm duyệt câu hỏi, chủ đề thảo luận trong diễn đàn</p>
                <button class="btn btn-secondary" style="margin-top: 10px;">Xem Diễn Đàn</button>
            </div>
        `;
    }

    getAdminPermissions() {
        return `
            <div class="dashboard-header">
                <h1>Quản Lý Phân Quyền</h1>
                <p>Phân quyền cho các nhóm người dùng (học sinh, giáo viên, admin)</p>
            </div>
            
            <div class="grid grid-3">
                <div class="card">
                    <h3>Học Sinh</h3>
                    <ul style="list-style: none; padding: 0;">
                        <li style="padding: 8px 0;">✅ Xem nội dung học tập</li>
                        <li style="padding: 8px 0;">✅ Làm bài tập</li>
                        <li style="padding: 8px 0;">✅ Tham gia diễn đàn</li>
                        <li style="padding: 8px 0;">❌ Quản lý nội dung</li>
                        <li style="padding: 8px 0;">❌ Xem thống kê hệ thống</li>
                    </ul>
                    <button class="btn btn-primary" style="width: 100%; margin-top: 15px;">Chỉnh Sửa</button>
                </div>
                
                <div class="card">
                    <h3>Giáo Viên</h3>
                    <ul style="list-style: none; padding: 0;">
                        <li style="padding: 8px 0;">✅ Quản lý nội dung</li>
                        <li style="padding: 8px 0;">✅ Quản lý học sinh</li>
                        <li style="padding: 8px 0;">✅ Chấm bài</li>
                        <li style="padding: 8px 0;">✅ Livestream</li>
                        <li style="padding: 8px 0;">❌ Quản lý tài khoản</li>
                    </ul>
                    <button class="btn btn-primary" style="width: 100%; margin-top: 15px;">Chỉnh Sửa</button>
                </div>
                
                <div class="card">
                    <h3>Quản Trị Viên</h3>
                    <ul style="list-style: none; padding: 0;">
                        <li style="padding: 8px 0;">✅ Tất cả quyền</li>
                        <li style="padding: 8px 0;">✅ Quản lý tài khoản</li>
                        <li style="padding: 8px 0;">✅ Kiểm duyệt nội dung</li>
                        <li style="padding: 8px 0;">✅ Thống kê hệ thống</li>
                        <li style="padding: 8px 0;">✅ Phân quyền</li>
                    </ul>
                    <button class="btn btn-primary" style="width: 100%; margin-top: 15px;">Chỉnh Sửa</button>
                </div>
            </div>
        `;
    }

    getAdminStatistics() {
        return `
            <div class="dashboard-header">
                <h1>Thống Kê Hệ Thống</h1>
                <p>Dashboard trực quan thể hiện thống kê về số lượng người dùng, lượt truy cập, doanh thu</p>
            </div>
            
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-users"></i></div>
                    <div class="stat-info">
                        <h3>1,250</h3>
                        <p>Tổng Người Dùng</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-book"></i></div>
                    <div class="stat-info">
                        <h3>420</h3>
                        <p>Bài Giảng</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-wallet"></i></div>
                    <div class="stat-info">
                        <h3>125M</h3>
                        <p>Doanh Thu</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-chart-bar"></i></div>
                    <div class="stat-info">
                        <h3>15K</h3>
                        <p>Lượt Truy Cập</p>
                    </div>
                </div>
            </div>
            
            <h2 class="section-title">Thống Kê Theo Bộ Môn</h2>
            <div class="grid grid-3">
                <div class="card">
                    <h3>Toán</h3>
                    <p><strong>Bài giảng:</strong> 150</p>
                    <p><strong>Học sinh:</strong> 450</p>
                    <p><strong>Doanh thu:</strong> 45M VNĐ</p>
                </div>
                <div class="card">
                    <h3>Vật Lý</h3>
                    <p><strong>Bài giảng:</strong> 135</p>
                    <p><strong>Học sinh:</strong> 380</p>
                    <p><strong>Doanh thu:</strong> 38M VNĐ</p>
                </div>
                <div class="card">
                    <h3>Hóa Học</h3>
                    <p><strong>Bài giảng:</strong> 135</p>
                    <p><strong>Học sinh:</strong> 420</p>
                    <p><strong>Doanh thu:</strong> 42M VNĐ</p>
                </div>
            </div>
        `;
    }

    getAdminTransactions() {
        return `
            <div class="dashboard-header">
                <h1>Quản Lý Giao Dịch</h1>
                <p>Quản lý và phê duyệt các giao dịch tài chính</p>
            </div>
            
            <div class="card">
                <div class="search-bar" style="margin-bottom: 20px;">
                    <input type="text" placeholder="Tìm kiếm giao dịch..." style="flex: 1;">
                    <select>
                        <option>Tất Cả</option>
                        <option>Nạp Tiền</option>
                        <option>Mua Tài Liệu</option>
                    </select>
                    <button class="btn btn-primary">Tìm Kiếm</button>
                </div>
                
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Người Dùng</th>
                            <th>Loại</th>
                            <th>Số Tiền</th>
                            <th>Phương Thức</th>
                            <th>Trạng Thái</th>
                            <th>Ngày</th>
                            <th>Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>001</td>
                            <td>Nguyễn Văn A</td>
                            <td>Nạp Tiền</td>
                            <td>500,000 VNĐ</td>
                            <td>VNPay</td>
                            <td><span class="badge badge-success">Thành Công</span></td>
                            <td>10/12/2024</td>
                            <td><button class="btn btn-sm btn-primary">Xem Chi Tiết</button></td>
                        </tr>
                        <tr>
                            <td>002</td>
                            <td>Trần Thị B</td>
                            <td>Mua Tài Liệu</td>
                            <td>50,000 VNĐ</td>
                            <td>Tài Khoản</td>
                            <td><span class="badge badge-success">Thành Công</span></td>
                            <td>09/12/2024</td>
                            <td><button class="btn btn-sm btn-primary">Xem Chi Tiết</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="card" style="margin-top: 20px;">
                <h2 style="margin-bottom: 15px;">Tổng Quan Doanh Thu</h2>
                <div class="grid grid-2">
                    <div>
                        <p><strong>Tổng doanh thu tháng này:</strong> 25M VNĐ</p>
                        <p><strong>Tổng doanh thu năm:</strong> 125M VNĐ</p>
                    </div>
                    <div>
                        <button class="btn btn-secondary">Xuất Báo Cáo Excel</button>
                    </div>
                </div>
            </div>
        `;
    }

    // ========== COMMON FUNCTIONS ==========
    
    getProfile() {
        const user = this.currentUser;
        return `
            <div class="dashboard-header">
                <h1>Thông Tin Tài Khoản</h1>
                <p>Xem và cập nhật thông tin cá nhân</p>
            </div>
            
            <div class="grid grid-2">
                <div class="card">
                    <h2 style="margin-bottom: 20px;">Thông Tin Cá Nhân</h2>
                    <form>
                        <div class="form-group">
                            <label>Họ và Tên</label>
                            <input type="text" value="${user.name || ''}">
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" value="${user.email || ''}">
                        </div>
                        <div class="form-group">
                            <label>Số Điện Thoại</label>
                            <input type="tel" value="${user.phone || ''}">
                        </div>
                        <div class="form-group">
                            <label>Vai Trò</label>
                            <input type="text" value="${user.role === 'student' ? 'Học Sinh' : user.role === 'teacher' ? 'Giáo Viên' : 'Quản Trị Viên'}" disabled>
                        </div>
                        <button type="submit" class="btn btn-primary">Cập Nhật</button>
                    </form>
                </div>
                
                <div class="card">
                    <h2 style="margin-bottom: 20px;">Đổi Mật Khẩu</h2>
                    <form>
                        <div class="form-group">
                            <label>Mật Khẩu Hiện Tại</label>
                            <input type="password">
                        </div>
                        <div class="form-group">
                            <label>Mật Khẩu Mới</label>
                            <input type="password">
                        </div>
                        <div class="form-group">
                            <label>Xác Nhận Mật Khẩu Mới</label>
                            <input type="password">
                        </div>
                        <button type="submit" class="btn btn-primary">Đổi Mật Khẩu</button>
                    </form>
                </div>
            </div>
            
            <div class="card" style="margin-top: 20px;">
                <h2 style="margin-bottom: 15px;">Khôi Phục Tài Khoản</h2>
                <p>Nếu bạn quên mật khẩu hoặc gặp vấn đề với tài khoản</p>
                <button class="btn btn-secondary">Khôi Phục Tài Khoản</button>
            </div>
        `;
    }
}

// Helper function for filter buttons
function filterDashboard(subject) {
    // Get current dashboard content
    const dashboardContent = document.getElementById('dashboard-content');
    if (!dashboardContent) return;
    
    // Get all content cards or exercise cards
    const cards = dashboardContent.querySelectorAll('.content-card');
    
    // Update filter buttons
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    buttons.forEach(btn => {
        if (btn.textContent.trim() === 'Tất Cả' && subject === 'all') {
            btn.classList.add('active');
        } else if (btn.textContent.trim() === 'Toán' && subject === 'math') {
            btn.classList.add('active');
        } else if (btn.textContent.trim() === 'Vật Lý' && subject === 'physics') {
            btn.classList.add('active');
        } else if (btn.textContent.trim() === 'Hóa Học' && subject === 'chemistry') {
            btn.classList.add('active');
        }
    });
    
    // Filter cards based on subject
    const subjectMap = {
        'math': 'Toán',
        'physics': 'Vật Lý',
        'chemistry': 'Hóa Học'
    };
    
    if (cards.length === 0) {
        // If no cards found, try to reload content from manager
        // This handles cases where content is dynamically loaded
        return;
    }
    
    cards.forEach(card => {
        if (subject === 'all') {
            card.style.display = '';
            return;
        }
        
        const targetSubject = subjectMap[subject];
        
        // Check data attribute first
        const dataSubject = card.getAttribute('data-subject');
        if (dataSubject) {
            if (dataSubject === targetSubject) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
            return;
        }
        
        // Fallback: check badge text content
        const badges = card.querySelectorAll('.badge');
        let found = false;
        badges.forEach(badge => {
            if (badge.textContent.trim() === targetSubject) {
                found = true;
            }
        });
        
        if (found) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Also filter cards in forum section (they use .card class)
    const forumCards = dashboardContent.querySelectorAll('.card[data-subject]');
    forumCards.forEach(card => {
        if (subject === 'all') {
            card.style.display = '';
            return;
        }
        
        const targetSubject = subjectMap[subject];
        const dataSubject = card.getAttribute('data-subject');
        if (dataSubject === targetSubject) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

// Initialize dashboard when DOM is loaded
let dashboardManager;
document.addEventListener('DOMContentLoaded', () => {
    dashboardManager = new DashboardManager();
    window.dashboardManager = dashboardManager; // Make it globally accessible
});
