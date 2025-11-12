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

    handleMenuAction(action, eventElement = null) {
        const dashboardContent = document.getElementById('dashboard-content');
        const role = this.currentUser.role || this.getRoleFromURL();
        
        if (eventElement) {
            // Update active menu item when navigation is triggered without page reload
        document.querySelectorAll('.nav-menu a').forEach(a => {
            a.style.color = '';
            a.style.fontWeight = '';
        });
            eventElement.style.color = 'var(--text-primary)';
            eventElement.style.fontWeight = '800';
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
                case 'showCompetitions':
                    dashboardContent.innerHTML = this.getStudentCompetitions();
                    break;
                case 'showResources':
                    dashboardContent.innerHTML = this.getStudentResources();
                    break;
                case 'showTeacherInteraction':
                    dashboardContent.innerHTML = this.getTeacherInteraction();
                    break;
                case 'showIssueReporting':
                    dashboardContent.innerHTML = this.getStudentIssueReporting();
                    break;
                case 'showForum':
                    window.location.href = 'forum.html';
                    return;
                case 'showPayment':
                    window.location.href = 'payment.html';
                    return;
                case 'showNotifications':
                    dashboardContent.innerHTML = this.getStudentNotifications();
                    break;
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
                case 'showPersonalization':
                    dashboardContent.innerHTML = this.getTeacherPersonalization();
                    break;
                case 'showFeedback':
                    dashboardContent.innerHTML = this.getTeacherFeedback();
                    break;
                case 'showRevenue':
                    dashboardContent.innerHTML = this.getTeacherRevenue();
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
                    this.bindAdminContentEvents();
                    break;
                case 'showPermissions':
                    dashboardContent.innerHTML = this.getAdminPermissions();
                    this.bindAdminContentEvents();
                    break;
                case 'showStatistics':
                    dashboardContent.innerHTML = this.getAdminStatistics();
                    this.bindAdminMonitoringEvents();
                    break;
                case 'showTransactions':
                    dashboardContent.innerHTML = this.getAdminTransactions();
                    break;
                case 'showMonitoring':
                    dashboardContent.innerHTML = this.getAdminMonitoring();
                    this.bindAdminMonitoringEvents();
                    break;
                case 'showSystemNotifications':
                    dashboardContent.innerHTML = this.getAdminNotifications();
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
            { title: 'Đại số và Giải tích - Chương 1', subject: 'Toán', type: 'Bài giảng', format: 'video', students: 120, price: 0 },
            { title: 'Dao động điều hòa', subject: 'Vật Lý', type: 'Video', format: 'video', students: 95, price: 50000 },
            { title: 'Hóa học hữu cơ - Cơ bản', subject: 'Hóa Học', type: 'Tài liệu', format: 'pdf', students: 88, price: 30000 },
            { title: 'Bài tập Toán nâng cao', subject: 'Toán', type: 'Bài tập', format: 'exercise', students: 150, price: 0 },
            { title: 'Điện từ học', subject: 'Vật Lý', type: 'Bài giảng', format: 'video', students: 110, price: 0 },
            { title: 'Phản ứng hóa học', subject: 'Hóa Học', type: 'Video', format: 'video', students: 92, price: 40000 },
            { title: 'Hình học không gian', subject: 'Toán', type: 'Bài giảng', format: 'video', students: 135, price: 0 },
            { title: 'Sóng cơ và sóng âm', subject: 'Vật Lý', type: 'Video', format: 'video', students: 105, price: 45000 },
            { title: 'Cân bằng hóa học', subject: 'Hóa Học', type: 'Tài liệu', format: 'pdf', students: 98, price: 0 },
            { title: 'Lượng giác cơ bản', subject: 'Toán', type: 'Bài giảng', format: 'video', students: 128, price: 0 },
            { title: 'Quang học', subject: 'Vật Lý', type: 'Video', format: 'video', students: 112, price: 50000 },
            { title: 'Điện hóa học', subject: 'Hóa Học', type: 'Bài giảng', format: 'video', students: 87, price: 0 }
        ];
        
        // Limit số lượng hiển thị nếu được chỉ định
        const displayContents = limit ? contents.slice(0, limit) : contents;

        return displayContents.map(content => {
            const priceLabel = content.price === 0
                ? 'Miễn phí'
                : `${this.formatCurrency(content.price)} VNĐ`;
            const priceClass = content.price === 0 ? 'price-free' : 'price-paid';
            const escapedTitle = content.title.replace(/'/g, "\\'");
            const secondaryAction = content.price === 0
                ? `<button class="btn btn-sm btn-secondary" onclick="downloadContent('${escapedTitle}')">Tải</button>`
                : `<button class="btn btn-sm btn-secondary" onclick="purchaseDashboardContent('${escapedTitle}')">Mua</button>`;
            
            const actionButtons = [
                `<button class="btn btn-sm btn-primary" onclick="window.location.href='content.html'">Xem</button>`,
                secondaryAction
            ];

            if (userType === 'teacher') {
                actionButtons.push('<button class="btn btn-sm btn-secondary">Sửa</button>');
            }

            return `
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
                                <span class="content-price ${priceClass}">${priceLabel}</span>
                            </div>
                            <div class="action-buttons">
                                ${actionButtons.join('')}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
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

    formatCurrency(value) {
        const numericValue = Number(value) || 0;
        return numericValue.toLocaleString('vi-VN');
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

    getStudentCompetitions() {
        return `
            <div class="dashboard-header">
                <h1>Thi Đua & Cuộc Thi</h1>
                <p>Đăng ký tham gia, theo dõi tiến độ và bảng xếp hạng thi đua học tập</p>
            </div>

            <div class="grid grid-2">
                <div class="card">
                    <h2 style="margin-bottom: 15px;">Cuộc Thi Đang Mở Đăng Ký</h2>
                    <div style="margin-bottom: 15px;">
                        <p><strong>🏆 Olympic Toán 12:</strong> Bắt đầu 05/01/2025</p>
                        <p><strong>Hình thức:</strong> 50 câu trắc nghiệm + 2 bài tự luận</p>
                        <button class="btn btn-sm btn-primary">Đăng Ký Ngay</button>
                    </div>
                    <hr>
                    <div style="margin: 15px 0;">
                        <p><strong>🏆 Thách thức Vật Lý:</strong> Bắt đầu 12/01/2025</p>
                        <p><strong>Hình thức:</strong> 30 câu trắc nghiệm thời gian thực</p>
                        <button class="btn btn-sm btn-primary">Đăng Ký Ngay</button>
                    </div>
                    <hr>
                    <div>
                        <p><strong>🏆 Đấu Trường Hóa Học:</strong> Bắt đầu 20/01/2025</p>
                        <p><strong>Hình thức:</strong> Bài thi thực nghiệm mô phỏng</p>
                        <button class="btn btn-sm btn-primary">Đăng Ký Ngay</button>
                    </div>
                </div>

                <div class="card">
                    <h2 style="margin-bottom: 15px;">Cuộc Thi Của Tôi</h2>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Tên Cuộc Thi</th>
                                <th>Trạng Thái</th>
                                <th>Thời Gian</th>
                                <th>Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Cuộc thi Thi Đua Toán</td>
                                <td><span class="badge badge-success">Đang Tham Gia</span></td>
                                <td>Đến 31/12/2024</td>
                                <td><button class="btn btn-sm btn-secondary">Vào Phòng Thi</button></td>
                            </tr>
                            <tr>
                                <td>Đấu Trường Vật Lý</td>
                                <td><span class="badge badge-warning">Sắp Diễn Ra</span></td>
                                <td>15/01/2025</td>
                                <td><button class="btn btn-sm btn-primary">Xem Chi Tiết</button></td>
                            </tr>
                            <tr>
                                <td>Hóa Học Ứng Dụng</td>
                                <td><span class="badge badge-success">Đã Hoàn Thành</span></td>
                                <td>10/11/2024</td>
                                <td><button class="btn btn-sm btn-secondary">Xem Kết Quả</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="card" style="margin-top: 20px;">
                <h2 style="margin-bottom: 15px;">Bảng Xếp Hạng Thi Đua</h2>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Hạng</th>
                            <th>Học Sinh</th>
                            <th>Môn Thi</th>
                            <th>Điểm</th>
                            <th>Huy Hiệu</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>🥇 1</td>
                            <td>Nguyễn Văn A</td>
                            <td>Toán</td>
                            <td>985</td>
                            <td><span class="badge badge-success">Chuyên Gia</span></td>
                        </tr>
                        <tr>
                            <td>🥈 2</td>
                            <td>Trần Thị B</td>
                            <td>Vật Lý</td>
                            <td>960</td>
                            <td><span class="badge badge-info">Xuất Sắc</span></td>
                        </tr>
                        <tr>
                            <td>🥉 3</td>
                            <td>Lê Văn C</td>
                            <td>Hóa Học</td>
                            <td>942</td>
                            <td><span class="badge badge-warning">Nổi Bật</span></td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Phạm Thị D</td>
                            <td>Toán</td>
                            <td>915</td>
                            <td><span class="badge badge-info">Xuất Sắc</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
    }

    getStudentResources() {
        return `
            <div class="dashboard-header">
                <h1>Tài Liệu Đã Mua & Đánh Giá</h1>
                <p>Quản lý tài liệu đã mua, tải xuống và gửi đánh giá phản hồi</p>
            </div>

            <div class="card">
                <h2 style="margin-bottom: 15px;">Danh Sách Tài Liệu</h2>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Tên Tài Liệu</th>
                            <th>Môn</th>
                            <th>Ngày Mua</th>
                            <th>Đánh Giá</th>
                            <th>Tải Xuống</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Bộ đề thi thử THPT Quốc gia - Toán</td>
                            <td>Toán</td>
                            <td>02/12/2024</td>
                            <td>
                                <span class="badge badge-success">⭐⭐⭐⭐☆</span>
                                <button class="btn btn-sm btn-secondary">Chỉnh Sửa</button>
                            </td>
                            <td><button class="btn btn-sm btn-primary">Tải PDF</button></td>
                        </tr>
                        <tr>
                            <td>Chuyên đề Dao động cơ học</td>
                            <td>Vật Lý</td>
                            <td>28/11/2024</td>
                            <td>
                                <span class="badge badge-warning">Chưa Đánh Giá</span>
                                <button class="btn btn-sm btn-secondary">Đánh Giá</button>
                            </td>
                            <td><button class="btn btn-sm btn-primary">Tải Video</button></td>
                        </tr>
                        <tr>
                            <td>Sổ tay phản ứng hữu cơ</td>
                            <td>Hóa Học</td>
                            <td>20/11/2024</td>
                            <td>
                                <span class="badge badge-success">⭐⭐⭐⭐⭐</span>
                                <button class="btn btn-sm btn-secondary">Chỉnh Sửa</button>
                            </td>
                            <td><button class="btn btn-sm btn-primary">Tải PDF</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="card" style="margin-top: 20px;">
                <h2 style="margin-bottom: 15px;">Gửi Đánh Giá Nhanh</h2>
                <form>
                    <div class="form-group">
                        <label>Chọn Tài Liệu</label>
                        <select>
                            <option>Bộ đề thi thử THPT Quốc gia - Toán</option>
                            <option>Chuyên đề Dao động cơ học</option>
                            <option>Sổ tay phản ứng hữu cơ</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Mức Đánh Giá</label>
                        <select>
                            <option>⭐⭐⭐⭐⭐ - Tuyệt vời</option>
                            <option>⭐⭐⭐⭐ - Rất tốt</option>
                            <option>⭐⭐⭐ - Tốt</option>
                            <option>⭐⭐ - Trung bình</option>
                            <option>⭐ - Cần cải thiện</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Nhận Xét</label>
                        <textarea rows="4" placeholder="Chia sẻ cảm nhận của bạn..."></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Gửi Đánh Giá</button>
                </form>
            </div>
        `;
    }

    getStudentIssueReporting() {
        return `
            <div class="dashboard-header">
                <h1>Báo Cáo Nội Dung / Lỗi</h1>
                <p>Thông báo nhanh nội dung sai lệch, sự cố kỹ thuật hoặc hành vi vi phạm</p>
            </div>

            <div class="card">
                <h2 style="margin-bottom: 15px;">Gửi Báo Cáo Mới</h2>
                <form>
                    <div class="grid grid-2">
                        <div class="form-group">
                            <label>Loại Báo Cáo</label>
                            <select>
                                <option>Nội dung sai</option>
                                <option>Lỗi kỹ thuật</option>
                                <option>Hành vi vi phạm</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Môn Học</label>
                            <select>
                                <option>Toán</option>
                                <option>Vật Lý</option>
                                <option>Hóa Học</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Liên Kết hoặc ID Nội Dung</label>
                        <input type="text" placeholder="Ví dụ: content-12345">
                    </div>
                    <div class="form-group">
                        <label>Mô Tả Chi Tiết</label>
                        <textarea rows="5" placeholder="Mô tả vấn đề gặp phải..."></textarea>
                    </div>
                    <div class="form-group">
                        <label>Đính Kèm (tùy chọn)</label>
                        <input type="file">
                    </div>
                    <button type="submit" class="btn btn-primary">Gửi Báo Cáo</button>
                </form>
            </div>

            <div class="card" style="margin-top: 20px;">
                <h2 style="margin-bottom: 15px;">Lịch Sử Báo Cáo</h2>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Mã Báo Cáo</th>
                            <th>Loại</th>
                            <th>Ngày Gửi</th>
                            <th>Trạng Thái</th>
                            <th>Phản Hồi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>#BR-20241210</td>
                            <td>Nội dung sai</td>
                            <td>10/12/2024</td>
                            <td><span class="badge badge-success">Đã xử lý</span></td>
                            <td>Đã điều chỉnh lời giải câu 5.</td>
                        </tr>
                        <tr>
                            <td>#BR-20241205</td>
                            <td>Lỗi kỹ thuật</td>
                            <td>05/12/2024</td>
                            <td><span class="badge badge-warning">Đang xử lý</span></td>
                            <td>Đang kiểm tra video không phát được.</td>
                        </tr>
                        <tr>
                            <td>#BR-20241128</td>
                            <td>Hành vi vi phạm</td>
                            <td>28/11/2024</td>
                            <td><span class="badge badge-success">Đã xử lý</span></td>
                            <td>Tài khoản vi phạm đã bị chặn.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
    }

    getStudentNotifications() {
        return `
            <div class="dashboard-header">
                <h1>Thông Báo & Nhắc Nhở</h1>
                <p>Thiết lập thông báo qua email/SMS và xem lịch nhắc học tập cá nhân</p>
            </div>

            <div class="grid grid-2">
                <div class="card">
                    <h2 style="margin-bottom: 15px;">Tùy Chọn Thông Báo</h2>
                    <form>
                        <div class="form-group" style="display: flex; align-items: center; justify-content: space-between;">
                            <div>
                                <strong>Email</strong>
                                <p style="color: var(--text-light); margin-top: 4px;">Nhận thông báo deadline, lịch học qua email</p>
                            </div>
                            <label class="switch">
                                <input type="checkbox" checked>
                                <span class="slider round"></span>
                            </label>
                        </div>
                        <div class="form-group" style="display: flex; align-items: center; justify-content: space-between;">
                            <div>
                                <strong>SMS</strong>
                                <p style="color: var(--text-light); margin-top: 4px;">Thông báo ngắn cho các sự kiện quan trọng</p>
                            </div>
                            <label class="switch">
                                <input type="checkbox">
                                <span class="slider round"></span>
                            </label>
                        </div>
                        <div class="form-group" style="display: flex; align-items: center; justify-content: space-between;">
                            <div>
                                <strong>Thông báo trong ứng dụng</strong>
                                <p style="color: var(--text-light); margin-top: 4px;">Hiển thị trên dashboard</p>
                            </div>
                            <label class="switch">
                                <input type="checkbox" checked>
                                <span class="slider round"></span>
                            </label>
                        </div>
                        <button type="submit" class="btn btn-primary">Lưu Thiết Lập</button>
                    </form>
                </div>

                <div class="card">
                    <h2 style="margin-bottom: 15px;">Lịch Nhắc Học Tập</h2>
                    <div style="margin-bottom: 15px; padding: 15px; background: var(--bg-secondary); border-radius: 12px;">
                        <p><strong>Toán - Bài kiểm tra chương 3</strong></p>
                        <p>🔔 Nhắc lúc 18:00 ngày 14/12/2024</p>
                    </div>
                    <div style="margin-bottom: 15px; padding: 15px; background: var(--bg-secondary); border-radius: 12px;">
                        <p><strong>Vật Lý - Livestream ôn tập</strong></p>
                        <p>🔔 Nhắc trước 30 phút (13:30, 18/12/2024)</p>
                    </div>
                    <div style="padding: 15px; background: var(--bg-secondary); border-radius: 12px;">
                        <p><strong>Hóa Học - Nộp bài tập</strong></p>
                        <p>🔔 Nhắc lúc 20:00 ngày 19/12/2024</p>
                    </div>
                    <button class="btn btn-secondary" style="margin-top: 15px;">Thêm Lịch Nhắc</button>
                </div>
            </div>

            <div class="card" style="margin-top: 20px;">
                <h2 style="margin-bottom: 15px;">Thông Báo Gần Đây</h2>
                <ul style="list-style: none; padding: 0;">
                    <li style="padding: 12px 0; border-bottom: 1px solid var(--border-color);">
                        <strong>✅ Hoàn thành Bài tập Hóa học hữu cơ</strong> - Cộng 5 điểm thưởng thi đua.
                    </li>
                    <li style="padding: 12px 0; border-bottom: 1px solid var(--border-color);">
                        <strong>📅 Lịch livestream Toán nâng cao</strong> - 15:00, 15/12/2024. Đừng quên tham gia!
                    </li>
                    <li style="padding: 12px 0;">
                        <strong>⚠️ Nội dung mới cần xem</strong> - Chuyên đề Dao động cơ học vừa cập nhật.
                    </li>
                </ul>
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

    getTeacherPersonalization() {
        return `
            <div class="dashboard-header">
                <h1>Cá Nhân Hóa Nội Dung</h1>
                <p>Phân nhóm học sinh và gợi ý nội dung phù hợp theo năng lực</p>
            </div>

            <div class="card">
                <h2 style="margin-bottom: 15px;">Phân Nhóm Học Sinh</h2>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Nhóm</th>
                            <th>Tiêu Chí</th>
                            <th>Số Học Sinh</th>
                            <th>Nội Dung Gợi Ý</th>
                            <th>Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Nhóm Nền Tảng</td>
                            <td>Điểm TB < 7.0</td>
                            <td>28</td>
                            <td>Bài giảng cơ bản, video minh họa</td>
                            <td><button class="btn btn-sm btn-primary">Điều Chỉnh</button></td>
                        </tr>
                        <tr>
                            <td>Nhóm Khá</td>
                            <td>7.0 ≤ Điểm TB < 8.5</td>
                            <td>35</td>
                            <td>Bài tập tự luyện, đề ôn tập chương</td>
                            <td><button class="btn btn-sm btn-primary">Điều Chỉnh</button></td>
                        </tr>
                        <tr>
                            <td>Nhóm Nâng Cao</td>
                            <td>Điểm TB ≥ 8.5</td>
                            <td>18</td>
                            <td>Đề thi thử, topic chuyên sâu</td>
                            <td><button class="btn btn-sm btn-primary">Điều Chỉnh</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="grid grid-2" style="margin-top: 20px;">
                <div class="card">
                    <h2 style="margin-bottom: 15px;">Gợi Ý Nội Dung Mới</h2>
                    <ul style="list-style: none; padding: 0;">
                        <li style="padding: 12px 0; border-bottom: 1px solid var(--border-color);">
                            📘 Đề thi thử THPT quốc gia - Chuyên đề Hàm số (phù hợp Nhóm Khá)
                        </li>
                        <li style="padding: 12px 0; border-bottom: 1px solid var(--border-color);">
                            🎥 Video giải chi tiết Dao động điều hòa (phù hợp Nhóm Nền Tảng)
                        </li>
                        <li style="padding: 12px 0;">
                            🧪 Bộ thí nghiệm ảo phản ứng oxi hóa khử (phù hợp Nhóm Nâng Cao)
                        </li>
                    </ul>
                    <button class="btn btn-secondary" style="margin-top: 15px;">Xem Chi Tiết Gợi Ý</button>
                </div>
                <div class="card">
                    <h2 style="margin-bottom: 15px;">Thiết Lập Quy Tắc Cá Nhân Hóa</h2>
                    <form>
                        <div class="form-group">
                            <label>Tiêu Chí</label>
                            <select>
                                <option>Điểm trung bình</option>
                                <option>Tỷ lệ hoàn thành bài tập</option>
                                <option>Mức độ tham gia</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Ngưỡng Phân Nhóm</label>
                            <input type="text" placeholder="Ví dụ: < 6.5 → cần hỗ trợ">
                        </div>
                        <button type="submit" class="btn btn-primary">Lưu Quy Tắc</button>
                    </form>
                </div>
            </div>
        `;
    }

    getTeacherFeedback() {
        return `
            <div class="dashboard-header">
                <h1>Phản Hồi & Khiếu Nại</h1>
                <p>Tiếp nhận phản hồi từ học sinh và xử lý khiếu nại liên quan nội dung giảng dạy</p>
            </div>

            <div class="card">
                <h2 style="margin-bottom: 15px;">Phản Hồi Gần Đây</h2>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Học Sinh</th>
                            <th>Chủ Đề</th>
                            <th>Ngày Gửi</th>
                            <th>Trạng Thái</th>
                            <th>Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Nguyễn Văn A</td>
                            <td>Cần giải thích thêm ví dụ bài 4</td>
                            <td>10/12/2024</td>
                            <td><span class="badge badge-warning">Chưa phản hồi</span></td>
                            <td><button class="btn btn-sm btn-primary">Phản Hồi</button></td>
                        </tr>
                        <tr>
                            <td>Trần Thị B</td>
                            <td>Livestream bị gián đoạn</td>
                            <td>09/12/2024</td>
                            <td><span class="badge badge-success">Đã xử lý</span></td>
                            <td><button class="btn btn-sm btn-secondary">Xem</button></td>
                        </tr>
                        <tr>
                            <td>Lê Văn C</td>
                            <td>Khiếu nại điểm bài tập</td>
                            <td>08/12/2024</td>
                            <td><span class="badge badge-info">Đang xử lý</span></td>
                            <td><button class="btn btn-sm btn-primary">Cập Nhật</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="grid grid-2" style="margin-top: 20px;">
                <div class="card">
                    <h2 style="margin-bottom: 15px;">Mẫu Phản Hồi Nhanh</h2>
                    <form>
                        <div class="form-group">
                            <label>Chọn Học Sinh</label>
                            <select>
                                <option>Nguyễn Văn A</option>
                                <option>Trần Thị B</option>
                                <option>Lê Văn C</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Phản Hồi</label>
                            <textarea rows="5" placeholder="Nhập phản hồi chi tiết..."></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Gửi</button>
                    </form>
                </div>
                <div class="card">
                    <h2 style="margin-bottom: 15px;">Thống Kê Mức Độ Hài Lòng</h2>
                    <p><strong>Điểm trung bình:</strong> 4.6 / 5</p>
                    <p><strong>Phản hồi tích cực:</strong> 82%</p>
                    <p><strong>Phản hồi cần cải thiện:</strong> 12%</p>
                    <p><strong>Khiếu nại:</strong> 6%</p>
                    <button class="btn btn-secondary" style="margin-top: 15px;">Xem Báo Cáo Chi Tiết</button>
                </div>
            </div>
        `;
    }

    getTeacherRevenue() {
        return `
            <div class="dashboard-header">
                <h1>Doanh Thu & Rút Tiền</h1>
                <p>Theo dõi doanh thu từ nội dung có phí và thực hiện rút tiền</p>
            </div>

            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-wallet"></i></div>
                    <div class="stat-info">
                        <h3>12.5M</h3>
                        <p>Doanh Thu Tháng Này (VNĐ)</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-coins"></i></div>
                    <div class="stat-info">
                        <h3>68.4M</h3>
                        <p>Doanh Thu Năm Nay (VNĐ)</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-download"></i></div>
                    <div class="stat-info">
                        <h3>420</h3>
                        <p>Lượt Mua Tài Liệu</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-hand-holding-usd"></i></div>
                    <div class="stat-info">
                        <h3>5.0M</h3>
                        <p>Số Dư Có Thể Rút</p>
                    </div>
                </div>
            </div>

            <div class="grid grid-2" style="margin-top: 20px;">
                <div class="card">
                    <h2 style="margin-bottom: 15px;">Yêu Cầu Rút Tiền</h2>
                    <form>
                        <div class="form-group">
                            <label>Số Tiền (VNĐ)</label>
                            <input type="number" min="100000" step="50000" value="1000000">
                        </div>
                        <div class="form-group">
                            <label>Phương Thức</label>
                            <select>
                                <option>Tài khoản ngân hàng</option>
                                <option>MoMo</option>
                                <option>VNPay</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Ghi Chú</label>
                            <textarea rows="3" placeholder="Thông tin bổ sung (nếu có)..."></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Gửi Yêu Cầu</button>
                    </form>
                </div>
                <div class="card">
                    <h2 style="margin-bottom: 15px;">Lịch Sử Giao Dịch</h2>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Ngày</th>
                                <th>Loại</th>
                                <th>Số Tiền</th>
                                <th>Trạng Thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>10/12/2024</td>
                                <td>Mua tài liệu</td>
                                <td>120,000 VNĐ</td>
                                <td><span class="badge badge-success">Đã nhận</span></td>
                            </tr>
                            <tr>
                                <td>05/12/2024</td>
                                <td>Rút tiền</td>
                                <td>2,000,000 VNĐ</td>
                                <td><span class="badge badge-success">Hoàn tất</span></td>
                            </tr>
                            <tr>
                                <td>01/12/2024</td>
                                <td>Mua bài giảng</td>
                                <td>80,000 VNĐ</td>
                                <td><span class="badge badge-success">Đã nhận</span></td>
                            </tr>
                        </tbody>
                    </table>
                    <button class="btn btn-secondary" style="margin-top: 15px;">Xuất Báo Cáo</button>
                </div>
            </div>
        `;
    }

    // ========== ADMIN FUNCTIONS ==========
    
    getAdminAccountManagement() {
        return `
            <div class="dashboard-header">
                <h1>Quản Lý Tài Khoản</h1>
                <p>Tìm kiếm, thêm, khóa/mở khóa tài khoản, thiết lập 2FA và theo dõi lịch sử hoạt động.</p>
            </div>
            
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-users"></i></div>
                    <div class="stat-info">
                        <h3>1,250</h3>
                        <p>Tài khoản đang hoạt động</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-user-lock"></i></div>
                    <div class="stat-info">
                        <h3>32</h3>
                        <p>Tài khoản bị khóa</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-user-clock"></i></div>
                    <div class="stat-info">
                        <h3>18</h3>
                        <p>Chờ xác minh email</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-shield-alt"></i></div>
                    <div class="stat-info">
                        <h3>72%</h3>
                        <p>Tỷ lệ bật 2FA</p>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">Bộ lọc & thao tác nhanh</h2>
                    <div class="card-actions-inline">
                        <button class="btn btn-primary" onclick="window.location.href='admin-accounts.html'">Thêm Tài Khoản</button>
                        <button class="btn btn-secondary">Xuất CSV</button>
                        <button class="btn btn-secondary">Kích hoạt 2FA hàng loạt</button>
                    </div>
                </div>
                <div class="grid grid-4">
                    <div class="form-group">
                        <label>Từ khóa</label>
                        <input type="text" placeholder="Tên, email, số điện thoại...">
                    </div>
                    <div class="form-group">
                        <label>Vai trò</label>
                    <select>
                            <option>Tất cả</option>
                            <option>Học sinh</option>
                            <option>Giáo viên</option>
                            <option>Quản trị viên</option>
                    </select>
                    </div>
                    <div class="form-group">
                        <label>Trạng thái</label>
                        <select>
                            <option>Tất cả</option>
                            <option>Hoạt động</option>
                            <option>Tạm khóa</option>
                            <option>Chờ kích hoạt</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>2FA</label>
                        <select>
                            <option>Tất cả</option>
                            <option>Đã bật</option>
                            <option>Chưa bật</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <div class="table-wrapper">
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Họ và Tên</th>
                            <th>Email</th>
                            <th>Vai Trò</th>
                                <th>2FA</th>
                            <th>Trạng Thái</th>
                                <th>Đăng Nhập Cuối</th>
                            <th>Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                                <td>USR-1201</td>
                            <td>Nguyễn Văn A</td>
                            <td>nguyenvana@example.com</td>
                            <td><span class="badge badge-info">Học Sinh</span></td>
                                <td><span class="badge badge-success">Đã bật</span></td>
                                <td><span class="badge badge-success">Hoạt động</span></td>
                                <td>10/12/2024 07:45</td>
                                <td>
                                    <div class="draft-item-actions">
                                        <button class="btn btn-sm btn-secondary">Đặt lại mật khẩu</button>
                                        <button class="btn btn-sm btn-secondary">Gán vai trò</button>
                                        <button class="btn btn-sm btn-danger">Khóa</button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>USR-0982</td>
                                <td>Trần Thị B</td>
                                <td>tranthib@example.com</td>
                                <td><span class="badge badge-success">Giáo Viên</span></td>
                                <td><span class="badge badge-warning">Chưa bật</span></td>
                                <td><span class="badge badge-success">Hoạt động</span></td>
                                <td>09/12/2024 21:10</td>
                                <td>
                                    <div class="draft-item-actions">
                                        <button class="btn btn-sm btn-secondary">Yêu cầu bật 2FA</button>
                                        <button class="btn btn-sm btn-secondary">Phân lớp</button>
                                        <button class="btn btn-sm btn-danger">Khóa</button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>USR-0650</td>
                                <td>Lê Văn C</td>
                                <td>levanc@example.com</td>
                                <td><span class="badge badge-info">Học Sinh</span></td>
                                <td><span class="badge badge-danger">Chưa bật</span></td>
                                <td><span class="badge badge-warning">Tạm khóa</span></td>
                                <td>07/12/2024 18:25</td>
                                <td>
                                    <div class="draft-item-actions">
                                        <button class="btn btn-sm btn-primary">Mở khóa</button>
                                        <button class="btn btn-sm btn-secondary">Xem nhật ký</button>
                                <button class="btn btn-sm btn-danger">Xóa</button>
                                    </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <div>
                        <h2 class="card-title">Nhật ký thao tác gần đây</h2>
                        <p class="card-subtitle">Theo dõi các hành động quan trọng trên hệ thống tài khoản.</p>
                    </div>
                </div>
                <ul class="timeline">
                    <li>
                        <strong>10/12/2024 09:12</strong><br>
                        Admin A khóa tài khoản USR-0650 do vi phạm chính sách nội dung.
                    </li>
                    <li>
                        <strong>09/12/2024 22:45</strong><br>
                        Admin B kích hoạt 2FA bắt buộc cho nhóm giáo viên.
                    </li>
                    <li>
                        <strong>09/12/2024 17:30</strong><br>
                        Hệ thống gửi email xác minh lại cho 12 tài khoản chưa kích hoạt.
                    </li>
                </ul>
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
                                <div class="table-actions">
                                    <button class="btn btn-sm btn-secondary" data-action="preview-content" data-content-id="CONTENT-001">Xem Trước</button>
                                <button class="btn btn-sm btn-success">Duyệt</button>
                                <button class="btn btn-sm btn-danger">Từ Chối</button>
                                </div>
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

            <div class="modal" id="admin-content-preview-modal" aria-hidden="true">
                <div class="modal-content modal-xl">
                    <button class="modal-close" id="admin-content-preview-close" aria-label="Đóng">&times;</button>
                    <div id="admin-content-preview-body"></div>
                </div>
            </div>
        `;
    }

    getAdminPermissions() {
        return `
            <div class="dashboard-header">
                <h1>Quản Lý Phân Quyền</h1>
                <p>Thiết lập ma trận quyền, chính sách truy cập và theo dõi audit log phân quyền.</p>
            </div>
            
                <div class="card">
                <div class="card-header">
                    <div>
                        <h2 class="card-title">Ma Trận Quyền Truy Cập</h2>
                        <p class="card-subtitle">Định nghĩa hành động cho từng nhóm người dùng theo SRS 6.3.3.</p>
                    </div>
                    <div class="card-actions-inline">
                        <button class="btn btn-secondary">Tải xuống ma trận</button>
                        <button class="btn btn-secondary">So sánh phiên bản</button>
                    </div>
                </div>
                <div class="table-wrapper">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Quyền</th>
                                <th>Học Sinh</th>
                                <th>Giáo Viên</th>
                                <th>Admin</th>
                                <th>Ghi Chú</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Xem & học nội dung</td>
                                <td>✔</td>
                                <td>✔</td>
                                <td>✔</td>
                                <td>Quyền cơ bản cho tất cả vai trò</td>
                            </tr>
                            <tr>
                                <td>Tạo/Chỉnh sửa nội dung</td>
                                <td>✘</td>
                                <td>✔</td>
                                <td>✔</td>
                                <td>6.2.2 - Giáo viên được phép biên soạn</td>
                            </tr>
                            <tr>
                                <td>Phê duyệt nội dung</td>
                                <td>✘</td>
                                <td>✘</td>
                                <td>✔</td>
                                <td>6.3.2.4 - Chỉ Admin</td>
                            </tr>
                            <tr>
                                <td>Quản lý tài khoản</td>
                                <td>✘</td>
                                <td>✘</td>
                                <td>✔</td>
                                <td>6.3.1 - Admin quản trị hệ thống</td>
                            </tr>
                            <tr>
                                <td>Xem báo cáo/Doanh thu</td>
                                <td>Giới hạn</td>
                                <td>✔</td>
                                <td>✔</td>
                                <td>Học sinh chỉ xem tiến độ cá nhân</td>
                            </tr>
                            <tr>
                                <td>Livestream & tương tác lớp</td>
                                <td>✘</td>
                                <td>✔</td>
                                <td>✔</td>
                                <td>6.2.4 - Giáo viên chủ động livestream</td>
                            </tr>
                            <tr>
                                <td>Quản lý thông báo</td>
                                <td>Nhận</td>
                                <td>Nhận/Gửi lớp</td>
                                <td>✔</td>
                                <td>6.3.6 - Admin gửi thông báo toàn hệ thống</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </div>
                
            <div class="grid grid-2">
                <div class="card">
                    <h2 class="card-title">Chính Sách Bảo Mật</h2>
                    <div class="draft-item-meta" style="margin-bottom: 16px;">
                        <span>Phiên bản chính sách: 2.1 (ban hành 01/12/2024)</span>
                    </div>
                    <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 12px;">
                        <li>🔐 Bắt buộc 2FA cho Admin và Giáo viên.</li>
                        <li>📁 Phân tách dữ liệu theo lớp học, quyền xem chi tiết điểm số chỉ dành cho giáo viên phụ trách.</li>
                        <li>🗂️ Lưu trữ nhật ký truy cập tối thiểu 180 ngày.</li>
                        <li>🛡️ Tài khoản đăng nhập sai quá 5 lần sẽ tự động khóa (6.3.1.2.4).</li>
                    </ul>
                </div>
                </div>
                
                <div class="card">
                <h2 class="card-title">Mẫu Vai Trò Tùy Chỉnh</h2>
                <p class="card-subtitle">Tạo và quản lý các vai trò đặc thù theo yêu cầu.</p>
                <div class="form-actions-inline">
                    <button class="btn btn-primary" data-action="create-role">Tạo vai trò mới</button>
                </div>
                <div class="table-wrapper" style="margin-top: 16px;">
                    <table class="table" id="role-table">
                        <thead>
                            <tr>
                                <th>Tên vai trò</th>
                                <th>Mô tả</th>
                                <th>Quyền mặc định</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr data-role-id="ROLE-ASSISTANT">
                                <td>Trợ giảng</td>
                                <td>Hỗ trợ giáo viên quản lý lớp học.</td>
                                <td>Truy cập lớp, phản hồi bài tập, không duyệt nội dung.</td>
                                <td>
                                    <div class="table-actions">
                                        <button class="btn btn-sm btn-secondary" data-action="edit-role" data-role-id="ROLE-ASSISTANT">Chỉnh sửa</button>
                                        <button class="btn btn-sm btn-danger" data-action="delete-role" data-role-id="ROLE-ASSISTANT">Xóa</button>
                                    </div>
                                </td>
                            </tr>
                            <tr data-role-id="ROLE-MODERATOR">
                                <td>Kiểm duyệt viên</td>
                                <td>Giám sát diễn đàn và nội dung người dùng.</td>
                                <td>Xem báo cáo, đề xuất khóa nội dung, không chỉnh sửa tài chính.</td>
                                <td>
                                    <div class="table-actions">
                                        <button class="btn btn-sm btn-secondary" data-action="edit-role" data-role-id="ROLE-MODERATOR">Chỉnh sửa</button>
                                        <button class="btn btn-sm btn-danger" data-action="delete-role" data-role-id="ROLE-MODERATOR">Xóa</button>
                                    </div>
                                </td>
                            </tr>
                            <tr data-role-id="ROLE-INSPECTOR">
                                <td>Thanh tra nội bộ</td>
                                <td>Kiểm tra các thao tác admin và giáo viên.</td>
                                <td>Xem audit log, truy cập báo cáo bảo mật, không chỉnh sửa nội dung.</td>
                                <td>
                                    <div class="table-actions">
                                        <button class="btn btn-sm btn-secondary" data-action="edit-role" data-role-id="ROLE-INSPECTOR">Chỉnh sửa</button>
                                        <button class="btn btn-sm btn-danger" data-action="delete-role" data-role-id="ROLE-INSPECTOR">Xóa</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
                
                <div class="card">
                <div class="card-header">
                    <div>
                        <h2 class="card-title">Audit Log Phân Quyền</h2>
                        <p class="card-subtitle">Theo dõi thay đổi quyền truy cập và chính sách bảo mật (6.3.3.6).</p>
                </div>
                </div>
                <ul class="timeline">
                    <li>
                        <strong>10/12/2024 08:40</strong><br>
                        Admin B chỉnh sửa quyền Livestream cho vai trò Giáo viên, giới hạn 200 người tham gia đồng thời.
                    </li>
                    <li>
                        <strong>09/12/2024 19:05</strong><br>
                        Admin A tạo vai trò “Kiểm duyệt viên” và cấp quyền đọc báo cáo vi phạm.
                    </li>
                    <li>
                        <strong>08/12/2024 16:20</strong><br>
                        Hệ thống tự động khóa quyền phê duyệt của Admin dự phòng do không kích hoạt 2FA trước hạn.
                    </li>
                    </ul>
                </div>
        `;
    }

    bindAdminContentEvents() {
        const previewButtons = document.querySelectorAll('[data-action="preview-content"]');
        previewButtons.forEach(button => {
            button.addEventListener('click', () => {
                const contentId = button.getAttribute('data-content-id');
                this.openAdminContentPreview(contentId);
            });
        });

        const closeBtn = document.getElementById('admin-content-preview-close');
        const modal = document.getElementById('admin-content-preview-modal');
        if (closeBtn) {
            closeBtn.onclick = () => this.closeAdminContentPreview();
        }
        if (modal) {
            modal.addEventListener('click', (event) => {
                if (event.target === modal) {
                    this.closeAdminContentPreview();
                }
            });
        }

        this.bindAdminMonitoringEvents();
    }

    bindAdminMonitoringEvents() {
        const incidentTable = document.querySelector('[data-admin-incident-table]');
        if (incidentTable) {
            incidentTable.addEventListener('click', (event) => {
                const button = event.target.closest('[data-action^="incident"]');
                if (!button) return;

                const incidentId = button.getAttribute('data-incident-id');
                const action = button.getAttribute('data-action');

                if (action === 'incident-detail') {
                    this.openIncidentDetailModal(incidentId);
                } else if (action === 'incident-confirm') {
                    alert(`Đã xác nhận sự cố ${incidentId} (mô phỏng).`);
                } else if (action === 'incident-close') {
                    alert(`Đã đóng sự cố ${incidentId} (mô phỏng).`);
                }
            });
        }

        const incidentModal = document.getElementById('incident-detail-modal');
        const incidentCloseBtn = document.getElementById('incident-detail-close');
        if (incidentCloseBtn) {
            incidentCloseBtn.onclick = () => this.closeIncidentDetailModal();
        }
        if (incidentModal) {
            incidentModal.addEventListener('click', (event) => {
                if (event.target === incidentModal) {
                    this.closeIncidentDetailModal();
                }
            });
        }
    }

    openAdminContentPreview(contentId) {
        const modal = document.getElementById('admin-content-preview-modal');
        const body = document.getElementById('admin-content-preview-body');
        if (!modal || !body) return;

        const data = this.getContentPreviewData(contentId);
        if (!data) {
            alert('Không tìm thấy bản nháp nội dung.');
            return;
        }

        const attachments = data.attachments?.length
            ? `<div class="preview-section">
                    <h3>Tệp đính kèm</h3>
                    <ul class="preview-attachments">
                        ${data.attachments.map(file => `<li><i class="fa-solid fa-file-lines"></i> ${file}</li>`).join('')}
                    </ul>
               </div>`
            : '';

        const versionHistory = data.versionHistory?.length
            ? `<div class="preview-section">
                    <h3>Lịch sử chỉnh sửa</h3>
                    <ul class="timeline">
                        ${data.versionHistory.map(item => `<li><strong>${item.time}</strong><br>${item.note}</li>`).join('')}
                    </ul>
               </div>`
            : '';

        const notes = data.editorNotes?.length
            ? `<div class="preview-section">
                    <h3>Ghi chú từ biên tập</h3>
                    <ul class="editor-notes">
                        ${data.editorNotes.map(note => `<li>${note}</li>`).join('')}
                    </ul>
               </div>`
            : '';

        body.innerHTML = `
            <div class="preview-header">
                <div>
                    <h2>${data.title}</h2>
                    <p class="card-subtitle">Được gửi bởi ${data.author} • ${data.submittedAt}</p>
                </div>
                <span class="status-chip ${data.statusClass}">${data.statusLabel}</span>
            </div>

            <div class="preview-meta-grid">
                <div>
                    <span class="meta-label">Môn học</span>
                    <span class="meta-value">${data.subject}</span>
                </div>
                <div>
                    <span class="meta-label">Loại nội dung</span>
                    <span class="meta-value">${data.type}</span>
                </div>
                <div>
                    <span class="meta-label">Thời lượng</span>
                    <span class="meta-value">${data.duration}</span>
                </div>
                <div>
                    <span class="meta-label">Độ khó</span>
                    <span class="meta-value">${data.level}</span>
                </div>
                <div>
                    <span class="meta-label">Chương/Bài</span>
                    <span class="meta-value">${data.module}</span>
                </div>
                <div>
                    <span class="meta-label">Thẻ</span>
                    <span class="meta-value">${data.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ')}</span>
                </div>
            </div>

            <div class="preview-section">
                <h3>Tóm tắt nội dung</h3>
                <p>${data.summary}</p>
            </div>

            <div class="preview-section">
                <h3>Nội dung mẫu</h3>
                <div class="preview-body">${data.body}</div>
            </div>

            ${attachments}
            ${versionHistory}
            ${notes}

            <div class="preview-actions">
                <button class="btn btn-secondary" data-preview-action="reject">Từ chối</button>
                <button class="btn btn-primary" data-preview-action="approve">Duyệt nội dung</button>
            </div>
        `;

        const actionButtons = body.querySelectorAll('[data-preview-action]');
        actionButtons.forEach(button => {
            button.onclick = () => {
                const action = button.getAttribute('data-preview-action');
                if (action === 'approve') {
                    alert('Đã duyệt nội dung (mô phỏng).');
                } else {
                    alert('Đã từ chối nội dung (mô phỏng).');
                }
                this.closeAdminContentPreview();
            };
        });

        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    closeAdminContentPreview() {
        const modal = document.getElementById('admin-content-preview-modal');
        if (!modal) return;
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }

    getContentPreviewData(contentId = 'CONTENT-001') {
        const dataset = {
            'CONTENT-001': {
                title: 'Giải tích hàm số - Bài giảng chi tiết',
                author: 'Nguyễn Văn A',
                submittedAt: '10/12/2024 09:15',
                statusClass: 'pending',
                statusLabel: 'Đang chờ duyệt',
                subject: 'Toán',
                type: 'Bài giảng Video + PDF',
                duration: '45 phút',
                level: 'Trung cấp',
                module: 'Chương 3 - Ứng dụng đạo hàm',
                tags: ['Đạo hàm', 'Cực trị', 'Ứng dụng'],
                summary: 'Bài giảng giới thiệu các ứng dụng của đạo hàm trong việc tìm cực trị, xét tính đơn điệu và lập bảng biến thiên của hàm số. Nội dung đi kèm ví dụ minh hoạ, bài tập tự luyện và đáp án.',
                body: `
                    <p><strong>Mục tiêu học tập:</strong> Sau bài học, học sinh nắm được kỹ thuật xét dấu đạo hàm, tìm cực trị và dựng đồ thị hàm số bậc ba.</p>
                    <p><strong>Cấu trúc bài:</strong></p>
                    <ol>
                        <li>Ôn tập nhanh khái niệm đạo hàm, bảng biến thiên.</li>
                        <li>Ví dụ thực hành: Hàm bậc ba, hàm phân thức.</li>
                        <li>Bài tập luyện tập có lời giải chi tiết.</li>
                    </ol>
                    <p><strong>Lưu ý:</strong> Video minh hoạ (15 phút đầu) + file PDF tổng hợp công thức (8 trang).</p>
                `,
                attachments: ['video_bai_giang.mp4', 'tong_hop_cong_thuc.pdf', 'bo_bai_tap_tu_luyen.docx'],
                versionHistory: [
                    { time: '10/12/2024 09:10', note: 'Giáo viên cập nhật thêm 5 bài tập mức vận dụng cao.' },
                    { time: '09/12/2024 18:45', note: 'Bổ sung phần tổng kết cuối bài.' }
                ],
                editorNotes: [
                    'Đề nghị kiểm tra lại phần minh hoạ đồ thị ở phút 08:30.',
                    'Thêm phụ đề cho video để hỗ trợ học viên.'
                ]
            }
        };

        return dataset[contentId] || dataset['CONTENT-001'];
    }

    openIncidentDetailModal(incidentId = 'INC-20241210-01') {
        const modal = document.getElementById('incident-detail-modal');
        const body = document.getElementById('incident-detail-body');
        if (!modal || !body) return;

        const data = this.getIncidentDetailData(incidentId);
        if (!data) {
            alert('Không tìm thấy thông tin sự cố.');
            return;
        }

        body.innerHTML = `
            <div class="preview-header">
                <div>
                    <h2>Sự cố ${data.id}</h2>
                    <p class="card-subtitle">${data.title}</p>
                </div>
                <span class="status-chip ${data.statusClass}">${data.status}</span>
            </div>

            <div class="incident-meta">
                <div class="incident-meta-item">
                    <span class="label">Mức độ</span>
                    <span class="value">${data.severity}</span>
                </div>
                <div class="incident-meta-item">
                    <span class="label">Dịch vụ ảnh hưởng</span>
                    <span class="value">${data.service}</span>
                </div>
                <div class="incident-meta-item">
                    <span class="label">Thời gian ghi nhận</span>
                    <span class="value">${data.reportedAt}</span>
                </div>
                <div class="incident-meta-item">
                    <span class="label">Người phụ trách</span>
                    <span class="value">${data.assignee}</span>
                </div>
            </div>

            <div class="incident-section">
                <h3>Mô tả chi tiết</h3>
                <p>${data.description}</p>
            </div>

            <div class="incident-section">
                <h3>Tác động</h3>
                <ul>
                    ${data.impact.map(item => `<li>• ${item}</li>`).join('')}
                </ul>
            </div>

            <div class="incident-section">
                <h3>Các bước xử lý</h3>
                <ul>
                    ${data.steps.map(item => `<li><strong>${item.time}</strong> - ${item.action}</li>`).join('')}
                </ul>
            </div>

            <div class="incident-section">
                <h3>Khuyến nghị</h3>
                <ul>
                    ${data.recommendations.map(item => `<li>• ${item}</li>`).join('')}
                </ul>
            </div>

            <div class="incident-actions">
                <button class="btn btn-secondary" data-action="incident-confirm" data-incident-id="${data.id}">Xác nhận</button>
                <button class="btn btn-success" data-action="incident-close" data-incident-id="${data.id}">Đóng lỗi</button>
            </div>
        `;

        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    closeIncidentDetailModal() {
        const modal = document.getElementById('incident-detail-modal');
        if (!modal) return;
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }

    getIncidentDetailData(incidentId = 'INC-20241210-01') {
        const dataset = {
            'INC-20241210-01': {
                id: 'INC-20241210-01',
                title: 'Lỗi đồng bộ điểm số',
                status: 'Đang xử lý',
                statusClass: 'pending',
                severity: 'Critical',
                service: 'API Đồng Bộ Điểm',
                reportedAt: '10/12/2024 08:20',
                assignee: 'Nguyễn Hoàng (DevOps)',
                description: 'Hệ thống đồng bộ điểm giữa khoá học và bảng điểm tổng bị dừng do lỗi kết nối Redis. Một số điểm trung bình của học sinh chưa được cập nhật đúng.',
                impact: [
                    'Ảnh hưởng tới 320 học sinh khối 12.',
                    'Bảng điểm cuối kỳ tạm thời hiển thị dữ liệu cũ.',
                    'Giáo viên không thể xuất báo cáo điểm.'
                ],
                steps: [
                    { time: '08:25', action: 'Phát hiện cảnh báo độ trễ từ hệ thống monitoring.' },
                    { time: '08:30', action: 'Lock chức năng đồng bộ để tránh dữ liệu sai lệch.' },
                    { time: '08:45', action: 'Khởi động lại cụm Redis và kiểm tra job đồng bộ.' }
                ],
                recommendations: [
                    'Tăng số lượng instance dự phòng cho cụm Redis.',
                    'Bổ sung cảnh báo khi job đồng bộ chậm hơn 2 phút.',
                    'Gửi thông báo tới giáo viên và học sinh khi điểm được cập nhật.'
                ]
            },
            'INC-20241208-04': {
                id: 'INC-20241208-04',
                title: 'Gateway thanh toán chậm',
                status: 'Đã khôi phục',
                statusClass: 'published',
                severity: 'Major',
                service: 'Gateway Thanh Toán VNPay',
                reportedAt: '08/12/2024 21:05',
                assignee: 'Trần Minh (Backend)',
                description: 'VNPay bảo trì đột xuất dẫn tới thời gian phản hồi lâu. Một số giao dịch bị treo trạng thái chờ xác nhận.',
                impact: [
                    'Khoảng 45 giao dịch chờ xác nhận trong 15 phút.',
                    'Học sinh không nhận được email xác nhận thanh toán ngay.'
                ],
                steps: [
                    { time: '21:10', action: 'Liên hệ đầu mối VNPay để xác nhận bảo trì.' },
                    { time: '21:15', action: 'Chuyển các giao dịch sang chế độ retry thủ công.' },
                    { time: '21:30', action: 'Gửi thông báo tới học sinh bị ảnh hưởng.' }
                ],
                recommendations: [
                    'Thiết lập kênh thông báo downtime của VNPay.',
                    'Bổ sung giao diện theo dõi trạng thái giao dịch theo thời gian thực.'
                ]
            },
            'INC-20241205-02': {
                id: 'INC-20241205-02',
                title: 'Lỗi hiển thị livestream',
                status: 'Đã khắc phục',
                statusClass: 'published',
                severity: 'Minor',
                service: 'Hệ thống Livestream',
                reportedAt: '05/12/2024 19:40',
                assignee: 'Lê Quỳnh (Frontend)',
                description: 'Một số trình duyệt phiên bản cũ không tải được player livestream do thay đổi đường dẫn CDN.',
                impact: [
                    'Khoảng 30 học sinh không xem được livestream Toán.',
                    'Số liệu thống kê viewer giảm tạm thời.'
                ],
                steps: [
                    { time: '19:45', action: 'Rollback cấu hình CDN về phiên bản trước.' },
                    { time: '19:50', action: 'Làm sạch cache CloudFront.' },
                    { time: '20:00', action: 'Gửi hướng dẫn người dùng refresh trình duyệt.' }
                ],
                recommendations: [
                    'Kiểm thử cross-browser trước khi cập nhật CDN.',
                    'Thiết lập fallback player cho trình duyệt cũ.'
                ]
            }
        };

        return dataset[incidentId] || dataset['INC-20241210-01'];
    }

    getAdminStatistics() {
        return `
            <div class="dashboard-header">
                <h1>Dashboard Doanh Thu</h1>
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

    getAdminMonitoring() {
        return `
            <div class="dashboard-header">
                <h1>Giám Sát Lỗi Hệ Thống</h1>
                <p>Theo dõi tình trạng dịch vụ, cảnh báo lỗi và nhật ký sự cố</p>
            </div>

            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-server"></i></div>
                    <div class="stat-info">
                        <h3>99.95%</h3>
                        <p>Uptime 30 ngày gần nhất</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-exclamation-triangle"></i></div>
                    <div class="stat-info">
                        <h3>2</h3>
                        <p>Sự cố mở</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-bug"></i></div>
                    <div class="stat-info">
                        <h3>14</h3>
                        <p>Lỗi đã xử lý tuần này</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-shield-alt"></i></div>
                    <div class="stat-info">
                        <h3>Không</h3>
                        <p>Sự cố bảo mật</p>
                    </div>
                </div>
            </div>

            <div class="card" style="margin-top: 20px;">
                <h2 style="margin-bottom: 15px;">Tình Trạng Dịch Vụ</h2>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Dịch Vụ</th>
                            <th>Trạng Thái</th>
                            <th>Thời Gian Kiểm Tra</th>
                            <th>Ghi Chú</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>API Học Sinh</td>
                            <td><span class="badge badge-success">Hoạt động</span></td>
                            <td>10/12/2024 10:15</td>
                            <td>Không có lỗi</td>
                        </tr>
                        <tr>
                            <td>Gateway Thanh Toán</td>
                            <td><span class="badge badge-warning">Gián đoạn nhẹ</span></td>
                            <td>10/12/2024 09:42</td>
                            <td>Đang bảo trì VNPay</td>
                        </tr>
                        <tr>
                            <td>Hệ thống Livestream</td>
                            <td><span class="badge badge-success">Hoạt động</span></td>
                            <td>10/12/2024 10:05</td>
                            <td>Độ trễ dưới 300ms</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="card" style="margin-top: 20px;">
                <h2 style="margin-bottom: 15px;">Nhật Ký Sự Cố</h2>
                <table class="table" data-admin-incident-table>
                    <thead>
                        <tr>
                            <th>Mã</th>
                            <th>Mức Độ</th>
                            <th>Mô Tả</th>
                            <th>Thời Gian</th>
                            <th>Trạng Thái</th>
                            <th>Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>#INC-20241210-01</td>
                            <td><span class="badge badge-danger">Critical</span></td>
                            <td>Lỗi đồng bộ điểm số</td>
                            <td>10/12/2024 08:20</td>
                            <td><span class="badge badge-warning">Đang xử lý</span></td>
                            <td>
                                <div class="table-actions">
                                    <button class="btn btn-sm btn-secondary" data-action="incident-detail" data-incident-id="INC-20241210-01">Xem chi tiết</button>
                                    <button class="btn btn-sm btn-primary" data-action="incident-confirm" data-incident-id="INC-20241210-01">Xác nhận</button>
                                    <button class="btn btn-sm btn-success" data-action="incident-close" data-incident-id="INC-20241210-01">Đóng lỗi</button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>#INC-20241208-04</td>
                            <td><span class="badge badge-warning">Major</span></td>
                            <td>Gateway thanh toán chậm</td>
                            <td>08/12/2024 21:05</td>
                            <td><span class="badge badge-success">Đã khôi phục</span></td>
                            <td>
                                <div class="table-actions">
                                    <button class="btn btn-sm btn-secondary" data-action="incident-detail" data-incident-id="INC-20241208-04">Xem chi tiết</button>
                                    <button class="btn btn-sm btn-primary" data-action="incident-confirm" data-incident-id="INC-20241208-04">Xác nhận</button>
                                    <button class="btn btn-sm btn-success" data-action="incident-close" data-incident-id="INC-20241208-04">Đóng lỗi</button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>#INC-20241205-02</td>
                            <td><span class="badge badge-info">Minor</span></td>
                            <td>Lỗi hiển thị livestream</td>
                            <td>05/12/2024 19:40</td>
                            <td><span class="badge badge-success">Đã khắc phục</span></td>
                            <td>
                                <div class="table-actions">
                                    <button class="btn btn-sm btn-secondary" data-action="incident-detail" data-incident-id="INC-20241205-02">Xem chi tiết</button>
                                    <button class="btn btn-sm btn-primary" data-action="incident-confirm" data-incident-id="INC-20241205-02">Xác nhận</button>
                                    <button class="btn btn-sm btn-success" data-action="incident-close" data-incident-id="INC-20241205-02">Đóng lỗi</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button class="btn btn-secondary" style="margin-top: 15px;">Xem nhật ký đầy đủ</button>
            </div>
            <div class="modal" id="incident-detail-modal" aria-hidden="true">
                <div class="modal-content modal-xl">
                    <button class="modal-close" id="incident-detail-close" aria-label="Đóng">&times;</button>
                    <div id="incident-detail-body"></div>
                </div>
            </div>
        `;
    }

    getAdminNotifications() {
        return `
            <div class="dashboard-header">
                <h1>Thông Báo Hệ Thống</h1>
                <p>Tạo thông báo toàn hệ thống và theo dõi lịch sử gửi</p>
            </div>

            <div class="grid grid-2">
                <div class="card">
                    <h2 style="margin-bottom: 15px;">Tạo Thông Báo Mới</h2>
                    <form>
                        <div class="form-group">
                            <label>Tiêu Đề</label>
                            <input type="text" placeholder="Ví dụ: Bảo trì hệ thống 12/12">
                        </div>
                        <div class="form-group">
                            <label>Nội Dung</label>
                            <textarea rows="4" placeholder="Nhập nội dung thông báo..."></textarea>
                        </div>
                        <div class="form-group">
                            <label>Đối Tượng</label>
                            <select>
                                <option>Tất cả người dùng</option>
                                <option>Chỉ học sinh</option>
                                <option>Chỉ giáo viên</option>
                                <option>Chỉ quản trị viên</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Kênh Gửi</label>
                            <div style="display: flex; gap: 12px;">
                                <label style="display: flex; align-items: center; gap: 6px;">
                                    <input type="checkbox" checked> In-app
                                </label>
                                <label style="display: flex; align-items: center; gap: 6px;">
                                    <input type="checkbox"> Email
                                </label>
                                <label style="display: flex; align-items: center; gap: 6px;">
                                    <input type="checkbox"> SMS
                                </label>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">Gửi Thông Báo</button>
                    </form>
                </div>

                <div class="card">
                    <h2 style="margin-bottom: 15px;">Lịch Sử Gửi</h2>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Tiêu Đề</th>
                                <th>Ngày Gửi</th>
                                <th>Đối Tượng</th>
                                <th>Trạng Thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Bảo trì hệ thống 12/12</td>
                                <td>09/12/2024</td>
                                <td>Tất cả</td>
                                <td><span class="badge badge-success">Đã gửi</span></td>
                            </tr>
                            <tr>
                                <td>Livestream Toán nâng cao</td>
                                <td>08/12/2024</td>
                                <td>Học sinh</td>
                                <td><span class="badge badge-success">Đã gửi</span></td>
                            </tr>
                            <tr>
                                <td>Hướng dẫn cập nhật nội dung</td>
                                <td>05/12/2024</td>
                                <td>Giáo viên</td>
                                <td><span class="badge badge-success">Đã gửi</span></td>
                            </tr>
                        </tbody>
                    </table>
                    <button class="btn btn-secondary" style="margin-top: 15px;">Xem toàn bộ lịch sử</button>
                </div>
            </div>

            <div class="card" style="margin-top: 20px;">
                <h2 style="margin-bottom: 15px;">Mẫu Thông Báo Mặc Định</h2>
                <ul style="list-style: none; padding: 0;">
                    <li style="padding: 10px 0; border-bottom: 1px solid var(--border-color);">
                        📢 Thông báo bảo trì định kỳ
                        <button class="btn btn-sm btn-secondary" style="float: right;">Sử dụng</button>
                    </li>
                    <li style="padding: 10px 0; border-bottom: 1px solid var(--border-color);">
                        🎓 Thông báo lịch thi quan trọng
                        <button class="btn btn-sm btn-secondary" style="float: right;">Sử dụng</button>
                    </li>
                    <li style="padding: 10px 0;">
                        🧾 Cập nhật điều khoản sử dụng
                        <button class="btn btn-sm btn-secondary" style="float: right;">Sử dụng</button>
                    </li>
                </ul>
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

function downloadContent(title) {
    alert(`Bắt đầu tải xuống nội dung "${title}" (mô phỏng).`);
}

function purchaseDashboardContent(title) {
    if (confirm(`Bạn muốn mua nội dung "${title}"?`)) {
        window.location.href = 'payment.html';
    }
}

// Initialize dashboard when DOM is loaded
let dashboardManager;
document.addEventListener('DOMContentLoaded', () => {
    dashboardManager = new DashboardManager();
    window.dashboardManager = dashboardManager; // Make it globally accessible
});
