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
                { text: 'Bài Kiểm Tra', href: 'dashboard.html?action=showTests', active: currentPage === 'tests' },
                { text: 'Tiến Độ Học Tập', href: 'dashboard.html?action=showProgress', active: currentPage === 'progress' },
                { text: 'Tương Tác GV', href: 'dashboard.html?action=showTeacherInteraction', active: currentPage === 'teacher-interaction' },
                { text: 'Diễn Đàn', href: 'forum.html', active: currentPage === 'forum' },
                { text: 'Thanh Toán', href: 'payment.html', active: currentPage === 'payment' },
                { text: 'Tài Khoản', href: 'dashboard.html?action=showProfile', active: currentPage === 'profile' }
            ];
        } else if (role === 'teacher') {
            menuItems = [
                { text: 'Trang Chủ', href: 'dashboard.html', active: currentPage === 'dashboard' },
                { text: 'Quản Lý Nội Dung', href: 'teacher-content.html', active: currentPage === 'teacher-content' },
                { text: 'Quản Lý Học Sinh', href: 'dashboard.html?action=showStudentManagement', active: currentPage === 'student-management' },
                { text: 'Chấm Bài', href: 'dashboard.html?action=showGrading', active: currentPage === 'grading' },
                { text: 'Lịch Học', href: 'dashboard.html?action=showSchedule', active: currentPage === 'schedule' },
                { text: 'Livestream', href: 'dashboard.html?action=showLivestream', active: currentPage === 'livestream' },
                { text: 'Tài Khoản', href: 'dashboard.html?action=showProfile', active: currentPage === 'profile' }
            ];
        } else if (role === 'admin') {
            menuItems = [
                { text: 'Trang Chủ', href: 'dashboard.html', active: currentPage === 'dashboard' },
                { text: 'Quản Lý Tài Khoản', href: 'admin-accounts.html', active: currentPage === 'admin-accounts' },
                { text: 'Quản Lý Nội Dung', href: 'dashboard.html?action=showContentManagement', active: currentPage === 'content-management' },
                { text: 'Phân Quyền', href: 'dashboard.html?action=showPermissions', active: currentPage === 'permissions' },
                { text: 'Thống Kê', href: 'dashboard.html?action=showStatistics', active: currentPage === 'statistics' },
                { text: 'Giao Dịch', href: 'dashboard.html?action=showTransactions', active: currentPage === 'transactions' },
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
                a.style.transform = 'scale(1.29)';
                a.style.transformOrigin = 'center';
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
            'payment.html': 'payment',
            'teacher-content.html': 'teacher-content',
            'admin-accounts.html': 'admin-accounts'
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
    
    if (filename !== 'dashboard.html' && filename !== 'index.html') {
        new NavigationManager();
    }
});
