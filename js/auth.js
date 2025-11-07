// Authentication functionality
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.storageKey = 'currentUser';
        this.loadUser();
        this.initEventListeners();
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

        // Login form
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        // Register form
        const registerForm = document.getElementById('register-form');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleRegister();
            });
        }

        // Forgot password link
        const forgotLink = document.getElementById('forgot-password-link');
        if (forgotLink) {
            forgotLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleForgotPassword();
            });
        }
    }

    switchTab(tabName) {
        // Remove active class from all tabs and contents
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.auth-tab-content').forEach(content => content.classList.remove('active'));

        // Add active class to selected tab and content
        const activeBtn = document.querySelector(`[data-tab="${tabName}"]`);
        const activeContent = document.getElementById(`${tabName}-tab`);
        
        if (activeBtn) activeBtn.classList.add('active');
        if (activeContent) activeContent.classList.add('active');
    }

    handleLogin() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const role = document.getElementById('login-role').value;

        // Validation
        if (!email || !password) {
            this.showAlert('Vui lòng điền đầy đủ thông tin', 'error');
            return;
        }

        // Simulate login (in real app, this would be an API call)
        const user = {
            email,
            role,
            name: this.getUserNameFromEmail(email),
            id: Date.now().toString()
        };

        this.currentUser = user;
        this.saveUser();
        this.showAlert('Đăng nhập thành công! Đang chuyển hướng...', 'success');
        
        // Redirect to dashboard after 1 second
        setTimeout(() => {
            window.location.href = `dashboard.html?role=${role}`;
        }, 1000);
    }

    handleRegister() {
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const phone = document.getElementById('register-phone').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;
        const role = document.getElementById('register-role').value;

        // Validation
        if (!name || !email || !phone || !password || !confirmPassword) {
            this.showAlert('Vui lòng điền đầy đủ thông tin', 'error');
            return;
        }

        if (password !== confirmPassword) {
            this.showAlert('Mật khẩu không khớp', 'error');
            return;
        }

        if (password.length < 6) {
            this.showAlert('Mật khẩu phải có ít nhất 6 ký tự', 'error');
            return;
        }

        // Simulate registration (in real app, this would be an API call)
        const user = {
            name,
            email,
            phone,
            role,
            id: Date.now().toString()
        };

        this.currentUser = user;
        this.saveUser();
        this.showAlert('Đăng ký thành công! Đang chuyển hướng...', 'success');
        
        // Redirect to dashboard after 1 second
        setTimeout(() => {
            window.location.href = `dashboard.html?role=${role}`;
        }, 1000);
    }

    handleForgotPassword() {
        const email = prompt('Vui lòng nhập địa chỉ email của bạn:');
        if (email) {
            // Simulate password reset (in real app, this would be an API call)
            this.showAlert(`Liên kết khôi phục mật khẩu đã được gửi đến ${email}`, 'info');
        }
    }

    getUserNameFromEmail(email) {
        // Extract name from email (for demo purposes)
        const parts = email.split('@')[0];
        return parts.charAt(0).toUpperCase() + parts.slice(1);
    }

    saveUser() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.currentUser));
    }

    loadUser() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
            this.currentUser = JSON.parse(saved);
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

    showAlert(message, type) {
        // Remove existing alerts
        const existingAlert = document.querySelector('.auth-alert');
        if (existingAlert) {
            existingAlert.remove();
        }

        // Create alert element
        const alert = document.createElement('div');
        alert.className = `alert alert-${type === 'error' ? 'error' : type === 'success' ? 'success' : type === 'warning' ? 'warning' : 'info'} auth-alert`;
        alert.textContent = message;

        // Insert alert at the top of the form
        const form = document.querySelector('.auth-form');
        if (form && form.parentElement) {
            form.parentElement.insertBefore(alert, form);
        }

        // Auto remove after 5 seconds
        setTimeout(() => {
            alert.remove();
        }, 5000);
    }
}

// Initialize auth manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AuthManager();
});
