// Student notification centre
class StudentNotificationCenter {
    constructor() {
        this.filters = {
            type: 'all',
            status: 'all',
            search: ''
        };

        this.dataset = this.buildDataset();
        this.cacheDom();
        this.init();
    }

    buildDataset() {
        return {
            preferences: {
                deadlines: {
                    label: 'Deadline & bài tập',
                    channels: { email: true, sms: false, push: true }
                },
                exams: {
                    label: 'Kỳ thi & cuộc thi',
                    channels: { email: true, sms: true, push: true }
                },
                livestream: {
                    label: 'Livestream & lớp học trực tuyến',
                    channels: { email: false, sms: false, push: true }
                },
                system: {
                    label: 'Thông báo hệ thống',
                    channels: { email: true, sms: false, push: true }
                },
                payment: {
                    label: 'Thanh toán & khuyến mãi',
                    channels: { email: true, sms: true, push: false }
                }
            },
            automations: [
                {
                    id: 'auto-01',
                    name: 'Nhắc lịch ôn tập trước kỳ thi',
                    trigger: '3 ngày trước kỳ thi đã đăng ký',
                    channels: ['Email', 'Push notification'],
                    status: 'active'
                },
                {
                    id: 'auto-02',
                    name: 'Nhắc nộp bài tập hàng tuần',
                    trigger: 'Mỗi Chủ nhật 20:00',
                    channels: ['Push notification'],
                    status: 'active'
                },
                {
                    id: 'auto-03',
                    name: 'Thông báo livestream yêu thích',
                    trigger: 'Khi giáo viên yêu thích mở livestream mới',
                    channels: ['Email'],
                    status: 'paused'
                }
            ],
            notifications: [
                {
                    id: 'notif-401',
                    title: 'Nhắc nộp bài tập Hình học không gian',
                    message: 'Bài tập chương 3 cần được nộp trước 21:00 hôm nay. Đừng quên kiểm tra lại câu 5 và 6.',
                    timestamp: '2024-12-10T14:15:00',
                    type: 'deadline',
                    status: 'unread',
                    pinned: true
                },
                {
                    id: 'notif-402',
                    title: 'Livestream luyện đề Hóa hữu cơ với cô Quỳnh Anh',
                    message: 'Livestream bắt đầu lúc 19:30. Bạn có thể gửi câu hỏi trong phần bình luận để được giải đáp trực tiếp.',
                    timestamp: '2024-12-09T18:00:00',
                    type: 'livestream',
                    status: 'read',
                    pinned: false
                },
                {
                    id: 'notif-403',
                    title: 'Mở đăng ký Math Challenge - Mùa Thu 2024',
                    message: 'Cuộc thi toán cấp trường đã mở đăng ký. Hạn đăng ký: 12/12/2024.',
                    timestamp: '2024-12-08T09:45:00',
                    type: 'exam',
                    status: 'unread',
                    pinned: false
                },
                {
                    id: 'notif-404',
                    title: 'Xác nhận thanh toán gói luyện thi THPTQG',
                    message: 'Thanh toán 450.000đ qua VNPay đã được ghi nhận. Hóa đơn đính kèm trong email.',
                    timestamp: '2024-12-07T16:30:00',
                    type: 'payment',
                    status: 'read',
                    pinned: false
                },
                {
                    id: 'notif-405',
                    title: 'Cập nhật chính sách bảo mật hệ thống',
                    message: 'KH33 cập nhật chính sách bảo mật và điều khoản sử dụng từ ngày 05/12/2024.',
                    timestamp: '2024-12-05T08:15:00',
                    type: 'system',
                    status: 'read',
                    pinned: false
                }
            ],
            reminders: [
                {
                    id: 'rem-101',
                    time: '12/12/2024 07:00',
                    event: 'Nhắc ôn tập Math Challenge - vòng loại',
                    channels: ['Push'],
                    status: 'scheduled'
                },
                {
                    id: 'rem-102',
                    time: '15/12/2024 17:30',
                    event: 'Nhắc tham gia livestream ôn tập Toán',
                    channels: ['Email', 'Push'],
                    status: 'scheduled'
                },
                {
                    id: 'rem-103',
                    time: '20/12/2024 06:45',
                    event: 'Kiểm tra dụng cụ cho Physics Lab Tournament',
                    channels: ['SMS'],
                    status: 'pending-confirmation'
                }
            ],
            stats: {
                unread: 2,
                pinned: 1,
                remindersUpcoming: 3,
                automationsActive: 2
            }
        };
    }

    cacheDom() {
        this.root = document.getElementById('notifications-root');
        this.statsContainer = document.getElementById('notifications-stats');
        this.preferencesForm = document.getElementById('notifications-preferences');
        this.automationContainer = document.getElementById('automation-rules');
        this.notificationsAlertContainer = document.getElementById('notifications-alert-container');
        this.notificationsTableBody = document.getElementById('notifications-table-body');
        this.reminderTableBody = document.getElementById('reminder-table-body');

        this.typeFilter = document.getElementById('notifications-filter-type');
        this.statusFilter = document.getElementById('notifications-filter-status');
        this.searchInput = document.getElementById('notifications-search');
        this.restoreDefaultsBtn = document.getElementById('restore-default-preferences');
        this.addAutomationBtn = document.getElementById('add-automation-rule');
        this.syncCalendarBtn = document.getElementById('sync-calendar');

        this.modal = document.getElementById('notifications-modal');
        this.modalBody = document.getElementById('notifications-modal-body');
        this.modalCloseBtn = document.getElementById('notifications-modal-close');
    }

    init() {
        if (!this.root) return;
        this.renderStats();
        this.renderPreferences();
        this.renderAutomations();
        this.renderNotifications();
        this.renderReminders();
        this.bindEvents();
    }

    bindEvents() {
        if (this.typeFilter) {
            this.typeFilter.addEventListener('change', () => {
                this.filters.type = this.typeFilter.value;
                this.renderNotifications();
            });
        }

        if (this.statusFilter) {
            this.statusFilter.addEventListener('change', () => {
                this.filters.status = this.statusFilter.value;
                this.renderNotifications();
            });
        }

        if (this.searchInput) {
            this.searchInput.addEventListener('input', (event) => {
                this.filters.search = event.target.value.trim().toLowerCase();
                this.renderNotifications();
            });
        }

        if (this.preferencesForm) {
            this.preferencesForm.addEventListener('change', (event) => {
                const target = event.target;
                if (!target.matches('[data-pref-channel]')) return;
                const prefKey = target.dataset.preference;
                const channel = target.dataset.prefChannel;
                this.dataset.preferences[prefKey].channels[channel] = target.checked;
                this.notify(`Đã cập nhật kênh nhận tin cho "${this.dataset.preferences[prefKey].label}".`, 'success');
            });
        }

        if (this.restoreDefaultsBtn) {
            this.restoreDefaultsBtn.addEventListener('click', () => {
                this.dataset = this.buildDataset();
                this.renderPreferences();
                this.renderAutomations();
                this.renderNotifications();
                this.renderReminders();
                this.notify('Đã khôi phục cấu hình thông báo mặc định.', 'info');
            });
        }

        if (this.addAutomationBtn) {
            this.addAutomationBtn.addEventListener('click', () => {
                this.notify('Tính năng tạo rule mới sẽ có trong phiên bản tiếp theo.', 'info');
            });
        }

        if (this.syncCalendarBtn) {
            this.syncCalendarBtn.addEventListener('click', () => {
                this.notify('Đã gửi yêu cầu đồng bộ tới Google Calendar. Vui lòng kiểm tra email xác nhận.', 'success');
            });
        }

        if (this.notificationsTableBody) {
            this.notificationsTableBody.addEventListener('click', (event) => {
                const button = event.target.closest('button[data-action]');
                if (!button) return;
                const id = button.dataset.id;
                const action = button.dataset.action;
                const notification = this.dataset.notifications.find(item => item.id === id);
                if (!notification) return;
                switch (action) {
                    case 'toggle-read':
                        this.toggleRead(notification);
                        break;
                    case 'toggle-pin':
                        this.togglePin(notification);
                        break;
                    case 'view':
                        this.openNotificationModal(notification);
                        break;
                }
            });
        }

        if (this.reminderTableBody) {
            this.reminderTableBody.addEventListener('click', (event) => {
                const button = event.target.closest('button[data-reminder]');
                if (!button) return;
                const reminder = this.dataset.reminders.find(item => item.id === button.dataset.reminder);
                if (!reminder) return;
                this.notify(`Đã cập nhật trạng thái nhắc lịch "${reminder.event}" (mô phỏng).`, 'info');
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
        const { unread, pinned, remindersUpcoming, automationsActive } = this.dataset.stats;
        this.statsContainer.innerHTML = `
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-inbox"></i></div>
                <div class="stat-info">
                    <h3>${unread}</h3>
                    <p>Thông báo chưa đọc</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-thumbtack"></i></div>
                <div class="stat-info">
                    <h3>${pinned}</h3>
                    <p>Thông báo đã ghim</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-bell"></i></div>
                <div class="stat-info">
                    <h3>${remindersUpcoming}</h3>
                    <p>Nhắc lịch sắp tới</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-robot"></i></div>
                <div class="stat-info">
                    <h3>${automationsActive}</h3>
                    <p>Rule tự động đang bật</p>
                </div>
            </div>
        `;
    }

    renderPreferences() {
        if (!this.preferencesForm) return;
        const entries = Object.entries(this.dataset.preferences);
        this.preferencesForm.innerHTML = entries.map(([key, pref]) => `
            <div class="card">
                <h3>${pref.label}</h3>
                <div class="form-group">
                    <label><input type="checkbox" data-preference="${key}" data-pref-channel="email" ${pref.channels.email ? 'checked' : ''}> Email</label>
                </div>
                <div class="form-group">
                    <label><input type="checkbox" data-preference="${key}" data-pref-channel="sms" ${pref.channels.sms ? 'checked' : ''}> SMS</label>
                </div>
                <div class="form-group">
                    <label><input type="checkbox" data-preference="${key}" data-pref-channel="push" ${pref.channels.push ? 'checked' : ''}> Thông báo trong ứng dụng</label>
                </div>
            </div>
        `).join('');
    }

    renderAutomations() {
        if (!this.automationContainer) return;
        if (this.dataset.automations.length === 0) {
            this.automationContainer.innerHTML = '<p>Hiện chưa có rule tự động nào. Hãy thêm rule mới để tối ưu nhắc lịch thông minh.</p>';
            return;
        }

        this.automationContainer.innerHTML = this.dataset.automations.map(rule => `
            <div class="card">
                <h3>${rule.name}</h3>
                <p class="card-subtitle">Trigger: ${rule.trigger}</p>
                <p>Kênh gửi: ${rule.channels.join(', ')}</p>
                <span class="status-chip ${rule.status === 'active' ? 'published' : 'pending'}">
                    ${rule.status === 'active' ? 'Đang hoạt động' : 'Tạm dừng'}
                </span>
            </div>
        `).join('');
    }

    renderNotifications() {
        if (!this.notificationsTableBody) return;
        let items = [...this.dataset.notifications];

        if (this.filters.type !== 'all') {
            items = items.filter(item => item.type === this.filters.type);
        }
        if (this.filters.status !== 'all') {
            if (this.filters.status === 'pinned') {
                items = items.filter(item => item.pinned);
            } else {
                items = items.filter(item => item.status === this.filters.status);
            }
        }
        if (this.filters.search) {
            items = items.filter(item =>
                item.title.toLowerCase().includes(this.filters.search) ||
                item.message.toLowerCase().includes(this.filters.search)
            );
        }

        if (items.length === 0) {
            this.notificationsTableBody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align:center; color: var(--text-secondary);">
                        Không tìm thấy thông báo phù hợp với bộ lọc hiện tại.
                    </td>
                </tr>
            `;
            return;
        }

        this.notificationsTableBody.innerHTML = items.map(item => `
            <tr>
                <td>${this.formatDateTime(item.timestamp)}</td>
                <td>
                    <strong>${item.title}</strong>
                    <div class="text-muted">${item.message}</div>
                </td>
                <td><span class="badge badge-info">${this.formatNotificationType(item.type)}</span></td>
                <td>${this.renderStatusChip(item.status, item.pinned)}</td>
                <td>
                    <div class="draft-item-actions">
                        <button class="btn btn-sm btn-secondary" data-action="view" data-id="${item.id}">Xem</button>
                        <button class="btn btn-sm btn-secondary" data-action="toggle-read" data-id="${item.id}">${item.status === 'read' ? 'Đánh dấu chưa đọc' : 'Đánh dấu đã đọc'}</button>
                        <button class="btn btn-sm btn-secondary" data-action="toggle-pin" data-id="${item.id}">${item.pinned ? 'Bỏ ghim' : 'Ghim lại'}</button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    renderReminders() {
        if (!this.reminderTableBody) return;
        if (this.dataset.reminders.length === 0) {
            this.reminderTableBody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align:center; color: var(--text-secondary);">
                        Chưa có nhắc lịch nào. Bạn có thể bật tự động hóa để tạo nhắc lịch thông minh.
                    </td>
                </tr>
            `;
            return;
        }

        this.reminderTableBody.innerHTML = this.dataset.reminders.map(item => `
            <tr>
                <td>${item.time}</td>
                <td>${item.event}</td>
                <td>${item.channels.join(', ')}</td>
                <td>${this.renderReminderStatus(item.status)}</td>
                <td>
                    <button class="btn btn-sm btn-secondary" data-reminder="${item.id}">Cập nhật</button>
                </td>
            </tr>
        `).join('');
    }

    toggleRead(notification) {
        notification.status = notification.status === 'read' ? 'unread' : 'read';
        this.updateStats();
        this.renderNotifications();
        this.notify(`Đã ${notification.status === 'read' ? 'đánh dấu là đã đọc' : 'đánh dấu là chưa đọc'} "${notification.title}".`, 'info');
    }

    togglePin(notification) {
        notification.pinned = !notification.pinned;
        this.updateStats();
        this.renderNotifications();
        this.notify(`${notification.pinned ? 'Đã ghim' : 'Đã bỏ ghim'} thông báo "${notification.title}".`, 'info');
    }

    updateStats() {
        const unread = this.dataset.notifications.filter(item => item.status === 'unread').length;
        const pinned = this.dataset.notifications.filter(item => item.pinned).length;
        this.dataset.stats.unread = unread;
        this.dataset.stats.pinned = pinned;
        this.renderStats();
    }

    openNotificationModal(notification) {
        if (!this.modal || !this.modalBody) return;
        this.modalBody.innerHTML = `
            <h3>${notification.title}</h3>
            <p class="text-muted">${this.formatDateTime(notification.timestamp)} • ${this.formatNotificationType(notification.type)}</p>
            <p style="margin-top: 18px;">${notification.message}</p>
            <p style="margin-top: 18px;"><em>Lưu ý: Bạn có thể quản lý rule tự động để nhận ít hoặc nhiều thông báo hơn.</em></p>
        `;
        this.modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        if (!this.modal) return;
        this.modal.classList.remove('open');
        document.body.style.overflow = '';
    }

    renderStatusChip(status, pinned) {
        const pinnedBadge = pinned ? '<span class="badge badge-success" style="margin-left:6px;">Đã ghim</span>' : '';
        if (status === 'unread') {
            return `<span class="status-chip pending">Chưa đọc</span>${pinnedBadge}`;
        }
        return `<span class="status-chip published">Đã đọc</span>${pinnedBadge}`;
    }

    renderReminderStatus(status) {
        switch (status) {
            case 'scheduled':
                return '<span class="status-chip published">Đã lên lịch</span>';
            case 'pending-confirmation':
                return '<span class="status-chip pending">Chờ xác nhận</span>';
            default:
                return '<span class="status-chip">Không xác định</span>';
        }
    }

    formatNotificationType(type) {
        switch (type) {
            case 'deadline':
                return 'Deadline học tập';
            case 'exam':
                return 'Kỳ thi';
            case 'livestream':
                return 'Livestream';
            case 'system':
                return 'Hệ thống';
            case 'payment':
                return 'Thanh toán';
            default:
                return 'Khác';
        }
    }

    formatDateTime(timestamp) {
        return new Date(timestamp).toLocaleString('vi-VN');
    }

    notify(message, type = 'info') {
        if (!this.notificationsAlertContainer) return;
        this.notificationsAlertContainer.innerHTML = '';
        const alert = document.createElement('div');
        alert.className = `alert alert-${this.mapAlertType(type)}`;
        alert.textContent = message;
        this.notificationsAlertContainer.appendChild(alert);
        setTimeout(() => alert.remove(), 4500);
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
    new StudentNotificationCenter();
});

