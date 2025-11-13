// Forum Management
class ForumManager {
    constructor() {
        this.posts = [
            { id: 1, title: 'Câu hỏi về đạo hàm', subject: 'Toán', author: 'Nguyễn Văn A', content: 'Em không hiểu cách tính đạo hàm của hàm số phức tạp. Có ai giải thích giúp em không?', replies: 5, views: 23, date: '2 giờ trước', solved: false },
            { id: 2, title: 'Dao động điều hòa có ứng dụng gì?', subject: 'Vật Lý', author: 'Trần Thị B', content: 'Em muốn tìm hiểu về ứng dụng thực tế của dao động điều hòa trong cuộc sống.', replies: 8, views: 45, date: '5 giờ trước', solved: true },
            { id: 3, title: 'Cân bằng phương trình hóa học', subject: 'Hóa Học', author: 'Lê Văn C', content: 'Có cách nào nhanh để cân bằng phương trình hóa học không?', replies: 12, views: 67, date: '1 ngày trước', solved: false },
            { id: 4, title: 'Cách giải bài tập tích phân', subject: 'Toán', author: 'Phạm Thị D', content: 'Em đang gặp khó khăn với các bài tập tích phân phức tạp. Mong được mọi người giúp đỡ!', replies: 7, views: 34, date: '3 giờ trước', solved: false },
            { id: 5, title: 'Điện từ học và ứng dụng', subject: 'Vật Lý', author: 'Hoàng Văn E', content: 'Ai có thể giải thích về điện từ học và các ứng dụng trong thực tế không?', replies: 10, views: 52, date: '6 giờ trước', solved: true },
            { id: 6, title: 'Cấu trúc nguyên tử và bảng tuần hoàn', subject: 'Hóa Học', author: 'Vũ Thị F', content: 'Em muốn hiểu rõ hơn về cấu trúc nguyên tử và cách đọc bảng tuần hoàn.', replies: 9, views: 41, date: '8 giờ trước', solved: false },
            { id: 7, title: 'Bài tập hình học không gian', subject: 'Toán', author: 'Đỗ Văn G', content: 'Có ai biết cách giải bài tập về hình học không gian không? Em đang rất cần.', replies: 6, views: 28, date: '12 giờ trước', solved: false },
            { id: 8, title: 'Quang học và hiện tượng khúc xạ', subject: 'Vật Lý', author: 'Bùi Thị H', content: 'Em không hiểu về hiện tượng khúc xạ ánh sáng. Có thể giải thích chi tiết được không?', replies: 11, views: 58, date: '1 ngày trước', solved: true },
            { id: 9, title: 'Phản ứng hóa học và cân bằng', subject: 'Hóa Học', author: 'Lý Văn I', content: 'Làm thế nào để cân bằng nhanh các phản ứng hóa học phức tạp?', replies: 14, views: 73, date: '1 ngày trước', solved: false },
            { id: 10, title: 'Lượng giác và các công thức', subject: 'Toán', author: 'Ngô Thị K', content: 'Em muốn tổng hợp tất cả các công thức lượng giác quan trọng.', replies: 8, views: 39, date: '2 ngày trước', solved: true },
            { id: 11, title: 'Sóng cơ và sóng âm', subject: 'Vật Lý', author: 'Trịnh Văn L', content: 'Giải thích về sóng cơ và sóng âm thanh, mối quan hệ giữa chúng.', replies: 6, views: 31, date: '2 ngày trước', solved: false },
            { id: 12, title: 'Điện hóa học và pin', subject: 'Hóa Học', author: 'Dương Thị M', content: 'Em cần hiểu về nguyên lý hoạt động của pin điện hóa.', replies: 9, views: 46, date: '2 ngày trước', solved: true },
            { id: 13, title: 'Xác suất và thống kê', subject: 'Toán', author: 'Võ Văn N', content: 'Có ai có thể giải thích về xác suất và các bài toán thống kê không?', replies: 7, views: 35, date: '3 ngày trước', solved: false },
            { id: 14, title: 'Nhiệt động lực học', subject: 'Vật Lý', author: 'Đinh Thị O', content: 'Em đang học về nhiệt động lực học và các định luật. Cần sự giúp đỡ!', replies: 5, views: 27, date: '3 ngày trước', solved: false },
            { id: 15, title: 'Kim loại và tính chất', subject: 'Hóa Học', author: 'Phan Văn P', content: 'Tìm hiểu về tính chất của các kim loại phổ biến và ứng dụng.', replies: 10, views: 49, date: '4 ngày trước', solved: true }
        ];

        this.subjectFilters = {
            all: 'Tất Cả',
            math: 'Toán',
            physics: 'Vật Lý',
            chemistry: 'Hóa Học'
        };

        this.sampleMentors = [
            { name: 'GV. Lê Minh Tùng', role: 'Giáo viên Toán', signature: 'Trường THPT chuyên KH33' },
            { name: 'GV. Nguyễn Thu Hà', role: 'Giáo viên Vật Lý', signature: 'Tổ chuyên môn Vật Lý' },
            { name: 'GV. Phạm Quỳnh Mai', role: 'Giáo viên Hóa', signature: 'Hệ thống KH33' },
            { name: 'Bạn Trần Hoài Nam', role: 'Thành viên tích cực', signature: 'Lớp 12A1' }
        ];

        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.persistPosts();
        this.loadPosts();
    }

    persistPosts() {
        localStorage.setItem('forumPosts', JSON.stringify(this.posts));
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
        const subjectLabel = this.subjectFilters[this.currentFilter];
        return this.posts.filter(p => p.subject === subjectLabel);
    }

    createPostCard(post) {
        const icon = this.getSubjectIcon(post.subject);
        const solvedBadge = post.solved ? '<span class="badge badge-success">Đã Giải Quyết</span>' : '';
        const preview = this.getPreviewText(post.content);

        return `
            <div class="card forum-card">
                <div class="forum-card-icon">${icon}</div>
                <div class="forum-card-content">
                    <div class="forum-card-header">
                        <div>
                            <h3>${post.title}</h3>
                            <div class="forum-card-tags">
                                <span class="badge badge-info">${post.subject}</span>
                                ${solvedBadge}
                            </div>
                        </div>
                    </div>
                    <p class="forum-card-preview">${preview}</p>
                    <div class="forum-card-footer">
                        <div class="forum-card-meta">
                            <span>👤 ${post.author}</span>
                            <span>💬 ${post.replies} trả lời</span>
                            <span>👁️ ${post.views} lượt xem</span>
                            <span>🕒 ${post.date}</span>
                        </div>
                        <button class="btn btn-sm btn-primary" onclick="viewPost(${post.id})">Xem Chi Tiết</button>
                    </div>
                </div>
            </div>
        `;
    }

    getPreviewText(content) {
        if (!content) return '';
        return content.length > 120 ? `${content.slice(0, 120)}…` : content;
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
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));

        document.querySelectorAll('.filter-btn').forEach(btn => {
            const text = btn.textContent.trim();
            if (text === this.subjectFilters[subject]) {
                btn.classList.add('active');
            }
        });

        this.loadPosts();
    }

    openPost(id) {
        const post = this.posts.find(item => item.id === id);
        if (!post) {
            alert('Không tìm thấy bài viết.');
            return;
        }

        const detailedPost = this.buildDetailedPost(post);
        localStorage.setItem('currentForumPost', JSON.stringify(detailedPost));
        this.persistPosts();
        window.location.href = `forum-post.html?id=${id}`;
    }

    buildDetailedPost(post) {
        return {
            ...post,
            tags: this.getSuggestedTags(post.subject),
            body: this.buildBodyContent(post),
            watchers: this.randomBetween(24, 92),
            followers: this.randomBetween(8, 35),
            lastUpdated: post.date,
            attachments: post.solved ? ['loi_giai_chi_tiet.pdf'] : [],
            replies: this.generateReplies(post),
            activity: this.generateActivityTimeline(post),
            related: this.getRelatedPosts(post.id),
            guidelines: this.getGuidelines(post.subject)
        };
    }

    getSuggestedTags(subject) {
        const tags = {
            'Toán': ['Giải tích', 'Đạo hàm', 'Tự luận', 'Ôn thi'],
            'Vật Lý': ['Dao động', 'Ứng dụng thực tế', 'Thí nghiệm'],
            'Hóa Học': ['Phản ứng', 'Cân bằng', 'Ôn thi']
        };
        return tags[subject] || ['Học tập', 'Thảo luận'];
    }

    buildBodyContent(post) {
        const intro = post.content;
        const tips = {
            'Toán': 'Hãy bắt đầu từ việc viết lại định nghĩa và các công thức liên quan. Đừng quên kiểm tra điều kiện áp dụng của từng công thức.',
            'Vật Lý': 'Quan sát các đại lượng đặc trưng và mối quan hệ giữa chúng. Sử dụng sơ đồ minh họa để ghi nhớ hiện tượng.',
            'Hóa Học': 'Liệt kê các nguyên tố tham gia phản ứng, cân bằng từng nguyên tố và kiểm tra lại số oxi hóa nếu cần.'
        };
        const subjectTip = tips[post.subject] || 'Hãy trình bày rõ ràng từng bước để mọi người dễ theo dõi. Đừng ngại bổ sung hình ảnh hoặc tài liệu đính kèm.';

        return [
            intro,
            'Em đã tham khảo sách giáo khoa và một số tài liệu nhưng vẫn còn vướng ở bước chuyển đổi. Em mong mọi người có thể gợi ý hướng làm hoặc chia sẻ ví dụ cụ thể.',
            `Gợi ý của em: ${subjectTip}`,
            'Rất mong nhận được phản hồi từ thầy cô và các bạn.'
        ];
    }

    generateReplies(post) {
        const replies = [];
        const mentors = [...this.sampleMentors];

        const templates = [
            {
                content: `Chào em, với chủ đề "${post.title.toLowerCase()}" thì em nên bắt đầu từ các khái niệm cơ bản trước. Sau đó áp dụng công thức một cách có hệ thống để tránh nhầm lẫn.`,
                suggestion: 'Đính kèm thêm file này để em tham khảo.',
                attachments: ['huong_dan_chi_tiet.pdf']
            },
            {
                content: 'Mình từng gặp bài tương tự khi luyện đề. Điểm mấu chốt là nhận ra dạng bài và tách nhỏ thành các bước dễ làm hơn.',
                suggestion: 'Bạn thử áp dụng hướng dẫn ở trang 42 của tài liệu ôn tập xem sao.'
            },
            {
                content: 'Tớ bổ sung thêm một ví dụ thực tế để bạn dễ hình dung. Nếu bạn làm theo thứ tự này thì sẽ hạn chế sai sót.',
                suggestion: 'Có thể trao đổi thêm trong giờ học nhóm cuối tuần.'
            }
        ];

        templates.forEach((template, index) => {
            const mentor = mentors[index % mentors.length];
            replies.push({
                id: `${post.id}-r${index + 1}`,
                author: mentor.name,
                role: mentor.role,
                signature: mentor.signature,
                content: template.content,
                suggestion: template.suggestion,
                attachments: template.attachments || [],
                createdAt: index === 0 ? '1 giờ trước' : `${index + 2} giờ trước`,
                updatedAt: index === 0 ? '45 phút trước' : null,
                likes: this.randomBetween(3, 18),
                isSolution: post.solved && index === 0
            });
        });

        return replies;
    }

    generateActivityTimeline(post) {
        return [
            { time: '5 phút trước', action: 'Bạn Hoài Nam thêm phản hồi mới' },
            { time: '30 phút trước', action: `${post.author} cập nhật mô tả câu hỏi` },
            { time: '1 giờ trước', action: 'GV. Lê Minh Tùng đánh dấu câu trả lời hữu ích' }
        ];
    }

    getRelatedPosts(currentId) {
        const current = this.posts.find(post => post.id === currentId);
        if (!current) return [];

        return this.posts
            .filter(post => post.id !== currentId && post.subject === current.subject)
            .slice(0, 3)
            .map(post => ({
                id: post.id,
                title: post.title,
                replies: post.replies,
                solved: post.solved
            }));
    }

    getGuidelines(subject) {
        const guidelines = {
            'Toán': [
                'Trình bày rõ ràng từng bước biến đổi.',
                'Ghi chú công thức bạn đã áp dụng.',
                'Đánh dấu bước bạn đang gặp khó khăn.'
            ],
            'Vật Lý': [
                'Nêu rõ dữ kiện đề bài cung cấp.',
                'Vẽ sơ đồ minh họa nếu có thể.',
                'Đính kèm hình ảnh thí nghiệm (nếu có).'
            ],
            'Hóa Học': [
                'Liệt kê các chất tham gia phản ứng.',
                'Ghi rõ trạng thái (rắn, lỏng, khí) nếu cần.',
                'Kiểm tra bảo toàn khối lượng sau khi cân bằng.'
            ]
        };
        return guidelines[subject] || [
            'Trình bày câu hỏi rõ ràng, dễ hiểu.',
            'Nêu rõ mong muốn của bạn (giải thích, ví dụ, tài liệu...).',
            'Cảm ơn người hỗ trợ khi vấn đề được giải quyết.'
        ];
    }

    randomBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
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
    const modal = document.getElementById('create-post-modal');
    const form = document.getElementById('create-post-form');
    const cancelBtn = document.getElementById('cancel-create-post');
    const closeBtn = document.getElementById('create-post-modal-close');
    const fileInput = document.getElementById('post-attachments');
    const filePreview = document.getElementById('file-preview');

    if (!modal) return;

    // Reset form
    if (form) {
        form.reset();
    }
    if (filePreview) {
        filePreview.innerHTML = '';
    }

    // Show modal
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Handle file selection
    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            const files = Array.from(e.target.files);
            if (files.length === 0) {
                filePreview.innerHTML = '';
                return;
            }
            filePreview.innerHTML = files.map(file => {
                const size = (file.size / 1024).toFixed(1);
                return `<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                    <i class="fas fa-file" style="color: var(--primary-color);"></i>
                    <span>${file.name} (${size} KB)</span>
                </div>`;
            }).join('');
        });
    }

    // Close modal handlers
    const closeModal = () => {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    };

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Handle form submission
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            handleCreatePost();
        });
    }
}

function handleCreatePost() {
    const subject = document.getElementById('post-subject')?.value;
    const title = document.getElementById('post-title')?.value.trim();
    const content = document.getElementById('post-content')?.value.trim();
    const fileInput = document.getElementById('post-attachments');

    // Validation
    if (!subject || !title || !content) {
        alert('Vui lòng điền đầy đủ các trường bắt buộc.');
        return;
    }

    if (title.length < 5) {
        alert('Tiêu đề phải có ít nhất 5 ký tự.');
        return;
    }

    if (content.length < 10) {
        alert('Nội dung phải có ít nhất 10 ký tự.');
        return;
    }

    // Get current user
    const userStr = localStorage.getItem('currentUser');
    if (!userStr) {
        alert('Vui lòng đăng nhập để tạo bài viết.');
        return;
    }

    const currentUser = JSON.parse(userStr);
    const author = currentUser.name || 'Người dùng';

    // Get file attachments
    const attachments = [];
    if (fileInput && fileInput.files.length > 0) {
        Array.from(fileInput.files).forEach(file => {
            attachments.push(file.name);
        });
    }

    // Create new post
    const newPost = {
        id: Date.now(), // Simple ID generation
        title: title,
        subject: subject,
        author: author,
        content: content,
        replies: 0,
        views: 0,
        date: 'Vừa xong',
        solved: false,
        attachments: attachments
    };

    // Add to posts array
    if (forumManager) {
        forumManager.posts.unshift(newPost); // Add to beginning
        forumManager.persistPosts();
        forumManager.loadPosts();
    }

    // Close modal
    const modal = document.getElementById('create-post-modal');
    if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }

    // Show success message
    alert('Bài viết đã được tạo thành công!');

    // Scroll to top to see new post
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function viewPost(id) {
    if (forumManager) {
        forumManager.openPost(id);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
        window.location.href = 'index.html';
        return;
    }

    forumManager = new ForumManager();
});
