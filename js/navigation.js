// Common Navigation Manager - Load navigation dynamically for all pages
class NavigationManager {
    constructor() {
        this.currentUser = null;
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
        this.loadNavigation();
        this.updateUserInfo();
    }

    loadNavigation() {
        const navMenu = document.getElementById('nav-menu');
        if (!navMenu) return; // If nav-menu doesn't exist, skip

        const role = this.currentUser.role || 'student';
        const currentPage = this.getCurrentPage();
        
        let menuItems = [];
        
        if (role === 'student') {
            menuItems = [
                { text: 'Trang Chủ', href: 'dashboard.html', active: currentPage === 'dashboard' },
                { text: 'Nội Dung Học Tập', href: 'content.html', active: currentPage === 'content' },
                { text: 'Bài Tập', href: 'exercises.html', active: currentPage === 'exercises' },
                { text: 'Bài Kiểm Tra', href: 'tests.html', active: currentPage === 'tests' },
                { text: 'Tiến Độ Học Tập', href: 'dashboard.html?action=showProgress', active: currentPage === 'progress' },
                { text: 'Cuộc Thi', href: 'competitions.html', active: currentPage === 'competitions' },
                { text: 'Tài Liệu Đã Mua', href: 'dashboard.html?action=showResources', active: currentPage === 'resources' },
                { text: 'Tương Tác GV', href: 'dashboard.html?action=showTeacherInteraction', active: currentPage === 'teacherinteraction' },
                { text: 'Lớp Học Trực Tuyến', href: 'live-class.html', active: currentPage === 'live-class' },
                { text: 'Diễn Đàn', href: 'forum.html', active: currentPage === 'forum' },
                { text: 'Hỗ Trợ', href: 'support.html', active: currentPage === 'support' },
                { text: 'Thanh Toán', href: 'payment.html', active: currentPage === 'payment' },
                { text: 'Thông Báo', href: 'student-notifications.html', active: currentPage === 'notifications' },
                { text: 'Tài Khoản', href: 'dashboard.html?action=showProfile', active: currentPage === 'profile' }
            ];
        } else if (role === 'teacher') {
            menuItems = [
                { text: 'Trang Chủ', href: 'dashboard.html', active: currentPage === 'dashboard' },
                { text: 'Quản Lý Nội Dung', href: 'teacher-content.html', active: currentPage === 'teacher-content' || currentPage === 'contentmanagement' },
                { text: 'Quản Lý Học Sinh', href: 'teacher-students.html', active: currentPage === 'teacher-students' || currentPage === 'studentmanagement' },
                { text: 'Chấm Bài', href: 'teacher-grading.html', active: currentPage === 'teacher-grading' || currentPage === 'grading' },
                { text: 'Lịch Học', href: 'teacher-schedule.html', active: currentPage === 'teacher-schedule' || currentPage === 'schedule' },
                { text: 'Livestream', href: 'dashboard.html?action=showLivestream', active: currentPage === 'livestream' },
                { text: 'Lớp Học Trực Tuyến', href: 'live-class.html', active: currentPage === 'live-class' },
                { text: 'Cá Nhân Hóa', href: 'dashboard.html?action=showPersonalization', active: currentPage === 'personalization' },
                { text: 'Phản Hồi & Khiếu Nại', href: 'dashboard.html?action=showFeedback', active: currentPage === 'feedback' },
                { text: 'Doanh Thu', href: 'teacher-revenue.html', active: currentPage === 'teacher-revenue' || currentPage === 'revenue' },
                { text: 'Tài Khoản', href: 'dashboard.html?action=showProfile', active: currentPage === 'profile' }
            ];
        } else if (role === 'admin') {
            menuItems = [
                { text: 'Trang Chủ', href: 'dashboard.html', active: currentPage === 'dashboard' },
                { text: 'Quản Lý Tài Khoản', href: 'dashboard.html?action=showAccountManagement', active: currentPage === 'accountmanagement' || currentPage === 'admin-accounts' },
                { text: 'Quản Lý Nội Dung', href: 'dashboard.html?action=showContentManagement', active: currentPage === 'contentmanagement' },
                { text: 'Phân Quyền', href: 'dashboard.html?action=showPermissions', active: currentPage === 'permissions' },
                { text: 'Dashboard Doanh Thu', href: 'dashboard.html?action=showStatistics', active: currentPage === 'statistics' },
                { text: 'Giao Dịch', href: 'dashboard.html?action=showTransactions', active: currentPage === 'transactions' },
                { text: 'Giám Sát Lỗi', href: 'dashboard.html?action=showMonitoring', active: currentPage === 'monitoring' },
                { text: 'Thông Báo Hệ Thống', href: 'dashboard.html?action=showSystemNotifications', active: currentPage === 'systemnotifications' },
                { text: 'Tài Khoản', href: 'dashboard.html?action=showProfile', active: currentPage === 'profile' }
            ];
        }

        navMenu.innerHTML = '';
        menuItems.forEach(item => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.textContent = item.text;
            a.href = item.href;
            
            if (item.active) {
                a.style.color = 'var(--text-primary)';
                a.style.fontWeight = '800';
            }
            
            li.appendChild(a);
            navMenu.appendChild(li);
        });
    }

    getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop() || '';
        
        // Map file names to page identifiers
        const pageMap = {
            'dashboard.html': 'dashboard',
            'content.html': 'content',
            'content-view.html': 'content',
            'exercises.html': 'exercises',
            'exercise-quiz.html': 'exercises',
            'exercise-written.html': 'exercises',
            'forum.html': 'forum',
            'forum-post.html': 'forum',
            'payment.html': 'payment',
            'teacher-content.html': 'teacher-content',
            'teacher-students.html': 'teacher-students',
            'teacher-grading.html': 'teacher-grading',
            'teacher-schedule.html': 'teacher-schedule',
            'teacher-revenue.html': 'teacher-revenue',
            'admin-accounts.html': 'admin-accounts',
            'live-class.html': 'live-class',
            'tests.html': 'tests',
            'competitions.html': 'competitions',
            'student-notifications.html': 'notifications',
            'support.html': 'support'
        };
        
        // Check if there's an action parameter
        const params = new URLSearchParams(window.location.search);
        const action = params.get('action');
        
        if (action) {
            return action.replace('show', '').toLowerCase();
        }
        
        return pageMap[filename] || 'dashboard';
    }

    updateUserInfo() {
        const userNameEl = document.getElementById('user-name');
        const userAvatarEl = document.getElementById('user-avatar');
        
        if (userNameEl && this.currentUser) {
            userNameEl.textContent = this.currentUser.name || 'Người Dùng';
        }
        
        if (userAvatarEl && this.currentUser && this.currentUser.name) {
            userAvatarEl.textContent = this.currentUser.name.charAt(0).toUpperCase();
        }

        // Setup logout button
        const logoutBtn = document.getElementById('logout-btn');
        if (!logoutBtn) {
            // Try to find button with onclick
            const logoutBtns = document.querySelectorAll('[onclick*="logout"]');
            logoutBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
                        localStorage.removeItem('currentUser');
                        window.location.href = 'index.html';
                    }
                });
            });
        } else {
            logoutBtn.addEventListener('click', () => {
                if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
                    localStorage.removeItem('currentUser');
                    window.location.href = 'index.html';
                }
            });
        }
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if not on dashboard page (dashboard has its own navigation manager)
    const path = window.location.pathname;
    const filename = path.split('/').pop() || '';
    
    if (filename !== 'index.html') {
        new NavigationManager();
    }
});
