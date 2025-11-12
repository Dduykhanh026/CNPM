class ContentViewPage {
    constructor() {
        this.contentData = null;
        this.init();
    }

    init() {
        const stored = localStorage.getItem('currentContent');
        if (!stored) {
            this.redirectToListing();
            return;
        }

        try {
            this.contentData = JSON.parse(stored);
        } catch (error) {
            console.error('Không thể đọc thông tin nội dung:', error);
            this.redirectToListing();
            return;
        }

        if (!this.contentData || !this.contentData.id) {
            this.redirectToListing();
            return;
        }

        this.updatePageMeta();
        this.renderBadges();
        this.renderHeroInfo();
        this.renderPreview();
        this.renderOutline();
        this.renderInfoCards();
        this.setupActions();
        this.setupReportModal();
    }

    redirectToListing() {
        window.location.href = 'content.html';
    }

    updatePageMeta() {
        document.title = `${this.contentData.title} - KH33`;
    }

    renderBadges() {
        this.setText('detail-subject-badge', this.contentData.subject);
        this.setText('detail-type-badge', this.contentData.type);
        this.setText('detail-format-badge', this.formatLabel(this.contentData.format));

        const priceBadge = document.getElementById('detail-price-badge');
        if (priceBadge) {
            if (this.contentData.price === 0) {
                priceBadge.textContent = 'Miễn phí';
                priceBadge.classList.remove('badge-warning');
                priceBadge.classList.add('badge-success');
            } else {
                priceBadge.textContent = `${this.formatPrice(this.contentData.price)} VNĐ`;
                priceBadge.classList.remove('badge-success');
                priceBadge.classList.add('badge-warning');
            }
        }
    }

    renderHeroInfo() {
        this.setText('detail-title', this.contentData.title);
        this.setText('detail-description', this.contentData.description);
        this.setText('detail-duration', `⏱️ ${this.contentData.duration}`);
        this.setText('detail-students', `👥 ${this.contentData.students} học viên đã học`);
        this.setText('detail-rating', `⭐ ${this.contentData.rating} (${this.contentData.reviews} đánh giá)`);
    }

    renderPreview() {
        const preview = document.getElementById('detail-preview');
        if (!preview) return;

        const format = this.contentData.format;
        if (format === 'video') {
            preview.innerHTML = `
                <div class="preview-video">
                    <div class="video-frame">
                        <div class="video-play-button">▶</div>
                    </div>
                    <p class="preview-caption">Video demo: ${this.contentData.title}</p>
                </div>
            `;
        } else if (format === 'pdf') {
            preview.innerHTML = `
                <div class="preview-document">
                    <div class="document-icon">📄</div>
                    <div>
                        <h3>Tài liệu PDF đi kèm</h3>
                        <p>Bạn có thể tải về và xem offline. Tài liệu bao gồm  ${this.contentData.reviews} đánh giá tích cực.</p>
                    </div>
                </div>
            `;
        } else if (format === 'exercise') {
            preview.innerHTML = `
                <div class="preview-exercise">
                    <div class="exercise-icon">✍️</div>
                    <div>
                        <h3>Bộ bài tập thực hành</h3>
                        <p>Hoàn thành các bài tập đi kèm để củng cố kiến thức. Bạn có thể chuyển sang trang Bài Tập để bắt đầu làm.</p>
                    </div>
                </div>
            `;
        } else {
            preview.innerHTML = `
                <div class="preview-generic">
                    <div class="generic-icon">📚</div>
                    <p>Nội dung xem trước sẽ được hiển thị tại đây.</p>
                </div>
            `;
        }
    }

    renderOutline() {
        const outlineContainer = document.getElementById('detail-outline');
        const countEl = document.getElementById('detail-section-count');
        if (!outlineContainer || !countEl) return;

        const outlineItems = this.generateOutline();
        outlineContainer.innerHTML = outlineItems.map(item => `
            <li>
                <div class="outline-item">
                    <div>
                        <h3>${item.title}</h3>
                        <p>${item.description}</p>
                    </div>
                    <span class="outline-duration">${item.duration}</span>
                </div>
            </li>
        `).join('');

        countEl.textContent = `${outlineItems.length} mục`;
    }

    renderInfoCards() {
        this.setText('detail-info-subject', this.contentData.subject);
        this.setText('detail-info-type', this.contentData.type);
        this.setText('detail-info-format', this.formatLabel(this.contentData.format));
        this.setText('detail-info-duration', this.contentData.duration);
        this.setText('detail-info-students', this.contentData.students);
        this.setText('detail-info-rating', `${this.contentData.rating} / 5`);

        const priceBox = document.getElementById('detail-price-box');
        const priceDisplay = document.getElementById('detail-price-display');
        if (priceBox && priceDisplay) {
            if (this.contentData.price === 0) {
                priceDisplay.textContent = 'Miễn phí';
            } else {
                priceDisplay.textContent = `${this.formatPrice(this.contentData.price)} VNĐ`;
            }
        }
    }

    setupActions() {
        const primaryBtn = document.getElementById('primary-action-btn');
        const secondaryBtn = document.getElementById('secondary-action-btn');
        const actionTitle = document.getElementById('detail-action-title');
        const actionSubtitle = document.getElementById('detail-action-subtitle');
        const downloadBtn = document.getElementById('download-action-btn');

        if (downloadBtn) {
            downloadBtn.style.display = 'none';
            downloadBtn.onclick = null;
        }

        if (secondaryBtn) {
            secondaryBtn.addEventListener('click', () => {
                window.location.href = 'content.html';
            });
        }

        if (!primaryBtn) return;

        const isPaid = this.contentData.price > 0;

        if (isPaid) {
            primaryBtn.textContent = 'Mua ngay';
            actionTitle.textContent = 'Nội dung trả phí';
            actionSubtitle.textContent = 'Thanh toán để truy cập toàn bộ bài giảng và tài liệu.';
            primaryBtn.addEventListener('click', () => {
                window.location.href = 'payment.html';
            });
            if (downloadBtn) {
                downloadBtn.style.display = 'none';
            }
            return;
        }

        // Nội dung miễn phí
        if (downloadBtn) {
            downloadBtn.style.display = 'block';
            downloadBtn.textContent = this.contentData.format === 'pdf'
                ? 'Tải tài liệu'
                : 'Tải nội dung';
            downloadBtn.addEventListener('click', () => this.handleDownload());
        }

        if (this.contentData.format === 'video') {
            primaryBtn.textContent = 'Phát video';
            primaryBtn.addEventListener('click', () => {
                alert('Trình phát video demo sẽ được mở (prototype).');
            });
        } else if (this.contentData.format === 'pdf') {
            primaryBtn.textContent = 'Tải tài liệu';
            primaryBtn.addEventListener('click', () => {
                alert('Tải tài liệu PDF (prototype).');
            });
        } else if (this.contentData.format === 'exercise') {
            primaryBtn.textContent = 'Làm bài tập';
            primaryBtn.addEventListener('click', () => {
                window.location.href = 'exercises.html';
            });
        } else {
            primaryBtn.textContent = 'Bắt đầu học';
            primaryBtn.addEventListener('click', () => {
                alert('Bắt đầu học nội dung này (prototype).');
            });
        }
    }

    handleDownload() {
        if (!this.contentData) return;
        alert(`Bắt đầu tải "${this.contentData.title}" (mô phỏng).`);
    }

    setupReportModal() {
        this.reportButton = document.getElementById('report-action-btn');
        this.reportModal = document.getElementById('content-report-modal');
        this.reportCloseBtn = document.getElementById('content-report-close');
        this.reportCancelBtn = document.getElementById('content-report-cancel');
        this.reportForm = document.getElementById('content-report-form');
        this.reportTypeSelect = document.getElementById('content-report-type');
        this.reportDescription = document.getElementById('content-report-description');
        this.reportContact = document.getElementById('content-report-contact');
        this.reportSuccess = document.getElementById('content-report-success');
        this.reportContentId = document.getElementById('content-report-id');
        this.reportContentTitle = document.getElementById('content-report-content-title');

        if (this.reportButton) {
            this.reportButton.addEventListener('click', () => this.openReportModal());
        }

        if (this.reportCloseBtn) {
            this.reportCloseBtn.addEventListener('click', () => this.closeReportModal());
        }

        if (this.reportCancelBtn) {
            this.reportCancelBtn.addEventListener('click', () => this.closeReportModal());
        }

        if (this.reportModal) {
            this.reportModal.addEventListener('click', (event) => {
                if (event.target === this.reportModal) {
                    this.closeReportModal();
                }
            });
        }

        if (this.reportForm) {
            this.reportForm.addEventListener('submit', (event) => {
                event.preventDefault();
                this.submitReport();
            });
        }
    }

    openReportModal() {
        if (!this.reportModal) return;

        if (this.reportContentId) {
            this.reportContentId.value = this.contentData ? this.contentData.id : '';
        }

        if (this.reportContentTitle) {
            this.reportContentTitle.value = this.contentData ? this.contentData.title : '';
        }

        if (this.reportTypeSelect) {
            this.reportTypeSelect.value = '';
        }

        if (this.reportDescription) {
            this.reportDescription.value = '';
        }

        if (this.reportContact) {
            this.reportContact.value = '';
        }

        if (this.reportSuccess) {
            this.reportSuccess.style.display = 'none';
        }

        if (this.reportForm) {
            this.reportForm.classList.remove('was-validated');
        }

        this.reportModal.classList.add('open');

        if (this.reportTypeSelect) {
            setTimeout(() => this.reportTypeSelect.focus(), 120);
        }
    }

    closeReportModal() {
        if (!this.reportModal) return;

        this.reportModal.classList.remove('open');

        if (this.reportForm) {
            this.reportForm.reset();
            this.reportForm.classList.remove('was-validated');
        }

        if (this.reportSuccess) {
            this.reportSuccess.style.display = 'none';
        }
    }

    submitReport() {
        if (!this.reportForm) return;

        if (!this.reportForm.checkValidity()) {
            this.reportForm.classList.add('was-validated');
            return;
        }

        if (this.reportSuccess) {
            this.reportSuccess.style.display = 'block';
        }

        setTimeout(() => {
            this.closeReportModal();
        }, 1800);
    }

    generateOutline() {
        const baseOutline = [
            { title: 'Giới thiệu', description: 'Tổng quan nội dung và mục tiêu học tập.', duration: '05 phút' },
            { title: 'Kiến thức trọng tâm', description: 'Trình bày các khái niệm chính cần nắm.', duration: '15 phút' },
            { title: 'Ví dụ minh họa', description: 'Áp dụng kiến thức vào bài tập ví dụ.', duration: '10 phút' },
            { title: 'Bài tập củng cố', description: 'Bài tập thực hành để tự luyện.', duration: '15 phút' }
        ];

        if (this.contentData.format === 'pdf') {
            return [
                { title: 'Tài liệu PDF', description: 'Tài liệu dạng PDF với 25 trang nội dung.', duration: 'Tự học' },
                { title: 'Ghi chú quan trọng', description: 'Danh sách công thức và ghi chú.', duration: 'Tự học' },
                { title: 'Bài tập tham khảo', description: 'Một số bài tập ôn luyện kèm đáp án.', duration: 'Tự học' }
            ];
        }

        if (this.contentData.format === 'exercise') {
            return [
                { title: 'Bài tập trắc nghiệm', description: '10 câu hỏi trắc nghiệm củng cố kiến thức.', duration: '20 phút' },
                { title: 'Bài tập tự luận', description: '5 bài tự luận yêu cầu trình bày chi tiết.', duration: '40 phút' },
                { title: 'Đáp án gợi ý', description: 'Gợi ý lời giải cho từng câu hỏi.', duration: '15 phút' }
            ];
        }

        return baseOutline;
    }

    setText(id, value) {
        const el = document.getElementById(id);
        if (el) {
            el.textContent = value;
        }
    }

    formatLabel(format) {
        if (format === 'pdf') return 'Tài liệu PDF';
        if (format === 'video') return 'Video';
        if (format === 'exercise') return 'Bài tập';
        return format || 'Nội dung';
    }

    formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
        window.location.href = 'index.html';
        return;
    }

    new ContentViewPage();
});

