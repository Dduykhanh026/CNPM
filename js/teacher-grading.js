// Teacher grading & feedback
class TeacherGradingManager {
    constructor() {
        this.filters = {
            type: 'all',
            priority: 'all'
        };

        this.dataset = this.buildDataset();
        this.cacheDom();
        this.init();
    }

    buildDataset() {
        return {
            stats: {
                pending: 8,
                gradedToday: 5,
                feedbackSatisfaction: 4.7,
                overdue: 1
            },
            queue: [
                {
                    id: 'SUB-2024-TOAN-01',
                    title: 'Tự luận - Ứng dụng đạo hàm',
                    type: 'essay',
                    className: 'Toán 12 - Nâng cao',
                    student: 'Nguyễn Trung Kiên',
                    submittedAt: '10/12/2024 21:15',
                    deadline: '11/12/2024 23:59',
                    priority: 'high',
                    attachments: ['BaiLam_Kien.pdf'],
                    rubricId: 'RUBRIC-ESSAY'
                },
                {
                    id: 'SUB-2024-PHYS-03',
                    title: 'Quiz - Dao động cơ bản',
                    type: 'quiz',
                    className: 'Vật Lý 12 - Dao động',
                    student: 'Phạm Minh Anh',
                    submittedAt: '10/12/2024 20:00',
                    deadline: '12/12/2024 23:59',
                    priority: 'normal',
                    attachments: [],
                    rubricId: 'RUBRIC-QUIZ'
                },
                {
                    id: 'SUB-2024-CHEM-07',
                    title: 'Dự án Hóa hữu cơ - tạo poster',
                    type: 'project',
                    className: 'Hóa Học 12 - Hữu cơ',
                    student: 'Trần Bảo Ngọc',
                    submittedAt: '09/12/2024 18:00',
                    deadline: '10/12/2024 17:00',
                    priority: 'high',
                    attachments: ['Poster_Ngoc.png', 'ThuyetMinh.docx'],
                    rubricId: 'RUBRIC-PROJECT'
                },
                {
                    id: 'SUB-2024-MATH-OLY-02',
                    title: 'Bài tập nâng cao - Số phức',
                    type: 'essay',
                    className: 'CLB Bồi dưỡng Toán 10',
                    student: 'Lê Tấn Đạt',
                    submittedAt: '08/12/2024 22:30',
                    deadline: '09/12/2024 22:30',
                    priority: 'low',
                    attachments: ['SoPhuc_Dat.pdf'],
                    rubricId: 'RUBRIC-ESSAY'
                }
            ],
            rubrics: [
                {
                    id: 'RUBRIC-ESSAY',
                    title: 'Rubric chấm bài tự luận',
                    criteria: [
                        { name: 'Tư duy & lập luận', weight: 40, description: 'Phân tích đúng hướng, lập luận logic.' },
                        { name: 'Độ chính xác', weight: 35, description: 'Đáp án đúng, trình bày đủ bước.' },
                        { name: 'Trình bày & ký hiệu', weight: 15, description: 'Rõ ràng, thống nhất ký hiệu, viết sạch.' },
                        { name: 'Tính sáng tạo', weight: 10, description: 'Có phương án giải độc đáo, ngắn gọn.' }
                    ]
                },
                {
                    id: 'RUBRIC-QUIZ',
                    title: 'Tự động chấm trắc nghiệm',
                    criteria: [
                        { name: 'Điểm tự động', weight: 100, description: 'Chấm theo đáp án chuẩn, tự động xuất điểm.' }
                    ]
                },
                {
                    id: 'RUBRIC-PROJECT',
                    title: 'Rubric dự án sáng tạo',
                    criteria: [
                        { name: 'Nội dung khoa học', weight: 35, description: 'Chính xác, đầy đủ nội dung yêu cầu.' },
                        { name: 'Thiết kế & thẩm mỹ', weight: 25, description: 'Hình ảnh rõ nét, bố cục hợp lý.' },
                        { name: 'Ứng dụng thực tế', weight: 20, description: 'Liên hệ thực tế, minh chứng sinh động.' },
                        { name: 'Trình bày & thuyết trình', weight: 20, description: 'Giao tiếp tự tin, trả lời câu hỏi tốt.' }
                    ]
                }
            ],
            feedback: [
                {
                    student: 'Nguyễn Trung Kiên',
                    assignment: 'Đề luyện Hàm số số 5',
                    score: '9.5/10',
                    sentAt: '10/12/2024 10:30',
                    satisfaction: '👍 Rất hài lòng',
                    summary: 'Đã cải thiện rõ rệt phần trình bày, cần chú ý thêm dạng tiếp tuyến.'
                },
                {
                    student: 'Hoàng Hà Mi',
                    assignment: 'Bài tập hữu cơ nâng cao',
                    score: '10/10',
                    sentAt: '09/12/2024 18:45',
                    satisfaction: '👍 Rất hài lòng',
                    summary: 'Bài làm xuất sắc, gợi ý tham gia Math Challenge.'
                },
                {
                    student: 'Lê Tấn Đạt',
                    assignment: 'Bài tập số phức tuần 3',
                    score: '7.0/10',
                    sentAt: '08/12/2024 21:15',
                    satisfaction: '🙂 Hài lòng',
                    summary: 'Cần luyện thêm dạng mô-đun số phức, đã giao thêm bài.'
                }
            ]
        };
    }

    cacheDom() {
        this.root = document.getElementById('teacher-grading-root');
        this.statsContainer = document.getElementById('grading-stats');
        this.queueBody = document.getElementById('grading-queue-body');
        this.rubricContainer = document.getElementById('rubric-list');
        this.feedbackContainer = document.getElementById('recent-feedback');
        this.typeFilter = document.getElementById('grading-filter-type');
        this.priorityFilter = document.getElementById('grading-filter-priority');

        this.modal = document.getElementById('grading-modal');
        this.modalBody = document.getElementById('grading-modal-body');
        this.modalCloseBtn = document.getElementById('grading-modal-close');
    }

    init() {
        if (!this.root) return;
        this.renderStats();
        this.renderQueue();
        this.renderRubrics();
        this.renderFeedback();
        this.bindEvents();
    }

    bindEvents() {
        if (this.typeFilter) {
            this.typeFilter.addEventListener('change', () => {
                this.filters.type = this.typeFilter.value;
                this.renderQueue();
            });
        }

        if (this.priorityFilter) {
            this.priorityFilter.addEventListener('change', () => {
                this.filters.priority = this.priorityFilter.value;
                this.renderQueue();
            });
        }

        if (this.queueBody) {
            this.queueBody.addEventListener('click', (event) => {
                const button = event.target.closest('button[data-submission]');
                if (!button) return;
                const submission = this.dataset.queue.find(item => item.id === button.dataset.submission);
                if (!submission) return;
                this.openSubmissionModal(submission);
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
        const { pending, gradedToday, feedbackSatisfaction, overdue } = this.dataset.stats;
        this.statsContainer.innerHTML = `
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-inbox"></i></div>
                <div class="stat-info">
                    <h3>${pending}</h3>
                    <p>Bài chờ chấm</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-check-double"></i></div>
                <div class="stat-info">
                    <h3>${gradedToday}</h3>
                    <p>Đã chấm hôm nay</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-smile"></i></div>
                <div class="stat-info">
                    <h3>${feedbackSatisfaction}</h3>
                    <p>Điểm hài lòng phản hồi</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-exclamation-triangle"></i></div>
                <div class="stat-info">
                    <h3>${overdue}</h3>
                    <p>Bài quá hạn</p>
                </div>
            </div>
        `;
    }

    renderQueue() {
        if (!this.queueBody) return;
        let items = [...this.dataset.queue];
        if (this.filters.type !== 'all') {
            items = items.filter(item => item.type === this.filters.type);
        }
        if (this.filters.priority !== 'all') {
            items = items.filter(item => item.priority === this.filters.priority);
        }

        if (items.length === 0) {
            this.queueBody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align:center; color: var(--text-secondary);">
                        Không có bài nộp phù hợp với bộ lọc hiện tại.
                    </td>
                </tr>
            `;
            return;
        }

        this.queueBody.innerHTML = items.map(item => `
            <tr>
                <td><strong>${item.title}</strong></td>
                <td>${item.className}</td>
                <td>${item.student}</td>
                <td>${item.deadline}</td>
                <td>${this.renderPriorityChip(item.priority)}</td>
                <td>
                    <button class="btn btn-sm btn-secondary" data-submission="${item.id}">Chấm bài</button>
                </td>
            </tr>
        `).join('');
    }

    renderRubrics() {
        if (!this.rubricContainer) return;
        this.rubricContainer.innerHTML = this.dataset.rubrics.map(rubric => `
            <div class="card">
                <h3>${rubric.title}</h3>
                <ul class="detail-list">
                    ${rubric.criteria.map(criterion => `<li><strong>${criterion.name}</strong> - ${criterion.weight}%: ${criterion.description}</li>`).join('')}
                </ul>
            </div>
        `).join('');
    }

    renderFeedback() {
        if (!this.feedbackContainer) return;
        this.feedbackContainer.innerHTML = this.dataset.feedback.map(item => `
            <div class="card">
                <h3>${item.student}</h3>
                <p class="text-muted">${item.assignment} • ${item.sentAt}</p>
                <p><strong>${item.score}</strong></p>
                <p>${item.summary}</p>
                <span class="badge badge-success">${item.satisfaction}</span>
            </div>
        `).join('');
    }

    openSubmissionModal(submission) {
        if (!this.modal || !this.modalBody) return;
        const rubric = this.dataset.rubrics.find(r => r.id === submission.rubricId);
        this.modalBody.innerHTML = `
            <h3>${submission.title}</h3>
            <p class="text-muted">${submission.className} • ${submission.student}</p>
            <div class="detail-section">
                <h4>Thông tin bài nộp</h4>
                <ul class="detail-list">
                    <li>Mã bài: ${submission.id}</li>
                    <li>Thời gian nộp: ${submission.submittedAt}</li>
                    <li>Deadline: ${submission.deadline}</li>
                    <li>Ưu tiên: ${this.renderPriorityChip(submission.priority)}</li>
                    <li>Tệp đính kèm: ${submission.attachments.length ? submission.attachments.join(', ') : 'Không có'}</li>
                </ul>
            </div>
            <div class="detail-section">
                <h4>Rubric chấm điểm</h4>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Tiêu chí</th>
                            <th>Trọng số (%)</th>
                            <th>Điểm</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rubric ? rubric.criteria.map(criterion => `
                            <tr>
                                <td>${criterion.name}</td>
                                <td>${criterion.weight}</td>
                                <td><input type="number" min="0" max="10" step="0.5" value="0"></td>
                            </tr>
                        `).join('') : '<tr><td colspan="3">Rubric chưa được cấu hình.</td></tr>'}
                    </tbody>
                </table>
            </div>
            <div class="detail-section">
                <h4>Phản hồi tới học sinh</h4>
                <textarea rows="4" placeholder="Ghi chú chi tiết để học sinh cải thiện..."></textarea>
                <button class="btn btn-primary" style="margin-top: 12px;">Lưu điểm & gửi phản hồi</button>
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

    renderPriorityChip(priority) {
        switch (priority) {
            case 'high':
                return '<span class="status-chip pending">Cao</span>';
            case 'normal':
                return '<span class="status-chip published">Trung bình</span>';
            case 'low':
                return '<span class="status-chip hidden">Thấp</span>';
            default:
                return '<span class="status-chip">Không xác định</span>';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const current = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!current || current.role !== 'teacher') {
        window.location.href = 'index.html';
        return;
    }
    new TeacherGradingManager();
});

