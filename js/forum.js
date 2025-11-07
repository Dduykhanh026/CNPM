// Forum Management
class ForumManager {
    constructor() {
        this.posts = [
            {
                id: 1,
                title: 'Câu hỏi về đạo hàm',
                subject: 'Toán',
                author: 'Nguyễn Văn A',
                content: 'Em không hiểu cách tính đạo hàm của hàm số phức tạp. Có ai giải thích giúp em không?',
                replies: 5,
                views: 23,
                date: '2 giờ trước',
                solved: false
            },
            {
                id: 2,
                title: 'Dao động điều hòa có ứng dụng gì?',
                subject: 'Vật Lý',
                author: 'Trần Thị B',
                content: 'Em muốn tìm hiểu về ứng dụng thực tế của dao động điều hòa trong cuộc sống.',
                replies: 8,
                views: 45,
                date: '5 giờ trước',
                solved: true
            },
            {
                id: 3,
                title: 'Cân bằng phương trình hóa học',
                subject: 'Hóa Học',
                author: 'Lê Văn C',
                content: 'Có cách nào nhanh để cân bằng phương trình hóa học không?',
                replies: 12,
                views: 67,
                date: '1 ngày trước',
                solved: false
            },
            {
                id: 4,
                title: 'Cách giải bài tập tích phân',
                subject: 'Toán',
                author: 'Phạm Thị D',
                content: 'Em đang gặp khó khăn với các bài tập tích phân phức tạp. Mong được mọi người giúp đỡ!',
                replies: 7,
                views: 34,
                date: '3 giờ trước',
                solved: false
            },
            {
                id: 5,
                title: 'Điện từ học và ứng dụng',
                subject: 'Vật Lý',
                author: 'Hoàng Văn E',
                content: 'Ai có thể giải thích về điện từ học và các ứng dụng trong thực tế không?',
                replies: 10,
                views: 52,
                date: '6 giờ trước',
                solved: true
            },
            {
                id: 6,
                title: 'Cấu trúc nguyên tử và bảng tuần hoàn',
                subject: 'Hóa Học',
                author: 'Vũ Thị F',
                content: 'Em muốn hiểu rõ hơn về cấu trúc nguyên tử và cách đọc bảng tuần hoàn.',
                replies: 9,
                views: 41,
                date: '8 giờ trước',
                solved: false
            },
            {
                id: 7,
                title: 'Bài tập hình học không gian',
                subject: 'Toán',
                author: 'Đỗ Văn G',
                content: 'Có ai biết cách giải bài tập về hình học không gian không? Em đang rất cần.',
                replies: 6,
                views: 28,
                date: '12 giờ trước',
                solved: false
            },
            {
                id: 8,
                title: 'Quang học và hiện tượng khúc xạ',
                subject: 'Vật Lý',
                author: 'Bùi Thị H',
                content: 'Em không hiểu về hiện tượng khúc xạ ánh sáng. Có thể giải thích chi tiết được không?',
                replies: 11,
                views: 58,
                date: '1 ngày trước',
                solved: true
            },
            {
                id: 9,
                title: 'Phản ứng hóa học và cân bằng',
                subject: 'Hóa Học',
                author: 'Lý Văn I',
                content: 'Làm thế nào để cân bằng nhanh các phản ứng hóa học phức tạp?',
                replies: 14,
                views: 73,
                date: '1 ngày trước',
                solved: false
            },
            {
                id: 10,
                title: 'Lượng giác và các công thức',
                subject: 'Toán',
                author: 'Ngô Thị K',
                content: 'Em muốn tổng hợp tất cả các công thức lượng giác quan trọng.',
                replies: 8,
                views: 39,
                date: '2 ngày trước',
                solved: true
            },
            {
                id: 11,
                title: 'Sóng cơ và sóng âm',
                subject: 'Vật Lý',
                author: 'Trịnh Văn L',
                content: 'Giải thích về sóng cơ và sóng âm thanh, mối quan hệ giữa chúng.',
                replies: 6,
                views: 31,
                date: '2 ngày trước',
                solved: false
            },
            {
                id: 12,
                title: 'Điện hóa học và pin',
                subject: 'Hóa Học',
                author: 'Dương Thị M',
                content: 'Em cần hiểu về nguyên lý hoạt động của pin điện hóa.',
                replies: 9,
                views: 46,
                date: '2 ngày trước',
                solved: true
            },
            {
                id: 13,
                title: 'Xác suất và thống kê',
                subject: 'Toán',
                author: 'Võ Văn N',
                content: 'Có ai có thể giải thích về xác suất và các bài toán thống kê không?',
                replies: 7,
                views: 35,
                date: '3 ngày trước',
                solved: false
            },
            {
                id: 14,
                title: 'Nhiệt động lực học',
                subject: 'Vật Lý',
                author: 'Đinh Thị O',
                content: 'Em đang học về nhiệt động lực học và các định luật. Cần sự giúp đỡ!',
                replies: 5,
                views: 27,
                date: '3 ngày trước',
                solved: false
            },
            {
                id: 15,
                title: 'Kim loại và tính chất',
                subject: 'Hóa Học',
                author: 'Phan Văn P',
                content: 'Tìm hiểu về tính chất của các kim loại phổ biến và ứng dụng.',
                replies: 10,
                views: 49,
                date: '4 ngày trước',
                solved: true
            }
        ];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.loadPosts();
    }

    loadPosts() {
        const container = document.getElementById('forum-posts');
        if (!container) return;

        const filtered = this.getFilteredPosts();
        container.innerHTML = filtered.map(post => this.createPostCard(post)).join('');
    }

    getFilteredPosts() {
        if (this.currentFilter === 'all') {
            return this.posts;
        }
        const subjectMap = {
            'math': 'Toán',
            'physics': 'Vật Lý',
            'chemistry': 'Hóa Học'
        };
        return this.posts.filter(p => p.subject === subjectMap[this.currentFilter]);
    }

    createPostCard(post) {
        const icon = this.getSubjectIcon(post.subject);
        const solvedBadge = post.solved ? '<span class="badge badge-success">Đã Giải Quyết</span>' : '';

        return `
            <div class="card" style="margin-bottom: 15px;">
                <div style="display: flex; gap: 15px;">
                    <div style="font-size: 48px;">${icon}</div>
                    <div style="flex: 1;">
                        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
                            <div>
                                <h3 style="margin-bottom: 5px;">${post.title}</h3>
                                <div style="margin-bottom: 10px;">
                                    <span class="badge badge-info">${post.subject}</span>
                                    ${solvedBadge}
                                </div>
                            </div>
                        </div>
                        <p style="color: #666; margin-bottom: 15px;">${post.content}</p>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div style="display: flex; gap: 20px; color: #999; font-size: 14px;">
                                <span>👤 ${post.author}</span>
                                <span>💬 ${post.replies} trả lời</span>
                                <span>👁️ ${post.views} lượt xem</span>
                                <span>🕒 ${post.date}</span>
                            </div>
                            <button class="btn btn-sm btn-primary" onclick="viewPost(${post.id})">Xem Chi Tiết</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getSubjectIcon(subject) {
        const icons = {
            'Toán': '📐',
            'Vật Lý': '⚛️',
            'Hóa Học': '🧪'
        };
        return icons[subject] || '📚';
    }

    filterBySubject(subject) {
        this.currentFilter = subject;
        
        // Update filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Find and activate the clicked button
        const buttons = document.querySelectorAll('.filter-btn');
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
        
        this.loadPosts();
    }
}

// Global functions
let forumManager;

function filterBySubject(subject) {
    if (forumManager) {
        forumManager.filterBySubject(subject);
    }
}

function showCreatePost() {
    const subject = prompt('Chọn môn học:\n1. Toán\n2. Vật Lý\n3. Hóa Học');
    const title = prompt('Nhập tiêu đề bài viết:');
    const content = prompt('Nhập nội dung bài viết:');
    
    if (subject && title && content) {
        alert('Bài viết đã được tạo thành công!');
        // In real app, submit to server
    }
}

function viewPost(id) {
    alert(`Xem chi tiết bài viết ID: ${id}\n(Trong ứng dụng thực tế, sẽ hiển thị nội dung đầy đủ và các bình luận)`);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    const user = localStorage.getItem('currentUser');
    if (!user) {
        window.location.href = 'index.html';
        return;
    }

    // Update user info will be handled by NavigationManager
    forumManager = new ForumManager();
});
