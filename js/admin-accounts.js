// Admin Account Management
class AdminAccountManager {
    constructor() {
        this.accounts = this.buildDataset();
        this.filters = {
            search: '',
            role: 'all'
        };
        this.cacheDom();
        this.init();
    }

    buildDataset() {
        return [
            {
                id: 'ACC-001',
                name: 'Nguyễn Văn A',
                email: 'nguyenvana@example.com',
                phone: '0912345678',
                role: 'student',
                createdAt: '01/12/2024',
                status: 'active'
            },
            {
                id: 'ACC-002',
                name: 'Trần Thị B',
                email: 'tranthib@example.com',
                phone: '0987654321',
                role: 'teacher',
                createdAt: '15/11/2024',
                status: 'active'
            },
            {
                id: 'ACC-003',
                name: 'Lê Văn C',
                email: 'levanc@example.com',
                phone: '0901234567',
                role: 'student',
                createdAt: '20/11/2024',
                status: 'locked'
            }
        ];
    }

    cacheDom() {
        this.tableBody = document.getElementById('accounts-table');
        this.searchInput = document.getElementById('search-input');
        this.roleFilter = document.getElementById('role-filter');
        this.modal = document.getElementById('admin-account-modal');
        this.modalBody = document.getElementById('admin-account-modal-body');
        this.modalCloseBtn = document.getElementById('admin-account-modal-close');
        this.editFormContainer = document.getElementById('edit-account-form-container');
        this.editForm = document.getElementById('edit-account-form');
        this.cancelEditBtn = document.getElementById('cancel-edit-account');
    }

    init() {
        this.renderAccounts();
        this.setupEventListeners();
    }

    setupEventListeners() {
        if (this.searchInput) {
            this.searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.searchAccounts();
                }
            });
        }

        if (this.roleFilter) {
            this.roleFilter.addEventListener('change', () => {
                this.filters.role = this.roleFilter.value;
                this.renderAccounts();
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

        if (this.cancelEditBtn) {
            this.cancelEditBtn.addEventListener('click', () => this.hideEditForm());
        }

        if (this.editForm) {
            this.editForm.addEventListener('submit', (event) => {
                event.preventDefault();
                this.saveAccountEdit();
            });
        }

        if (this.tableBody) {
            this.tableBody.addEventListener('click', (event) => {
                const button = event.target.closest('button[data-id]');
                if (!button) return;

                const id = button.dataset.id;
                const action = button.dataset.action;

                if (action === 'delete') {
                    this.deleteAccount(id);
                } else if (action === 'edit') {
                    this.editAccount(id);
                }
            });
        }
    }

    getFilteredAccounts() {
        return this.accounts.filter(account => {
            const matchesSearch = this.filters.search
                ? account.name.toLowerCase().includes(this.filters.search) ||
                  account.email.toLowerCase().includes(this.filters.search) ||
                  account.phone.includes(this.filters.search) ||
                  account.id.toLowerCase().includes(this.filters.search)
                : true;

            const matchesRole = this.filters.role === 'all' || account.role === this.filters.role;
            return matchesSearch && matchesRole;
        });
    }

    renderAccounts() {
        if (!this.tableBody) return;
        const rows = this.getFilteredAccounts();

        if (!rows.length) {
            this.tableBody.innerHTML = `
                <tr>
                    <td colspan="8" style="text-align:center; color: var(--text-secondary);">
                        Không tìm thấy tài khoản phù hợp.
                    </td>
                </tr>
            `;
            return;
        }

        this.tableBody.innerHTML = rows.map(account => `
            <tr>
                <td>${account.id}</td>
                <td>${account.name}</td>
                <td>${account.email}</td>
                <td>${account.phone}</td>
                <td>${this.renderRoleBadge(account.role)}</td>
                <td>${account.createdAt}</td>
                <td>${this.renderStatusBadge(account.status)}</td>
                <td>
                    <div class="table-actions">
                        <button class="btn btn-sm btn-secondary" data-action="edit" data-id="${account.id}">Sửa</button>
                        <button class="btn btn-sm btn-danger" data-action="delete" data-id="${account.id}">Xóa</button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    searchAccounts() {
        this.filters.search = (this.searchInput?.value || '').trim().toLowerCase();
        this.renderAccounts();
    }

    openAddAccountModal() {
        if (!this.modal || !this.modalBody) return;
        this.modalBody.innerHTML = `
            <h3>Thêm tài khoản mới</h3>
            <p class="card-subtitle">Nhập đầy đủ thông tin bên dưới để tạo tài khoản người dùng.</p>
            <form id="add-account-form" class="grid grid-2" style="margin-top: 16px;">
                <div class="form-group">
                    <label for="account-name">Họ và tên</label>
                    <input type="text" id="account-name" required placeholder="Ví dụ: Nguyễn Văn A">
                </div>
                <div class="form-group">
                    <label for="account-email">Email</label>
                    <input type="email" id="account-email" required placeholder="example@kh33.vn">
                </div>
                <div class="form-group">
                    <label for="account-phone">Số điện thoại</label>
                    <input type="tel" id="account-phone" required placeholder="0912345678" pattern="0\\d{9}">
                </div>
                <div class="form-group">
                    <label for="account-password">Mật khẩu</label>
                    <input type="password" id="account-password" required placeholder="Tối thiểu 8 ký tự" minlength="8">
                    <small class="text-muted">Yêu cầu: tối thiểu 8 ký tự, bao gồm chữ và số.</small>
                </div>
                <div class="form-group">
                    <label for="account-password-confirm">Xác nhận mật khẩu</label>
                    <input type="password" id="account-password-confirm" required placeholder="Nhập lại mật khẩu">
                </div>
                <div class="form-group">
                    <label for="account-role">Vai trò</label>
                    <select id="account-role" required>
                        <option value="student">Học Sinh</option>
                        <option value="teacher">Giáo Viên</option>
                        <option value="admin">Quản Trị Viên</option>
                    </select>
                </div>
                <div class="form-group" style="grid-column: 1 / -1;">
                    <label for="account-status">Trạng thái</label>
                    <select id="account-status">
                        <option value="active">Hoạt động</option>
                        <option value="locked">Tạm khóa</option>
                    </select>
                </div>
                <div class="form-actions-inline" style="grid-column: 1 / -1;">
                    <button type="button" class="btn btn-secondary" id="cancel-add-account">Hủy</button>
                    <button type="submit" class="btn btn-primary">Tạo tài khoản</button>
                </div>
            </form>
        `;
        this.modal.classList.add('open');
        document.body.style.overflow = 'hidden';
        this.bindAddAccountForm();
    }

    bindAddAccountForm() {
        const form = document.getElementById('add-account-form');
        const cancelBtn = document.getElementById('cancel-add-account');

        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => this.closeModal());
        }

        if (!form) return;

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = document.getElementById('account-name').value.trim();
            const email = document.getElementById('account-email').value.trim();
            const phone = document.getElementById('account-phone').value.trim();
            const password = document.getElementById('account-password').value;
            const confirmPassword = document.getElementById('account-password-confirm').value;
            const role = document.getElementById('account-role').value;
            const status = document.getElementById('account-status').value;

            if (!this.validateAccount({ name, email, phone, password, confirmPassword })) {
                alert('Vui lòng kiểm tra lại thông tin đã nhập.');
                return;
            }

            const newAccount = {
                id: this.generateAccountId(role),
                name,
                email,
                phone,
                role,
                createdAt: new Date().toLocaleDateString('vi-VN'),
                status,
                password: this.maskPassword(password)
            };

            this.accounts.unshift(newAccount);
            this.closeModal();
            alert('Đã tạo tài khoản mới thành công (mô phỏng).');
            this.renderAccounts();
        });
    }

    validateAccount({ name, email, phone, password, confirmPassword }) {
        const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        const phonePattern = /^0\d{9}$/;
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if (!name || !emailPattern.test(email) || !phonePattern.test(phone)) {
            return false;
        }

        if (!passwordPattern.test(password)) {
            alert('Mật khẩu phải tối thiểu 8 ký tự và bao gồm cả chữ và số.');
            return false;
        }

        if (password !== confirmPassword) {
            alert('Mật khẩu xác nhận chưa trùng khớp.');
            return false;
        }

        return true;
    }

    generateAccountId(role) {
        const prefixMap = {
            student: 'STD',
            teacher: 'TCH',
            admin: 'ADM'
        };
        const prefix = prefixMap[role] || 'ACC';
        return `${prefix}-${Date.now().toString().slice(-6)}`;
    }

    editAccount(id) {
        const account = this.accounts.find(acc => acc.id === id);
        if (!account) {
            alert('Không tìm thấy tài khoản.');
            return;
        }

        // Populate form with account data
        document.getElementById('edit-account-id').value = account.id;
        document.getElementById('edit-account-name').value = account.name;
        document.getElementById('edit-account-email').value = account.email;
        document.getElementById('edit-account-phone').value = account.phone;
        document.getElementById('edit-account-role').value = account.role;
        document.getElementById('edit-account-status').value = account.status;

        // Show the form
        this.showEditForm();

        // Scroll to form
        this.editFormContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    showEditForm() {
        if (this.editFormContainer) {
            this.editFormContainer.style.display = 'block';
        }
    }

    hideEditForm() {
        if (this.editFormContainer) {
            this.editFormContainer.style.display = 'none';
            if (this.editForm) {
                this.editForm.reset();
            }
        }
    }

    saveAccountEdit() {
        const id = document.getElementById('edit-account-id').value;
        const name = document.getElementById('edit-account-name').value.trim();
        const email = document.getElementById('edit-account-email').value.trim();
        const phone = document.getElementById('edit-account-phone').value.trim();
        const role = document.getElementById('edit-account-role').value;
        const status = document.getElementById('edit-account-status').value;

        // Validate
        const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        const phonePattern = /^0\d{9}$/;

        if (!name || !emailPattern.test(email) || !phonePattern.test(phone)) {
            alert('Vui lòng kiểm tra lại thông tin đã nhập.');
            return;
        }

        // Find and update account
        const accountIndex = this.accounts.findIndex(acc => acc.id === id);
        if (accountIndex === -1) {
            alert('Không tìm thấy tài khoản để cập nhật.');
            return;
        }

        // Update account
        this.accounts[accountIndex] = {
            ...this.accounts[accountIndex],
            name,
            email,
            phone,
            role,
            status
        };

        this.hideEditForm();
        alert('Đã cập nhật tài khoản thành công (mô phỏng).');
        this.renderAccounts();
    }

    deleteAccount(id) {
        if (!confirm('Bạn có chắc chắn muốn xóa tài khoản này không?')) return;
        this.accounts = this.accounts.filter(account => account.id !== id);
        alert(`Đã xóa tài khoản ${id} (mô phỏng).`);
        this.renderAccounts();
    }

    maskPassword(password) {
        if (!password) return '********';
        return '•'.repeat(Math.max(8, password.length));
    }

    closeModal() {
        if (!this.modal) return;
        this.modal.classList.remove('open');
        document.body.style.overflow = '';
        if (this.modalBody) {
            this.modalBody.innerHTML = '';
        }
    }

    renderRoleBadge(role) {
        const map = {
            student: { text: 'Học Sinh', className: 'badge-info' },
            teacher: { text: 'Giáo Viên', className: 'badge-success' },
            admin: { text: 'Quản Trị Viên', className: 'badge-warning' }
        };
        const info = map[role] || { text: role, className: 'badge-info' };
        return `<span class="badge ${info.className}">${info.text}</span>`;
    }

    renderStatusBadge(status) {
        if (status === 'active') {
            return '<span class="badge badge-success">Hoạt Động</span>';
        }
        if (status === 'locked') {
            return '<span class="badge badge-warning">Tạm Khóa</span>';
        }
        return '<span class="badge badge-info">Không xác định</span>';
    }
}

// Global functions
let adminAccountManager;

function searchAccounts() {
    adminAccountManager?.searchAccounts();
}

function showAddAccount() {
    adminAccountManager?.openAddAccountModal();
}

function editAccount(id) {
    adminAccountManager?.editAccount(id);
}

function deleteAccount(id) {
    adminAccountManager?.deleteAccount(id);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
        window.location.href = 'index.html';
        return;
    }

    const userData = JSON.parse(user);
    if (userData.role !== 'admin') {
        alert('Bạn không có quyền truy cập trang này');
        window.location.href = 'dashboard.html';
        return;
    }

    adminAccountManager = new AdminAccountManager();
});
