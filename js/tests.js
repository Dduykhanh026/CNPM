// Student assessments centre
class TestsManager {
    constructor() {
        this.filters = {
            status: 'all',
            subject: 'all',
            search: ''
        };

        this.data = this.buildDataset();
        this.countdownTimer = null;

        this.cacheDom();
        this.init();
    }

    buildDataset() {
        const now = new Date();
        return {
            upcoming: [
                {
                    id: 'TEST-2024-TOAN-GK',
                    title: 'Giữa kỳ Toán 12 - Học kỳ I',
                    subject: 'math',
                    subjectLabel: 'Toán',
                    level: 'Khối 12',
                    format: 'Trực tuyến',
                    duration: 60,
                    date: '15/12/2024',
                    time: '14:00',
                    status: 'registered',
                    weighting: 0.25,
                    room: 'Trung tâm thi trực tuyến KH33',
                    attemptUrl: 'exercise-quiz.html?assessment=TEST-2024-TOAN-GK',
                    registrationDeadline: '13/12/2024 23:00',
                    proctoring: ['Camera', 'Trình duyệt an toàn', 'Chống copy'],
                    instructions: 'Kiểm tra đường truyền, chuẩn bị giấy nháp, đăng nhập trước 15 phút.'
                },
                {
                    id: 'TEST-2024-VL-CHUYENDE',
                    title: 'Chuyên đề Vật Lý: Dao động - Sóng cơ',
                    subject: 'physics',
                    subjectLabel: 'Vật Lý',
                    level: 'Khối 11-12',
                    format: 'Trực tuyến',
                    duration: 45,
                    date: '20/12/2024',
                    time: '19:30',
                    status: 'available',
                    weighting: 0.15,
                    room: 'Phòng thi ảo #VL-DAO-DONG',
                    registrationDeadline: '18/12/2024 23:59',
                    proctoring: ['Webcam', 'Giám sát AI'],
                    instructions: 'Hoàn thành bộ đề ôn tập số 05 trước ngày thi để được mở phòng thi.'
                },
                {
                    id: 'TEST-2024-HH-THPTQG',
                    title: 'Thi thử THPTQG - Hóa Học lần 3',
                    subject: 'chemistry',
                    subjectLabel: 'Hóa Học',
                    level: 'Khối 12',
                    format: 'Kết hợp',
                    duration: 50,
                    date: '28/12/2024',
                    time: '08:00',
                    status: 'closed',
                    weighting: 0.30,
                    room: 'Offline tại Trung tâm KH33 - CS1',
                    registrationDeadline: 'Đã đóng',
                    proctoring: ['Giám thị trực tiếp'],
                    instructions: 'Có mặt trước 30 phút, mang theo thẻ học viên và CMND.'
                }
            ],
            active: {
                id: 'TEST-2024-TOAN-GK',
                title: 'Giữa kỳ Toán 12 - Học kỳ I',
                subjectLabel: 'Toán',
                startAt: new Date(now.getTime() - 10 * 60 * 1000).toISOString(),
                endAt: new Date(now.getTime() + 50 * 60 * 1000).toISOString(),
                duration: 60,
                attemptUrl: 'exercise-quiz.html?assessment=TEST-2024-TOAN-GK',
                progress: {
                    answered: 18,
                    total: 40,
                    flagged: 2
                },
                prep: [
                    { time: 'Trước 24h', note: 'Hoàn thành ôn tập chủ đề Hàm số & Hình học', status: 'done' },
                    { time: 'Trước 2h', note: 'Kiểm tra kết nối Internet, camera, micro', status: 'done' },
                    { time: 'Trước 30 phút', note: 'Đăng nhập hệ thống, đọc quy chế thi', status: 'in-progress' },
                    { time: 'Sau bài thi', note: 'Tải biên bản hoàn thành và xem điểm dự kiến', status: 'pending' }
                ]
            },
            history: [
                {
                    id: 'TEST-2024-TOAN-ONL-02',
                    title: 'Đề rèn luyện Toán - Hàm số nâng cao',
                    subjectLabel: 'Toán',
                    score: 8.6,
                    grade: 'Giỏi',
                    date: '02/12/2024',
                    certificate: true,
                    metrics: {
                        accuracy: 86,
                        timeUsage: '42/60 phút',
                        topPercent: 12,
                        attempts: 1,
                        completion: 100
                    },
                    recommendations: [
                        'Ôn tập thêm nhóm câu hỏi về cực trị hàm số.',
                        'Thực hành thêm bài toán biện luận nghiệm.'
                    ]
                },
                {
                    id: 'TEST-2024-VL-OT-01',
                    title: 'Kiểm tra Vật Lý chủ đề Điện xoay chiều',
                    subjectLabel: 'Vật Lý',
                    score: 7.4,
                    grade: 'Khá',
                    date: '25/11/2024',
                    certificate: false,
                    metrics: {
                        accuracy: 74,
                        timeUsage: '38/45 phút',
                        topPercent: 28,
                        attempts: 1,
                        completion: 100
                    },
                    recommendations: [
                        'Xem lại công thức cộng hưởng và bài toán RLC.',
                        'Luyện thêm 3 đề tương tự để cải thiện tốc độ.'
                    ]
                },
                {
                    id: 'TEST-2024-HH-PRO-03',
                    title: 'Thi thử Hóa Học nâng cao (lần 2)',
                    subjectLabel: 'Hóa Học',
                    score: 9.1,
                    grade: 'Xuất sắc',
                    date: '18/11/2024',
                    certificate: true,
                    metrics: {
                        accuracy: 91,
                        timeUsage: '44/60 phút',
                        topPercent: 5,
                        attempts: 1,
                        completion: 100
                    },
                    recommendations: [
                        'Duy trì phong độ, chuyển sang luyện chuyên đề hữu cơ nâng cao.',
                        'Đăng ký cuộc thi Hoá học học sinh giỏi cấp trường.'
                    ]
                }
            ],
            recommendations: [
                {
                    category: 'Toán',
                    title: 'Bài giảng Hàm số nâng cao - mức 3',
                    description: 'Bổ sung kỹ thuật khảo sát hàm trùng phương, bài toán cực trị có tham số.',
                    action: 'content-view.html?id=algebra-advanced'
                },
                {
                    category: 'Vật Lý',
                    title: 'Bộ 30 câu trắc nghiệm Điện xoay chiều có đáp án video',
                    description: 'Tổng hợp câu hỏi mức độ vận dụng cao, kèm phân tích sai lầm thường gặp.',
                    action: 'content-view.html?id=physics-ac'
                },
                {
                    category: 'Hóa Học',
                    title: 'Livestream giải đề Hóa hữu cơ số 06',
                    description: 'Buổi tổng hợp dạng este - lipit, tương tác trực tiếp với giáo viên.',
                    action: 'dashboard.html?action=showTeacherInteraction'
                }
            ]
        };
    }

    cacheDom() {
        this.root = document.getElementById('tests-root');
        this.statsContainer = document.getElementById('tests-stats');
        this.upcomingTableBody = document.getElementById('upcoming-tests-body');
        this.historyTableBody = document.getElementById('history-table-body');
        this.activeAssessmentContainer = document.getElementById('active-assessment-content');
        this.prepTimeline = document.getElementById('assessment-prep-timeline');
        this.recommendationsContainer = document.getElementById('revision-recommendations');

        this.statusFilter = document.getElementById('tests-filter-status');
        this.subjectFilter = document.getElementById('tests-filter-subject');
        this.searchInput = document.getElementById('tests-search');
        this.exportHistoryBtn = document.getElementById('export-history-btn');

        this.modal = document.getElementById('assessment-modal');
        this.modalBody = document.getElementById('assessment-modal-body');
        this.modalCloseBtn = document.getElementById('assessment-modal-close');
    }

    init() {
        if (!this.root) return;
        this.renderStats();
        this.renderUpcoming();
        this.renderActiveAssessment();
        this.renderPrepTimeline();
        this.renderHistory();
        this.renderRecommendations();
        this.bindEvents();
    }

    bindEvents() {
        if (this.statusFilter) {
            this.statusFilter.addEventListener('change', () => {
                this.filters.status = this.statusFilter.value;
                this.renderUpcoming();
            });
        }

        if (this.subjectFilter) {
            this.subjectFilter.addEventListener('change', () => {
                this.filters.subject = this.subjectFilter.value;
                this.renderUpcoming();
            });
        }

        if (this.searchInput) {
            this.searchInput.addEventListener('input', (event) => {
                this.filters.search = event.target.value.trim().toLowerCase();
                this.renderUpcoming();
            });
        }

        if (this.upcomingTableBody) {
            this.upcomingTableBody.addEventListener('click', (event) => {
                const button = event.target.closest('button[data-action]');
                if (!button) return;
                const id = button.dataset.id;
                const action = button.dataset.action;
                if (action === 'start') {
                    this.handleStartAssessment(id);
                } else if (action === 'register') {
                    this.handleRegisterAssessment(id);
                } else if (action === 'detail') {
                    const assessment = this.data.upcoming.find(item => item.id === id);
                    if (assessment) this.openAssessmentModal(assessment);
                }
            });
        }

        if (this.historyTableBody) {
            this.historyTableBody.addEventListener('click', (event) => {
                const button = event.target.closest('button[data-history]');
                if (!button) return;
                const history = this.data.history.find(item => item.id === button.dataset.history);
                if (history) this.openHistoryModal(history);
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

        if (this.exportHistoryBtn) {
            this.exportHistoryBtn.addEventListener('click', () => {
                this.notify('Tính năng xuất báo cáo đang được mô phỏng. File PDF sẽ được gửi qua email trong phiên bản chính thức.', 'info');
            });
        }
    }

    renderStats() {
        if (!this.statsContainer) return;
        const totalUpcoming = this.data.upcoming.length;
        const registered = this.data.upcoming.filter(item => item.status === 'registered').length;
        const available = this.data.upcoming.filter(item => item.status === 'available').length;
        const averageScore = this.calculateAverageScore();

        this.statsContainer.innerHTML = `
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-calendar-alt"></i></div>
                <div class="stat-info">
                    <h3>${totalUpcoming}</h3>
                    <p>Kỳ thi trong học kỳ này</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-user-check"></i></div>
                <div class="stat-info">
                    <h3>${registered}</h3>
                    <p>Đã đăng ký và sẵn sàng</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-door-open"></i></div>
                <div class="stat-info">
                    <h3>${available}</h3>
                    <p>Kỳ thi đang mở đăng ký</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-chart-line"></i></div>
                <div class="stat-info">
                    <h3>${averageScore}</h3>
                    <p>Điểm trung bình 3 kỳ gần nhất</p>
                </div>
            </div>
        `;
    }

    renderUpcoming() {
        if (!this.upcomingTableBody) return;

        let items = [...this.data.upcoming];
        if (this.filters.status !== 'all') {
            items = items.filter(item => item.status === this.filters.status);
        }
        if (this.filters.subject !== 'all') {
            items = items.filter(item => item.subject === this.filters.subject);
        }
        if (this.filters.search) {
            items = items.filter(item =>
                item.id.toLowerCase().includes(this.filters.search) ||
                item.title.toLowerCase().includes(this.filters.search)
            );
        }

        if (items.length === 0) {
            this.upcomingTableBody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align:center; color: var(--text-secondary);">
                        Không tìm thấy kỳ thi phù hợp với bộ lọc hiện tại.
                    </td>
                </tr>
            `;
            return;
        }

        this.upcomingTableBody.innerHTML = items.map(item => `
            <tr>
                <td>
                    <strong>${item.title}</strong>
                    <div class="draft-item-meta" style="margin-top:6px;">
                        <span><i class="fa-regular fa-calendar"></i> ${item.date}</span>
                        <span><i class="fa-regular fa-clock"></i> ${item.time}</span>
                        <span><i class="fa-solid fa-stopwatch"></i> ${item.duration} phút</span>
                    </div>
                </td>
                <td><span class="badge badge-info">${item.subjectLabel}</span></td>
                <td>${item.format}</td>
                <td>
                    <div>${item.room}</div>
                    <small class="text-muted">Hạn đăng ký: ${item.registrationDeadline}</small>
                </td>
                <td>
                    ${this.renderStatusChip(item.status)}
                </td>
                <td>
                    <div class="draft-item-actions">
                        <button class="btn btn-sm btn-secondary" data-action="detail" data-id="${item.id}">Hướng dẫn</button>
                        ${this.renderAssessmentAction(item)}
                    </div>
                </td>
            </tr>
        `).join('');
    }

    renderAssessmentAction(item) {
        if (item.status === 'registered') {
            return `<button class="btn btn-sm btn-primary" data-action="start" data-id="${item.id}">Vào phòng thi</button>`;
        }
        if (item.status === 'available') {
            return `<button class="btn btn-sm btn-primary" data-action="register" data-id="${item.id}">Đăng ký ngay</button>`;
        }
        return `<button class="btn btn-sm btn-secondary" data-action="detail" data-id="${item.id}">Xem chi tiết</button>`;
    }

    renderActiveAssessment() {
        if (!this.activeAssessmentContainer) return;
        const active = this.data.active;
        if (!active) {
            this.activeAssessmentContainer.innerHTML = `
                <p>Hiện chưa có bài thi nào đang diễn ra. Hãy kiểm tra danh sách kỳ thi sắp tới để đăng ký.</p>
            `;
            return;
        }

        const endTime = new Date(active.endAt);
        const totalQuestions = active.progress.total;
        const answered = active.progress.answered;
        const progressPercent = Math.round((answered / totalQuestions) * 100);

        this.activeAssessmentContainer.innerHTML = `
            <div class="card highlight-card">
                <div class="detail-header">
                    <div>
                        <h3>${active.title}</h3>
                        <p class="card-subtitle">Thời gian còn lại: <span id="active-countdown">--:--:--</span></p>
                    </div>
                    <div>
                        <button class="btn btn-primary" data-action="continue-assessment" data-id="${active.id}">Tiếp tục làm bài</button>
                    </div>
                </div>
                <div class="progress-section" style="margin-top: 12px;">
                    <div class="progress-item">
                        <div class="progress-header">
                            <span class="progress-label">Tiến độ</span>
                            <span class="progress-value">${progressPercent}% (${answered}/${totalQuestions} câu)</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progressPercent}%;"></div>
                        </div>
                    </div>
                </div>
                <div class="draft-item-meta" style="margin-top: 16px;">
                    <span><i class="fa-regular fa-calendar"></i> Bắt đầu: ${new Date(active.startAt).toLocaleString('vi-VN')}</span>
                    <span><i class="fa-regular fa-calendar-check"></i> Kết thúc: ${endTime.toLocaleString('vi-VN')}</span>
                    <span><i class="fa-regular fa-file-lines"></i> Câu đánh dấu: ${active.progress.flagged}</span>
                </div>
            </div>
        `;

        const continueBtn = this.activeAssessmentContainer.querySelector('[data-action=\"continue-assessment\"]');
        if (continueBtn) {
            continueBtn.addEventListener('click', () => {
                window.location.href = active.attemptUrl;
            });
        }

        this.startCountdown(endTime);
    }

    renderPrepTimeline() {
        if (!this.prepTimeline) return;
        const active = this.data.active;
        if (!active || !active.prep) {
            this.prepTimeline.innerHTML = '<li>Chưa có lộ trình ôn tập nào được cấu hình.</li>';
            return;
        }
        this.prepTimeline.innerHTML = active.prep.map(step => `
            <li>
                <strong>${step.time}</strong><br>
                ${step.note} ${this.renderStepStatusIcon(step.status)}
            </li>
        `).join('');
    }

    renderStepStatusIcon(status) {
        switch (status) {
            case 'done':
                return '<span class="badge badge-success">Hoàn thành</span>';
            case 'in-progress':
                return '<span class="badge badge-warning">Đang thực hiện</span>';
            default:
                return '<span class="badge badge-info">Chưa thực hiện</span>';
        }
    }

    renderHistory() {
        if (!this.historyTableBody) return;
        if (this.data.history.length === 0) {
            this.historyTableBody.innerHTML = `
                <tr>
                    <td colspan="8" style="text-align:center; color: var(--text-secondary);">
                        Bạn chưa hoàn thành kỳ thi nào. Hãy tham gia các kỳ thi sắp tới để bắt đầu xây dựng bảng thành tích.
                    </td>
                </tr>
            `;
            return;
        }

        this.historyTableBody.innerHTML = this.data.history.map(item => `
            <tr>
                <td>${item.id}</td>
                <td>${item.title}</td>
                <td><span class="badge badge-info">${item.subjectLabel}</span></td>
                <td><strong>${item.score}</strong></td>
                <td>${item.grade}</td>
                <td>${item.date}</td>
                <td>${item.certificate ? '<span class="badge badge-success">Đã cấp</span>' : '<span class="badge badge-warning">Chưa cấp</span>'}</td>
                <td>
                    <div class="draft-item-actions">
                        <button class="btn btn-sm btn-secondary" data-history="${item.id}">Xem chi tiết</button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    renderRecommendations() {
        if (!this.recommendationsContainer) return;
        if (this.data.recommendations.length === 0) {
            this.recommendationsContainer.innerHTML = '<p>Chưa có gợi ý nào. Hãy hoàn thành thêm các kỳ thi để nhận khuyến nghị phù hợp.</p>';
            return;
        }

        this.recommendationsContainer.innerHTML = this.data.recommendations.map(item => `
            <div class="card">
                <h3>${item.category}</h3>
                <p><strong>${item.title}</strong></p>
                <p style="color: var(--text-secondary);">${item.description}</p>
                <button class="btn btn-sm btn-primary" onclick="window.location.href='${item.action}'">Truy cập ngay</button>
            </div>
        `).join('');
    }

    startCountdown(endTime) {
        const countdownElement = document.getElementById('active-countdown');
        if (!countdownElement) return;
        if (this.countdownTimer) {
            clearInterval(this.countdownTimer);
        }

        const updateCountdown = () => {
            const now = new Date();
            const diff = endTime - now;
            if (diff <= 0) {
                countdownElement.textContent = '00:00:00';
                this.notify('Phiên thi hiện tại đã kết thúc. Bạn có thể xem kết quả trong lịch sử.', 'warning');
                clearInterval(this.countdownTimer);
                return;
            }

            const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
            const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
            const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
            countdownElement.textContent = `${hours}:${minutes}:${seconds}`;
        };

        updateCountdown();
        this.countdownTimer = setInterval(updateCountdown, 1000);
    }

    handleStartAssessment(id) {
        const assessment = this.data.upcoming.find(item => item.id === id);
        if (!assessment) return;

        if (assessment.status !== 'registered') {
            this.notify('Bạn cần đăng ký kỳ thi này trước khi vào phòng thi.', 'warning');
            return;
        }

        window.location.href = assessment.attemptUrl;
    }

    handleRegisterAssessment(id) {
        const assessment = this.data.upcoming.find(item => item.id === id);
        if (!assessment) return;

        if (assessment.status === 'registered') {
            this.notify('Bạn đã đăng ký kỳ thi này.', 'info');
            return;
        }
        if (assessment.status === 'closed') {
            this.notify('Kỳ thi đã đóng đăng ký.', 'error');
            return;
        }

        assessment.status = 'registered';
        this.notify(`Đăng ký thành công "${assessment.title}". Vui lòng đọc kỹ hướng dẫn và sẵn sàng trước giờ thi.`, 'success');
        this.renderUpcoming();
        this.renderStats();
    }

    openAssessmentModal(assessment) {
        if (!this.modal || !this.modalBody) return;
        this.modalBody.innerHTML = `
            <h3>${assessment.title}</h3>
            <p class="card-subtitle">Mã thi: ${assessment.id}</p>
            <div class="detail-section">
                <h4>Thông tin chính</h4>
                <ul class="detail-list">
                    <li><strong>Môn thi:</strong> ${assessment.subjectLabel}</li>
                    <li><strong>Thời gian:</strong> ${assessment.date} lúc ${assessment.time}</li>
                    <li><strong>Kéo dài:</strong> ${assessment.duration} phút</li>
                    <li><strong>Hệ số điểm:</strong> ${Math.round(assessment.weighting * 100)}%</li>
                    <li><strong>Địa điểm:</strong> ${assessment.room}</li>
                </ul>
            </div>
            <div class="detail-section">
                <h4>Quy định phòng thi</h4>
                <ul class="detail-list">
                    ${assessment.proctoring.map(rule => `<li>${rule}</li>`).join('')}
                </ul>
            </div>
            <div class="detail-section">
                <h4>Hướng dẫn chuẩn bị</h4>
                <p>${assessment.instructions}</p>
            </div>
        `;
        this.modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    openHistoryModal(history) {
        if (!this.modal || !this.modalBody) return;
        this.modalBody.innerHTML = `
            <h3>Kết quả kỳ thi: ${history.title}</h3>
            <p class="card-subtitle">Hoàn thành ngày ${history.date}</p>
            <div class="grid grid-2" style="margin-top: 12px;">
                <div class="card">
                    <h4>Điểm số & xếp loại</h4>
                    <p><strong>${history.score}</strong> điểm (${history.grade})</p>
                    <p>Thuộc top ${history.metrics.topPercent}% thí sinh tham gia.</p>
                    <p>Thời gian làm bài: ${history.metrics.timeUsage}</p>
                </div>
                <div class="card">
                    <h4>Chứng nhận</h4>
                    <p>${history.certificate ? '✅ Đã cấp chứng chỉ điện tử.' : '⏳ Chứng chỉ sẽ sớm được phát hành.'}</p>
                    <button class="btn btn-sm btn-primary" ${history.certificate ? '' : 'disabled'}>Tải chứng chỉ (PDF)</button>
                </div>
            </div>
            <div class="detail-section">
                <h4>Khuyến nghị luyện tập</h4>
                <ul class="detail-list">
                    ${history.recommendations.map(rec => `<li>${rec}</li>`).join('')}
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

    renderStatusChip(status) {
        switch (status) {
            case 'registered':
                return '<span class="status-chip published">Đã đăng ký</span>';
            case 'available':
                return '<span class="status-chip pending">Đang mở đăng ký</span>';
            case 'closed':
                return '<span class="status-chip hidden">Đã đóng</span>';
            default:
                return '<span class="status-chip">Không xác định</span>';
        }
    }

    calculateAverageScore() {
        if (!this.data.history.length) return '—';
        const total = this.data.history.reduce((sum, item) => sum + item.score, 0);
        return (total / this.data.history.length).toFixed(1);
    }

    notify(message, type = 'info') {
        if (!this.root) return;
        let container = this.root.querySelector('.tests-alert-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'tests-alert-container';
            this.root.insertBefore(container, this.root.firstChild.nextSibling);
        }
        const alert = document.createElement('div');
        alert.className = `alert alert-${this.mapAlertType(type)}`;
        alert.textContent = message;
        container.appendChild(alert);
        setTimeout(() => alert.remove(), 5000);
    }

    mapAlertType(type) {
        switch (type) {
            case 'error':
                return 'error';
            case 'success':
                return 'success';
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
    new TestsManager();
});

