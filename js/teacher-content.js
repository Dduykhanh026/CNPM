// Teacher Content Management
class TeacherContentManager {
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
                    this.searchContent();
                }
            });
        }
    }

    searchContent() {
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        const rows = document.querySelectorAll('#content-table tr');
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }
}

// Global functions
let teacherContentManager;

function searchContent() {
    if (teacherContentManager) {
        teacherContentManager.searchContent();
    }
}

function showCreateContent() {
    const type = prompt('Chọn loại nội dung:\n1. Bài giảng\n2. Video\n3. Tài liệu\n4. Bài tập\n5. Bài kiểm tra');
    const subject = prompt('Chọn môn học:\n1. Toán\n2. Vật Lý\n3. Hóa Học');
    const title = prompt('Nhập tiêu đề:');
    const price = prompt('Nhập giá (0 để miễn phí):');
    
    if (type && subject && title && price !== null) {
        alert('Nội dung đã được tạo thành công! (Trong ứng dụng thực tế, sẽ có form upload chi tiết)');
        // In real app, show upload form
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
    if (userData.role !== 'teacher') {
        alert('Bạn không có quyền truy cập trang này');
        window.location.href = 'dashboard.html';
        return;
    }

    // Update user info will be handled by NavigationManager
    teacherContentManager = new TeacherContentManager();
});
