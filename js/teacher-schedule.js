// Teacher schedule management
class TeacherScheduleManager {
    constructor() {
        this.dataset = this.buildDataset();
        this.cacheDom();
        this.init();
    }

    buildDataset() {
        return {
            stats: {
                sessionsThisWeek: 12,
                assessmentsUpcoming: 4,
                hoursPlanned: 28,
                tasksPending: 3
            },
            sessions: [
                {
                    id: 'SES-1212-01',
                    time: 'Thứ 2 • 08:00 - 09:30',
                    className: 'Toán 12 - Nâng cao',
                    topic: 'Ôn tập ứng dụng đạo hàm',
                    location: 'Phòng Zoom A1',
                    notes: 'Chuẩn bị bảng phụ, phát đề ôn tập',
                    materials: ['Slide_ung_dung.pdf', 'De_on_tap.docx']
                },
                {
                    id: 'SES-1213-02',
                    time: 'Thứ 3 • 19:30 - 21:00',
                    className: 'CLB Bồi dưỡng Toán 10',
                    topic: 'Bài tập nâng cao số phức',
                    location: 'Phòng học CS1 - P302',
                    notes: 'Kiểm tra sự chuẩn bị của học sinh',
                    materials: ['Bo_de_SoPhuc.pdf']
                },
                {
                    id: 'SES-1214-03',
                    time: 'Thứ 4 • 15:00 - 16:30',
                    className: 'Vật Lý 12 - Dao động',
                    topic: 'Thí nghiệm mô phỏng dao động tắt dần',
                    location: 'Phòng thí nghiệm vật lý',
                    notes: 'Chuẩn bị thiết bị mô phỏng, camera quay',
                    materials: ['Huong_dan_Thi_nghiem.pdf']
                },
                {
                    id: 'SES-1215-04',
                    time: 'Thứ 5 • 20:00 - 21:30',
                    className: 'Livestream ôn Hóa hữu cơ',
                    topic: 'Este - Polime (Phần 2)',
                    location: 'Livestream KH33 TV',
                    notes: 'Kiểm tra đường truyền trước 19:30',
                    materials: ['Slide_este_polime.pdf', 'Bai_tap_mo_rong.docx']
                }
            ],
            assessments: [
                {
                    date: '15/12/2024',
                    className: 'Toán 12 - Nâng cao',
                    title: 'Kiểm tra giữa kỳ chương IV',
                    format: 'Tự luận 90 phút',
                    tasks: ['Chốt đề vào 12/12', 'In 30 bản đề', 'Chuẩn bị đáp án chi tiết']
                },
                {
                    date: '18/12/2024',
                    className: 'Vật Lý 12 - Dao động',
                    title: 'Quiz chương 2',
                    format: 'Trắc nghiệm trực tuyến',
                    tasks: ['Đăng đề lên hệ thống trước 17/12', 'Cấu hình giám sát trình duyệt', 'Thông báo lịch cho lớp']
                },
                {
                    date: '20/12/2024',
                    className: 'CLB Bồi dưỡng Toán 10',
                    title: 'Thi thử học sinh giỏi cấp trường',
                    format: 'Tự luận + thuyết trình',
                    tasks: ['Phân công giám khảo', 'Chuẩn bị phòng thi P501', 'In phiếu chấm điểm']
                }
            ],
            tasks: [
                {
                    time: '11/12 • 10:00',
                    task: 'Gửi phản hồi cho 12A1 về bài tự luận tuần 3',
                    status: 'Đang thực hiện'
                },
                {
                    time: '12/12 • 16:00',
                    task: 'Hoàn thiện đề kiểm tra giữa kỳ chương IV',
                    status: 'Ưu tiên cao'
                },
                {
                    time: '13/12 • 09:00',
                    task: 'Họp với phụ huynh bạn Lê Tấn Đạt (CLB Toán)',
                    status: 'Đã lên lịch'
                },
                {
                    time: '14/12 • 08:30',
                    task: 'Chuẩn bị livestream Hóa hữu cơ (test thiết bị)',
                    status: 'Chưa thực hiện'
                }
            ]
        };
    }

    cacheDom() {
        this.root = document.getElementById('teacher-schedule-root');
        this.statsContainer = document.getElementById('schedule-stats');
        this.scheduleTableBody = document.getElementById('schedule-table-body');
        this.assessmentContainer = document.getElementById('assessment-schedule');
        this.taskList = document.getElementById('teacher-task-list');

        this.modal = document.getElementById('schedule-modal');
        this.modalBody = document.getElementById('schedule-modal-body');
        this.modalCloseBtn = document.getElementById('schedule-modal-close');

        this.syncButton = document.getElementById('sync-schedule');
        this.createSessionButton = document.getElementById('create-session');
    }

    init() {
        if (!this.root) return;
        this.renderStats();
        this.renderSessions();
        this.renderAssessments();
        this.renderTasks();
        this.bindEvents();
    }

    bindEvents() {
        if (this.scheduleTableBody) {
            this.scheduleTableBody.addEventListener('click', (event) => {
                const button = event.target.closest('button[data-session]');
                if (!button) return;
                const session = this.dataset.sessions.find(item => item.id === button.dataset.session);
                if (!session) return;
                this.openSessionModal(session);
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

        if (this.syncButton) {
            this.syncButton.addEventListener('click', () => {
                alert('Đã đồng bộ lịch với Google Calendar (mô phỏng).');
            });
        }

        if (this.createSessionButton) {
            this.createSessionButton.addEventListener('click', () => {
                alert('Tính năng tạo buổi học mới đang được mô phỏng.');
            });
        }
    }

    renderStats() {
        if (!this.statsContainer) return;
        const { sessionsThisWeek, assessmentsUpcoming, hoursPlanned, tasksPending } = this.dataset.stats;
        this.statsContainer.innerHTML = `
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-calendar-day"></i></div>
                <div class="stat-info">
                    <h3>${sessionsThisWeek}</h3>
                    <p>Buổi dạy trong tuần</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-file-signature"></i></div>
                <div class="stat-info">
                    <h3>${assessmentsUpcoming}</h3>
                    <p>Kỳ kiểm tra sắp diễn ra</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-clock"></i></div>
                <div class="stat-info">
                    <h3>${hoursPlanned}</h3>
                    <p>Giờ dạy & chuẩn bị</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-tasks"></i></div>
                <div class="stat-info">
                    <h3>${tasksPending}</h3>
                    <p>Công việc ưu tiên</p>
                </div>
            </div>
        `;
    }

    renderSessions() {
        if (!this.scheduleTableBody) return;
        this.scheduleTableBody.innerHTML = this.dataset.sessions.map(session => `
            <tr>
                <td>${session.time}</td>
                <td>${session.className}</td>
                <td>${session.topic}</td>
                <td>${session.location}</td>
                <td>${session.notes}</td>
                <td>
                    <button class="btn btn-sm btn-secondary" data-session="${session.id}">Chi tiết</button>
                </td>
            </tr>
        `).join('');
    }

    renderAssessments() {
        if (!this.assessmentContainer) return;
        this.assessmentContainer.innerHTML = this.dataset.assessments.map(item => `
            <div class="card">
                <h3>${item.title}</h3>
                <p class="text-muted">${item.date} • ${item.className}</p>
                <p><strong>Hình thức:</strong> ${item.format}</p>
                <ul class="detail-list">
                    ${item.tasks.map(task => `<li>${task}</li>`).join('')}
                </ul>
            </div>
        `).join('');
    }

    renderTasks() {
        if (!this.taskList) return;
        this.taskList.innerHTML = this.dataset.tasks.map(task => `
            <li>
                <strong>${task.time}</strong><br>
                ${task.task}<br>
                <span class="badge badge-info">${task.status}</span>
            </li>
        `).join('');
    }

    openSessionModal(session) {
        if (!this.modal || !this.modalBody) return;
        this.modalBody.innerHTML = `
            <h3>${session.topic}</h3>
            <p class="text-muted">${session.className} • ${session.time}</p>
            <div class="detail-section">
                <h4>Địa điểm & lưu ý</h4>
                <ul class="detail-list">
                    <li>Địa điểm: ${session.location}</li>
                    <li>Ghi chú: ${session.notes}</li>
                </ul>
            </div>
            <div class="detail-section">
                <h4>Tài liệu chuẩn bị</h4>
                <ul class="detail-list">
                    ${session.materials.map(material => `<li>${material}</li>`).join('')}
                </ul>
            </div>
            <div class="detail-section">
                <h4>Ghi chú nhanh</h4>
                <textarea rows="3" placeholder="Thêm ghi chú cho buổi học..."></textarea>
                <button class="btn btn-primary" style="margin-top: 12px;">Lưu ghi chú</button>
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
}

document.addEventListener('DOMContentLoaded', () => {
    const current = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!current || current.role !== 'teacher') {
        window.location.href = 'index.html';
        return;
    }
    new TeacherScheduleManager();
});

