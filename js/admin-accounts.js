// Admin Account Management
class AdminAccountManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.searchAccounts();
                }
            });
        }
    }

    searchAccounts() {
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        const roleFilter = document.getElementById('role-filter').value;
        const rows = document.querySelectorAll('#accounts-table tr');
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            const roleCell = row.querySelector('td:nth-child(5)');
            const role = roleCell ? roleCell.textContent.toLowerCase() : '';
            
            const matchesSearch = text.includes(searchTerm);
            const matchesRole = roleFilter === 'all' || 
                (roleFilter === 'student' && role.includes('học sinh')) ||
                (roleFilter === 'teacher' && role.includes('giáo viên')) ||
                (roleFilter === 'admin' && role.includes('quản trị'));
            
            if (matchesSearch && matchesRole) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }
}

// Global functions
let adminAccountManager;

function searchAccounts() {
    if (adminAccountManager) {
        adminAccountManager.searchAccounts();
    }
}

function showAddAccount() {
    const name = prompt('Nhập họ và tên:');
    const email = prompt('Nhập email:');
    const phone = prompt('Nhập số điện thoại:');
    const role = prompt('Chọn vai trò:\n1. Học Sinh\n2. Giáo Viên\n3. Quản Trị Viên');
    
    if (name && email && phone && role) {
        alert('Tài khoản đã được tạo thành công!');
        // In real app, submit to server
    }
}

function editAccount(id) {
    alert(`Chỉnh sửa tài khoản ID: ${id}\n(Trong ứng dụng thực tế, sẽ hiển thị form chỉnh sửa)`);
}

function deleteAccount(id) {
    if (confirm('Bạn có chắc chắn muốn xóa tài khoản này không?')) {
        alert(`Đã xóa tài khoản ID: ${id}`);
        // In real app, call API to delete
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    const user = localStorage.getItem('currentUser');
    if (!user) {
        window.location.href = 'index.html';
        return;
    }

    // Check role
    const userData = JSON.parse(user);
    if (userData.role !== 'admin') {
        alert('Bạn không có quyền truy cập trang này');
        window.location.href = 'dashboard.html';
        return;
    }

    // Update user info will be handled by NavigationManager
    adminAccountManager = new AdminAccountManager();
});
