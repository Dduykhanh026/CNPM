// Authentication functionality
class AuthManager {
    private currentUser: any = null;
    private storageKey = 'currentUser';

    constructor() {
        this.loadUser();
        this.initEventListeners();
    }

    private initEventListeners(): void {
        // Tab switching
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.getAttribute('data-tab');
                this.switchTab(tab!);
            });
        });

        // Login form
        const loginForm = document.getElementById('login-form') as HTMLFormElement;
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        // Register form
        const registerForm = document.getElementById('register-form') as HTMLFormElement;
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

    private switchTab(tabName: string): void {
        // Remove active class from all tabs and contents
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.auth-tab-content').forEach(content => content.classList.remove('active'));

        // Add active class to selected tab and content
        const activeBtn = document.querySelector(`[data-tab="${tabName}"]`);
        const activeContent = document.getElementById(`${tabName}-tab`);
        
        if (activeBtn) activeBtn.classList.add('active');
        if (activeContent) activeContent.classList.add('active');
    }

    private handleLogin(): void {
        const email = (document.getElementById('login-email') as HTMLInputElement).value;
        const password = (document.getElementById('login-password') as HTMLInputElement).value;
        const role = (document.getElementById('login-role') as HTMLSelectElement).value;

        // Validation
        if (!email || !password) {
            this.showAlert('Please fill in all fields', 'error');
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
        this.showAlert('Login successful! Redirecting...', 'success');
        
        // Redirect to dashboard after 1 second
        setTimeout(() => {
            window.location.href = `dashboard.html?role=${role}`;
        }, 1000);
    }

    private handleRegister(): void {
        const name = (document.getElementById('register-name') as HTMLInputElement).value;
        const email = (document.getElementById('register-email') as HTMLInputElement).value;
        const phone = (document.getElementById('register-phone') as HTMLInputElement).value;
        const password = (document.getElementById('register-password') as HTMLInputElement).value;
        const confirmPassword = (document.getElementById('register-confirm-password') as HTMLInputElement).value;
        const role = (document.getElementById('register-role') as HTMLSelectElement).value;

        // Validation
        if (!name || !email || !phone || !password || !confirmPassword) {
            this.showAlert('Please fill in all fields', 'error');
            return;
        }

        if (password !== confirmPassword) {
            this.showAlert('Passwords do not match', 'error');
            return;
        }

        if (password.length < 6) {
            this.showAlert('Password must be at least 6 characters', 'error');
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
        this.showAlert('Registration successful! Redirecting...', 'success');
        
        // Redirect to dashboard after 1 second
        setTimeout(() => {
            window.location.href = `dashboard.html?role=${role}`;
        }, 1000);
    }

    private handleForgotPassword(): void {
        const email = prompt('Please enter your email address:');
        if (email) {
            // Simulate password reset (in real app, this would be an API call)
            this.showAlert(`Password reset link sent to ${email}`, 'info');
        }
    }

    private getUserNameFromEmail(email: string): string {
        // Extract name from email (for demo purposes)
        const parts = email.split('@')[0];
        return parts.charAt(0).toUpperCase() + parts.slice(1);
    }

    private saveUser(): void {
        localStorage.setItem(this.storageKey, JSON.stringify(this.currentUser));
    }

    private loadUser(): void {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
            this.currentUser = JSON.parse(saved);
        }
    }

    public getCurrentUser(): any {
        return this.currentUser;
    }

    public logout(): void {
        this.currentUser = null;
        localStorage.removeItem(this.storageKey);
        window.location.href = 'index.html';
    }

    private showAlert(message: string, type: 'success' | 'error' | 'warning' | 'info'): void {
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
