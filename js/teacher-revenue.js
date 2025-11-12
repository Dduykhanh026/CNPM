// Teacher revenue dashboard
class TeacherRevenueManager {
    constructor() {
        this.dataset = this.buildDataset();
        this.cacheDom();
        this.init();
    }

    buildDataset() {
        return {
            stats: {
                totalRevenue: 18500000,
                balanceAvailable: 6200000,
                conversionRate: 7.4,
                lastPayout: '25/11/2024 • 8.500.000 VNĐ'
            },
            products: [
                { name: 'Bộ đề Hàm số nâng cao', type: 'Bộ đề PDF', price: 120000, sold: 145, revenue: 17400000, rating: 4.8 },
                { name: 'Livestream Ôn Toán THPT', type: 'Livestream', price: 150000, sold: 48, revenue: 7200000, rating: 4.9 },
                { name: 'Khóa học Este - Polime', type: 'Video', price: 180000, sold: 36, revenue: 6480000, rating: 4.7 },
                { name: 'Bài tập Dao động cơ', type: 'Bộ đề PDF', price: 90000, sold: 80, revenue: 7200000, rating: 4.5 }
            ],
            transactions: [
                { time: '10/12/2024 21:05', product: 'Bộ đề Hàm số nâng cao', student: 'Mai Hồng Nhung', amount: 120000, status: 'Hoàn tất' },
                { time: '10/12/2024 19:45', product: 'Livestream Ôn Toán THPT', student: 'Đoàn Ngọc Sơn', amount: 150000, status: 'Hoàn tất' },
                { time: '09/12/2024 16:20', product: 'Khóa học Este - Polime', student: 'Phạm Quốc Đạt', amount: 180000, status: 'Hoàn tất' },
                { time: '09/12/2024 14:50', product: 'Bài tập Dao động cơ', student: 'Trần Minh Khôi', amount: 90000, status: 'Hoàn tất' },
                { time: '08/12/2024 20:10', product: 'Livestream Ôn Toán THPT', student: 'Nguyễn Như Mai', amount: 150000, status: 'Đang xử lý' }
            ],
            withdrawals: [
                { date: '25/11/2024', amount: 8500000, bank: 'VCB - ****4567', status: 'Đã chuyển' },
                { date: '10/10/2024', amount: 7200000, bank: 'VCB - ****4567', status: 'Đã chuyển' },
                { date: '12/09/2024', amount: 6800000, bank: 'VCB - ****4567', status: 'Đã chuyển' }
            ]
        };
    }

    cacheDom() {
        this.root = document.getElementById('teacher-revenue-root');
        this.statsContainer = document.getElementById('revenue-stats');
        this.productBody = document.getElementById('revenue-product-body');
        this.transactionBody = document.getElementById('revenue-transaction-body');
        this.withdrawalBody = document.getElementById('revenue-withdrawal-body');
        this.rangeFilter = document.getElementById('revenue-filter-range');
        this.exportButton = document.getElementById('export-revenue');
        this.createWithdrawalButton = document.getElementById('create-withdrawal');

        this.modal = document.getElementById('revenue-modal');
        this.modalBody = document.getElementById('revenue-modal-body');
        this.modalCloseBtn = document.getElementById('revenue-modal-close');
    }

    init() {
        if (!this.root) return;
        this.renderStats();
        this.renderProducts();
        this.renderTransactions();
        this.renderWithdrawals();
        this.bindEvents();
    }

    bindEvents() {
        if (this.rangeFilter) {
            this.rangeFilter.addEventListener('change', () => {
                alert(`Đang lọc dữ liệu doanh thu cho ${this.rangeFilter.value} ngày qua (mô phỏng).`);
            });
        }

        if (this.exportButton) {
            this.exportButton.addEventListener('click', () => {
                alert('Đã chuẩn bị báo cáo doanh thu ở định dạng CSV và gửi qua email của bạn (mô phỏng).');
            });
        }

        if (this.createWithdrawalButton) {
            this.createWithdrawalButton.addEventListener('click', () => this.openWithdrawalModal());
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
        const { totalRevenue, balanceAvailable, conversionRate, lastPayout } = this.dataset.stats;
        this.statsContainer.innerHTML = `
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-sack-dollar"></i></div>
                <div class="stat-info">
                    <h3>${this.formatCurrency(totalRevenue)}</h3>
                    <p>Doanh thu tích lũy</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-wallet"></i></div>
                <div class="stat-info">
                    <h3>${this.formatCurrency(balanceAvailable)}</h3>
                    <p>Số dư có thể rút</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-percent"></i></div>
                <div class="stat-info">
                    <h3>${conversionRate}%</h3>
                    <p>Tỷ lệ chuyển đổi học viên</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon"><i class="fas fa-receipt"></i></div>
                <div class="stat-info">
                    <h3>${lastPayout}</h3>
                    <p>Thanh toán gần nhất</p>
                </div>
            </div>
        `;
    }

    renderProducts() {
        if (!this.productBody) return;
        this.productBody.innerHTML = this.dataset.products.map(item => `
            <tr>
                <td>${item.name}</td>
                <td>${item.type}</td>
                <td>${this.formatCurrency(item.price)}</td>
                <td>${item.sold}</td>
                <td>${this.formatCurrency(item.revenue)}</td>
                <td>${item.rating.toFixed(1)} ⭐</td>
            </tr>
        `).join('');
    }

    renderTransactions() {
        if (!this.transactionBody) return;
        this.transactionBody.innerHTML = this.dataset.transactions.map(item => `
            <tr>
                <td>${item.time}</td>
                <td>${item.product}</td>
                <td>${item.student}</td>
                <td>${this.formatCurrency(item.amount)}</td>
                <td>${this.renderStatusChip(item.status)}</td>
            </tr>
        `).join('');
    }

    renderWithdrawals() {
        if (!this.withdrawalBody) return;
        this.withdrawalBody.innerHTML = this.dataset.withdrawals.map(item => `
            <tr>
                <td>${item.date}</td>
                <td>${this.formatCurrency(item.amount)}</td>
                <td>${item.bank}</td>
                <td>${this.renderStatusChip('Đã chuyển')}</td>
            </tr>
        `).join('');
    }

    openWithdrawalModal() {
        if (!this.modal || !this.modalBody) return;
        this.modalBody.innerHTML = `
            <h3>Tạo yêu cầu rút tiền</h3>
            <p class="card-subtitle">Số dư khả dụng: ${this.formatCurrency(this.dataset.stats.balanceAvailable)}</p>
            <form id="withdrawal-form" class="grid grid-2" style="margin-top: 16px;">
                <div class="form-group">
                    <label for="withdraw-amount">Số tiền</label>
                    <input type="number" id="withdraw-amount" min="500000" step="50000" value="1000000" required>
                </div>
                <div class="form-group">
                    <label for="withdraw-bank">Ngân hàng</label>
                    <select id="withdraw-bank">
                        <option value="vcb">Vietcombank - ****4567</option>
                        <option value="mb">MB Bank - ****7890</option>
                        <option value="tpb">TPBank - ****1234</option>
                    </select>
                </div>
                <div class="form-group" style="grid-column: 1 / -1;">
                    <label for="withdraw-note">Ghi chú (tùy chọn)</label>
                    <textarea id="withdraw-note" rows="3" placeholder="Thêm ghi chú cho bộ phận kế toán..."></textarea>
                </div>
                <div class="form-actions-inline" style="grid-column: 1 / -1;">
                    <button type="button" class="btn btn-secondary" id="cancel-withdrawal">Hủy</button>
                    <button type="submit" class="btn btn-primary">Gửi yêu cầu</button>
                </div>
            </form>
        `;
        this.modal.classList.add('open');
        document.body.style.overflow = 'hidden';

        const form = document.getElementById('withdrawal-form');
        const cancelBtn = document.getElementById('cancel-withdrawal');
        if (form) {
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                alert('Đã gửi yêu cầu rút tiền. Bộ phận kế toán sẽ xử lý trong 1-2 ngày làm việc (mô phỏng).');
                this.closeModal();
            });
        }
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => this.closeModal());
        }
    }

    closeModal() {
        if (!this.modal) return;
        this.modal.classList.remove('open');
        document.body.style.overflow = '';
    }

    renderStatusChip(status) {
        if (status === 'Hoàn tất' || status === 'Đã chuyển') {
            return '<span class="status-chip published">Hoàn tất</span>';
        }
        if (status === 'Đang xử lý') {
            return '<span class="status-chip pending">Đang xử lý</span>';
        }
        return '<span class="status-chip">Khác</span>';
    }

    formatCurrency(value) {
        return value.toLocaleString('vi-VN') + ' VNĐ';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const current = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!current || current.role !== 'teacher') {
        window.location.href = 'index.html';
        return;
    }
    new TeacherRevenueManager();
});

