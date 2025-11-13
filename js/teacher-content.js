// Teacher Content Management
class TeacherContentManager {
    constructor() {
        this.contents = [
            {
                id: 'CNT-101',
                title: 'Đại số và Giải tích - Chương 1',
                subject: 'math',
                type: 'lecture',
                price: 0,
                students: 240,
                views: 1480,
                rating: 4.7,
                status: 'published',
                visibility: 'public',
                updatedAt: '10/12/2024 09:20',
                creator: 'Nguyễn Minh',
                revenue: 0,
                featured: true
            },
            {
                id: 'CNT-118',
                title: 'Dao động điều hòa - Video minh họa',
                subject: 'physics',
                type: 'video',
                price: 50000,
                students: 165,
                views: 1286,
                rating: 4.5,
                status: 'published',
                visibility: 'public',
                updatedAt: '08/12/2024 16:05',
                creator: 'Trần Hữu Lộc',
                revenue: 8250000,
                featured: false
            },
            {
                id: 'CNT-135',
                title: 'Bộ đề luyện thi Hóa học hữu cơ',
                subject: 'chemistry',
                type: 'material',
                price: 60000,
                students: 210,
                views: 980,
                rating: 4.8,
                status: 'published',
                visibility: 'public',
                updatedAt: '07/12/2024 11:45',
                creator: 'Lê Quỳnh Anh',
                revenue: 12600000,
                featured: true
            },
            {
                id: 'CNT-140',
                title: 'Bài tập tự luyện lượng giác nâng cao',
                subject: 'math',
                type: 'exercise',
                price: 0,
                students: 185,
                views: 754,
                rating: 4.3,
                status: 'hidden',
                visibility: 'private',
                updatedAt: '05/12/2024 20:30',
                creator: 'Ngô Hồng Phúc',
                revenue: 0,
                featured: false
            },
            {
                id: 'CNT-149',
                title: 'Đề kiểm tra 45 phút - Điện từ học',
                subject: 'physics',
                type: 'exam',
                price: 0,
                students: 98,
                views: 402,
                rating: 4.4,
                status: 'draft',
                visibility: 'locked',
                updatedAt: '04/12/2024 14:15',
                creator: 'Trần Hữu Lộc',
                revenue: 0,
                featured: false
            },
            {
                id: 'CNT-153',
                title: 'Phản ứng oxi hóa khử - Slide bài giảng',
                subject: 'chemistry',
                type: 'lecture',
                price: 0,
                students: 132,
                views: 620,
                rating: 4.2,
                status: 'draft',
                visibility: 'private',
                updatedAt: '02/12/2024 19:10',
                creator: 'Lê Quỳnh Anh',
                revenue: 0,
                featured: false
            },
            {
                id: 'CNT-157',
                title: 'Chuyên đề hình học không gian 12',
                subject: 'math',
                type: 'material',
                price: 70000,
                students: 92,
                views: 512,
                rating: 4.6,
                status: 'pending',
                visibility: 'public',
                updatedAt: 'Đang chờ duyệt',
                creator: 'Nguyễn Minh',
                revenue: 6440000,
                submittedAt: '09/12/2024 08:55',
                note: 'Đề nghị duyệt để kịp lịch thi thử'
            },
            {
                id: 'CNT-162',
                title: 'Chuỗi bài tập luyện thi THPT Quốc gia - Vật lý',
                subject: 'physics',
                type: 'exercise',
                price: 35000,
                students: 74,
                views: 430,
                rating: 4.1,
                status: 'pending',
                visibility: 'locked',
                updatedAt: 'Đang chờ duyệt',
                creator: 'Trần Hữu Lộc',
                revenue: 2590000,
                submittedAt: '09/12/2024 21:10',
               note: 'Có sử dụng câu hỏi mới cập nhật'
            },
            {
                id: 'CNT-170',
                title: 'Livestream ôn tập Hóa học - Phần este',
                subject: 'chemistry',
                type: 'video',
                price: 0,
                students: 0,
                views: 0,
                rating: null,
                status: 'pending',
                visibility: 'public',
                updatedAt: 'Đang chờ duyệt',
                creator: 'Lê Quỳnh Anh',
                revenue: 0,
                submittedAt: '08/12/2024 10:05',
                note: 'Livestream dự kiến ngày 15/12'
            },
            {
                id: 'CNT-175',
                title: 'Bài tập Xác suất thống kê - Bộ 50 câu',
                subject: 'math',
                type: 'exercise',
                price: 25000,
                students: 65,
                views: 358,
                rating: 4.0,
                status: 'rejected',
                visibility: 'private',
                updatedAt: '01/12/2024 18:22',
                creator: 'Nguyễn Minh',
                revenue: 1625000,
                rejectionReason: 'Thiếu đáp án chi tiết cho 5 câu cuối'
            },
            {
                id: 'CNT-182',
                title: 'Thư viện câu hỏi trắc nghiệm điện trường',
                subject: 'physics',
                type: 'material',
                price: 0,
                students: 54,
                views: 297,
                rating: 4.2,
                status: 'hidden',
                visibility: 'private',
                updatedAt: '30/11/2024 09:05',
                creator: 'Trần Hữu Lộc',
                revenue: 0,
                featured: false
            }
        ];

        this.activity = [
            { time: '10/12/2024 09:20', message: 'Đã cập nhật nội dung “Đại số và Giải tích - Chương 1” và công bố cho lớp 12A1.' },
            { time: '09/12/2024 21:10', message: 'Gửi phê duyệt bộ bài tập “Chuỗi bài tập luyện thi THPT Quốc gia - Vật lý”.' },
            { time: '09/12/2024 08:55', message: 'Hoàn tất chỉnh sửa “Chuyên đề hình học không gian 12” theo góp ý của Admin.' },
            { time: '08/12/2024 16:05', message: 'Video “Dao động điều hòa - Video minh họa” đạt 100 người mua đầu tiên.' },
            { time: '07/12/2024 11:45', message: 'Bộ đề “Hóa học hữu cơ” được phê duyệt và hiển thị trên trang chủ.' }
        ];

        this.subjectLabels = {
            math: 'Toán',
            physics: 'Vật Lý',
            chemistry: 'Hóa Học'
        };

        this.typeLabels = {
            lecture: 'Bài giảng',
            video: 'Video',
            exercise: 'Bài tập',
            exam: 'Bài kiểm tra',
            material: 'Tài liệu'
        };

        this.selectedIds = new Set();
        this.currentFilters = {
            search: '',
            subject: 'all',
            type: 'all',
            status: 'all',
            pricing: 'all',
            visibility: 'all'
        };

        this.init();
    }

    init() {
        this.cacheDom();
        this.bindEvents();
        this.renderAll();
    }

    cacheDom() {
        this.statsContainer = document.getElementById('content-stats');
        this.filterForm = document.getElementById('content-filter-form');
        this.filterSearch = document.getElementById('filter-search');
        this.filterSubject = document.getElementById('filter-subject');
        this.filterType = document.getElementById('filter-type');
        this.filterStatus = document.getElementById('filter-status');
        this.filterPricing = document.getElementById('filter-pricing');
        this.filterVisibility = document.getElementById('filter-visibility');
        this.filterResetBtn = document.getElementById('filter-reset-btn');
        this.filterExportBtn = document.getElementById('filter-export-btn');

        this.tableBody = document.getElementById('content-table-body');
        this.pendingTableBody = document.getElementById('pending-table-body');
        this.draftList = document.getElementById('draft-list');
        this.activityList = document.getElementById('content-activity');

        this.selectAllCheckbox = document.getElementById('select-all-contents');
        this.bulkVisibilityBtn = document.getElementById('bulk-visibility-btn');
        this.bulkFeatureBtn = document.getElementById('bulk-feature-btn');
        this.pendingBulkApproveBtn = document.getElementById('pending-bulk-approve');

        this.modal = document.getElementById('content-modal');
        this.modalForm = document.getElementById('content-create-form');
        this.modalTitle = document.getElementById('create-title');
        this.modalDescription = document.getElementById('create-description');
        this.modalSubject = document.getElementById('create-subject');
        this.modalType = document.getElementById('create-type');
        this.modalPrice = document.getElementById('create-price');
        this.modalVisibility = document.getElementById('create-visibility');
        this.modalFile = document.getElementById('create-file');
        this.fileList = document.getElementById('file-list');
        this.fileNames = document.getElementById('file-names');

        this.previewModal = document.getElementById('content-preview-modal');
        this.previewBody = document.getElementById('content-preview-body');
        this.previewCloseBtn = document.getElementById('preview-modal-close');

        this.editModal = document.getElementById('content-edit-modal');
        this.editForm = document.getElementById('content-edit-form');
        this.editCloseBtn = document.getElementById('edit-modal-close');
        this.cancelEditBtn = document.getElementById('cancel-edit-btn');
    }

    bindEvents() {
        if (this.filterForm) {
            this.filterForm.addEventListener('submit', (event) => {
                event.preventDefault();
                this.applyFilters();
            });
        }

        if (this.filterResetBtn) {
            this.filterResetBtn.addEventListener('click', () => {
                this.resetFilters();
            });
        }

        if (this.filterExportBtn) {
            this.filterExportBtn.addEventListener('click', () => {
                alert('Đã xuất danh sách nội dung (mô phỏng). Trong thực tế sẽ tạo tệp CSV/Excel.');
            });
        }

        if (this.bulkVisibilityBtn) {
            this.bulkVisibilityBtn.addEventListener('click', () => {
                if (this.selectedIds.size === 0) {
                    alert('Vui lòng chọn ít nhất một nội dung để thay đổi trạng thái hiển thị.');
                    return;
                }
                alert(`Đã cập nhật trạng thái hiển thị cho ${this.selectedIds.size} nội dung (mô phỏng).`);
            });
        }

        if (this.bulkFeatureBtn) {
            this.bulkFeatureBtn.addEventListener('click', () => {
                if (this.selectedIds.size === 0) {
                    alert('Vui lòng chọn ít nhất một nội dung để đánh dấu nổi bật.');
                    return;
                }
                alert('Đã gửi yêu cầu đánh dấu nổi bật cho nội dung đã chọn (mô phỏng).');
            });
        }

        if (this.pendingBulkApproveBtn) {
            this.pendingBulkApproveBtn.addEventListener('click', () => {
                const pendingCount = this.contents.filter(item => item.status === 'pending').length;
                if (pendingCount === 0) {
                    alert('Hiện tại không có nội dung nào đang chờ phê duyệt.');
                    return;
                }
                alert('Đã gửi yêu cầu phê duyệt hàng loạt đến quản trị viên (mô phỏng).');
            });
        }

        if (this.selectAllCheckbox) {
            this.selectAllCheckbox.addEventListener('change', (event) => {
                const checked = event.target.checked;
                this.tableBody.querySelectorAll('input[type="checkbox"][data-id]').forEach(cb => {
                    cb.checked = checked;
                    this.toggleSelection(cb.dataset.id, checked);
                });
            });
        }

        if (this.modalForm) {
            this.modalForm.addEventListener('submit', (event) => {
                event.preventDefault();
                this.handleCreateContent();
            });
        }

        if (this.modal) {
            this.modal.addEventListener('click', (event) => {
                if (event.target === this.modal) {
                    this.closeModal();
                }
            });
        }

        if (this.modalFile) {
            this.modalFile.addEventListener('change', (event) => {
                this.handleFileSelection(event);
            });
        }

        if (this.previewCloseBtn) {
            this.previewCloseBtn.addEventListener('click', () => this.closePreviewModal());
        }

        if (this.previewModal) {
            this.previewModal.addEventListener('click', (event) => {
                if (event.target === this.previewModal) {
                    this.closePreviewModal();
                }
            });
        }

        if (this.editCloseBtn) {
            this.editCloseBtn.addEventListener('click', () => this.closeEditModal());
        }

        if (this.cancelEditBtn) {
            this.cancelEditBtn.addEventListener('click', () => this.closeEditModal());
        }

        if (this.editModal) {
            this.editModal.addEventListener('click', (event) => {
                if (event.target === this.editModal) {
                    this.closeEditModal();
                }
            });
        }

        if (this.editForm) {
            this.editForm.addEventListener('submit', (event) => {
                event.preventDefault();
                this.handleEditContent();
            });
        }
    }

    handleFileSelection(event) {
        const files = event.target.files;
        if (!files || files.length === 0) {
            if (this.fileList) this.fileList.style.display = 'none';
            return;
        }

        if (this.fileList) this.fileList.style.display = 'block';
        if (this.fileNames) {
            this.fileNames.innerHTML = Array.from(files).map((file, index) => {
                const fileSize = (file.size / 1024 / 1024).toFixed(2);
                return `
                    <div style="display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; background: var(--bg-secondary); border-radius: 8px;">
                        <span style="font-size: 13px; color: var(--text-primary);">
                            <i class="fas fa-file" style="margin-right: 6px; color: var(--primary-color);"></i>
                            ${file.name}
                        </span>
                        <span style="font-size: 12px; color: var(--text-secondary);">${fileSize} MB</span>
                    </div>
                `;
            }).join('');
        }
    }

    renderAll() {
        this.renderStats();
        this.renderTable();
        this.renderPending();
        this.renderDrafts();
        this.renderActivity();
    }

    applyFilters() {
        this.currentFilters = {
            search: (this.filterSearch?.value || '').trim().toLowerCase(),
            subject: this.filterSubject?.value || 'all',
            type: this.filterType?.value || 'all',
            status: this.filterStatus?.value || 'all',
            pricing: this.filterPricing?.value || 'all',
            visibility: this.filterVisibility?.value || 'all'
        };
        this.renderTable();
    }

    resetFilters() {
        this.filterSearch.value = '';
        this.filterSubject.value = 'all';
        this.filterType.value = 'all';
        this.filterStatus.value = 'all';
        this.filterPricing.value = 'all';
        this.filterVisibility.value = 'all';
        this.selectedIds.clear();
        if (this.selectAllCheckbox) {
            this.selectAllCheckbox.checked = false;
        }
        this.applyFilters();
    }

    renderStats() {
        if (!this.statsContainer) return;

        const published = this.contents.filter(item => item.status === 'published');
        const pending = this.contents.filter(item => item.status === 'pending');
        const drafts = this.contents.filter(item => item.status === 'draft');
        const totalStudents = published.reduce((sum, item) => sum + item.students, 0);
        const totalRevenue = published.reduce((sum, item) => sum + (item.revenue || 0), 0);

        this.statsContainer.innerHTML = `
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-book"></i></div>
                <div class="stat-info">
                    <h3>${published.length}</h3>
                    <p>Nội dung đã xuất bản</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-hourglass-half"></i></div>
                <div class="stat-info">
                    <h3>${pending.length}</h3>
                    <p>Đang chờ phê duyệt</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-user-graduate"></i></div>
                <div class="stat-info">
                    <h3>${totalStudents}</h3>
                    <p>Học sinh đang theo học</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-wallet"></i></div>
                <div class="stat-info">
                    <h3>${this.formatCurrency(totalRevenue)}</h3>
                    <p>Doanh thu tích lũy</p>
                </div>
            </div>
        `;
    }

    renderTable() {
        if (!this.tableBody) return;

        const filters = this.currentFilters;
        let filtered = this.contents.filter(item => item.status !== 'pending');

        if (filters.status !== 'all') {
            if (filters.status === 'pending') {
                filtered = this.contents.filter(item => item.status === 'pending');
            } else {
                filtered = filtered.filter(item => item.status === filters.status);
            }
        }

        if (filters.subject !== 'all') {
            filtered = filtered.filter(item => item.subject === filters.subject);
        }

        if (filters.type !== 'all') {
            filtered = filtered.filter(item => item.type === filters.type);
        }

        if (filters.pricing !== 'all') {
            filtered = filtered.filter(item => {
                return filters.pricing === 'free' ? item.price === 0 : item.price > 0;
            });
        }

        if (filters.visibility !== 'all') {
            filtered = filtered.filter(item => item.visibility === filters.visibility);
        }

        if (filters.search) {
            filtered = filtered.filter(item => {
                const text = `${item.id} ${item.title} ${this.subjectLabels[item.subject]} ${this.typeLabels[item.type]} ${item.creator}`.toLowerCase();
                return text.includes(filters.search);
            });
        }

        if (filters.status === 'pending') {
            this.tableBody.innerHTML = `
                <tr>
                    <td colspan="12" style="text-align:center; color: var(--text-secondary);">
                        Nội dung đang chờ phê duyệt được hiển thị trong bảng "Chờ Phê Duyệt" phía dưới.
                    </td>
                </tr>
            `;
            this.selectedIds.clear();
            if (this.selectAllCheckbox) {
                this.selectAllCheckbox.checked = false;
            }
            return;
        }

        if (filtered.length === 0) {
            this.tableBody.innerHTML = `
                <tr>
                    <td colspan="12" style="text-align:center; color: var(--text-secondary);">
                        Không tìm thấy nội dung phù hợp với bộ lọc hiện tại.
                    </td>
                </tr>
            `;
            this.selectedIds.clear();
            if (this.selectAllCheckbox) {
                this.selectAllCheckbox.checked = false;
            }
            return;
        }

        this.tableBody.innerHTML = filtered.map(item => this.createContentRow(item)).join('');
        this.bindRowInteractivity();
    }

    createContentRow(item) {
        const subject = this.subjectLabels[item.subject] || item.subject;
        const type = this.typeLabels[item.type] || item.type;
        const price = item.price === 0 ? 'Miễn phí' : this.formatCurrency(item.price);
        const rating = item.rating ? `${item.rating.toFixed(1)} ⭐` : '—';
        const statusChip = this.getStatusChip(item);
        const featuredTag = item.featured ? '<span class="tag">Nổi bật</span>' : '';

        return `
            <tr>
                <td><input type="checkbox" data-id="${item.id}" ${this.selectedIds.has(item.id) ? 'checked' : ''}></td>
                <td>${item.id}</td>
                <td>
                    <strong>${item.title}</strong><br>
                    <span class="draft-item-meta">${featuredTag}${item.visibility === 'locked' ? '<span class="tag">Giới hạn lớp</span>' : ''}</span>
                </td>
                <td>${subject}</td>
                <td>${type}</td>
                <td>${price}</td>
                <td>${item.students}</td>
                <td>${item.views}</td>
                <td>${rating}</td>
                <td>${statusChip}</td>
                <td>${item.updatedAt}</td>
                <td>
                    <div class="draft-item-actions">
                        <button class="btn btn-sm btn-primary" data-action="view" data-id="${item.id}">Xem</button>
                        <button class="btn btn-sm btn-secondary" data-action="edit" data-id="${item.id}">Chỉnh sửa</button>
                        <button class="btn btn-sm btn-secondary" data-action="toggle" data-id="${item.id}">${item.status === 'hidden' ? 'Hiển thị' : 'Ẩn'}</button>
                        <button class="btn btn-sm btn-danger" data-action="delete" data-id="${item.id}">Xóa</button>
                    </div>
                </td>
            </tr>
        `;
    }

    bindRowInteractivity() {
        this.tableBody.querySelectorAll('input[type="checkbox"][data-id]').forEach(cb => {
            cb.addEventListener('change', (event) => {
                this.toggleSelection(event.target.dataset.id, event.target.checked);
            });
        });

        this.tableBody.querySelectorAll('button[data-action]').forEach(button => {
            button.addEventListener('click', (event) => {
                const { action, id } = event.currentTarget.dataset;
                this.handleRowAction(action, id);
            });
        });

        if (this.selectAllCheckbox) {
            const checkboxCount = this.tableBody.querySelectorAll('input[type="checkbox"][data-id]').length;
            const selectedCount = this.tableBody.querySelectorAll('input[type="checkbox"][data-id]:checked').length;
            this.selectAllCheckbox.checked = checkboxCount > 0 && selectedCount === checkboxCount;
        }
    }

    toggleSelection(id, checked) {
        if (checked) {
            this.selectedIds.add(id);
        } else {
            this.selectedIds.delete(id);
        }
    }

    handleRowAction(action, id) {
        const item = this.contents.find(content => content.id === id);
        if (!item) return;

        switch (action) {
            case 'view':
                this.showPreviewModal(item);
                break;
            case 'edit':
                this.showEditModal(item);
                break;
            case 'toggle':
                if (item.status === 'hidden') {
                    item.status = 'published';
                    item.updatedAt = this.now();
                    this.activity.unshift({ time: this.now(), message: `Đã hiển thị lại nội dung "${item.title}".` });
                } else {
                    item.status = 'hidden';
                    item.updatedAt = this.now();
                    this.activity.unshift({ time: this.now(), message: `Đã ẩn nội dung "${item.title}".` });
                }
                this.renderAll();
                break;
            case 'delete':
                if (confirm(`Bạn có chắc chắn muốn xóa nội dung "${item.title}"? Hành động này không thể hoàn tác.`)) {
                    this.contents = this.contents.filter(content => content.id !== id);
                    this.activity.unshift({ time: this.now(), message: `Đã xóa nội dung "${item.title}".` });
                    this.renderAll();
                    alert(`Đã xóa nội dung "${item.title}" thành công (mô phỏng).`);
                }
                break;
            default:
                break;
        }
    }

    getStatusChip(item) {
        const statusText = {
            published: 'Đã duyệt',
            pending: 'Chờ duyệt',
            draft: 'Bản nháp',
            hidden: 'Đã ẩn',
            rejected: 'Bị từ chối'
        };
        return `<span class="status-chip ${item.status}">${statusText[item.status] || item.status}</span>`;
    }

    renderPending() {
        if (!this.pendingTableBody) return;

        const pendingItems = this.contents.filter(item => item.status === 'pending');
        if (pendingItems.length === 0) {
            this.pendingTableBody.innerHTML = `
                <tr>
                    <td colspan="8" style="text-align:center; color: var(--text-secondary);">
                        Không có nội dung nào đang chờ phê duyệt.
                    </td>
                </tr>
            `;
            return;
        }

        this.pendingTableBody.innerHTML = pendingItems.map(item => `
            <tr>
                <td>${item.id}</td>
                <td><strong>${item.title}</strong></td>
                <td>${this.subjectLabels[item.subject]}</td>
                <td>${this.typeLabels[item.type]}</td>
                <td>${item.creator}</td>
                <td>${item.submittedAt || '—'}</td>
                <td>${item.note || '—'}</td>
                <td>
                    <div class="draft-item-actions">
                        <button class="btn btn-sm btn-primary" data-pending-action="approve" data-id="${item.id}">Phê duyệt</button>
                        <button class="btn btn-sm btn-secondary" data-pending-action="comment" data-id="${item.id}">Góp ý</button>
                        <button class="btn btn-sm btn-danger" data-pending-action="reject" data-id="${item.id}">Từ chối</button>
                    </div>
                </td>
            </tr>
        `).join('');

        this.pendingTableBody.querySelectorAll('button[data-pending-action]').forEach(button => {
            button.addEventListener('click', (event) => {
                const { pendingAction, id } = event.currentTarget.dataset;
                this.handlePendingAction(pendingAction, id);
            });
        });
    }

    handlePendingAction(action, id) {
        const item = this.contents.find(content => content.id === id);
        if (!item) return;

        switch (action) {
            case 'approve':
                item.status = 'published';
                item.updatedAt = this.now();
                this.activity.unshift({ time: this.now(), message: `Admin đã phê duyệt nội dung "${item.title}".` });
                alert(`Đã gửi yêu cầu phê duyệt cho "${item.title}" đến Admin (mô phỏng).`);
                break;
            case 'reject':
                item.status = 'rejected';
                item.updatedAt = this.now();
                item.rejectionReason = 'Admin yêu cầu bổ sung tài liệu minh chứng.';
                this.activity.unshift({ time: this.now(), message: `Admin từ chối nội dung "${item.title}".` });
                alert(`Đã đánh dấu "${item.title}" là bị từ chối (mô phỏng).`);
                break;
            case 'comment':
                alert(`Đã gửi góp ý cho "${item.title}" (mô phỏng).`);
                break;
            default:
                break;
        }
        this.renderAll();
    }

    renderDrafts() {
        if (!this.draftList) return;

        const drafts = this.contents.filter(item => item.status === 'draft' || item.status === 'rejected');
        if (drafts.length === 0) {
            this.draftList.innerHTML = `
                <div class="draft-item" style="justify-content: center; background: transparent; border: none; color: var(--text-secondary);">
                    Không có bản nháp hoặc nội dung bị từ chối.
                </div>
            `;
            return;
        }

        this.draftList.innerHTML = drafts.map(item => `
            <div class="draft-item">
                <div>
                    <h3>${item.title}</h3>
                    <div class="draft-item-meta">
                        <span>Môn: ${this.subjectLabels[item.subject]}</span>
                        <span>Loại: ${this.typeLabels[item.type]}</span>
                        <span>Cập nhật: ${item.updatedAt}</span>
                        ${item.rejectionReason ? `<span>Lý do: ${item.rejectionReason}</span>` : ''}
                    </div>
                </div>
                <div class="draft-item-actions">
                    <button class="btn btn-sm btn-primary" data-draft-action="continue" data-id="${item.id}">Tiếp tục chỉnh sửa</button>
                    <button class="btn btn-sm btn-secondary" data-draft-action="share" data-id="${item.id}">Chia sẻ cho đồng nghiệp</button>
                    <button class="btn btn-sm btn-danger" data-draft-action="remove" data-id="${item.id}">Xóa</button>
                </div>
            </div>
        `).join('');

        this.draftList.querySelectorAll('button[data-draft-action]').forEach(button => {
            button.addEventListener('click', (event) => {
                const { draftAction, id } = event.currentTarget.dataset;
                this.handleDraftAction(draftAction, id);
            });
        });
    }

    handleDraftAction(action, id) {
        const item = this.contents.find(content => content.id === id);
        if (!item) return;

        switch (action) {
            case 'continue':
                alert(`Mở màn hình chỉnh sửa cho "${item.title}" (mô phỏng).`);
                break;
            case 'share':
                alert(`Đã chia sẻ "${item.title}" cho đồng nghiệp (mô phỏng).`);
                break;
            case 'remove':
                if (confirm(`Bạn có chắc chắn muốn xóa "${item.title}"?`)) {
                    this.contents = this.contents.filter(content => content.id !== id);
                    this.activity.unshift({ time: this.now(), message: `Đã xóa bản nháp "${item.title}".` });
                    this.renderAll();
                }
                break;
            default:
                break;
        }
    }

    renderActivity() {
        if (!this.activityList) return;

        this.activityList.innerHTML = this.activity.slice(0, 6).map(entry => `
            <li>
                <strong>${entry.time}</strong><br>
                ${entry.message}
            </li>
        `).join('');
    }

    handleCreateContent() {
        const title = this.modalTitle.value.trim();
        const subject = this.modalSubject.value;
        const type = this.modalType.value;
        const price = Number(this.modalPrice.value) || 0;
        const visibility = this.modalVisibility.value;
        const description = this.modalDescription.value.trim();
        const files = this.modalFile?.files || [];

        if (!title) {
            alert('Vui lòng nhập tiêu đề nội dung.');
            return;
        }

        const newId = `CNT-${Math.floor(Math.random() * 900 + 200)}`;
        const now = this.now();

        // Xử lý file đính kèm
        let fileInfo = '';
        if (files.length > 0) {
            fileInfo = ` (${files.length} file đính kèm: ${Array.from(files).map(f => f.name).join(', ')})`;
        }

        this.contents.push({
            id: newId,
            title,
            subject,
            type,
            price,
            students: 0,
            views: 0,
            rating: null,
            status: 'pending',
            visibility,
            updatedAt: 'Đang chờ duyệt',
            creator: 'Bạn',
            revenue: 0,
            submittedAt: now,
            note: description || 'Đang chờ phê duyệt',
            attachments: files.length > 0 ? Array.from(files).map(f => f.name) : []
        });

        this.activity.unshift({ time: now, message: `Đã gửi nội dung "${title}"${fileInfo} lên hệ thống để phê duyệt.` });
        this.closeModal();
        this.renderAll();

        alert(`Nội dung mới đã được gửi phê duyệt${fileInfo ? ` với ${files.length} file đính kèm` : ''}. Bạn sẽ nhận thông báo khi Admin phản hồi (mô phỏng).`);
    }

    openModal() {
        if (!this.modal) return;
        this.modal.classList.add('open');
        document.body.style.overflow = 'hidden';
        this.modalForm.reset();
        this.modalPrice.value = 0;
        if (this.fileList) this.fileList.style.display = 'none';
        if (this.fileNames) this.fileNames.innerHTML = '';
    }

    closeModal() {
        if (!this.modal) return;
        this.modal.classList.remove('open');
        document.body.style.overflow = '';
    }

    showPreviewModal(item) {
        if (!this.previewModal || !this.previewBody) return;

        const subject = this.subjectLabels[item.subject] || item.subject;
        const type = this.typeLabels[item.type] || item.type;
        const price = item.price === 0 ? 'Miễn phí' : this.formatCurrency(item.price);
        const statusChip = this.getStatusChip(item);
        const attachments = item.attachments && item.attachments.length > 0
            ? `<div style="margin-top: 16px;">
                <h4 style="margin-bottom: 8px;">Tệp đính kèm</h4>
                <ul style="list-style: none; padding: 0;">
                    ${item.attachments.map(file => `<li style="padding: 8px 0; border-bottom: 1px solid var(--border-color);">
                        <i class="fas fa-file" style="margin-right: 8px; color: var(--primary-color);"></i>
                        ${file}
                    </li>`).join('')}
                </ul>
               </div>`
            : '';

        this.previewBody.innerHTML = `
            <div class="preview-header">
                <div>
                    <h3>${item.title}</h3>
                    <p class="text-muted">Mã: ${item.id} • Tạo bởi: ${item.creator}</p>
                </div>
            </div>
            <div class="preview-meta-grid">
                <div>
                    <span class="meta-label">Môn học</span>
                    <div class="meta-value">${subject}</div>
                </div>
                <div>
                    <span class="meta-label">Loại nội dung</span>
                    <div class="meta-value">${type}</div>
                </div>
                <div>
                    <span class="meta-label">Giá bán</span>
                    <div class="meta-value">${price}</div>
                </div>
                <div>
                    <span class="meta-label">Trạng thái</span>
                    <div class="meta-value">${statusChip}</div>
                </div>
                <div>
                    <span class="meta-label">Học sinh</span>
                    <div class="meta-value">${item.students} người</div>
                </div>
                <div>
                    <span class="meta-label">Lượt xem</span>
                    <div class="meta-value">${item.views}</div>
                </div>
                <div>
                    <span class="meta-label">Đánh giá</span>
                    <div class="meta-value">${item.rating ? `${item.rating.toFixed(1)} ⭐` : 'Chưa có'}</div>
                </div>
                <div>
                    <span class="meta-label">Cập nhật</span>
                    <div class="meta-value">${item.updatedAt}</div>
                </div>
            </div>
            ${item.note ? `
            <div class="preview-section">
                <h3>Mô tả</h3>
                <div class="preview-body">${item.note}</div>
            </div>
            ` : ''}
            ${attachments}
        `;

        this.previewModal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    closePreviewModal() {
        if (!this.previewModal) return;
        this.previewModal.classList.remove('open');
        document.body.style.overflow = '';
    }

    showEditModal(item) {
        if (!this.editModal) return;

        document.getElementById('edit-content-id').value = item.id;
        document.getElementById('edit-title').value = item.title;
        document.getElementById('edit-subject').value = item.subject;
        document.getElementById('edit-type').value = item.type;
        document.getElementById('edit-price').value = item.price;
        document.getElementById('edit-visibility').value = item.visibility;
        document.getElementById('edit-description').value = item.note || '';

        this.editModal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    closeEditModal() {
        if (!this.editModal) return;
        this.editModal.classList.remove('open');
        document.body.style.overflow = '';
        if (this.editForm) {
            this.editForm.reset();
        }
    }

    handleEditContent() {
        const id = document.getElementById('edit-content-id').value;
        const title = document.getElementById('edit-title').value.trim();
        const subject = document.getElementById('edit-subject').value;
        const type = document.getElementById('edit-type').value;
        const price = Number(document.getElementById('edit-price').value) || 0;
        const visibility = document.getElementById('edit-visibility').value;
        const description = document.getElementById('edit-description').value.trim();

        if (!title) {
            alert('Vui lòng nhập tiêu đề nội dung.');
            return;
        }

        const item = this.contents.find(content => content.id === id);
        if (!item) {
            alert('Không tìm thấy nội dung để chỉnh sửa.');
            return;
        }

        // Cập nhật thông tin
        item.title = title;
        item.subject = subject;
        item.type = type;
        item.price = price;
        item.visibility = visibility;
        item.note = description || item.note;
        item.updatedAt = this.now();

        // Nếu đang ở trạng thái pending, giữ nguyên. Nếu không, chuyển về pending để admin duyệt lại
        if (item.status === 'published') {
            item.status = 'pending';
            this.activity.unshift({ time: this.now(), message: `Đã cập nhật nội dung "${title}" và gửi lại để phê duyệt.` });
        } else {
            this.activity.unshift({ time: this.now(), message: `Đã cập nhật nội dung "${title}".` });
        }

        this.closeEditModal();
        this.renderAll();
        alert(`Đã cập nhật nội dung "${title}" thành công (mô phỏng).`);
    }

    now() {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    formatCurrency(value) {
        return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }
}

// Global functions
let teacherContentManager;

function showCreateContent() {
    if (teacherContentManager) {
        teacherContentManager.openModal();
    }
}

function closeCreateContent() {
    if (teacherContentManager) {
        teacherContentManager.closeModal();
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
