// Student competitions and challenges centre
class CompetitionsManager {
    constructor() {
        this.filters = {
            status: 'all',
            subject: 'all',
            search: ''
        };

        this.dataset = this.buildDataset();
        this.cacheDom();
        this.init();
    }

    buildDataset() {
        return {
            competitions: [
                {
                    id: 'COMP-MATH-2024-FALL',
                    name: 'KH33 Math Challenge - Mùa Thu 2024',
                    subject: 'math',
                    subjectLabel: 'Toán',
                    status: 'open',
                    mode: 'Online elimination',
                    registrationDeadline: '12/12/2024',
                    startDate: '15/12/2024',
                    endDate: '30/12/2024',
                    reward: 'Học bổng 5.000.000đ & Huy chương Vàng',
                    participants: 860,
                    rounds: 3,
                    description: 'Chuỗi thử thách 3 vòng về Đại số, Giải tích, Hình học không gian. Có bảng xếp hạng theo điểm tích lũy.',
                    rules: [
                        'Vòng 1: 50 câu trắc nghiệm trong 60 phút.',
                        'Vòng 2: 6 bài tự luận, nộp file ảnh hoặc PDF.',
                        'Vòng Chung kết: Livestream giải đề cùng ban giám khảo.',
                        'Điểm cộng cho top 20% thành viên tích cực trong diễn đàn.'
                    ]
                },
                {
                    id: 'COMP-PHYS-2024-LAB',
                    name: 'Physics Lab Tournament',
                    subject: 'physics',
                    subjectLabel: 'Vật Lý',
                    status: 'ongoing',
                    mode: 'Hybrid (Online + Offline)',
                    registrationDeadline: 'Đã kết thúc',
                    startDate: '25/11/2024',
                    endDate: '18/12/2024',
                    reward: 'Chuyến tham quan phòng thí nghiệm Vật Lý ĐHQG + Huy chương Bạc',
                    participants: 320,
                    rounds: 4,
                    description: 'Thiết kế và mô phỏng thí nghiệm về Dao động - Sóng âm. Đánh giá dựa trên ý tưởng, mô phỏng và báo cáo.',
                    rules: [
                        'Thi theo đội 2-3 học sinh.',
                        'Vòng mô phỏng sử dụng phần mềm KH33 Simulator.',
                        'Báo cáo cuối cùng trình bày tại hội trường cơ sở 1.',
                        'Điểm cộng cho đội có báo cáo sáng tạo nhất.'
                    ]
                },
                {
                    id: 'COMP-CHEM-2024-OPEN',
                    name: 'Hóa Học Mở Rộng - Este & Polime',
                    subject: 'chemistry',
                    subjectLabel: 'Hóa Học',
                    status: 'completed',
                    mode: 'Contest Day',
                    registrationDeadline: '01/11/2024',
                    startDate: '05/11/2024',
                    endDate: '05/11/2024',
                    reward: 'Giấy chứng nhận & học bổng khóa Hữu cơ nâng cao',
                    participants: 540,
                    rounds: 1,
                    description: 'Cuộc thi giải nhanh các bài toán Este - Polime trong 90 phút. Đề gồm 70% trắc nghiệm, 30% tư duy mở.',
                    rules: [
                        'Không sử dụng tài liệu giấy.',
                        'Được phép sử dụng máy tính bỏ túi theo danh mục Bộ GD&ĐT.',
                        'Điểm xét thưởng dựa trên thang 100.',
                        'Thông báo kết quả trong 48 giờ sau cuộc thi.'
                    ]
                }
            ],
            myCompetitions: [
                {
                    id: 'COMP-MATH-2024-FALL',
                    role: 'Thí sinh cá nhân',
                    nextMatch: 'Vòng 1 - 15/12/2024 19:00',
                    currentStage: 'Chuẩn bị vòng loại',
                    progress: 35,
                    placement: null,
                    mentor: 'GV. Phạm Gia Bảo'
                },
                {
                    id: 'COMP-PHYS-2024-LAB',
                    role: 'Đội trưởng Đội #WaveRiders',
                    nextMatch: 'Đang chấm vòng mô phỏng',
                    currentStage: 'Vòng 3 - Báo cáo thí nghiệm',
                    progress: 75,
                    placement: 'Tạm xếp hạng 5/128 đội',
                    mentor: 'GV. Lê Minh Tùng'
                }
            ],
            leaderboard: [
                { rank: 1, name: 'Nguyễn Trung Kiên', grade: '12A1', subject: 'Toán', points: 1480, medals: { gold: 3, silver: 1, bronze: 0 } },
                { rank: 2, name: 'Trần Bảo Ngọc', grade: '11A2', subject: 'Hóa Học', points: 1410, medals: { gold: 2, silver: 2, bronze: 1 } },
                { rank: 3, name: 'Phạm Minh Anh', grade: '12A3', subject: 'Vật Lý', points: 1365, medals: { gold: 1, silver: 3, bronze: 1 } },
                { rank: 4, name: 'Lê Tấn Đạt', grade: '10A1', subject: 'Toán', points: 1290, medals: { gold: 1, silver: 1, bronze: 3 } },
                { rank: 5, name: 'Hoàng Hà Mi', grade: '12A4', subject: 'Hóa Học', points: 1225, medals: { gold: 2, silver: 0, bronze: 2 } },
                { rank: 6, name: 'Đặng Quang Huy', grade: '11A5', subject: 'Toán', points: 1204, medals: { gold: 0, silver: 3, bronze: 2 } },
                { rank: 7, name: 'Vũ Hương Thảo', grade: '12A2', subject: 'Vật Lý', points: 1182, medals: { gold: 1, silver: 1, bronze: 1 } },
                { rank: 8, name: 'Bùi Thanh Nam', grade: '10A3', subject: 'Hóa Học', points: 1120, medals: { gold: 0, silver: 2, bronze: 3 } },
                { rank: 9, name: 'Phan Quỳnh Như', grade: '11A1', subject: 'Toán', points: 1098, medals: { gold: 1, silver: 0, bronze: 2 } },
                { rank: 10, name: 'Trương Tấn Phúc', grade: '12A5', subject: 'Vật Lý', points: 1075, medals: { gold: 0, silver: 1, bronze: 4 } }
            ],
            timeline: [
                { time: '05/12/2024', title: 'Khởi động mùa thi đua', detail: 'Thông báo chủ đề, thể lệ và lịch tổng quan.' },
                { time: '10/12/2024', title: 'Chốt danh sách Math Challenge', detail: 'Email xác nhận gửi tới từng thí sinh.' },
                { time: '15/12/2024', title: 'Vòng loại Math Challenge', detail: 'Thi trắc nghiệm trực tuyến trong 60 phút.' },
                { time: '20/12/2024', title: 'Physics Lab - Báo cáo vòng 3', detail: 'Nộp báo cáo video và file mô phỏng trước 17:00.' },
                { time: '05/01/2025', title: 'Gala vinh danh & trao thưởng', detail: 'Tổ chức tại CS1 và livestream trên KH33 TV.' }
            ],
            stats: {
                totalCompetitions: 12,
                activeCompetitions: 3,
                medalsEarned: { gold: 2, silver: 1, bronze: 1 },
                rankingPoints: 980
            }
        };
    }

    cacheDom() {
        this.root = document.getElementById('competitions-root');
        this.statsContainer = document.getElementById('competition-stats');
        this.tableBody = document.getElementById('competition-table-body');
        this.myCompetitionsContainer = document.getElementById('my-competitions');
        this.leaderboardBody = document.getElementById('leaderboard-body');
        this.timelineContainer = document.getElementById('competition-timeline');

        this.statusFilter = document.getElementById('competition-filter-status');
        this.subjectFilter = document.getElementById('competition-filter-subject');
        this.searchInput = document.getElementById('competition-search');
        this.leaderboardFilter = document.getElementById('leaderboard-filter');
        this.subscribeUpdatesBtn = document.getElementById('subscribe-competition-updates');

        this.modal = document.getElementById('competition-modal');
        this.modalBody = document.getElementById('competition-modal-body');
        this.modalCloseBtn = document.getElementById('competition-modal-close');
    }

    init() {
        if (!this.root) return;
        this.renderStats();
        this.renderCompetitions();
        this.renderMyCompetitions();
        this.renderLeaderboard();
        this.renderTimeline();
        this.bindEvents();
    }

    bindEvents() {
        if (this.statusFilter) {
            this.statusFilter.addEventListener('change', () => {
                this.filters.status = this.statusFilter.value;
                this.renderCompetitions();
            });
        }

        if (this.subjectFilter) {
            this.subjectFilter.addEventListener('change', () => {
                this.filters.subject = this.subjectFilter.value;
                this.renderCompetitions();
            });
        }

        if (this.searchInput) {
            this.searchInput.addEventListener('input', (event) => {
                this.filters.search = event.target.value.trim().toLowerCase();
                this.renderCompetitions();
            });
        }

        if (this.tableBody) {
            this.tableBody.addEventListener('click', (event) => {
                const button = event.target.closest('button[data-action]');
                if (!button) return;
                const id = button.dataset.id;
                const action = button.dataset.action;
                const competition = this.dataset.competitions.find(item => item.id === id);
                if (!competition) return;

                if (action === 'register') {
                    this.handleRegisterCompetition(competition);
                } else if (action === 'bracket') {
                    this.openCompetitionModal(competition);
                }
            });
        }

        if (this.leaderboardFilter) {
            this.leaderboardFilter.addEventListener('change', () => this.renderLeaderboard());
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

        if (this.subscribeUpdatesBtn) {
            this.subscribeUpdatesBtn.addEventListener('click', () => {
                this.notify('Đã bật nhắc lịch cuộc thi. Bạn sẽ nhận thông báo trước mỗi vòng 2 giờ.', 'success');
            });
        }
    }

    renderStats() {
        if (!this.statsContainer) return;
        const { totalCompetitions, activeCompetitions, medalsEarned, rankingPoints } = this.dataset.stats;
        this.statsContainer.innerHTML = `
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-trophy"></i></div>
                <div class="stat-info">
                    <h3>${totalCompetitions}</h3>
                    <p>Cuộc thi trong năm học</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-bolt"></i></div>
                <div class="stat-info">
                    <h3>${activeCompetitions}</h3>
                    <p>Cuộc thi đang mở</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-medal"></i></div>
                <div class="stat-info">
                    <h3>${medalsEarned.gold}/${medalsEarned.silver}/${medalsEarned.bronze}</h3>
                    <p>Huy chương Vàng/Bạc/Đồng</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-star"></i></div>
                <div class="stat-info">
                    <h3>${rankingPoints}</h3>
                    <p>Điểm xếp hạng mùa giải</p>
                </div>
            </div>
        `;
    }

    renderCompetitions() {
        if (!this.tableBody) return;
        let items = [...this.dataset.competitions];

        if (this.filters.status !== 'all') {
            items = items.filter(item => item.status === this.filters.status);
        }
        if (this.filters.subject !== 'all') {
            items = items.filter(item => item.subject === this.filters.subject);
        }
        if (this.filters.search) {
            items = items.filter(item =>
                item.name.toLowerCase().includes(this.filters.search) ||
                item.id.toLowerCase().includes(this.filters.search)
            );
        }

        if (items.length === 0) {
            this.tableBody.innerHTML = `
                <tr>
                    <td colspan="7" style="text-align:center; color: var(--text-secondary);">
                        Không có cuộc thi nào phù hợp với bộ lọc hiện tại.
                    </td>
                </tr>
            `;
            return;
        }

        this.tableBody.innerHTML = items.map(item => `
            <tr>
                <td>
                    <strong>${item.name}</strong>
                    <div class="draft-item-meta" style="margin-top:6px;">
                        <span><i class="fa-solid fa-hashtag"></i> ${item.id}</span>
                        <span><i class="fa-regular fa-user-group"></i> ${item.participants} thí sinh</span>
                        <span><i class="fa-regular fa-flag"></i> ${item.rounds} vòng thi</span>
                    </div>
                </td>
                <td><span class="badge badge-info">${item.subjectLabel}</span></td>
                <td>${item.mode}</td>
                <td>
                    <div>Bắt đầu: ${item.startDate}</div>
                    <small class="text-muted">Hạn đăng ký: ${item.registrationDeadline}</small>
                </td>
                <td>${item.reward}</td>
                <td>${this.renderStatusChip(item.status)}</td>
                <td>
                    <div class="draft-item-actions">
                        <button class="btn btn-sm btn-secondary" data-action="bracket" data-id="${item.id}">Chi tiết</button>
                        ${this.renderCompetitionAction(item)}
                    </div>
                </td>
            </tr>
        `).join('');
    }

    renderCompetitionAction(item) {
        if (item.status === 'open') {
            return `<button class="btn btn-sm btn-primary" data-action="register" data-id="${item.id}">Đăng ký</button>`;
        }
        if (item.status === 'ongoing') {
            return `<button class="btn btn-sm btn-primary" data-action="bracket" data-id="${item.id}">Xem bảng đấu</button>`;
        }
        return `<button class="btn btn-sm btn-secondary" data-action="bracket" data-id="${item.id}">Kết quả</button>`;
    }

    renderMyCompetitions() {
        if (!this.myCompetitionsContainer) return;
        if (this.dataset.myCompetitions.length === 0) {
            this.myCompetitionsContainer.innerHTML = '<p>Bạn chưa tham gia cuộc thi nào. Hãy đăng ký ở danh sách cuộc thi đang mở.</p>';
            return;
        }

        this.myCompetitionsContainer.innerHTML = this.dataset.myCompetitions.map(item => {
            const competition = this.dataset.competitions.find(comp => comp.id === item.id);
            const progress = item.progress || 0;
            return `
                <div class="card" data-my-competition="${item.id}">
                    <h3>${competition ? competition.name : item.id}</h3>
                    <p class="card-subtitle">${item.currentStage}</p>
                    <div class="progress-section">
                        <div class="progress-item">
                            <div class="progress-header">
                                <span class="progress-label">Tiến độ vòng hiện tại</span>
                                <span class="progress-value">${progress}%</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${progress}%;"></div>
                            </div>
                        </div>
                    </div>
                    <div class="draft-item-meta" style="margin-top: 12px;">
                        <span><i class="fa-regular fa-circle-play"></i> ${item.nextMatch}</span>
                        <span><i class="fa-solid fa-award"></i> ${item.placement ? item.placement : 'Chưa xếp hạng'}</span>
                        <span><i class="fa-solid fa-user-tie"></i> Mentor: ${item.mentor}</span>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderLeaderboard() {
        if (!this.leaderboardBody) return;
        let rows = [...this.dataset.leaderboard];
        const filter = this.leaderboardFilter ? this.leaderboardFilter.value : 'all';
        if (filter !== 'all') {
            rows = rows.filter(row => row.subject.toLowerCase() === filter);
        }
        this.leaderboardBody.innerHTML = rows.map(row => `
            <tr>
                <td>${row.rank}</td>
                <td>${row.name}</td>
                <td>${row.grade}</td>
                <td>${row.subject}</td>
                <td><strong>${row.points}</strong></td>
                <td>${row.medals.gold}/${row.medals.silver}/${row.medals.bronze}</td>
            </tr>
        `).join('');
    }

    renderTimeline() {
        if (!this.timelineContainer) return;
        this.timelineContainer.innerHTML = this.dataset.timeline.map(item => `
            <li>
                <strong>${item.time}</strong><br>
                ${item.title}<br>
                <span class="text-muted">${item.detail}</span>
            </li>
        `).join('');
    }

    handleRegisterCompetition(competition) {
        if (competition.status !== 'open') {
            this.notify('Cuộc thi hiện không nhận đăng ký mới.', 'warning');
            return;
        }

        competition.status = 'ongoing';
        this.dataset.stats.activeCompetitions += 1;
        this.dataset.myCompetitions.push({
            id: competition.id,
            role: 'Thí sinh cá nhân',
            nextMatch: `Vòng 1 - ${competition.startDate} 19:00`,
            currentStage: 'Chờ vòng loại',
            progress: 0,
            placement: null,
            mentor: 'Sẽ được cập nhật'
        });
        this.notify(`Đã đăng ký tham gia "${competition.name}". Kiểm tra email để nhận lịch thi chi tiết.`, 'success');
        this.renderCompetitions();
        this.renderMyCompetitions();
        this.renderStats();
    }

    openCompetitionModal(competition) {
        if (!this.modal || !this.modalBody) return;
        this.modalBody.innerHTML = `
            <h3>${competition.name}</h3>
            <p class="card-subtitle">Mã cuộc thi: ${competition.id}</p>
            <div class="detail-section">
                <h4>Thông tin chung</h4>
                <ul class="detail-list">
                    <li><strong>Bộ môn:</strong> ${competition.subjectLabel}</li>
                    <li><strong>Hình thức:</strong> ${competition.mode}</li>
                    <li><strong>Thời gian:</strong> ${competition.startDate} - ${competition.endDate}</li>
                    <li><strong>Giải thưởng:</strong> ${competition.reward}</li>
                </ul>
            </div>
            <div class="detail-section">
                <h4>Thể lệ & vòng thi</h4>
                <p>${competition.description}</p>
                <ul class="detail-list">
                    ${competition.rules.map(rule => `<li>${rule}</li>`).join('')}
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
            case 'open':
                return '<span class="status-chip pending">Đang mở</span>';
            case 'ongoing':
                return '<span class="status-chip published">Đang diễn ra</span>';
            case 'completed':
                return '<span class="status-chip hidden">Đã kết thúc</span>';
            default:
                return '<span class="status-chip">Không xác định</span>';
        }
    }

    notify(message, type = 'info') {
        if (!this.root) return;
        let container = this.root.querySelector('.competitions-alert-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'competitions-alert-container';
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
            case 'success':
                return 'success';
            case 'warning':
                return 'warning';
            case 'error':
                return 'error';
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
    new CompetitionsManager();
});

