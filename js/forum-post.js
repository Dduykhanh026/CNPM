class ForumPostPage {
    constructor() {
        this.post = null;
        this.dataset = [];
        this.repliesContainer = null;
        this.replyForm = null;
        this.init();
    }

    init() {
        if (!this.loadData()) {
            this.renderError();
            return;
        }

        this.cacheDom();
        this.renderAll();
        this.bindEvents();
    }

    cacheDom() {
        this.repliesContainer = document.getElementById('replies-container');
        this.replyForm = document.getElementById('reply-form');
    }

    loadData() {
        const params = new URLSearchParams(window.location.search);
        const requestedId = Number(params.get('id'));

        const storedPost = this.safeParse(localStorage.getItem('currentForumPost'));
        const storedDataset = this.safeParse(localStorage.getItem('forumPosts')) || [];
        if (storedDataset.length) {
            this.dataset = storedDataset;
        } else {
            this.dataset = this.getFallbackDataset();
        }

        if (storedPost && (!requestedId || storedPost.id === requestedId)) {
            this.post = storedPost;
        } else if (requestedId) {
            const summary = this.dataset.find(item => item.id === requestedId);
            if (summary) {
                this.post = this.buildDetailedPost(summary);
                localStorage.setItem('currentForumPost', JSON.stringify(this.post));
            }
        }

        return Boolean(this.post);
    }

    safeParse(value) {
        if (!value) return null;
        try {
            return JSON.parse(value);
        } catch (error) {
            return null;
        }
    }

    getFallbackDataset() {
        return [
            { id: 1, title: 'Câu hỏi về đạo hàm', subject: 'Toán', author: 'Nguyễn Văn A', content: 'Em không hiểu cách tính đạo hàm của hàm số phức tạp. Có ai giải thích giúp em không?', replies: 5, views: 23, date: '2 giờ trước', solved: false },
            { id: 2, title: 'Dao động điều hòa có ứng dụng gì?', subject: 'Vật Lý', author: 'Trần Thị B', content: 'Em muốn tìm hiểu về ứng dụng thực tế của dao động điều hòa trong cuộc sống.', replies: 8, views: 45, date: '5 giờ trước', solved: true },
            { id: 3, title: 'Cân bằng phương trình hóa học', subject: 'Hóa Học', author: 'Lê Văn C', content: 'Có cách nào nhanh để cân bằng phương trình hóa học không?', replies: 12, views: 67, date: '1 ngày trước', solved: false }
        ];
    }

    buildDetailedPost(summary) {
        // Reuse logic tương tự ForumManager cho fallback
        const manager = new ForumManager();
        manager.posts = this.dataset.length ? this.dataset : manager.posts;
        return manager.buildDetailedPost(summary);
    }

    renderAll() {
        this.renderHeader();
        this.renderBody();
        this.renderGuidelines();
        this.renderStats();
        this.renderReplies();
        this.renderActivity();
        this.renderRelated();
        this.renderReplyForm();
    }

    renderHeader() {
        const container = document.getElementById('post-header');
        if (!container) return;

        const solvedBadge = this.post.solved
            ? '<span class="badge badge-success">Đã giải quyết</span>'
            : '<span class="badge badge-warning">Đang thảo luận</span>';

        container.innerHTML = `
            <div class="forum-post-heading">
                <div>
                    <h1>${this.post.title}</h1>
                    <div class="forum-post-tags">
                        <span class="badge badge-info">${this.post.subject}</span>
                        ${this.post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
                <div class="forum-post-status">
                    ${solvedBadge}
                </div>
            </div>
            <div class="forum-post-meta">
                <div>
                    <strong>${this.post.author}</strong>
                    <span>• Đăng ${this.post.date}</span>
                </div>
                <div class="forum-post-actions">
                    <button class="btn btn-sm btn-secondary" id="follow-thread-btn">Theo dõi</button>
                    <button class="btn btn-sm btn-secondary" id="share-thread-btn">Chia sẻ</button>
                    <button class="btn btn-sm btn-primary" id="mark-solved-btn" ${this.post.solved ? 'disabled' : ''}>
                        Đánh dấu đã giải quyết
                    </button>
                </div>
            </div>
        `;
    }

    renderBody() {
        const container = document.getElementById('post-body');
        if (!container) return;

        const attachments = this.post.attachments?.length
            ? `<div class="attachment-list">
                    <h4>Tệp đính kèm</h4>
                    <ul>
                        ${this.post.attachments.map(file => `<li><i class="fa-solid fa-paperclip"></i> ${file}</li>`).join('')}
                    </ul>
               </div>`
            : '';

        container.innerHTML = `
            <div class="forum-post-body">
                ${this.post.body.map(paragraph => `<p>${paragraph}</p>`).join('')}
                ${attachments}
            </div>
        `;
    }

    renderGuidelines() {
        const container = document.getElementById('post-guidelines');
        if (!container) return;

        container.innerHTML = `
            <div class="card-header">
                <div>
                    <h2 class="card-title">Gợi Ý Khi Thảo Luận</h2>
                    <p class="card-subtitle">Những lưu ý giúp bạn nhận được câu trả lời nhanh và chất lượng.</p>
                </div>
            </div>
            <ul class="guideline-list">
                ${this.post.guidelines.map(item => `<li><i class="fa-solid fa-lightbulb"></i> ${item}</li>`).join('')}
            </ul>
        `;
    }

    renderStats() {
        const container = document.getElementById('post-stats');
        if (!container) return;

        container.innerHTML = `
            <div class="forum-stat">
                <span class="forum-stat-value">${this.post.views}</span>
                <span class="forum-stat-label">Lượt xem</span>
            </div>
            <div class="forum-stat">
                <span class="forum-stat-value">${this.post.replies}</span>
                <span class="forum-stat-label">Phản hồi</span>
            </div>
            <div class="forum-stat">
                <span class="forum-stat-value">${this.post.watchers}</span>
                <span class="forum-stat-label">Đang theo dõi</span>
            </div>
            <div class="forum-stat">
                <span class="forum-stat-value">${this.post.followers}</span>
                <span class="forum-stat-label">Đã lưu</span>
            </div>
        `;
    }

    renderReplies() {
        if (!this.repliesContainer) return;
        const replies = this.post.replies || [];

        if (!replies.length) {
            this.repliesContainer.innerHTML = `<p>Chưa có phản hồi nào. Hãy là người đầu tiên chia sẻ lời giải của bạn!</p>`;
            return;
        }

        this.repliesContainer.innerHTML = replies.map(reply => this.createReplyCard(reply)).join('');
    }

    createReplyCard(reply) {
        const solutionBadge = reply.isSolution
            ? '<span class="badge badge-success solution-badge"><i class="fa-solid fa-check"></i> Lời giải được đánh dấu</span>'
            : '';

        const attachments = reply.attachments?.length
            ? `<div class="attachment-list small">
                    <ul>${reply.attachments.map(file => `<li><i class="fa-solid fa-file-lines"></i> ${file}</li>`).join('')}</ul>
               </div>`
            : '';

        return `
            <div class="reply-card" data-reply-id="${reply.id}">
                <div class="reply-header">
                    <div>
                        <h3>${reply.author}</h3>
                        <p class="reply-role">${reply.role} • ${reply.signature || ''}</p>
                    </div>
                    ${solutionBadge}
                </div>
                <div class="reply-body">
                    <p>${reply.content}</p>
                    <p class="reply-suggestion">${reply.suggestion || ''}</p>
                    ${attachments}
                </div>
                <div class="reply-footer">
                    <div class="reply-meta">
                        <span>👍 <span class="reply-like-count">${reply.likes}</span></span>
                        <span>${reply.createdAt}</span>
                        ${reply.updatedAt ? `<span>Cập nhật ${reply.updatedAt}</span>` : ''}
                    </div>
                    <div class="reply-actions">
                        <button class="btn btn-sm btn-secondary" data-action="like" data-reply-id="${reply.id}">Hữu ích</button>
                        <button class="btn btn-sm btn-secondary" data-action="reply" data-reply-id="${reply.id}">Trả lời</button>
                        <button class="btn btn-sm btn-secondary" data-action="edit" data-reply-id="${reply.id}">Chỉnh sửa</button>
                        <button class="btn btn-sm btn-secondary" data-action="delete" data-reply-id="${reply.id}">Xóa</button>
                        <button class="btn btn-sm btn-primary" data-action="mark-solution" data-reply-id="${reply.id}" ${reply.isSolution ? 'disabled' : ''}>
                            Đánh dấu lời giải
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    renderActivity() {
        const container = document.getElementById('activity-timeline');
        if (!container) return;

        container.innerHTML = this.post.activity.map(item => `<li>${item.action} • <strong>${item.time}</strong></li>`).join('');
    }

    renderRelated() {
        const container = document.getElementById('related-posts');
        if (!container) return;

        if (!this.post.related?.length) {
            container.innerHTML = '<p>Chưa có bài viết liên quan.</p>';
            return;
        }

        container.innerHTML = this.post.related.map(item => `
            <div class="related-post">
                <div>
                    <a href="forum-post.html?id=${item.id}" class="related-post-title">${item.title}</a>
                    <p>${item.replies} phản hồi • ${item.solved ? 'Đã giải quyết' : 'Đang thảo luận'}</p>
                </div>
                <button class="btn btn-sm btn-secondary" data-related-id="${item.id}">Xem</button>
            </div>
        `).join('');
    }

    renderReplyForm() {
        if (!this.replyForm) return;

        this.replyForm.innerHTML = `
            <div class="card-header">
                <div>
                    <h2 class="card-title">Viết Phản Hồi</h2>
                    <p class="card-subtitle">Chia sẻ hướng dẫn, ví dụ hoặc tài liệu hữu ích.</p>
                </div>
            </div>
            <form id="new-reply-form">
                <div class="form-group">
                    <label for="reply-content">Nội dung</label>
                    <textarea id="reply-content" rows="5" placeholder="Trình bày lời giải hoặc kinh nghiệm của bạn..." required></textarea>
                </div>
                <div class="form-group">
                    <label for="reply-suggestion">Gợi ý thêm (tuỳ chọn)</label>
                    <input type="text" id="reply-suggestion" placeholder="Ví dụ: Đính kèm tài liệu, tham khảo, livestream...">
                </div>
                <button type="submit" class="btn btn-primary">Đăng phản hồi</button>
            </form>
        `;
    }

    bindEvents() {
        document.getElementById('forum-post-root').addEventListener('click', (event) => {
            const actionButton = event.target.closest('[data-action]');
            if (!actionButton) return;

            const action = actionButton.getAttribute('data-action');
            const replyId = actionButton.getAttribute('data-reply-id');

            switch (action) {
                case 'like':
                    this.handleLikeReply(replyId);
                    break;
                case 'reply':
                    this.handleQuickReply(replyId);
                    break;
                case 'edit':
                    this.handleEditReply(replyId);
                    break;
                case 'delete':
                    this.handleDeleteReply(replyId);
                    break;
                case 'mark-solution':
                    this.handleMarkSolution(replyId);
                    break;
                default:
                    break;
            }
        });

        document.getElementById('related-posts').addEventListener('click', (event) => {
            const button = event.target.closest('[data-related-id]');
            if (!button) return;
            const id = Number(button.getAttribute('data-related-id'));
            window.location.href = `forum-post.html?id=${id}`;
        });

        const followBtn = document.getElementById('follow-thread-btn');
        if (followBtn) {
            followBtn.addEventListener('click', () => this.toggleFollow(followBtn));
        }

        const shareBtn = document.getElementById('share-thread-btn');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => this.shareThread());
        }

        const markSolvedBtn = document.getElementById('mark-solved-btn');
        if (markSolvedBtn) {
            markSolvedBtn.addEventListener('click', () => this.markThreadSolved(markSolvedBtn));
        }

        const form = document.getElementById('new-reply-form');
        if (form) {
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                this.handleSubmitReply();
            });
        }
    }

    handleLikeReply(replyId) {
        const reply = this.post.replies.find(item => item.id === replyId);
        if (!reply) return;

        reply.likes += 1;
        this.persistCurrentPost();
        this.renderReplies();
    }

    handleQuickReply(replyId) {
        const reply = this.post.replies.find(item => item.id === replyId);
        if (!reply) return;

        const textarea = document.getElementById('reply-content');
        if (textarea) {
            textarea.value = `@${reply.author} `;
            textarea.focus();
        }
    }

    handleEditReply(replyId) {
        const reply = this.post.replies.find(item => item.id === replyId);
        if (!reply) return;

        const newContent = prompt('Chỉnh sửa nội dung phản hồi:', reply.content);
        if (newContent) {
            reply.content = newContent;
            reply.updatedAt = 'Vừa xong';
            this.persistCurrentPost();
            this.renderReplies();
        }
    }

    handleDeleteReply(replyId) {
        if (!confirm('Bạn có chắc chắn muốn xóa phản hồi này?')) return;

        this.post.replies = this.post.replies.filter(item => item.id !== replyId);
        this.post.repliesCount = this.post.replies.length;
        this.persistCurrentPost();
        this.renderReplies();
    }

    handleMarkSolution(replyId) {
        this.post.replies.forEach(reply => {
            reply.isSolution = reply.id === replyId;
        });
        this.post.solved = true;
        this.persistCurrentPost();
        this.renderHeader();
        this.renderReplies();
    }

    handleSubmitReply() {
        const contentEl = document.getElementById('reply-content');
        const suggestionEl = document.getElementById('reply-suggestion');
        if (!contentEl || !contentEl.value.trim()) {
            alert('Vui lòng nhập nội dung phản hồi.');
            return;
        }

        const newReply = {
            id: `${this.post.id}-r${this.post.replies.length + 1}`,
            author: 'Bạn',
            role: 'Thành viên KH33',
            signature: 'Đóng góp từ cộng đồng',
            content: contentEl.value.trim(),
            suggestion: suggestionEl?.value || '',
            attachments: [],
            createdAt: 'Vừa xong',
            likes: 0,
            isSolution: false
        };

        this.post.replies.unshift(newReply);
        this.post.repliesCount = this.post.replies.length;
        contentEl.value = '';
        if (suggestionEl) suggestionEl.value = '';

        this.persistCurrentPost();
        this.renderReplies();
    }

    toggleFollow(button) {
        const isFollowing = button.classList.toggle('is-following');
        button.textContent = isFollowing ? 'Đang theo dõi' : 'Theo dõi';
        if (isFollowing) {
            this.post.followers += 1;
        } else {
            this.post.followers = Math.max(0, this.post.followers - 1);
        }
        this.persistCurrentPost();
        this.renderStats();
    }

    shareThread() {
        navigator.clipboard?.writeText(window.location.href);
        alert('Đã sao chép link bài viết vào clipboard.');
    }

    markThreadSolved(button) {
        if (!confirm('Xác nhận đánh dấu bài viết đã được giải quyết?')) return;
        this.post.solved = true;
        button.disabled = true;
        this.persistCurrentPost();
        this.renderHeader();
        this.renderReplies();
    }

    persistCurrentPost() {
        localStorage.setItem('currentForumPost', JSON.stringify(this.post));
    }

    renderError() {
        const root = document.getElementById('forum-post-root');
        if (root) {
            root.innerHTML = `
                <div class="card">
                    <h2>Không tìm thấy bài viết</h2>
                    <p>Bài viết bạn yêu cầu không tồn tại hoặc đã bị xóa.</p>
                    <button class="btn btn-primary" onclick="window.location.href='forum.html'">Quay lại diễn đàn</button>
                </div>
            `;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
        window.location.href = 'index.html';
        return;
    }

    new ForumPostPage();
});

