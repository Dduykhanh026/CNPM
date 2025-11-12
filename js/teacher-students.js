// Teacher student management
class TeacherStudentManager {
    constructor() {
        this.filters = {
            classId: 'all',
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
                totalStudents: 86,
                classes: 4,
                atRisk: 6,
                onTrack: 72
            },
            classes: [
                {
                    id: '12A1-MATH',
                    name: 'Toán 12 - Nâng cao',
                    size: 24,
                    progress: 82,
                    averageScore: 8.1,
                    atRisk: 2
                },
                {
                    id: '12A2-PHYS',
                    name: 'Vật Lý 12 - Dao động',
                    size: 18,
                    progress: 76,
                    averageScore: 7.6,
                    atRisk: 1
                },
                {
                    id: '12A3-CHEM',
                    name: 'Hóa Học 12 - Hữu cơ',
                    size: 22,
                    progress: 81,
                    averageScore: 8.3,
                    atRisk: 2
                },
                {
                    id: 'G10-OLYM',
                    name: 'CLB Bồi dưỡng Toán 10',
                    size: 22,
                    progress: 68,
                    averageScore: 7.2,
                    atRisk: 1
                }
            ],
            students: [
                {
                    id: 'STU-001',
                    name: 'Nguyễn Trung Kiên',
                    classId: '12A1-MATH',
                    className: 'Toán 12 - Nâng cao',
                    averageScore: 9.1,
                    progress: 95,
                    engagement: 'Cao',
                    status: 'ontrack',
                    interventions: [],
                    recentActivity: [
                        { time: '10/12', activity: 'Hoàn thành bài tập tự luận chương 4', score: '9.5/10' },
                        { time: '08/12', activity: 'Tham gia livestream giải đề', note: 'Đặt 3 câu hỏi chất lượng' }
                    ]
                },
                {
                    id: 'STU-014',
                    name: 'Trần Bảo Ngọc',
                    classId: '12A3-CHEM',
                    className: 'Hóa Học 12 - Hữu cơ',
                    averageScore: 8.6,
                    progress: 90,
                    engagement: 'Trung bình',
                    status: 'ontrack',
                    interventions: [],
                    recentActivity: [
                        { time: '09/12', activity: 'Nộp bài tập Este - Polime', score: '8.0/10' },
                        { time: '07/12', activity: 'Đọc tài liệu mở rộng chương 5', note: 'Dành 45 phút' }
                    ]
                },
                {
                    id: 'STU-022',
                    name: 'Phạm Minh Anh',
                    classId: '12A2-PHYS',
                    className: 'Vật Lý 12 - Dao động',
                    averageScore: 6.4,
                    progress: 58,
                    engagement: 'Thấp',
                    status: 'warning',
                    interventions: ['Hẹn kèm 1-1 vào 12/12', 'Gửi bộ đề luyện thêm'],
                    recentActivity: [
                        { time: '10/12', activity: 'Thi giữa kỳ phần Dao động cơ', score: '5.5/10' },
                        { time: '05/12', activity: 'Tham gia lớp nhưng rời sớm', note: 'Chỉ học 20 phút' }
                    ]
                },
                {
                    id: 'STU-041',
                    name: 'Lê Tấn Đạt',
                    classId: 'G10-OLYM',
                    className: 'CLB Bồi dưỡng Toán 10',
                    averageScore: 6.9,
                    progress: 62,
                    engagement: 'Trung bình',
                    status: 'critical',
                    interventions: ['Gửi thông báo tới phụ huynh', 'Đề xuất chuyển sang lộ trình cơ bản hơn'],
                    recentActivity: [
                        { time: '09/12', activity: 'Không nộp bài tập tuần', note: 'Báo bận thi học kỳ' },
                        { time: '03/12', activity: 'Hoàn thành 30% bộ đề bồi dưỡng', score: '6.0/10' }
                    ]
                },
                {
                    id: 'STU-055',
                    name: 'Hoàng Hà Mi',
                    classId: '12A3-CHEM',
                    className: 'Hóa Học 12 - Hữu cơ',
                    averageScore: 9.0,
                    progress: 97,
                    engagement: 'Cao',
                    status: 'ontrack',
                    interventions: [],
                    recentActivity: [
                        { time: '10/12', activity: 'Nộp bài tập hữu cơ nâng cao', score: '9.5/10' },
                        { time: '08/12', activity: 'Đạt top 5 cuộc thi hóa học mở rộng', note: 'Huy chương bạc' }
                    ]
                }
            ],
            tiers: [
                { name: 'Xuất sắc', percentage: 18, description: 'Điểm > 9.0, tiến độ > 90%' },
                { name: 'Khá giỏi', percentage: 42, description: 'Điểm 7.5 - 9.0, tiến độ > 75%' },
                { name: 'Đang đạt', percentage: 30, description: 'Điểm 6.5 - 7.5, cần duy trì' },
                { name: 'Cần chú ý', percentage: 10, description: 'Điểm < 6.5 hoặc tiến độ < 60%' }
            ],
            interventions: [
                {
                    student: 'Phạm Minh Anh',
                    className: 'Vật Lý 12 - Dao động',
                    issue: 'Điểm giảm 15% so với tháng trước',
                    action: 'Hẹn kèm 1-1 ngày 12/12, giao 2 bộ đề bổ sung',
                    status: 'Đang thực hiện'
                },
                {
                    student: 'Lê Tấn Đạt',
                    className: 'CLB Bồi dưỡng Toán 10',
                    issue: 'Không nộp bài tập 2 tuần liên tiếp',
                    action: 'Gửi thông báo phụ huynh, chuyển lộ trình phù hợp',
                    status: 'Chờ phản hồi phụ huynh'
                },
                {
                    student: 'Nguyễn Trung Kiên',
                    className: 'Toán 12 - Nâng cao',
                    issue: 'Cần đề xuất nội dung nâng cao hơn',
                    action: 'Đang xây dựng bộ đề bồi dưỡng cấp tỉnh',
                    status: 'Đã xử lý'
                }
            ]
        };
    }

    cacheDom() {
        this.root = document.getElementById('teacher-students-root');
        this.statsContainer = document.getElementById('teacher-students-stats');
        this.classTableBody = document.getElementById('teacher-class-table-body');
        this.studentTableBody = document.getElementById('teacher-student-table-body');
        this.classFilterSelect = document.getElementById('student-filter-class');
        this.statusFilterSelect = document.getElementById('student-filter-status');
        this.searchInput = document.getElementById('student-search');
        this.tierDistributionContainer = document.getElementById('tier-distribution');
        this.interventionListContainer = document.getElementById('intervention-list');

        this.modal = document.getElementById('teacher-students-modal');
        this.modalBody = document.getElementById('teacher-students-modal-body');
        this.modalCloseBtn = document.getElementById('teacher-students-modal-close');

        this.importBtn = document.getElementById('import-students');
        this.addGroupBtn = document.getElementById('add-student-group');
    }

    init() {
        if (!this.root) return;
        this.recalculateAggregates();
        this.renderStats();
        this.renderClassTable();
        this.populateClassFilter();
        this.renderStudentTable();
        this.renderTierDistribution();
        this.renderInterventionList();
        this.bindEvents();
    }

    bindEvents() {
        if (this.classFilterSelect) {
            this.classFilterSelect.addEventListener('change', () => {
                this.filters.classId = this.classFilterSelect.value;
                this.renderStudentTable();
            });
        }

        if (this.statusFilterSelect) {
            this.statusFilterSelect.addEventListener('change', () => {
                this.filters.status = this.statusFilterSelect.value;
                this.renderStudentTable();
            });
        }

        if (this.searchInput) {
            this.searchInput.addEventListener('input', (event) => {
                this.filters.search = event.target.value.trim().toLowerCase();
                this.renderStudentTable();
            });
        }

        if (this.studentTableBody) {
            this.studentTableBody.addEventListener('click', (event) => {
                const button = event.target.closest('button[data-student]');
                if (!button) return;
                const studentId = button.dataset.student;
                const action = button.dataset.action || 'view';
                const student = this.dataset.students.find(item => item.id === studentId);
                if (!student) return;

                if (action === 'view') {
                    this.openStudentModal(student);
                } else if (action === 'delete') {
                    this.removeStudent(student);
                }
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

        if (this.importBtn) {
            this.importBtn.addEventListener('click', () => {
                alert('Tính năng import CSV sẽ sớm ra mắt. Hiện tại bạn có thể thêm học sinh thủ công.');
            });
        }

        if (this.addGroupBtn) {
            this.addGroupBtn.addEventListener('click', () => {
                alert('Tính năng tạo lớp mới đang được mô phỏng. Vui lòng liên hệ admin để được hỗ trợ.');
            });
        }
    }

    renderStats() {
        if (!this.statsContainer) return;
        const { totalStudents, classes, atRisk, onTrack } = this.dataset.stats;
        this.statsContainer.innerHTML = `
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-users"></i></div>
                <div class="stat-info">
                    <h3>${totalStudents}</h3>
                    <p>Học sinh đang theo học</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-layer-group"></i></div>
                <div class="stat-info">
                    <h3>${classes}</h3>
                    <p>Lớp/nhóm giảng dạy</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-heartbeat"></i></div>
                <div class="stat-info">
                    <h3>${atRisk}</h3>
                    <p>Học sinh cần can thiệp</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-chart-line"></i></div>
                <div class="stat-info">
                    <h3>${onTrack}</h3>
                    <p>Đang đi đúng lộ trình</p>
                </div>
            </div>
        `;
    }

    renderClassTable() {
        if (!this.classTableBody) return;
        this.classTableBody.innerHTML = this.dataset.classes.map(item => `
            <tr>
                <td><strong>${item.name}</strong></td>
                <td>${item.size}</td>
                <td>${item.progress}%</td>
                <td>${item.averageScore}</td>
                <td>${item.atRisk}</td>
                <td>
                    <button class="btn btn-sm btn-secondary" data-class="${item.id}">Xem chi tiết</button>
                </td>
            </tr>
        `).join('');
    }

    populateClassFilter() {
        if (!this.classFilterSelect) return;
        const options = ['<option value="all">Tất cả lớp</option>']
            .concat(this.dataset.classes.map(item => `<option value="${item.id}">${item.name}</option>`));
        this.classFilterSelect.innerHTML = options.join('');
    }

    renderStudentTable() {
        if (!this.studentTableBody) return;
        let rows = [...this.dataset.students];
        if (this.filters.classId !== 'all') {
            rows = rows.filter(row => row.classId === this.filters.classId);
        }
        if (this.filters.status !== 'all') {
            rows = rows.filter(row => row.status === this.filters.status);
        }
        if (this.filters.search) {
            rows = rows.filter(row =>
                row.name.toLowerCase().includes(this.filters.search) ||
                row.id.toLowerCase().includes(this.filters.search)
            );
        }

        if (rows.length === 0) {
            this.studentTableBody.innerHTML = `
                <tr>
                    <td colspan="7" style="text-align:center; color: var(--text-secondary);">
                        Không tìm thấy học sinh phù hợp với bộ lọc hiện tại.
                    </td>
                </tr>
            `;
            return;
        }

        this.studentTableBody.innerHTML = rows.map(student => `
            <tr>
                <td><strong>${student.name}</strong></td>
                <td>${student.className}</td>
                <td>${student.averageScore}</td>
                <td>${student.progress}%</td>
                <td>${student.engagement}</td>
                <td>${this.renderStudentStatus(student.status)}</td>
                <td>
                    <div class="table-actions">
                        <button class="btn btn-sm btn-secondary" data-action="view" data-student="${student.id}">Hồ sơ</button>
                        <button class="btn btn-sm btn-danger" data-action="delete" data-student="${student.id}">Xóa</button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    renderTierDistribution() {
        if (!this.tierDistributionContainer) return;
        this.tierDistributionContainer.innerHTML = this.dataset.tiers.map(tier => `
            <div class="card">
                <h3>${tier.name}</h3>
                <p><strong>${tier.percentage}%</strong> học sinh</p>
                <p class="text-muted">${tier.description}</p>
            </div>
        `).join('');
    }

    renderInterventionList() {
        if (!this.interventionListContainer) return;
        this.interventionListContainer.innerHTML = this.dataset.interventions.map(item => `
            <div class="card">
                <h3>${item.student}</h3>
                <p class="text-muted">${item.className}</p>
                <p><strong>Vấn đề:</strong> ${item.issue}</p>
                <p><strong>Kế hoạch:</strong> ${item.action}</p>
                <span class="badge badge-info">${item.status}</span>
            </div>
        `).join('');
    }

    openStudentModal(student) {
        if (!this.modal || !this.modalBody) return;
        this.modalBody.innerHTML = `
            <h3>${student.name}</h3>
            <p class="text-muted">Lớp: ${student.className} • Mã HS: ${student.id}</p>
            <div class="detail-section">
                <h4>Thống kê chính</h4>
                <ul class="detail-list">
                    <li>Điểm trung bình: <strong>${student.averageScore}</strong></li>
                    <li>Tiến độ học tập: <strong>${student.progress}%</strong></li>
                    <li>Mức độ tham gia: <strong>${student.engagement}</strong></li>
                    <li>Trạng thái: ${this.renderStudentStatus(student.status)}</li>
                </ul>
            </div>
            <div class="detail-section">
                <h4>Hoạt động gần đây</h4>
                <ul class="detail-list">
                    ${student.recentActivity.map(item => `<li><strong>${item.time}</strong>: ${item.activity}${item.score ? ` - ${item.score}` : ''}${item.note ? ` (${item.note})` : ''}</li>`).join('')}
                </ul>
            </div>
            <div class="detail-section">
                <h4>Kế hoạch hỗ trợ</h4>
                ${student.interventions.length ? `<ul class="detail-list">${student.interventions.map(item => `<li>${item}</li>`).join('')}</ul>` : '<p>Không có kế hoạch đặc biệt. Học sinh đang đi đúng lộ trình.</p>'}
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

    removeStudent(student) {
        if (!confirm(`Bạn có chắc chắn muốn xóa học sinh ${student.name}?`)) {
            return;
        }

        this.dataset.students = this.dataset.students.filter(item => item.id !== student.id);
        this.dataset.interventions = this.dataset.interventions.filter(item => item.student !== student.name);

        this.recalculateAggregates();
        const currentClass = this.filters.classId;
        this.renderStats();
        this.renderClassTable();
        this.populateClassFilter(currentClass);
        this.renderStudentTable();
        this.renderTierDistribution();
        this.renderInterventionList();
        alert('Đã xóa học sinh khỏi danh sách (mô phỏng).');
    }

    recalculateAggregates() {
        const students = this.dataset.students;
        const total = students.length;

        this.dataset.stats.totalStudents = total;
        this.dataset.stats.onTrack = students.filter(s => s.status === 'ontrack').length;
        this.dataset.stats.atRisk = total - this.dataset.stats.onTrack;
        this.dataset.stats.classes = this.dataset.classes.length;

        this.dataset.classes = this.dataset.classes.map(cls => {
            const classStudents = students.filter(s => s.classId === cls.id);
            const size = classStudents.length;
            const avgScore = size
                ? classStudents.reduce((sum, s) => sum + s.averageScore, 0) / size
                : 0;
            const avgProgress = size
                ? Math.round(classStudents.reduce((sum, s) => sum + s.progress, 0) / size)
                : 0;
            const atRisk = classStudents.filter(s => s.status !== 'ontrack').length;
            return {
                ...cls,
                size,
                averageScore: Number(avgScore.toFixed(1)),
                progress: avgProgress,
                atRisk
            };
        });

        this.dataset.tiers = this.calculateTierDistribution(students, total);
    }

    calculateTierDistribution(students, total) {
        if (total === 0) {
            return [
                { name: 'Xuất sắc', percentage: 0, description: 'Điểm > 9.0, tiến độ > 90%' },
                { name: 'Khá giỏi', percentage: 0, description: 'Điểm 7.5 - 9.0, tiến độ > 75%' },
                { name: 'Đang đạt', percentage: 0, description: 'Điểm 6.5 - 7.5, cần duy trì' },
                { name: 'Cần chú ý', percentage: 0, description: 'Điểm < 6.5 hoặc tiến độ < 60%' }
            ];
        }

        const excellent = students.filter(s => s.averageScore > 9 && s.progress > 90).length;
        const good = students.filter(s => s.averageScore > 7.5 && s.averageScore <= 9 && s.progress > 75).length;
        const average = students.filter(s => s.averageScore >= 6.5 && s.averageScore <= 7.5).length;
        const attention = students.filter(s => s.averageScore < 6.5 || s.progress < 60).length;

        const toPercent = (value) => Math.round((value / total) * 100);

        return [
            { name: 'Xuất sắc', percentage: toPercent(excellent), description: 'Điểm > 9.0, tiến độ > 90%' },
            { name: 'Khá giỏi', percentage: toPercent(good), description: 'Điểm 7.5 - 9.0, tiến độ > 75%' },
            { name: 'Đang đạt', percentage: toPercent(average), description: 'Điểm 6.5 - 7.5, cần duy trì' },
            { name: 'Cần chú ý', percentage: toPercent(attention), description: 'Điểm < 6.5 hoặc tiến độ < 60%' }
        ];
    }

    renderStudentStatus(status) {
        switch (status) {
            case 'ontrack':
                return '<span class="status-chip published">Đang đạt</span>';
            case 'warning':
                return '<span class="status-chip pending">Cần chú ý</span>';
            case 'critical':
                return '<span class="status-chip hidden">Nguy cơ cao</span>';
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
    new TeacherStudentManager();
});

