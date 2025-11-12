// Authentication functionality
class AuthManager {
    constructor() {
        this.storageKey = 'currentUser';
        this.usersKey = 'kh33Users';
        this.users = [];
        this.currentUser = null;
        this.recoveryState = {
            step: 1,
            user: null,
            otp: null,
            expiredAt: null,
            attempts: 0
        };

        this.initDataStore();
        this.loadUser();
        this.cacheDom();
        this.initEventListeners();
    }

    initDataStore() {
        const saved = localStorage.getItem(this.usersKey);
        if (saved) {
            try {
                this.users = JSON.parse(saved);
            } catch (error) {
                console.warn('Không thể đọc danh sách tài khoản, tạo mới dữ liệu demo.', error);
                this.users = this.getDefaultUsers();
                this.saveUsers();
            }
        } else {
            this.users = this.getDefaultUsers();
            this.saveUsers();
        }
    }

    getDefaultUsers() {
        return [
            {
                id: 'USR-1001',
                name: 'Nguyễn Văn A',
                email: 'hs1@kh33.vn',
                phone: '0912345678',
                role: 'student',
                password: 'Student@123',
                status: 'active',
                verified: true,
                lastLogin: null,
                createdAt: new Date().toISOString()
            },
            {
                id: 'USR-1002',
                name: 'Lê Thu Hà',
                email: 'hs2@kh33.vn',
                phone: '0911222333',
                role: 'student',
                password: 'Student@456',
                status: 'active',
                verified: true,
                lastLogin: null,
                createdAt: new Date().toISOString()
            },
            {
                id: 'TCH-2001',
                name: 'Trần Thị B',
                email: 'gv1@kh33.vn',
                phone: '0987654321',
                role: 'teacher',
                password: 'Teacher@123',
                status: 'active',
                verified: true,
                lastLogin: null,
                createdAt: new Date().toISOString()
            },
            {
                id: 'ADM-9001',
                name: 'Quản trị hệ thống',
                email: 'admin@kh33.vn',
                phone: '0909090909',
                role: 'admin',
                password: 'Admin@123',
                status: 'active',
                verified: true,
                lastLogin: null,
                createdAt: new Date().toISOString()
            }
        ];
    }

    cacheDom() {
        this.authCard = document.querySelector('.auth-card');
        this.loginForm = document.getElementById('login-form');
        this.registerForm = document.getElementById('register-form');

        this.recoveryModal = document.getElementById('recovery-modal');
        if (this.recoveryModal) {
            this.recoverySteps = Array.from(this.recoveryModal.querySelectorAll('.recovery-step'));
            this.recoveryAlert = document.getElementById('recovery-alert');
            this.stepBullets = Array.from(this.recoveryModal.querySelectorAll('.step-bullet'));

            this.recoveryIdentifierForm = document.getElementById('recovery-identifier-form');
            this.recoveryOtpForm = document.getElementById('recovery-otp-form');
            this.recoveryPasswordForm = document.getElementById('recovery-password-form');

            this.recoveryIdentifierInput = document.getElementById('recovery-identifier');
            this.recoveryOtpInput = document.getElementById('recovery-otp');
            this.recoveryNewPasswordInput = document.getElementById('recovery-new-password');
            this.recoveryConfirmPasswordInput = document.getElementById('recovery-confirm-password');

            this.recoveryCloseBtn = document.getElementById('recovery-close');
            this.recoveryBackBtn = document.getElementById('recovery-back-to-identifier');
            this.recoveryResendBtn = document.getElementById('recovery-resend');
        }
    }

    initEventListeners() {
        // Tab switching
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.getAttribute('data-tab');
                this.switchTab(tab);
            });
        });

        if (this.loginForm) {
            this.loginForm.addEventListener('submit', (event) => {
                event.preventDefault();
                this.handleLogin();
            });
        }

        if (this.registerForm) {
            this.registerForm.addEventListener('submit', (event) => {
                event.preventDefault();
                this.handleRegister();
            });
        }

        const forgotLink = document.getElementById('forgot-password-link');
        if (forgotLink) {
            forgotLink.addEventListener('click', (event) => {
                event.preventDefault();
                this.openRecoveryModal();
            });
        }

        if (this.recoveryModal) {
            this.recoveryModal.addEventListener('click', (event) => {
                if (event.target === this.recoveryModal) {
                    this.closeRecoveryModal();
                }
            });

            if (this.recoveryCloseBtn) {
                this.recoveryCloseBtn.addEventListener('click', () => this.closeRecoveryModal());
            }

            if (this.recoveryIdentifierForm) {
                this.recoveryIdentifierForm.addEventListener('submit', (event) => {
                    event.preventDefault();
                    this.handleRecoveryIdentifier();
                });
            }

            if (this.recoveryOtpForm) {
                this.recoveryOtpForm.addEventListener('submit', (event) => {
                    event.preventDefault();
                    this.handleRecoveryOtp();
                });
            }

            if (this.recoveryPasswordForm) {
                this.recoveryPasswordForm.addEventListener('submit', (event) => {
                    event.preventDefault();
                    this.handleRecoveryPassword();
                });
            }

            if (this.recoveryBackBtn) {
                this.recoveryBackBtn.addEventListener('click', () => {
                    this.setRecoveryStep(1);
                    this.showRecoveryMessage('Bạn có thể nhập lại email hoặc số điện thoại khác.', 'info');
                });
            }

            if (this.recoveryResendBtn) {
                this.recoveryResendBtn.addEventListener('click', () => this.resendRecoveryOtp());
            }
        }
    }

    switchTab(tabName) {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.auth-tab-content').forEach(content => content.classList.remove('active'));

        const activeBtn = document.querySelector(`[data-tab=\"${tabName}\"]`);
        const activeContent = document.getElementById(`${tabName}-tab`);
        
        if (activeBtn) activeBtn.classList.add('active');
        if (activeContent) activeContent.classList.add('active');
    }

    handleLogin() {
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;
        const role = document.getElementById('login-role').value;

        if (!email || !password) {
            this.showAlert('Vui lòng điền đầy đủ thông tin đăng nhập.', 'error');
            return;
        }

        const user = this.users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.role === role);
        if (!user) {
            this.showAlert('Không tìm thấy tài khoản phù hợp với thông tin đã nhập.', 'error');
            return;
        }

        if (user.status !== 'active') {
            this.showAlert('Tài khoản hiện không hoạt động. Vui lòng liên hệ quản trị viên để được hỗ trợ.', 'warning');
            return;
        }

        if (user.password !== password) {
            this.showAlert('Mật khẩu không chính xác. Vui lòng thử lại.', 'error');
            return;
        }

        user.lastLogin = new Date().toISOString();
        this.saveUsers();

        this.currentUser = this.buildSessionUser(user);
        this.saveUser();
        this.showAlert('Đăng nhập thành công! Đang chuyển hướng...', 'success');
        
        setTimeout(() => {
            window.location.href = `dashboard.html?role=${role}`;
        }, 900);
    }

    handleRegister() {
        const name = document.getElementById('register-name').value.trim();
        const email = document.getElementById('register-email').value.trim();
        const phone = document.getElementById('register-phone').value.trim();
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;
        const role = document.getElementById('register-role').value;

        if (!name || !email || !phone || !password || !confirmPassword) {
            this.showAlert('Vui lòng điền đầy đủ thông tin đăng ký.', 'error');
            return;
        }

        if (!/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(email)) {
            this.showAlert('Email không hợp lệ.', 'error');
            return;
        }

        if (!/^0\\d{9,10}$/.test(phone)) {
            this.showAlert('Số điện thoại cần gồm 10-11 chữ số và bắt đầu bằng 0.', 'error');
            return;
        }

        if (password !== confirmPassword) {
            this.showAlert('Mật khẩu xác nhận chưa trùng khớp.', 'error');
            return;
        }

        if (!this.isStrongPassword(password)) {
            this.showAlert('Mật khẩu cần tối thiểu 8 ký tự, bao gồm chữ hoa, chữ thường và số.', 'error');
            return;
        }

        if (this.users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
            this.showAlert('Email đã được sử dụng. Vui lòng chọn email khác.', 'error');
            return;
        }

        if (this.users.some(u => u.phone === phone)) {
            this.showAlert('Số điện thoại đã được sử dụng cho tài khoản khác.', 'error');
            return;
        }

        const user = {
            id: this.generateUserId(role),
            name,
            email,
            phone,
            role,
            password,
            status: 'active',
            verified: false,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString()
        };

        this.users.push(user);
        this.saveUsers();

        this.currentUser = this.buildSessionUser(user);
        this.saveUser();
        this.showAlert('Đăng ký thành công! Đang chuyển hướng...', 'success');
        
        setTimeout(() => {
            window.location.href = `dashboard.html?role=${role}`;
        }, 900);
    }

    openRecoveryModal() {
        if (!this.recoveryModal) return;
        this.recoveryState = {
            step: 1,
            user: null,
            otp: null,
            expiredAt: null,
            attempts: 0
        };
        this.clearRecoveryMessage();
        this.setRecoveryStep(1);
        this.recoveryIdentifierInput.value = '';
        this.recoveryOtpInput.value = '';
        this.recoveryNewPasswordInput.value = '';
        this.recoveryConfirmPasswordInput.value = '';
        this.recoveryModal.classList.add('open');
        document.body.style.overflow = 'hidden';
        this.recoveryIdentifierInput.focus();
    }

    closeRecoveryModal() {
        if (!this.recoveryModal) return;
        this.recoveryModal.classList.remove('open');
        document.body.style.overflow = '';
    }

    setRecoveryStep(step) {
        this.recoveryState.step = step;
        if (this.recoverySteps) {
            this.recoverySteps.forEach(stepEl => {
                const stepIndex = Number(stepEl.dataset.step);
                stepEl.classList.toggle('active', stepIndex === step);
            });
        }
        if (this.stepBullets) {
            this.stepBullets.forEach(bullet => {
                const bulletStep = Number(bullet.dataset.step);
                bullet.classList.toggle('active', bulletStep === step);
                bullet.classList.toggle('completed', bulletStep < step);
            });
        }
        switch (step) {
            case 1:
                this.recoveryIdentifierInput?.focus();
                break;
            case 2:
                this.recoveryOtpInput?.focus();
                break;
            case 3:
                this.recoveryNewPasswordInput?.focus();
                break;
            default:
                break;
        }
    }

    handleRecoveryIdentifier() {
        const identifier = this.recoveryIdentifierInput.value.trim();
        if (!identifier) {
            this.showRecoveryMessage('Vui lòng nhập email hoặc số điện thoại đã đăng ký.', 'error');
            return;
        }

        const user = this.users.find(u =>
            u.email.toLowerCase() === identifier.toLowerCase() || u.phone === identifier
        );

        if (!user) {
            this.showRecoveryMessage('Không tìm thấy tài khoản tương ứng. Vui lòng kiểm tra lại.', 'error');
            return;
        }

        this.recoveryState.user = user;
        this.sendRecoveryOtp(user);
        this.setRecoveryStep(2);
    }

    handleRecoveryOtp() {
        const inputOtp = this.recoveryOtpInput.value.trim();
        if (!inputOtp) {
            this.showRecoveryMessage('Vui lòng nhập mã OTP.', 'error');
            return;
        }

        if (!this.recoveryState.otp || !this.recoveryState.expiredAt) {
            this.showRecoveryMessage('Chưa có mã OTP hợp lệ. Vui lòng gửi lại mã.', 'error');
            return;
        }

        if (Date.now() > this.recoveryState.expiredAt) {
            this.showRecoveryMessage('Mã OTP đã hết hạn. Vui lòng gửi lại.', 'error');
            return;
        }

        if (inputOtp !== this.recoveryState.otp) {
            this.recoveryState.attempts += 1;
            if (this.recoveryState.attempts >= 3) {
                this.showRecoveryMessage('Bạn đã nhập sai OTP quá 3 lần. Mã đã được đặt lại.', 'warning');
                this.sendRecoveryOtp(this.recoveryState.user);
                this.recoveryState.attempts = 0;
            } else {
                this.showRecoveryMessage('Mã OTP chưa chính xác. Vui lòng thử lại.', 'error');
            }
            return;
        }

        this.showRecoveryMessage('Xác thực thành công. Vui lòng đặt mật khẩu mới.', 'success');
        this.setRecoveryStep(3);
    }

    handleRecoveryPassword() {
        const newPassword = this.recoveryNewPasswordInput.value;
        const confirmPassword = this.recoveryConfirmPasswordInput.value;
        const user = this.recoveryState.user;

        if (!user) {
            this.showRecoveryMessage('Phiên khôi phục không hợp lệ. Vui lòng thực hiện lại từ đầu.', 'error');
            this.setRecoveryStep(1);
            return;
        }

        if (!newPassword || !confirmPassword) {
            this.showRecoveryMessage('Vui lòng nhập đầy đủ mật khẩu mới.', 'error');
            return;
        }

        if (newPassword !== confirmPassword) {
            this.showRecoveryMessage('Mật khẩu xác nhận chưa khớp.', 'error');
            return;
        }

        if (!this.isStrongPassword(newPassword)) {
            this.showRecoveryMessage('Mật khẩu cần tối thiểu 8 ký tự, bao gồm chữ hoa, chữ thường và số.', 'error');
            return;
        }

        user.password = newPassword;
        user.updatedAt = new Date().toISOString();
        this.saveUsers();
        this.showRecoveryMessage('Đặt lại mật khẩu thành công! Bạn có thể sử dụng mật khẩu mới để đăng nhập.', 'success');

        setTimeout(() => {
            this.closeRecoveryModal();
            this.showAlert('Mật khẩu đã được cập nhật. Vui lòng đăng nhập lại.', 'success');
        }, 1400);
    }

    resendRecoveryOtp() {
        if (!this.recoveryState.user) {
            this.showRecoveryMessage('Vui lòng nhập thông tin tài khoản trước khi yêu cầu gửi lại OTP.', 'warning');
            return;
        }
        this.sendRecoveryOtp(this.recoveryState.user);
    }

    sendRecoveryOtp(user) {
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        this.recoveryState.otp = otp;
        this.recoveryState.expiredAt = Date.now() + 5 * 60 * 1000; // 5 minutes
        this.recoveryState.attempts = 0;

        const target = user.email || user.phone;
        const masked = this.maskIdentifier(target);
        this.showRecoveryMessage(`Đã gửi mã OTP tới ${masked}. (Demo: mã OTP là ${otp})`, 'info');
    }

    maskIdentifier(value) {
        if (!value) return '';
        if (value.includes('@')) {
            const [namePart, domain] = value.split('@');
            const maskedName = namePart.length <= 2
                ? namePart[0] + '*'.repeat(namePart.length - 1)
                : namePart.slice(0, 2) + '*'.repeat(Math.max(namePart.length - 2, 1));
            return `${maskedName}@${domain}`;
        }
        return value.slice(0, 3) + '***' + value.slice(-3);
    }

    isStrongPassword(password) {
        const hasLength = password.length >= 8;
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        return hasLength && hasUpper && hasLower && hasNumber;
    }

    generateUserId(role) {
        const prefix = role === 'teacher' ? 'TCH' : role === 'admin' ? 'ADM' : 'USR';
        const suffix = Math.floor(1000 + Math.random() * 9000);
        return `${prefix}-${Date.now().toString().slice(-4)}${suffix}`;
    }

    buildSessionUser(user) {
        const { id, name, email, role, phone } = user;
        return { id, name, email, role, phone };
    }

    showAlert(message, type = 'info') {
        if (!this.authCard) return;
        let container = this.authCard.querySelector('.auth-alert-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'auth-alert-container';
            this.authCard.insertBefore(container, this.authCard.firstChild);
        }

        container.innerHTML = '';
        const alert = document.createElement('div');
        alert.className = `alert alert-${this.mapAlertType(type)} auth-alert`;
        alert.textContent = message;
        container.appendChild(alert);

        setTimeout(() => {
            alert.remove();
        }, 6000);
    }

    showRecoveryMessage(message, type = 'info') {
        if (!this.recoveryAlert) return;
        this.recoveryAlert.innerHTML = '';
        const alert = document.createElement('div');
        alert.className = `alert alert-${this.mapAlertType(type)}`;
        alert.textContent = message;
        this.recoveryAlert.appendChild(alert);
    }

    clearRecoveryMessage() {
        if (this.recoveryAlert) {
            this.recoveryAlert.innerHTML = '';
        }
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

    saveUsers() {
        localStorage.setItem(this.usersKey, JSON.stringify(this.users));
    }

    saveUser() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.currentUser));
    }

    loadUser() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
            try {
            this.currentUser = JSON.parse(saved);
            } catch (error) {
                console.warn('Không thể tải thông tin phiên đăng nhập, thực hiện đăng xuất.', error);
                this.logout();
            }
        }
    }

    getCurrentUser() {
        return this.currentUser;
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem(this.storageKey);
        window.location.href = 'index.html';
    }
}

// Initialize auth manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AuthManager();
});
