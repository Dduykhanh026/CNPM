// Student support centre
class SupportCenter {
    constructor() {
        this.filters = {
            status: 'all',
            search: ''
        };

        this.dataset = this.buildDataset();
        this.cacheDom();
        this.init();
    }

    buildDataset() {
        return {
            stats: {
                open: 2,
                pending: 1,
                resolved: 6,
                avgResponse: '6 giờ'
            },
            reports: [
                {
                    id: 'SUP-241208-01',
                    title: 'Lỗi hiển thị công thức bài giảng Toán - Chương Hàm số',
                    category: 'content',
                    status: 'open',
                    priority: 'high',
                    updatedAt: '10/12/2024 09:45',
                    detail: 'Một số công thức LaTeX không hiển thị trên trình duyệt Safari.',
                    timeline: [
                        { time: '10/12/2024 09:45', message: 'Bạn đã gửi yêu cầu tới đội nội dung.', actor: 'student' },
                        { time: '10/12/2024 10:10', message: 'Đội nội dung tiếp nhận và đang rà soát file nguồn.', actor: 'staff' }
                    ]
                },
                {
                    id: 'SUP-241207-02',
                    title: 'Bài tập Vật Lý: đáp án câu 15 chưa cập nhật',
                    category: 'exercise',
                    status: 'pending',
                    priority: 'medium',
                    updatedAt: '09/12/2024 20:12',
                    detail: 'Đáp án câu 15 của bộ đề Dao động - Sóng cơ chưa được cập nhật theo version mới.',
                    timeline: [
                        { time: '09/12/2024 18:00', message: 'Bạn đã gửi phản hồi kèm ảnh chụp.', actor: 'student' },
                        { time: '09/12/2024 19:10', message: 'Đội Vật Lý xác nhận lỗi, đang cập nhật lời giải chi tiết.', actor: 'staff' },
                        { time: '09/12/2024 20:12', message: 'Đã gửi bản lời giải nháp. Chờ bạn kiểm tra lại.', actor: 'staff' }
                    ]
                },
                {
                    id: 'SUP-241205-03',
                    title: 'Xác nhận thanh toán khóa ôn thi THPTQG chưa nhận được',
                    category: 'payment',
                    status: 'resolved',
                    priority: 'urgent',
                    updatedAt: '06/12/2024 08:30',
                    detail: 'Thanh toán qua VNPay thành công nhưng chưa thấy cập nhật trong mục tài liệu đã mua.',
                    timeline: [
                        { time: '05/12/2024 21:05', message: 'Bạn đã gửi yêu cầu kèm mã giao dịch.', actor: 'student' },
                        { time: '05/12/2024 21:30', message: 'Bộ phận công nợ kiểm tra tình trạng thanh toán.', actor: 'staff' },
                        { time: '06/12/2024 08:30', message: 'Đã đối soát giao dịch, khóa học hiển thị trong tài khoản của bạn.', actor: 'staff' }
                    ]
                }
            ],
            knowledgeBase: [
                {
                    title: 'Cách sửa lỗi LaTeX không hiển thị',
                    summary: 'Làm mới trang với phím tắt, kiểm tra trình duyệt hỗ trợ MathJax, hoặc tải file PDF dự phòng.',
                    link: '#'
                },
                {
                    title: 'Quy trình cập nhật đáp án bài tập',
                    summary: 'Gửi ảnh chụp câu hỏi, mô tả lỗi, đội ngũ sẽ phản hồi trong 24 giờ.',
                    link: '#'
                },
                {
                    title: 'Kiểm tra lịch sử thanh toán',
                    summary: 'Vào trang Thanh toán > Lịch sử giao dịch hoặc tải hóa đơn gửi qua email.',
                    link: '#'
                },
                {
                    title: 'Khôi phục mật khẩu / tài khoản',
                    summary: 'Sử dụng tính năng khôi phục mật khẩu đa bước, kiểm tra email spam khi nhận OTP.',
                    link: '#'
                }
            ]
        };
    }

    cacheDom() {
        this.root = document.getElementById('support-root');
        this.statsContainer = document.getElementById('support-stats');
        this.form = document.getElementById('support-form');
        this.formAlert = document.getElementById('support-form-alert');
        this.knowledgeBaseContainer = document.getElementById('knowledge-base');
        this.tableBody = document.getElementById('support-table-body');

        this.statusFilter = document.getElementById('support-filter-status');
        this.searchInput = document.getElementById('support-search');
        this.saveDraftBtn = document.getElementById('save-draft-support');
        this.loadDraftBtn = document.getElementById('load-draft-report');

        this.modal = document.getElementById('support-modal');
        this.modalBody = document.getElementById('support-modal-body');
        this.modalCloseBtn = document.getElementById('support-modal-close');
    }

    init() {
        if (!this.root) return;
        this.renderStats();
        this.renderKnowledgeBase();
        this.renderReports();
        this.bindEvents();
    }

    bindEvents() {
        if (this.form) {
            this.form.addEventListener('submit', (event) => {
                event.preventDefault();
                this.submitReport();
            });
        }

        if (this.saveDraftBtn) {
            this.saveDraftBtn.addEventListener('click', () => this.saveDraft());
        }

        if (this.loadDraftBtn) {
            this.loadDraftBtn.addEventListener('click', () => this.loadDraft());
        }

        if (this.statusFilter) {
            this.statusFilter.addEventListener('change', () => {
                this.filters.status = this.statusFilter.value;
                this.renderReports();
            });
        }

        if (this.searchInput) {
            this.searchInput.addEventListener('input', (event) => {
                this.filters.search = event.target.value.trim().toLowerCase();
                this.renderReports();
            });
        }

        if (this.tableBody) {
            this.tableBody.addEventListener('click', (event) => {
                const button = event.target.closest('button[data-report]');
                if (!button) return;
                const report = this.dataset.reports.find(item => item.id === button.dataset.report);
                if (!report) return;
                this.openReportModal(report);
            });
        }

        if (this.modalCloseBtn) {
            this.modalCloseBtn.addEventListener('click', () => this.closeModal());
        }

        if (this.modal) {
            this.modal.addEventListener('click', (event) => {
                if (event.target === this.modal) {
                    this.closeModal();
                }
            });
        }
    }

    renderStats() {
        if (!this.statsContainer) return;
        const { open, pending, resolved, avgResponse } = this.dataset.stats;
        this.statsContainer.innerHTML = `
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-clipboard-check"></i></div>
                <div class="stat-info">
                    <h3>${open}</h3>
                    <p>Yêu cầu đang xử lý</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-hourglass-half"></i></div>
                <div class="stat-info">
                    <h3>${pending}</h3>
                    <p>Chờ phản hồi thêm</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-check-circle"></i></div>
                <div class="stat-info">
                    <h3>${resolved}</h3>
                    <p>Đã giải quyết</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-clock"></i></div>
                <div class="stat-info">
                    <h3>${avgResponse}</h3>
                    <p>Thời gian phản hồi trung bình</p>
                </div>
            </div>
        `;
    }

    renderKnowledgeBase() {
        if (!this.knowledgeBaseContainer) return;
        this.knowledgeBaseContainer.innerHTML = this.dataset.knowledgeBase.map(item => `
            <div class="card">
                <h3>${item.title}</h3>
                <p class="text-muted">${item.summary}</p>
                <button class="btn btn-sm btn-secondary">Xem hướng dẫn</button>
            </div>
        `).join('');
    }

    renderReports() {
        if (!this.tableBody) return;
        let rows = [...this.dataset.reports];
        if (this.filters.status !== 'all') {
            rows = rows.filter(row => row.status === this.filters.status);
        }
        if (this.filters.search) {
            rows = rows.filter(row =>
                row.title.toLowerCase().includes(this.filters.search) ||
                row.id.toLowerCase().includes(this.filters.search)
            );
        }

        if (rows.length === 0) {
            this.tableBody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align:center; color: var(--text-secondary);">
                        Không có yêu cầu nào phù hợp với bộ lọc hiện tại.
                    </td>
                </tr>
            `;
            return;
        }

        this.tableBody.innerHTML = rows.map(row => `
            <tr>
                <td>${row.id}</td>
                <td>${row.title}</td>
                <td><span class="badge badge-info">${this.mapCategory(row.category)}</span></td>
                <td>${this.renderStatusChip(row.status)}</td>
                <td>${row.updatedAt}</td>
                <td>
                    <button class="btn btn-sm btn-secondary" data-report="${row.id}">Xem tiến trình</button>
                </td>
            </tr>
        `).join('');
    }

    submitReport() {
        const title = document.getElementById('support-title').value.trim();
        const category = document.getElementById('support-category').value;
        const priority = document.getElementById('support-priority').value;
        const link = document.getElementById('support-related-link').value.trim();
        const description = document.getElementById('support-description').value.trim();

        if (!title || !description) {
            this.showFormAlert('Vui lòng nhập đầy đủ tiêu đề và mô tả chi tiết.', 'error');
            return;
        }

        const newReport = {
            id: `SUP-${Date.now().toString().slice(-6)}`,
            title,
            category,
            status: 'open',
            priority,
            updatedAt: new Date().toLocaleString('vi-VN'),
            detail: description,
            timeline: [
                { time: new Date().toLocaleString('vi-VN'), message: 'Bạn đã gửi yêu cầu tới đội hỗ trợ.', actor: 'student' }
            ],
            link
        };

        this.dataset.reports.unshift(newReport);
        this.dataset.stats.open += 1;
        this.renderStats();
        this.renderReports();
        this.showFormAlert('Đã gửi yêu cầu hỗ trợ. Chúng tôi sẽ phản hồi trong vòng 24 giờ.', 'success');
        this.form.reset();
        localStorage.removeItem('kh33SupportDraft');
    }

    saveDraft() {
        if (!this.form) return;
        const draft = {
            title: document.getElementById('support-title').value,
            category: document.getElementById('support-category').value,
            priority: document.getElementById('support-priority').value,
            link: document.getElementById('support-related-link').value,
            description: document.getElementById('support-description').value
        };
        localStorage.setItem('kh33SupportDraft', JSON.stringify(draft));
        this.showFormAlert('Đã lưu bản nháp yêu cầu hỗ trợ.', 'info');
    }

    loadDraft() {
        const draft = localStorage.getItem('kh33SupportDraft');
        if (!draft) {
            this.showFormAlert('Hiện không có bản nháp nào.', 'warning');
            return;
        }
        const data = JSON.parse(draft);
        document.getElementById('support-title').value = data.title || '';
        document.getElementById('support-category').value = data.category || 'content';
        document.getElementById('support-priority').value = data.priority || 'medium';
        document.getElementById('support-related-link').value = data.link || '';
        document.getElementById('support-description').value = data.description || '';
        this.showFormAlert('Đã nạp bản nháp gần nhất.', 'info');
    }

    openReportModal(report) {
        if (!this.modal || !this.modalBody) return;
        this.modalBody.innerHTML = `
            <h3>${report.title}</h3>
            <p class="text-muted">Mã yêu cầu: ${report.id} • Ưu tiên: ${report.priority.toUpperCase()}</p>
            <div class="detail-section">
                <h4>Mô tả chi tiết</h4>
                <p>${report.detail}</p>
                ${report.link ? `<p>Liên kết liên quan: <a href="${report.link}" target="_blank">${report.link}</a></p>` : ''}
            </div>
            <div class="detail-section">
                <h4>Tiến trình xử lý</h4>
                <ul class="detail-list">
                    ${report.timeline.map(step => `<li><strong>${step.time}</strong> - ${step.actor === 'student' ? 'Bạn' : 'Đội hỗ trợ'}: ${step.message}</li>`).join('')}
                </ul>
            </div>
        `;
        this.modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        if (!this.modal) return;
        this.modal.classList.remove('open');
        document.body.style.overflow = '';
    }

    showFormAlert(message, type = 'info') {
        if (!this.formAlert) return;
        this.formAlert.innerHTML = `<div class="alert alert-${this.mapAlertType(type)}">${message}</div>`;
        setTimeout(() => {
            if (this.formAlert) this.formAlert.innerHTML = '';
        }, 5000);
    }

    renderStatusChip(status) {
        switch (status) {
            case 'open':
                return '<span class="status-chip pending">Đang xử lý</span>';
            case 'pending':
                return '<span class="status-chip published">Chờ phản hồi</span>';
            case 'resolved':
                return '<span class="status-chip hidden">Đã giải quyết</span>';
            default:
                return '<span class="status-chip">Không xác định</span>';
        }
    }

    mapCategory(category) {
        switch (category) {
            case 'content':
                return 'Bài giảng';
            case 'exercise':
                return 'Bài tập';
            case 'payment':
                return 'Thanh toán';
            case 'system':
                return 'Hệ thống';
            default:
                return 'Khác';
        }
    }

    mapAlertType(type) {
        switch (type) {
            case 'success':
                return 'success';
            case 'error':
                return 'error';
            case 'warning':
                return 'warning';
            default:
                return 'info';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const current = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!current || current.role !== 'student') {
        window.location.href = 'index.html';
        return;
    }
    new SupportCenter();
});

